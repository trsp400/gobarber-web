import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as yup from 'yup';
import { FormHandles } from '@unform/core';
import logo from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Background, Container, Content } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

interface InputFields {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: InputFields) => {
    try {
      formRef.current?.setErrors({});

      const schema = yup.object().shape({
        email: yup
          .string()
          .email('Digite um email válido!')
          .required('O email é obrigatório!'),
        password: yup.string().required('Digite a senha!'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (error) {
      const errors = getValidationErrors(error);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={logo} alt="Logo" />

        <Form ref={formRef} onSubmit={handleSubmit}>
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
        </Form>

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
