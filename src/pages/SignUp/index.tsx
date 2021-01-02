import React, { useCallback } from 'react';
import { Form } from '@unform/web';
import * as yup from 'yup';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import logo from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Background, Container, Content } from './styles';

interface InputFields {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const handleSubmit = useCallback(async (data: InputFields) => {
    try {
      const schema = yup.object().shape({
        name: yup.string().required('O nome é obrigatório!'),
        email: yup
          .string()
          .email('Digite um email válido!')
          .required('O email é obrigatório!'),
        password: yup
          .string()
          .min(6, 'A senha deve conter no mínimo 6 caracteres'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (error) {
      console.error(error.inner);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="Logo" />

        <Form onSubmit={handleSubmit}>
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
        </Form>

        <a href="create">
          <FiArrowLeft />
          Voltar
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
