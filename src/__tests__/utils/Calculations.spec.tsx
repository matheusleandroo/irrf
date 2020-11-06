import {
  getAliquotPortion,
  getEmployeeFormatted,
} from '../../utils/calculations';

describe('Calculations functions', () => {
  it('should be able to calcutate aliquot and portion', () => {
    expect(getAliquotPortion(0)).toEqual({
      aliquot: 0,
      portion: 0,
    });

    expect(getAliquotPortion(2000)).toEqual({
      aliquot: 7.5,
      portion: 142.8,
    });

    expect(getAliquotPortion(3000)).toEqual({
      aliquot: 15,
      portion: 354.8,
    });

    expect(getAliquotPortion(4000)).toEqual({
      aliquot: 22.5,
      portion: 636.13,
    });

    expect(getAliquotPortion(5000)).toEqual({
      aliquot: 27.5,
      portion: 869.36,
    });
  });

  it('should be able to get employee formatted', () => {
    expect(
      getEmployeeFormatted({
        id: 'user-id',
        nome: 'John Doe',
        cpf: '999.999.999-99',
        salario: 999.99,
        desconto: 9.99,
        dependentes: 0,
      }),
    ).toEqual({
      id: 'user-id',
      nome: 'John Doe',
      cpf: '999.999.999-99',
      salario: '999,99',
      desconto: '9,99',
      dependentes: '0',
      salarioBase: '990',
      descontoIrrf: '0',
      salarioLiquido: '990',
    });
  });
});
