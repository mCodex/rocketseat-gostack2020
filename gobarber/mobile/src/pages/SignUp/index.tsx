import React, { useRef, useCallback } from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

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
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const handleSignUp = useCallback(async (data: object) => {
    console.log(data);
  }, []);

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

        <Form ref={formRef} onSubmit={handleSignUp}>
          <Input name="name" icon="user" placeholder="Nome" />

          <Input name="email" icon="mail" placeholder="E-mail" />

          <Input name="password" icon="lock" placeholder="Senha" />

          <Button onPress={() => formRef.current?.submitForm()}>
            Cadastrar
          </Button>
        </Form>
      </Container>
      <BackToSignInButton onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInButtonText>Voltar para logon</BackToSignInButtonText>
      </BackToSignInButton>
    </SafeAreaView>
  );
};

export default SignIn;
