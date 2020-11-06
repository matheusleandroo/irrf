import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import { Container } from './styles';

const Loading: React.FC = () => {
  return (
    <BeatLoader css={Container} color="var(--color-primary-darker)" loading />
  );
};

export default Loading;
