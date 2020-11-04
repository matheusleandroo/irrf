import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../../services/api';

import getValidationErros from '../../../utils/getValidationErrors';

import Header from '../../../components/Header';
import Employee from '../../../components/Employee';

import { Container } from '../styles';

interface RouteParamsProps {
  id: string;
}

interface EmployeeProps {
  nome: string;
  cpf: string;
  salario: string;
  desconto: string;
  dependentes: string;
}

const EmployeeEdit: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const routeParams = useParams() as RouteParamsProps;
  const history = useHistory();

  const [employee, setEmployee] = useState({} as EmployeeProps);

  const getEmployee = useCallback(async () => {
    try {
      const response = await api.get(`employees/${routeParams.id}`);

      setEmployee({
        ...response.data,
        salario: response.data.salario.toString().replace('.', ','),
        desconto: response.data.desconto.toString().replace('.', ','),
        dependentes: response.data.dependentes.toString().replace('.', ','),
      });
    } catch (error) {
      console.log('erro');
    }
  }, [routeParams.id]);

  useEffect(() => {
    getEmployee();
  }, [getEmployee]);

  const handleSubmited = useCallback(
    async (data: EmployeeProps) => {
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

        const params = {
          nome: data.nome,
          cpf: data.cpf,
          salario: parseFloat(
            data.salario.replace('R$', '').replace('.', '').replace(',', '.'),
          ),
          desconto: parseFloat(
            data.desconto.replace('R$', '').replace('.', '').replace(',', '.'),
          ),
          dependentes: parseInt(data.dependentes, 10),
        };

        await api.put(`employees/${routeParams.id}`, params);

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);

          return;
        }

        console.log('erro');
      }
    },
    [history, routeParams.id],
  );

  return (
    <Container>
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
