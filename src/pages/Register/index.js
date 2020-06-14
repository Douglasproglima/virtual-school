import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Register() {
  const dispatch = useDispatch();
  const id = useSelector(state => state.auth.user.id);
  const nameStored = useSelector(state => state.auth.user.name);
  const emailStored = useSelector(state => state.auth.user.email);
  const isLoading = useSelector(state => state.auth.isLoading);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    if(!id) return;

    setName(nameStored);
    setEmail(emailStored);
  }, [emailStored, id, nameStored]);

  async function handleSumit(e) {
    e.preventDefault();
    let formErrors = false;

    if(name.length < 4 || name.length > 20) {
      formErrors = true;
      toast.error('O campo Nome precisa conter entre 4 há 20 caracteres.');
    }

    if(!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido.');
    }

    if(!id) {
      if(password.length < 6 || password.length > 50) {
        formErrors = true;
        toast.error('O campo Senha precisa conter entre 6 há 50 caracteres.');
      }
    }

    if(formErrors) return;

    dispatch(actions.registerRequest({ name, email, password, id }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar Dados' :'Criar Conta' }</h1>
      <hr></hr>
      <Form onSubmit={handleSumit}>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={name} onChange={e => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Endereço de e-mail"
          value={email} onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password} onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">{id ? 'Salvar' : 'Cadastrar Grátis'}</button>
        <hr />
      </Form>
    </Container>
  );
}
