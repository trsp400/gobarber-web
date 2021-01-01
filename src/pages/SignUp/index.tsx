import React from 'react';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import logo from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Background, Container, Content } from './styles';

const SignUp: React.FC = () => {
  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="Logo" />

        <form>
          <h1>Faça seu cadastro</h1>

          <Input name="name" icon={FiUser} placeholder="Digite seu nome" />
          <Input name="email" icon={FiMail} placeholder="Digite seu email" />
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Digite sua senha"
          />

          <Button>Criar conta</Button>
        </form>

        <a href="create">
          <FiArrowLeft />
          Voltar
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
