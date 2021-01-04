import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';
import Button from '../../components/Button';
import Input from '../../components/Input';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import { Background, Container, Content } from './styles';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = yup.object().shape({
          name: yup.string().required('O nome é obrigatório!'),
          email: yup
            .string()
            .email('Digite um email válido!')
            .required('O email é obrigatório!'),
          password: yup.string().min(6, 'No mínimo 6 caracteres'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        addToast({
          title: 'Cadastro Realizado',
          description: 'Você já pode fazer o login!',
          type: 'success',
        });

        history.push('/');
      } catch (error) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);
      }

      addToast({
        type: 'error',
        title: 'Erro na criação da conta',
        description: 'Preencha todos os campos!',
      });
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="Logo" />

        <Form ref={formRef} onSubmit={handleSubmit}>
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

        <Link to="/">
          <FiArrowLeft />
          Voltar
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
