import React from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { formatCpf, formatNumber } from '../../utils/formatValue';

import Input from '../Input';
import InputCurrency from '../InputCurrency';
import ButtonsSubmit from '../ButtonsSubmit';

import profile from '../../assets/profile.svg';
import { Container, ContainerContent, EmployeeContent } from './styles';

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
      <ContainerContent>
        <div>
          <strong>IRRF</strong> / {title}
        </div>

        <EmployeeContent>
          <div className="profileImg">
            <img src={profile} alt="Perfil" />
          </div>

          <div>
            <Form ref={formRef} onSubmit={onSubmit} initialData={initialData}>
              <div className="form">
                <div>
                  <p>Nome</p>
                  <Input name="nome" data-testid="nome" />
                </div>
              </div>

              <div className="form grid">
                <div>
                  <p>CPF</p>
                  <Input
                    name="cpf"
                    data-testid="cpf"
                    onChange={e => {
                      if (e.target.value.length <= 14)
                        formRef.current?.setFieldValue(
                          'cpf',
                          formatCpf(e.target.value),
                        );
                      else
                        formRef.current?.setFieldValue(
                          'cpf',
                          e.target.value.substring(0, 14),
                        );
                    }}
                  />
                </div>
                <div>
                  <p>Dependentes</p>
                  <Input
                    name="dependentes"
                    data-testid="dependentes"
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
              <div className="form grid">
                <div>
                  <p>Salário Bruto</p>
                  <InputCurrency
                    name="salario"
                    data-testid="salario"
                    type="text"
                  />
                </div>
                <div>
                  <p>Desconto Previdência</p>
                  <InputCurrency
                    name="desconto"
                    data-testid="desconto"
                    type="text"
                  />
                </div>
              </div>

              <ButtonsSubmit cancelUrl="/" />
            </Form>
          </div>
        </EmployeeContent>
      </ContainerContent>
    </Container>
  );
};

export default Employee;
