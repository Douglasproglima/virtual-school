import React from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import { Form } from './styled';

import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Photos({ match }) {
  const id = get(match, 'params.id', '');
  const [isLoading, setIsLoading] = React.useState(false);
  const [photo, setPhoto] = React.useState('');
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/students/${id}`);
        setPhoto(get(data, 'Photos[0].url', ''));
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const { status } = get(err, 'response', '');
        toast.error('Erro ao obter foto. Necessário fazer login novamente. ' + err);

        if(status === 401) {
          dispatch(actions.loginFailure());
          history.push(`/login`);
        }
      }
    }

    getData();
  }, []);

  const handleChange = async e => {
    const photoFile = e.target.files[0];
    const photoURL = URL.createObjectURL(photoFile);

    setPhoto(photoURL);

    //JSON não envia Formulários, o código simula um formulário e
    //envia ele para o server, atrelando o arquivo ao formulário
    const formData = new FormData();
    formData.append('student_id', id);
    formData.append('photo', photoFile);

    try {
      setIsLoading(true);
      const header = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      await axios.post('/photos/', formData, header);
      toast.success('Foto enviada com sucesso!');
      setIsLoading(false);
      history.push(`/student/${id}/edit`);
    } catch (err) {
      setIsLoading(false);
      const { status } = get(err, 'response', '');
      toast.error('Erro ao enviar foto. ' + err);

      if(status === 401) {
        dispatch(actions.loginFailure());
        history.push(`/login`);
      }
    }

  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h2>Foto</h2>
      <hr></hr>

      <Form>
        <label htmlFor="photo">
          { photo ?<img src={photo} alt="Photo" /> : 'Selecionar' }
          <input type="file" id="photo" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Photos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};