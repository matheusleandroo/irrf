import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContainerContent = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 3rem 0;
  padding: 0 0.7rem;

  a.linkAdd {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    text-decoration: none;
    font-weight: bold;

    padding: 0.62rem;
    border-radius: 0.3rem;
    font-size: 1rem;
    line-height: 1.25rem;

    background: var(--color-button-primary);
    color: var(--color-background-secundary);
    transition: background 0.2s;

    svg {
      margin-left: 1rem;
    }
  }

  a.linkAdd:hover {
    background: var(--color-button-primary-shade);
  }
`;

export const EmployeeContent = styled.div`
  width: 100%;
  margin: 3rem 0;
  padding: 1rem 1rem 2rem;
  border-radius: 0.3rem;
  border: 3px solid transparent;
  transition: border 0.2s;

  &:hover {
    border: 3px solid var(--color-primary-lighter);
  }

  background-color: var(--color-background-secundary);
  color: var(--color-text);

  h3 {
    text-align: center;
  }

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

  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    a {
      height: 2rem;
      margin-right: 0.5rem;
      color: var(--color-text);

      svg {
        transition: color 0.2s;
      }

      svg:hover {
        color: var(--color-text-black);
      }
    }

    svg {
      height: 2rem;
      cursor: pointer;
      color: var(--color-text);
      transition: color 0.2s;
    }

    svg:hover {
      color: var(--color-text-black);
    }
  }

  div.data {
    p + p {
      margin-top: 0.5rem;
    }
  }

  @media (min-width: 576px) {
    > div:first-child {
      a {
        margin-right: 0.7rem;
      }
    }
  }
`;

export const NoBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin: 3rem 0;
  padding: 1rem;
  border-radius: 0.3rem;
  border: 3px solid transparent;
  transition: border 0.2s;

  &:hover {
    border: 3px solid var(--color-primary-lighter);
  }

  background-color: var(--color-background-secundary);
  color: var(--color-text);
`;
