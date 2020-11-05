import {
  EmployeeProps,
  EmployeeFormattedProps,
  AliquotPortionProps,
} from './types';

const dependentDeduction = 164.56;

export function getAliquotPortion(salary: number): AliquotPortionProps {
  let aliquotPortion = {
    aliquot: 0,
    portion: 0,
  };

  if (salary <= 1903.98) return aliquotPortion;
  if (salary > 1903.98 && salary <= 2826.65)
    aliquotPortion = { aliquot: 7.5, portion: 142.8 };
  if (salary > 2826.65 && salary <= 3751.05)
    aliquotPortion = { aliquot: 15, portion: 354.8 };
  if (salary > 3751.05 && salary <= 4664.68)
    aliquotPortion = { aliquot: 22.5, portion: 636.13 };
  if (salary > 4664.68) aliquotPortion = { aliquot: 27.5, portion: 869.36 };

  return aliquotPortion;
}

export function calculateBaseSalary(employee: EmployeeProps): number {
  return parseFloat(
    (
      employee.salario -
      employee.desconto -
      dependentDeduction * employee.dependentes
    ).toFixed(2),
  );
}

export function calculateIrrfDiscount(employee: EmployeeProps): number {
  return parseFloat(
    (
      (calculateBaseSalary(employee) *
        getAliquotPortion(employee.salario).aliquot) /
        100 -
      getAliquotPortion(employee.salario).portion
    ).toFixed(2),
  );
}

export function calculateNetSalary(employee: EmployeeProps): number {
  return parseFloat(
    (calculateBaseSalary(employee) - calculateIrrfDiscount(employee)).toFixed(
      2,
    ),
  );
}

export function getEmployeeFormatted(
  employee: EmployeeProps,
): EmployeeFormattedProps {
  return {
    id: employee.id,
    nome: employee.nome,
    cpf: employee.cpf,
    salario: employee.salario.toString().replace('.', ','),
    desconto: employee.desconto.toString().replace('.', ','),
    dependentes: employee.dependentes.toString().replace('.', ','),
    salarioBase: calculateBaseSalary(employee).toString().replace('.', ','),
    descontoIrrf: calculateIrrfDiscount(employee).toString().replace('.', ','),
    salarioLiquido: calculateNetSalary(employee).toString().replace('.', ','),
  };
}
