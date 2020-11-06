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
  employees: EmployeeFormattedProps[];
  loading: boolean;
  getAllEmployees(): Promise<void>;
  deleteEmployee(id: string): Promise<void>;
  createEmployee(data: EmployeeProps): Promise<void>;
  updateEmployee(data: EmployeeProps): Promise<void>;
  getEmployeeById(id: string): Promise<EmployeeFormattedProps>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const EmployeesProvider: React.FC = ({ children }: any) => {
  const [employees, setEmployees] = useState<EmployeeFormattedProps[]>([]);
  const [loading, setLoading] = useState(false);

  const getAllEmployees = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.get<EmployeeProps[]>('employees');

      setEmployees(response.data.map(item => getEmployeeFormatted(item)));
    } catch (error) {
      toast.error('Ocorreu um erro inesperado');
    } finally {
      setLoading(false);
    }
  }, []);

  const getEmployeeById = useCallback(async (id: string) => {
    setLoading(true);

    const response = await api.get<EmployeeProps>(`employees/${id}`);

    setLoading(false);

    return getEmployeeFormatted(response.data);
  }, []);

  const deleteEmployee = useCallback(
    async (id: string) => {
      setLoading(true);

      try {
        const employeeIndex = employees.findIndex(f => f.id === id);

        await api.delete(`employees/${id}`);

        const newEmployees = employees;
        newEmployees.splice(employeeIndex, 1);

        setEmployees([...newEmployees]);

        toast.success('Funcionário(a) excluído(a) com sucesso');
      } catch (error) {
        toast.error('Ocorreu um erro inesperado');
      } finally {
        setLoading(false);
      }
    },
    [employees],
  );

  const createEmployee = useCallback(
    async (data: EmployeeProps) => {
      setLoading(true);

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

        setEmployees([...employees, getEmployeeFormatted(response.data)]);

        toast.success('Funcionário(a) adicionado(a) com sucesso');
      } catch (error) {
        toast.error('Ocorreu um erro inesperado');
      } finally {
        setLoading(false);
      }
    },
    [employees],
  );

  const updateEmployee = useCallback(
    async (data: EmployeeProps) => {
      setLoading(true);

      try {
        const { id } = data;

        const employeeIndex = employees.findIndex(f => f.id === id);

        const response = await api.put(`employees/${id}`, data);

        const newEmployees = employees;
        const employeedFormatted = getEmployeeFormatted(response.data);

        newEmployees[employeeIndex] = employeedFormatted;

        setEmployees([...newEmployees]);

        toast.success('Funcionário(a) atualizado(a) com sucesso');
      } catch (error) {
        toast.error('Ocorreu um erro inesperado');
      } finally {
        setLoading(false);
      }
    },
    [employees],
  );

  useEffect(() => {
    getAllEmployees();
  }, [getAllEmployees]);

  return (
    <AuthContext.Provider
      value={{
        employees,
        loading,
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
