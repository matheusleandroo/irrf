export interface EmployeeProps {
  id: string;
  nome: string;
  cpf: string;
  salario: number;
  desconto: number;
  dependentes: number;
}

export interface EmployeeFormattedProps {
  id: string;
  nome: string;
  cpf: string;
  salario: string;
  desconto: string;
  dependentes: string;
  salarioBase: string;
  descontoIrrf: string;
  salarioLiquido: string;
}

export interface AliquotPortionProps {
  aliquot: number;
  portion: number;
}
