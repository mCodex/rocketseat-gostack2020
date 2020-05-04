import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form action="">
        <h1>Faça seu logon</h1>

        <Input
          type="email"
          icon={FiMail}
          name="email"
          placeholder="Digite seu e-mail"
        />
        <Input
          type="password"
          icon={FiLock}
          name="password"
          placeholder="Digite sua senha"
        />

        <Button type="submit">Entrar</Button>
        <a href="">Esqueci minha senha</a>
      </form>

      <a href="">
        <FiLogIn />
        Criar Conta
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
