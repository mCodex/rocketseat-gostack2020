import React from 'react';

import { Container } from './styles';

const CustomSafeArea: React.FC = ({ children }) => (
  <Container>{children}</Container>
);

export default CustomSafeArea;
