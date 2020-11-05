import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';

import { useEmployees } from '../../hooks/employees';
import { EmployeeFormattedProps } from '../../utils/types';

import Header from '../../components/Header';
import Modal from '../../components/Modal';

import profile from '../../assets/profile.svg';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { allEmployees, deleteEmployee } = useEmployees();

  const [handleModal, setHandleModal] = useState(false);

  const [employees, setEmployees] = useState([] as EmployeeFormattedProps[]);
  const [employee, setEmployee] = useState({} as EmployeeFormattedProps);

  const getEmployees = useCallback(async () => {
    try {
      setEmployees(allEmployees);
    } catch (error) {
      console.log('erro');
    }
  }, [allEmployees]);

  const toggleModal = useCallback(() => {
    setHandleModal(!handleModal);
  }, [handleModal]);

  const handleDelete = useCallback(async () => {
    try {
      toggleModal();

      deleteEmployee(employee.id);
    } catch (error) {
      console.log('erro');
    }
  }, [employee.id, deleteEmployee, toggleModal]);

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  return (
    <Container>
      {handleModal && employee && (
        <Modal
          saveFunction={handleDelete}
          cancelFunction={toggleModal}
          item={employee.nome}
        />
      )}

      <Header />

      <div>
        <Link to="/employees/add" id="buttonAdd">
          <FiPlus size={20} />
          Adicionar
        </Link>

        {employees && employees.length > 0 ? (
          <>
            {employees.map(item => (
              <div key={item.id}>
                <div>
                  <Link to={`/employees/${item.id}/edit`}>
                    <FiEdit size={16} />
                  </Link>

                  <FiTrash
                    size={16}
                    onClick={() => {
                      setEmployee(item);
                      toggleModal();
                    }}
                  />
                </div>

                <img src={profile} alt={item.nome} />

                <div>
                  <div>
                    <strong>Nome:</strong> {item.nome}
                    <strong>CPF:</strong> {item.cpf}
                  </div>
                  <div>
                    <strong>Salário Bruto:</strong> R${item.salario}
                    <strong>Desconto Previdência:</strong> R${item.desconto}
                    <strong>Dependentes:</strong> {item.dependentes}
                  </div>
                  <div>
                    <strong>Salário Base:</strong> R${item.salarioBase}
                    <strong>Desconto IRRF:</strong> R${item.descontoIrrf}
                    <strong>Salário Líquido:</strong> R${item.salarioLiquido}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div>
            <h3>Nenhum funcionário encontrado :(</h3>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Dashboard;
