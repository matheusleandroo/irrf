import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  /* background-color: red; */
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 99;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 576px) {
    align-items: baseline;
  }
`;

const appearFromTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const ModalContent = styled.div`
  /* background-color: blue; */
  background-color: var(--color-background);
  animation: ${appearFromTop} 1s;
  position: fixed;
  margin: 5%;
  padding: 5%;
  border-radius: 3px;
  h1 {
    font-size: 1.2rem;
    margin-bottom: 15px;
  }
  p {
    margin-bottom: 15px;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.5rem;
    button {
      color: var(--color-background-secundary);
      border: 0;
      border-radius: 3px;
      padding: 5px 15px;
      flex: 1;
      cursor: pointer;
      font-weight: bold;
      transition: background 0.2s;
      background-color: var(--color-button-primary);
      margin-right: 2%;
    }
    button:hover {
      background: var(--color-button-primary-shade);
    }
    button + button {
      background-color: var(--color-button-secundary);
      margin-left: 2%;
    }
    button + button:hover {
      background: var(--color-button-secundary-shade);
    }
  }
  @media (min-width: 576px) {
    padding: 2% 2% 0;
    div {
      margin: 2rem 0 1rem;
      button {
        padding: 8px 20px;
        font-size: 0.9rem;
      }
    }
  }
`;
