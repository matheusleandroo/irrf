import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import { EmployeesProvider, useEmployees } from '../../hooks/employees';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Employees hook', () => {
  it('should be able to get all employees', async () => {
    apiMock.onGet('employees').reply(200, [
      {
        id: 'user-id',
        nome: 'John Doe',
        cpf: '999.999.999-99',
        salario: 999.99,
        desconto: 9.99,
        dependentes: 0,
      },
    ]);

    const { result, waitForNextUpdate } = renderHook(() => useEmployees(), {
      wrapper: EmployeesProvider,
    });

    result.current.getAllEmployees();

    await waitForNextUpdate();

    expect(result.current.allEmployees).toEqual([
      {
        id: 'user-id',
        nome: 'John Doe',
        cpf: '999.999.999-99',
        salario: '999,99',
        desconto: '9,99',
        dependentes: '0',
        salarioBase: '990',
        descontoIrrf: '0',
        salarioLiquido: '990',
      },
    ]);
  });

  it('should be able to create an employee', async () => {
    const employee = {
      id: 'user-id',
      nome: 'John Doe',
      cpf: '999.999.999-99',
      salario: 999.99,
      desconto: 9.99,
      dependentes: 1,
    };

    apiMock.onPost('employees').reply(200, employee);

    const { result, waitForNextUpdate } = renderHook(() => useEmployees(), {
      wrapper: EmployeesProvider,
    });

    result.current.createEmployee(employee);

    await waitForNextUpdate();

    expect(result.current.allEmployees).toEqual([
      {
        id: 'user-id',
        nome: 'John Doe',
        cpf: '999.999.999-99',
        salario: '999,99',
        desconto: '9,99',
        dependentes: '1',
        salarioBase: '825,44',
        descontoIrrf: '0',
        salarioLiquido: '825,44',
      },
    ]);
  });

  it('should be able to update an employee', async () => {
    const employee = {
      id: 'user-id',
      nome: 'John Doe',
      cpf: '999.999.999-99',
      salario: 999.99,
      desconto: 9.99,
      dependentes: 1,
    };

    const updatedEmployee = {
      id: 'user-id',
      nome: 'John Doe',
      cpf: '999.999.999-99',
      salario: 999.99,
      desconto: 9.99,
      dependentes: 0,
    };

    apiMock.onPost('employees').reply(200, employee);

    const { result, waitForNextUpdate } = renderHook(() => useEmployees(), {
      wrapper: EmployeesProvider,
    });

    result.current.createEmployee(employee);

    await waitForNextUpdate();

    expect(result.current.allEmployees).toEqual([
      {
        id: 'user-id',
        nome: 'John Doe',
        cpf: '999.999.999-99',
        salario: '999,99',
        desconto: '9,99',
        dependentes: '1',
        salarioBase: '825,44',
        descontoIrrf: '0',
        salarioLiquido: '825,44',
      },
    ]);

    apiMock
      .onPut(`employees/${updatedEmployee.id}`)
      .reply(200, updatedEmployee);

    result.current.updateEmployee(updatedEmployee);

    await waitForNextUpdate();

    expect(result.current.allEmployees).toEqual([
      {
        id: 'user-id',
        nome: 'John Doe',
        cpf: '999.999.999-99',
        salario: '999,99',
        desconto: '9,99',
        dependentes: '0',
        salarioBase: '990',
        descontoIrrf: '0',
        salarioLiquido: '990',
      },
    ]);
  });

  it('should be able to delete an employee', async () => {
    const employee = {
      id: 'user-id',
      nome: 'John Doe',
      cpf: '999.999.999-99',
      salario: 999.99,
      desconto: 9.99,
      dependentes: 1,
    };

    apiMock.onPost('employees').reply(200, employee);

    const { result, waitForNextUpdate } = renderHook(() => useEmployees(), {
      wrapper: EmployeesProvider,
    });

    result.current.createEmployee(employee);

    await waitForNextUpdate();

    expect(result.current.allEmployees).toEqual([
      {
        id: 'user-id',
        nome: 'John Doe',
        cpf: '999.999.999-99',
        salario: '999,99',
        desconto: '9,99',
        dependentes: '1',
        salarioBase: '825,44',
        descontoIrrf: '0',
        salarioLiquido: '825,44',
      },
    ]);

    const id = 'user-id';

    apiMock.onDelete(`employees/${id}`).reply(200);

    result.current.deleteEmployee(id);

    await waitForNextUpdate();

    expect(result.current.allEmployees.length).toEqual(0);
  });
});
