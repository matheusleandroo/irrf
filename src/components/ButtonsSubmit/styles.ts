import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 1.5rem;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    text-decoration: none;
    border: 0;
    border-radius: 0.3rem;
    margin: 1rem 0 0.6rem;
    padding: 0.62rem;
    transition: background 0.2s;
    font-family: Poppins;
    font-weight: bold;
    font-size: 1rem;
    line-height: 1.25rem;
    background: var(--color-button-primary);
    color: var(--color-background-secundary);
  }
  button:hover {
    background: var(--color-button-primary-shade);
  }
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    text-decoration: none;
    border: 0;
    border-radius: 0.3rem;
    padding: 0.62rem;
    transition: background 0.2s;
    font-family: Poppins;
    font-weight: bold;
    font-size: 1rem;
    line-height: 1.25rem;
    background: var(--color-button-secundary);
    color: var(--color-background-secundary);
  }
  a:hover {
    background: var(--color-button-secundary-shade);
  }
  @media (min-width: 576px) {
    flex-direction: row;
    margin-top: 2.5rem;
    button {
      margin: 0 25px 0 0;
    }
  }
`;
