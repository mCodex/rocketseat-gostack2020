import React from 'react';
import { Text, Button } from 'react-native';
import { useAuth } from '@hooks/auth';

import { Container, Header, HeaderTitle, UserName } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem-vindo, {'\n'}
          <UserName>Mateus</UserName>
        </HeaderTitle>
      </Header>
      <Text>Dashboard</Text>
      <Button title="Sair" onPress={signOut} />
    </Container>
  );
};

export default Dashboard;
