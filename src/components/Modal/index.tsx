import React from 'react';

import { Container, ModalContent } from './styles';

interface ModalProps {
  saveFunction(): void;
  cancelFunction(): void;
  item: string;
}

const Modal: React.FC<ModalProps> = ({
  saveFunction,
  cancelFunction,
  item,
}: ModalProps) => {
  return (
    <Container>
      <ModalContent>
        <h1>Confirmação</h1>
        <p>
          Tem certeza que deseja excluir o item <strong>{item}</strong>?
        </p>
        <div>
          <button type="button" onClick={saveFunction}>
            Excluir
          </button>
          <button type="button" onClick={cancelFunction}>
            Cancelar
          </button>
        </div>
      </ModalContent>
    </Container>
  );
};

export default Modal;
