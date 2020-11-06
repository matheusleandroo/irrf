import { getAliquotPortion } from '../../utils/calculations';

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
});
