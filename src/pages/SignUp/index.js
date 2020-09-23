import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FiArrowLeft } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { signUpRequest } from '~/store/modules/auth/actions';
import { Content } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um email válido')
    .required('O Email é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha precisa ter 6 caracteres no mínimo')
    .required('A Senha é obrigatória'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <Content>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha secreta" />

        <button type="submit">Criar usuário</button>

        <Link to="/users">
          <FiArrowLeft color="#fff" size={20} />
          Voltar para a lista de usuários
        </Link>
      </Form>
    </Content>
  );
}
