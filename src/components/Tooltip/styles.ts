import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  span {
    width: 160px;
    background: var(--color-primary-darker);
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    color: var(--color-background-secundary);
    &::before {
      content: '';
      border-style: solid;
      border-color: var(--color-button-secundary);
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &:hover span {
    opacity: 1;
    visibility: visible;
  }
  @media (max-width: 576px) {
    display: none;
  }
`;