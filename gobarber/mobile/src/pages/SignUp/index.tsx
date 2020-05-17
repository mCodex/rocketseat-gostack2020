import React, { useRef, useCallback } from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
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
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
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
          <Input
            name="name"
            icon="user"
            placeholder="Nome"
            autoCapitalize="words"
            keyboardAppearance="dark"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
          />

          <Input
            ref={emailRef}
            name="email"
            icon="mail"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />

          <Input
            ref={passwordRef}
            name="password"
            icon="lock"
            placeholder="Senha"
            secureTextEntry
            keyboardAppearance="dark"
            textContentType="newPassword"
            returnKeyType="send"
            onSubmitEditing={() => formRef.current?.submitForm()}
          />

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
