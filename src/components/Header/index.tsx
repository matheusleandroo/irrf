import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { Container } from './styles';

interface HeaderProps {
  hasTopBarBack?: boolean;
  urlTopBarBack?: string;
}

const Header: React.FC<HeaderProps> = ({
  hasTopBarBack,
  urlTopBarBack,
}: HeaderProps) => {
  return (
    <Container>
      {hasTopBarBack && (
        <div>
          <Link to={urlTopBarBack || '/'}>
            {hasTopBarBack && <FiArrowLeft size={20} />}
            <p>{hasTopBarBack}</p>
          </Link>
        </div>
      )}

      <div>
        <h1>IRRF</h1>
        <span>Genrenciar funcionários</span>
      </div>
    </Container>
  );
};

Header.defaultProps = {
  hasTopBarBack: false,
  urlTopBarBack: '',
};

export default Header;
