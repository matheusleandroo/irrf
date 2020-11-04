import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background-color: var(--color-input-background-secundary);
  border-radius: 3px;
  border: 1px solid transparent;
  padding: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: var(--color-button-secundary-lighter);
    `}
  ${props =>
    props.isFocused &&
    css`
      color: var(--color-primary-darker);
      border-color: var(--color-primary-darker);
    `}
  ${props =>
    props.isFilled &&
    css`
      color: var(--color-primary-darker);
    `}
  input {
    flex: 1%;
    background: transparent;
    border: 0;
    font-size: 0.85rem;
    color: var(--color-text);
    &::placeholder {
      color: var(--color-text);
    }
  }
  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: var(--color-button-secundary);
    color: var(--color-background-secundary);
    &::before {
      border-color: var(--color-button-secundary) transparent;
    }
  }
`;
