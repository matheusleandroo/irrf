import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import EmployeesEdit from '../pages/Employees/Edit';
import EmployeesAdd from '../pages/Employees/Add';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/employees/:id/edit" component={EmployeesEdit} />
    <Route path="/employees/add" component={EmployeesAdd} />
  </Switch>
);

export default Routes;
