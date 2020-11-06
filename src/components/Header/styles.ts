import styled from 'styled-components';

export const Container = styled.header`
  background: var(--color-primary);
  position: relative;
  width: 100%;
  min-height: 10rem;
`;

export const HeaderTop = styled.div`
  position: absolute;
  padding: 0.5rem 0.3rem;

  a {
    svg {
      color: var(--color-primary-light);
      transition: color 0.2s;
    }
    svg:hover {
      color: var(--color-background-secundary);
    }
  }
`;

export const HeaderBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin: 0 auto;
  padding: 3rem 1.5625rem 0;

  h1 {
    font-size: 3rem;
    color: var(--color-title);
  }
`;
