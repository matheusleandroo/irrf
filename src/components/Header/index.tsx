import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { Container, HeaderTop, HeaderBody } from './styles';

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
        <HeaderTop>
          <Link to={urlTopBarBack || '/'}>
            {hasTopBarBack && <FiArrowLeft size={20} />}
          </Link>
        </HeaderTop>
      )}

      <HeaderBody>
        <h1>IRRF</h1>
      </HeaderBody>
    </Container>
  );
};

Header.defaultProps = {
  hasTopBarBack: false,
  urlTopBarBack: '',
};

export default Header;
