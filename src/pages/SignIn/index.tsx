import React from 'react';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';
import logo from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Background, Container, Content } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logo} alt="Logo" />

        <form>
          <h1>Faça seu login</h1>

          <Input name="email" icon={FiMail} placeholder="Digite seu email" />
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Digite sua senha"
          />

          <Button>Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </form>

        <a href="create">
          <FiLogIn />
          Criar conta
        </a>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
