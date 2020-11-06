import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';

import { useEmployees } from '../../hooks/employees';
import { EmployeeFormattedProps } from '../../utils/types';

import Header from '../../components/Header';
import Modal from '../../components/Modal';

import profile from '../../assets/profile.svg';

import { Container, ContainerContent, EmployeeContent } from './styles';

const Dashboard: React.FC = () => {
  const { allEmployees, deleteEmployee } = useEmployees();

  const [handleModal, setHandleModal] = useState(false);

  const [employees, setEmployees] = useState([] as EmployeeFormattedProps[]);
  const [employee, setEmployee] = useState({} as EmployeeFormattedProps);

  const getEmployees = useCallback(async () => {
    setEmployees(allEmployees);
  }, [allEmployees]);

  const toggleModal = useCallback(() => {
    setHandleModal(!handleModal);
  }, [handleModal]);

  const handleDelete = useCallback(async () => {
    toggleModal();

    deleteEmployee(employee.id);
  }, [employee.id, deleteEmployee, toggleModal]);

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  return (
    <Container>
      <Header />

      {handleModal && employee && (
        <Modal
          saveFunction={handleDelete}
          cancelFunction={toggleModal}
          item={employee.nome}
        />
      )}

      <ContainerContent>
        <Link to="/employees/add" className="linkAdd">
          <FiPlus size={20} />
          Adicionar
        </Link>

        {employees && employees.length > 0 ? (
          <>
            {employees.map(item => (
              <EmployeeContent key={item.id}>
                <div>
                  <Link to={`/employees/${item.id}/edit`} title="Editar">
                    <FiEdit size={16} />
                  </Link>

                  <FiTrash
                    size={16}
                    onClick={() => {
                      setEmployee(item);
                      toggleModal();
                    }}
                    title="Excluir"
                  />
                </div>

                <div className="profileImg">
                  <img src={profile} alt={item.nome} />
                </div>

                <div className="data">
                  <div>
                    <p>
                      <strong>Nome:</strong> {item.nome}
                    </p>
                    <p>
                      <strong>CPF:</strong> {item.cpf}
                    </p>
                    <p>
                      <strong>Salário Bruto:</strong> R${item.salario}
                    </p>
                    <p>
                      <strong>Desconto Previdência:</strong> R${item.desconto}
                    </p>
                    <p>
                      <strong>Dependentes:</strong> {item.dependentes}
                    </p>
                    <p>
                      <strong>Salário Base:</strong> R${item.salarioBase}
                    </p>
                    <p>
                      <strong>Desconto IRRF:</strong> R${item.descontoIrrf}
                    </p>
                    <p>
                      <strong>Salário Líquido:</strong> R${item.salarioLiquido}
                    </p>
                  </div>
                </div>
              </EmployeeContent>
            ))}
          </>
        ) : (
          <EmployeeContent>
            <h3>Nenhum funcionário encontrado :(</h3>
          </EmployeeContent>
        )}
      </ContainerContent>
    </Container>
  );
};

export default Dashboard;
