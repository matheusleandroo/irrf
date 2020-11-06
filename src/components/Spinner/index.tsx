import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

import { Override } from './styles';

const Spinner: React.FC = () => {
  return (
    <div className="sweet-loading">
      <ScaleLoader css={Override} color="var(--color-primary-darker)" loading />
    </div>
  );
};

export default Spinner;
