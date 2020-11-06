import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';

import { useEmployees } from '../../hooks/employees';

import { formatValue } from '../../utils/formatValue';
import { EmployeeFormattedProps } from '../../utils/types';

import Spinner from '../../components/Spinner';
import Header from '../../components/Header';
import Modal from '../../components/Modal';

import profile from '../../assets/profile.svg';

import { Container, ContainerContent, EmployeeContent } from './styles';

const Dashboard: React.FC = () => {
  const { employees, loading, deleteEmployee } = useEmployees();

  const [handleModal, setHandleModal] = useState(false);

  const [employee, setEmployee] = useState({} as EmployeeFormattedProps);

  const toggleModal = useCallback(() => {
    setHandleModal(!handleModal);
  }, [handleModal]);

  const handleDelete = useCallback(async () => {
    toggleModal();

    await deleteEmployee(employee.id);
  }, [employee.id, deleteEmployee, toggleModal]);

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

        {!loading && employees && employees.length > 0 ? (
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
                      <strong>Salário Bruto:</strong>{' '}
                      {formatValue(parseFloat(item.salario))}
                    </p>
                    <p>
                      <strong>Desconto Previdência:</strong>{' '}
                      {formatValue(parseFloat(item.desconto))}
                    </p>
                    <p>
                      <strong>Dependentes:</strong> {item.dependentes}
                    </p>
                    <p>
                      <strong>Salário Base:</strong>{' '}
                      {formatValue(parseFloat(item.salarioBase))}
                    </p>
                    <p>
                      <strong>Desconto IRRF:</strong>{' '}
                      {formatValue(parseFloat(item.descontoIrrf))}
                    </p>
                    <p>
                      <strong>Salário Líquido:</strong>{' '}
                      {formatValue(parseFloat(item.salarioLiquido))}
                    </p>
                  </div>
                </div>
              </EmployeeContent>
            ))}
          </>
        ) : (
          <EmployeeContent>
            {loading ? <Spinner /> : <h3>Nenhum funcionário encontrado :(</h3>}
          </EmployeeContent>
        )}
      </ContainerContent>
    </Container>
  );
};

export default Dashboard;
