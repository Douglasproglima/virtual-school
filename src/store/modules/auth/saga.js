import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import * as actions from './actions';
import * as types from '../types';

import axios from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({ payload }) {
  try {
    //const { email, password} = payload;
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.LoginSuccess({ ...response.data }));

    toast.success('Login realizado com sucesso.');

    //headr com o Beader Token
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    //payload.prevPath: Vem do pages/Login no dispatch(actions.loginRequest({...})) ->
    history.push(payload.prevPath);
  } catch (error) {
    toast.error('Usuário ou senha inválidos.');
    yield put(actions.loginFailure());
  }
}

function persistRehydrate(payload) {
  try {
    const token = get(payload, 'auth.token', ''); //persistRehydrate
    if(!token) return;
      axios.defaults.headers.Authorization = `Bearer ${ token }`;
  } catch (error) {
    toast.error('Erro ao recuperar token');
  }
}

// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const { id, name, email, password } = payload;

  try {
    //CREATE/UPDATE USERS
    if(id) {
      yield call(axios.put, '/users', {
        email,
        name,
        password: password || undefined,
      });
      toast.success('Conta alterada com sucesso.');
      yield put(actions.registerUpdatedSuccess({ name, email, password }));
    } else {
      yield call(axios.post, '/users', {
        name,
        email,
        password,
      });
      toast.success('Conta criada com sucesso!');
      yield put(actions.registerCreatedSuccess({ name, email, password }));
      history.push('/login');
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      toast.error('Você precisa fazer login novamente.');
      yield put(actions.loginFailure());
      return history.push('/login');
    }

    if (errors.length > 0) {
      errors.map(error => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }

    return yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
