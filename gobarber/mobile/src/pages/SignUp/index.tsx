import React from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../colors';
import logoImg from '../../assets/logo.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInButtonText,
} from './styles';

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.black,
      }}
    >
      <Container>
        <Image source={logoImg} />

        <Title>Crie sua conta</Title>

        <Input name="name" icon="user" placeholder="Nome" />

        <Input name="email" icon="mail" placeholder="E-mail" />

        <Input name="password" icon="lock" placeholder="Senha" />

        <Button>Cadastrar</Button>
      </Container>
      <BackToSignInButton onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInButtonText>Voltar para logon</BackToSignInButtonText>
      </BackToSignInButton>
    </SafeAreaView>
  );
};

export default SignIn;
