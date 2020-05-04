import React from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => {
  const handleSubmit = (data: object): void => {
    console.log(data);
  };

  return (
    <Container>
      <Background />

      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input
            type="text"
            icon={FiUser}
            name="name"
            placeholder="Digite seu nome"
          />
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

          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="">
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SignIn;
