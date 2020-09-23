import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container } from './styles';
import api from '~/services/api';
import { updateProfileRequest } from '~/store/modules/user/actions';
import { localizationTable } from '~/utils/localizationTable';

export default function Users() {
  const columns = [
    { title: 'Nome', field: 'name' },
    { title: 'E-mail', field: 'email' },
  ];

  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  async function getUsers() {
    const { data, status } = await api.get('users');

    if (status === 200) {
      setUsers(data.filter(user => !user.administrator));
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function updateUser({ id, name, email }) {
    if (!id) {
      toast.error(
        'Ocorreu um erro inesperado. Recarregue a página e tente novamente!'
      );
      return;
    }

    dispatch(updateProfileRequest({ userId: id, name, email }));

    getUsers();
  }

  async function disableUser({ id, status }) {
    const user = await api.put('users-status', { userId: id, status: !status });

    if (!user) {
      toast.error(
        'Ocorreu um erro inesperado. Recarregue a página e tente novamente!'
      );
      return;
    }

    toast.success(`Usuário ${status ? 'desativado' : 'ativado'} com sucesso!`);

    getUsers();
  }

  function addUser() {
    history.push('/add-user');
  }

  function rowStyle(rowData) {
    return {
      backgroundColor: rowData.status ? '#fff' : '#fccfd9',
    };
  }

  return (
    <Container>
      <MaterialTable
        title="Usuários"
        columns={columns}
        data={users}
        localization={localizationTable}
        options={{
          rowStyle,
        }}
        actions={[
          {
            icon: 'add_box',
            tooltip: 'Adicionar Usuário',
            isFreeAction: true,
            onClick: addUser,
          },
        ]}
        editable={{
          onRowUpdate: updateUser,
          onRowDelete: disableUser,
        }}
      />
    </Container>
  );
}
