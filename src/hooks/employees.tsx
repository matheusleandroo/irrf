import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import api from '../services/api';

import { EmployeeProps, EmployeeFormattedProps } from '../utils/types';
import { getEmployeeFormatted } from '../utils/calculations';

interface AuthContextData {
  allEmployees: EmployeeFormattedProps[];
  getAllEmployees(): Promise<void>;
  deleteEmployee(id: string): Promise<void>;
  createEmployee(data: EmployeeProps): Promise<void>;
  updateEmployee(data: EmployeeProps): Promise<void>;
  getEmployeeById(id: string): Promise<EmployeeFormattedProps>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const EmployeesProvider: React.FC = ({ children }: any) => {
  const [allEmployees, setAllEmployees] = useState<EmployeeFormattedProps[]>(
    [],
  );

  const getAllEmployees = useCallback(async () => {
    const response = await api.get<EmployeeProps[]>('employees');

    setAllEmployees(response.data.map(item => getEmployeeFormatted(item)));
  }, []);

  const getEmployeeById = useCallback(async (id: string) => {
    const response = await api.get<EmployeeProps>(`employees/${id}`);

    return getEmployeeFormatted(response.data);
  }, []);

  const deleteEmployee = useCallback(
    async (id: string) => {
      await api.delete(`employees/${id}`);

      getAllEmployees();
    },
    [getAllEmployees],
  );

  const createEmployee = useCallback(
    async (data: EmployeeProps) => {
      const { nome, cpf, salario, desconto, dependentes } = data;

      const params = {
        id: uuidv4(),
        nome,
        cpf,
        salario,
        desconto,
        dependentes,
      };

      await api.post('employees', params);

      getAllEmployees();
    },
    [getAllEmployees],
  );

  const updateEmployee = useCallback(
    async (data: EmployeeProps) => {
      await api.put(`employees/${data.id}`, data);

      getAllEmployees();
    },
    [getAllEmployees],
  );

  useEffect(() => {
    getAllEmployees();
  }, [getAllEmployees]);

  return (
    <AuthContext.Provider
      value={{
        allEmployees,
        getAllEmployees,
        deleteEmployee,
        createEmployee,
        updateEmployee,
        getEmployeeById,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useEmployees(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useEmployees must be used within an EmployeesProvider');
  }

  return context;
}

EmployeesProvider.defaultProps = {
  children: null,
};

export { EmployeesProvider, useEmployees };
