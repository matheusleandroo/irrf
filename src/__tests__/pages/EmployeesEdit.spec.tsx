import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import EmployeesEdit from '../../pages/Employees/Edit';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    useParams: () => {
      return 'user-id';
    },
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/employees', () => {
  return {
    useEmployees: () => ({
      updateEmployee: jest.fn(),
      getEmployeeById: () => ({
        id: 'user-id',
        nome: 'John Doe',
        cpf: '999.999.999-99',
        salario: '999,99',
        desconto: '9,99',
        dependentes: '0',
        salarioBase: '990',
        descontoIrrf: '0',
        salarioLiquido: '990',
      }),
    }),
  };
});

describe('Employees Edit Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to edit an employee', async () => {
    const { getByTestId, getByText } = render(<EmployeesEdit />);

    const nameField = getByTestId('nome');
    const cpfField = getByTestId('cpf');
    const salarioField = getByTestId('salario');
    const descontoField = getByTestId('desconto');
    const dependentesField = getByTestId('dependentes');
    const buttonElement = getByText('Salvar');

    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(cpfField, { target: { value: '999.999.999-99' } });
    fireEvent.change(salarioField, { target: { value: 'R$7.500,00' } });
    fireEvent.change(descontoField, { target: { value: 'R$100,00' } });
    fireEvent.change(dependentesField, { target: { value: '1' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('should not be able to edit an employee without all fields', async () => {
    const { getByTestId, getByText } = render(<EmployeesEdit />);

    const nameField = getByTestId('nome');
    const buttonElement = getByText('Salvar');

    fireEvent.change(nameField, { target: { value: 'not-valid-name' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });
});
