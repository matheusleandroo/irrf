import React from 'react';

import { EmployeesProvider } from './employees';

const AppProvider: React.FC = ({ children }: any) => (
  <EmployeesProvider>{children}</EmployeesProvider>
);

export default AppProvider;
