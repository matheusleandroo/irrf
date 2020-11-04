import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

interface ButtonsSubmitProps {
  cancelUrl: string;
}

const ButtonsSubmit: React.FC<ButtonsSubmitProps> = ({
  cancelUrl,
}: ButtonsSubmitProps) => {
  return (
    <Container>
      <button type="submit">Salvar</button>
      <Link to={cancelUrl}>Cancelar</Link>
    </Container>
  );
};

export default ButtonsSubmit;
