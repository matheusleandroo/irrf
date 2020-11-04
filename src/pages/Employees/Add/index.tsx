import React, { useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

import api from '../../../services/api';

import getValidationErros from '../../../utils/getValidationErrors';

import Header from '../../../components/Header';
import Employee from '../../../components/Employee';

import { Container } from '../styles';

interface EmployeeProps {
  nome: string;
  cpf: string;
  salario: string;
  desconto: string;
  dependentes: string;
}

const EmployeeAdd: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

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
          id: uuidv4(),
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

        await api.post('employees', params);

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
    [history],
  );

  return (
    <Container>
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
