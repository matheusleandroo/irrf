import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { useEmployees } from '../../../hooks/employees';

import { EmployeeFormattedProps } from '../../../utils/types';
import getValidationErros from '../../../utils/getValidationErrors';

import Loading from '../../../components/Loading';
import Header from '../../../components/Header';
import Employee from '../../../components/Employee';

import { Container } from '../styles';

interface RouteParamsProps {
  id: string;
}

const EmployeeEdit: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);
  const { getEmployeeById, updateEmployee } = useEmployees();

  const routeParams = useParams() as RouteParamsProps;
  const history = useHistory();

  const [employee, setEmployee] = useState({} as EmployeeFormattedProps);

  const getEmployee = useCallback(async () => {
    setLoading(true);

    const response = await getEmployeeById(routeParams.id);

    setEmployee(response);

    setLoading(false);
  }, [getEmployeeById, routeParams.id]);

  useEffect(() => {
    getEmployee();
  }, [getEmployee]);

  const handleSubmited = useCallback(
    async (data: EmployeeFormattedProps) => {
      setLoading(true);

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome: Yup.string().required('Campo obrigatório'),
          cpf: Yup.string().required('Campo obrigatório'),
          salario: Yup.string().required('Campo obrigatório'),
          desconto: Yup.string().required('Campo obrigatório'),
          dependentes: Yup.string().required('Campo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        updateEmployee({
          id: employee.id,
          nome: data.nome,
          cpf: data.cpf,
          salario: parseFloat(
            data.salario.replace('R$', '').replace('.', '').replace(',', '.'),
          ),
          desconto: parseFloat(
            data.desconto.replace('R$', '').replace('.', '').replace(',', '.'),
          ),
          dependentes: parseInt(data.dependentes, 10),
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);

          return;
        }

        toast.error('Ocorreu um erro inesperado');
      } finally {
        setLoading(false);
      }
    },
    [history, employee.id, updateEmployee],
  );

  return (
    <Container>
      {loading && <Loading />}

      <Header hasTopBarBack />

      <Employee
        title="Edição"
        formRef={formRef}
        onSubmit={handleSubmited}
        initialData={employee}
      />
    </Container>
  );
};

export default EmployeeEdit;
