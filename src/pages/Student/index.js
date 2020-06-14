import React, { useState, useEffect } from 'react';
import { isEmail, isInt, isFloat } from 'validator';
import { get } from 'lodash';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import axios from '../../services/axios';
import history from '../../services/history';
import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Student({ match }) {

  const id = get(match, 'params.id', '');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('7');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [photo, setPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!id) return;

    async function getData() {

      try {
        setIsLoading(true);
        const { data } = await axios.get(`/students/${id}`);
        const Photo = get(data, 'Photos[0].url', '');

        setName(data.name);
        setLastname(data.lastname);
        setEmail(data.email);
        setAge(data.age);
        setWeight(data.weight);
        setHeight(data.height);
        setPhoto(Photo);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);

        const status = get(err, 'response.status', '');
        const errors = get(err, 'response.data.errors', []);

        if(status === 400) errors.map(error => toast.error(error));
        if(status === 401) {
          dispatch(actions.loginFailure());
          history.push(`/login`);
        }
      }

    }

    getData();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    let formErrors = false;

    if(name.length < 4 || name.length > 20) {
      formErrors = true;
      toast.error('O campo "Nome" precisa conter entre 4 há 20 caracteres.');
    }

    if(lastname.length < 4 || lastname.length > 20) {
      formErrors = true;
      toast.error('O campo "Sobrenome" precisa conter entre 4 há 20 caracteres.');
    }

    if(!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido.');
    }

    if(!isInt(String(age))) {
      formErrors = true;
      toast.error('Idade precisa ser um número inteiro.');
    }

    if(!isFloat(String(weight))) {
      formErrors = true;
      toast.error('Peso precisa ser um número inteiro ou decimal.');
    }

    if(!isFloat(String(weight))) {
      formErrors = true;
      toast.error('Altura precisa ser um número inteiro ou decimal.');
    }

    if (formErrors) return;

    try {
      setIsLoading(true);

      if(id) {
        await axios.put(`/students/${id}`, {
          name, lastname, email, age, weight, height,
        });

        toast.success('Aluno(a) alterado(a) com sucesso!');
        history.push(`/`);
      } else {
        const data = await axios.post(`/students/`, {
          name, lastname, email, age, weight, height,
        });

        toast.success('Aluno(a) cadastrado(a) com sucesso!');
        history.push(`/student/${data.id}/edit`);
      }

      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }

      if(status === 401) {
        dispatch(actions.loginFailure());
        history.push(`/login`);
      }
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>{id > 0 ? 'Editar' : 'Novo'} Aluno</h1>
      <hr></hr>

      {id && (
        <ProfilePicture>
          {photo ? (
            <img src={photo} alt={name}></img>
          ) : (
            <FaUserCircle size={124} />
          )}
          <Link to={`/photos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}


      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Sobrenome"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Endereço de e-mail"
        />
        <input
          type="number"
          value={age}
          min={7}
          max={100}
          maxLength="2"
          onChange={(e) => setAge(e.target.value)}
          placeholder="Idade"
        />
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Peso"
        />
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Altura"
        />

        <button type="submit">Salvar</button>
      </Form>
    </Container>
  );
}

Student.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
