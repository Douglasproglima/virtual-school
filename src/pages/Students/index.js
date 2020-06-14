import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose, FaExclamationCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { Container } from '../../styles/GlobalStyles';
import { StudentContainer, ProfilePicture, NewStudent } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';

export default function Students() {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [isLoading , setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {

      try {
        setIsLoading(true);
        const response = await axios.get('/students');
        //console.log(response);
        setStudents(response.data);
        setIsLoading(false);

      } catch (err) {
        setIsLoading(false);

        const status = get(err, 'response.status', 0);
        const data = get(err, 'response.data', {});
        const errors = get(data, 'errors', []);

        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        } else {
          toast.error('Erro desconhecido');
        }

        //console.log(status);
        if (status === 401) {
          dispatch(actions.loginFailure());
          history.push('/login');
        }
      }
    }

    getData();
  }, []);

  const handleDeleteAsk = e => {
    e.preventDefault();
    const exclamationIcon = e.currentTarget.nextSibling;
    exclamationIcon.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, idStudent, index) => {
    e.persist();

    try {
      setIsLoading(true);
      await axios.delete(`/students/${idStudent}`);
      const newStudents = [...students];
      newStudents.splice(index, 1);
      setStudents(newStudents);
      setIsLoading(false);

    } catch (err) {
      const status = get(err, 'response.status', 0);
      if(status === 401) {
        toast.warn('Necessário fazer login para completar essa ação.');
        dispatch(actions.loginFailure());
      } else {
        toast.error('Ocorreu um erro ao excluir aluno. Erro: ' + err);
        dispatch(actions.loginFailure());
      }

      setIsLoading(false);
    }
  };

  return (
    <Container>

      <Loading isLoading={isLoading} />
      <h2>Alunos</h2>
      <hr></hr>

        <NewStudent to="/student/">
          <button type="submit">Novo</button>
        </NewStudent>

      <StudentContainer>
        {students.map((student, index) => (
          <div key={String(student.id)}>
            <ProfilePicture>
              {get(student, 'Photos[0].url', false) ? (
                <img src={student.Photos[0].url} alt=""></img>
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            <span>{student.name}</span>
            <span>{student.email}</span>

            <Link to={`/student/${student.id}/edit`}>
              <FaEdit size={18} color='#4fc3f7' />
            </Link>

            <Link onClick={handleDeleteAsk} to={`/student/${student.id}/delete`}>
              <FaWindowClose size={18} color='#ff6e40' />
            </Link>

            <FaExclamationCircle
              size={20} color="#f9c851"
              display="none" cursor="pointer"
              onClick={e => handleDelete(e, student.id, index)}
            />
          </div>
        ))}
      </StudentContainer>
    </Container>
  );
}
