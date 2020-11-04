import React from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { formatCpf, formatNumber } from '../../utils/formatValue';

import Input from '../Input';
import InputCurrency from '../InputCurrency';
import ButtonsSubmit from '../ButtonsSubmit';

import profile from '../../assets/profile.svg';
import { Container } from './styles';

interface EmployeeProps {
  title: 'Cadastro' | 'Edição';
  formRef: React.RefObject<FormHandles>;
  onSubmit: any;
  initialData: {};
}

const Employee: React.FC<EmployeeProps> = ({
  title,
  formRef,
  onSubmit,
  initialData,
}: EmployeeProps) => {
  return (
    <Container>
      <div>
        <strong>IRRF</strong> / {title}
      </div>

      <div>
        <img src={profile} alt="Perfil" />

        <div>
          <Form ref={formRef} onSubmit={onSubmit} initialData={initialData}>
            <div>
              <div>
                <p>Nome</p>
                <Input name="nome" />
              </div>
              <div>
                <p>CPF</p>
                <Input
                  name="cpf"
                  onChange={e => {
                    if (e.target.value.length <= 14)
                      formRef.current?.setFieldValue(
                        'cpf',
                        formatCpf(e.target.value),
                      );
                    else formRef.current?.setFieldValue('cpf', e.target.value);
                  }}
                />
              </div>
            </div>

            <div>
              <div>
                <p>Salário Bruto</p>
                <InputCurrency name="salario" type="text" />
              </div>
              <div>
                <p>Desconto Previdência</p>
                <InputCurrency name="desconto" type="text" />
              </div>
              <div>
                <p>Dependentes</p>
                <Input
                  name="dependentes"
                  type="number"
                  onChange={e => {
                    if (formatNumber(e.target.value))
                      formRef.current?.setFieldValue(
                        'dependentes',
                        e.target.value,
                      );
                    else formRef.current?.setFieldValue('dependentes', '0');
                  }}
                />
              </div>
            </div>

            <ButtonsSubmit cancelUrl="/" />
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default Employee;
