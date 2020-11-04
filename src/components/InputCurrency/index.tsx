import React, { useEffect, useRef, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { Container, Error } from './styles';

const defaultMaskOptions = {
  prefix: 'R$',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: '.',
  allowDecimal: true,
  decimalSymbol: ',',
  decimalLimit: 2,
  integerLimit: 7,
  allowNegative: false,
  allowLeadingZeroes: false,
};

interface InputProps extends MaskedInputProps {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({
  name,
  icon: Icon,
  ...res
}: InputProps) => {
  const inputRef = useRef<MaskedInput>(null);

  const [isFocused, setIsFocused] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current?.inputElement,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
  });

  return (
    <Container isFocused={isFocused} isFilled={false} isErrored={!!error}>
      {Icon && <Icon size={20} />}
      <MaskedInput
        mask={currencyMask}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...res}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="var(--color-button-secundary)" size={20} />
        </Error>
      )}
    </Container>
  );
};

Input.defaultProps = {
  icon: undefined,
};

export default Input;
