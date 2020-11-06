import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin: 0 auto;
  padding: 0 0.5rem;
`;

export const ContainerContent = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 3rem 0;
  padding: 1rem 0.7rem;
  border-radius: 0.3rem;
  border: 3px solid transparent;
  transition: border 0.2s;

  &:hover {
    border: 3px solid var(--color-primary-lighter);
  }

  background-color: var(--color-background-secundary);
  color: var(--color-text);
`;

export const EmployeeContent = styled.div`
  margin-top: 1.5rem;

  div.profileImg {
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 120px;
      width: 120px;
      border-radius: 50%;
      border: 3px solid var(--color-primary-lighter);
      background: #c7cddf;
    }
  }

  form {
    div.form {
      > div {
        margin-top: 1.5rem;
      }
    }
  }

  @media (min-width: 576px) {
    form {
      div.grid {
        display: grid;
        grid-template-columns: 1fr 1fr;

        div + div {
          margin-left: 1rem;
        }
      }
    }
  }
`;
