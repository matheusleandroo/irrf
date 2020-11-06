import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

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
    try {
      const response = await api.get<EmployeeProps[]>('employees');

      setAllEmployees(response.data.map(item => getEmployeeFormatted(item)));
    } catch (error) {
      toast.error('Ocorreu um erro inesperado');
    }
  }, []);

  const getEmployeeById = useCallback(async (id: string) => {
    const response = await api.get<EmployeeProps>(`employees/${id}`);

    return getEmployeeFormatted(response.data);
  }, []);

  const deleteEmployee = useCallback(
    async (id: string) => {
      try {
        const employeeIndex = allEmployees.findIndex(f => f.id === id);

        await api.delete(`employees/${id}`);

        const newAllEmployees = allEmployees;
        newAllEmployees.splice(employeeIndex, 1);

        setAllEmployees([...newAllEmployees]);
      } catch (error) {
        toast.error('Ocorreu um erro inesperado');
      }
    },
    [allEmployees],
  );

  const createEmployee = useCallback(
    async (data: EmployeeProps) => {
      try {
        const { nome, cpf, salario, desconto, dependentes } = data;

        const params = {
          id: uuidv4(),
          nome,
          cpf,
          salario,
          desconto,
          dependentes,
        };

        const response = await api.post('employees', params);

        setAllEmployees([...allEmployees, getEmployeeFormatted(response.data)]);
      } catch (error) {
        toast.error('Ocorreu um erro inesperado');
      }
    },
    [allEmployees],
  );

  const updateEmployee = useCallback(
    async (data: EmployeeProps) => {
      try {
        const { id } = data;

        const employeeIndex = allEmployees.findIndex(f => f.id === id);

        const response = await api.put(`employees/${id}`, data);

        const newAllEmployees = allEmployees;
        const employeedFormatted = getEmployeeFormatted(response.data);

        newAllEmployees[employeeIndex] = employeedFormatted;

        setAllEmployees([...newAllEmployees]);
      } catch (error) {
        toast.error('Ocorreu um erro inesperado');
      }
    },
    [allEmployees],
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
