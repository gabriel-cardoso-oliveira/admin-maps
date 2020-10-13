import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Slide from '@material-ui/core/Slide';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container } from './styles';
import api from '~/services/api';
import { updateProfileRequest } from '~/store/modules/user/actions';
import { localizationTable } from '~/utils/localizationTable';

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

export default function Users() {
  // const [openDialog, setOpenDialog] = React.useState(false);

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

  // async function handleClickOpen(event, rowData) {
  //   console.tron.log('EVENT', event);
  //   console.tron.log('ROWDATA', rowData);
  //   setOpenDialog(true);
  // }

  // function handleClose() {
  //   setOpenDialog(false);
  // }

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
          // {
          //   icon: 'add_box',
          //   tooltip: 'Adicionar Usuário',
          //   onClick: handleClickOpen,
          // },
        ]}
        editable={{
          onRowUpdate: updateUser,
          onRowDelete: disableUser,
        }}
      />

      {/* <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Atenção</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Realmente deseja desativar este usuário?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="#008c3b">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="#ff0000">
            Desativar
          </Button>
        </DialogActions>
      </Dialog> */}
    </Container>
  );
}
