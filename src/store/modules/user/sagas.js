import { takeLatest, call, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.userId ? rest : {}),
      ...(rest.oldPassword ? rest : {}),
    };

    yield call(api.put, 'users', profile);

    toast.success('Perfil atualizado com sucesso!');
  } catch (error) {
    toast.error('Erro ao atualizar Perfil');
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
