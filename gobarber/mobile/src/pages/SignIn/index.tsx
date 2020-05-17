import React, { useCallback, useRef } from 'react';
import { Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import logoImg from '../../assets/logo.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import colors from '../../colors';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const handleSignIn = useCallback(async (data: object) => {
    console.log(data);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.black,
      }}
    >
      <Container keyboardShouldPersistTaps="handled">
        <Image source={logoImg} />

        <Title>Faça seu logon</Title>

        <Form ref={formRef} onSubmit={handleSignIn}>
          <Input name="email" icon="mail" placeholder="E-mail" />
          <Input name="password" icon="lock" placeholder="Senha" />

          <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
        </Form>
        <ForgotPassword>
          <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
        </ForgotPassword>
      </Container>
      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color={colors.orange} />
        <CreateAccountButtonText>Criar Conta</CreateAccountButtonText>
      </CreateAccountButton>
    </SafeAreaView>
  );
};

export default SignIn;
