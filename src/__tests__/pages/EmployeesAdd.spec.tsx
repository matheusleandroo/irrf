import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import EmployeesAdd from '../../pages/Employees/Add';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/employees', () => {
  return {
    useEmployees: () => ({
      createEmployee: jest.fn(),
    }),
  };
});

describe('Employees Add Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to add a new employee', async () => {
    const { getByTestId, getByText } = render(<EmployeesAdd />);

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

  it('should not be able to add a new employee without all fields', async () => {
    const { getByTestId, getByText } = render(<EmployeesAdd />);

    const nameField = getByTestId('nome');
    const buttonElement = getByText('Salvar');

    fireEvent.change(nameField, { target: { value: 'not-valid-name' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });
});
