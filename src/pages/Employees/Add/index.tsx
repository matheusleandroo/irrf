import React, { useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
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

const EmployeeAdd: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { createEmployee, loading } = useEmployees();

  const history = useHistory();

  const handleSubmited = useCallback(
    async (data: EmployeeFormattedProps) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome: Yup.string().required('Campo obrigatório'),
          cpf: Yup.string()
            .required('Campo obrigatório')
            .min(14, 'Campo inválido'),
          salario: Yup.string().required('Campo obrigatório'),
          desconto: Yup.string().required('Campo obrigatório'),
          dependentes: Yup.string().required('Campo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await createEmployee({
          id: '',
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
      }
    },
    [createEmployee, history],
  );

  return (
    <Container>
      {loading && <Loading />}

      <Header hasTopBarBack />

      <Employee
        title="Cadastro"
        formRef={formRef}
        onSubmit={handleSubmited}
        initialData={{}}
      />
    </Container>
  );
};

export default EmployeeAdd;
