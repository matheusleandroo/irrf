import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';

import api from '../../services/api';

import Header from '../../components/Header';
import Modal from '../../components/Modal';

import profile from '../../assets/profile.svg';

import { Container } from './styles';

interface EmployeeProps {
  id: string;
  nome: string;
  cpf: string;
  salario: string;
  desconto: string;
  dependentes: string;
}

const Dashboard: React.FC = () => {
  const [handleModal, setHandleModal] = useState(false);

  const [employees, setEmployees] = useState([] as EmployeeProps[]);
  const [employee, setEmployee] = useState({} as EmployeeProps);

  const getEmployees = useCallback(async () => {
    try {
      const response = await api.get<EmployeeProps[]>('employees');

      setEmployees(
        response.data.map(item => ({
          ...item,
          salario: item.salario.toString().replace('.', ','),
          desconto: item.desconto.toString().replace('.', ','),
          dependentes: item.dependentes.toString().replace('.', ','),
        })),
      );
    } catch (error) {
      console.log('erro');
    }
  }, []);

  const toggleModal = useCallback(() => {
    setHandleModal(!handleModal);
  }, [handleModal]);

  const handleDelete = useCallback(async () => {
    try {
      toggleModal();

      await api.delete(`employees/${employee.id}`);

      getEmployees();
    } catch (error) {
      console.log('erro');
    }
  }, [employee.id, getEmployees, toggleModal]);

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
                    <strong>Salário Base:</strong> R$123,45
                    <strong>Desconto IRRF:</strong> R$123,45
                    <strong>Salário Líquido:</strong> R$123,45
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
