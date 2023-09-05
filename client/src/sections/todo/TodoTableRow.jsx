import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// @mui
import { Button, Checkbox, TableRow, TableCell, IconButton, Typography } from '@mui/material';
// components
import Iconify from '../../components/iconify';
import ConfirmDialog from '../../components/confirm-dialog';
import CreateEditTodoDialog from './CreateEditTodoDialog';
import { updateTodoRequest, deleteTodoRequest } from '../../actions/todo';
// ----------------------------------------------------------------------

function TodoTableRow({
  Todo: { message },
  rowIndex,
  row,
  selected,
  onSelectRow,
  updateTodo,
  deleteTodo,
}) {
  useEffect(() => {
    if (message) {
      handleCloseConfirm();
    }
    // eslint-disable-next-line
  }, [message]);

  const { _id, title, description, isComplete } = row || {};

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell align="center">{rowIndex}</TableCell>

        <TableCell align="center">
          <Typography variant="subtitle2" noWrap sx={{ textTransform: 'capitalize' }}>
            {title}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="subtitle2" noWrap sx={{ textTransform: 'capitalize' }}>
            {description}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Iconify
            color={isComplete ? 'secondary.main' : 'warning.main'}
            icon={isComplete ? 'teenyicons:tick-circle-outline' : 'system-uicons:cross-circle'}
          />
        </TableCell>
        <TableCell align="center">
          <CreateEditTodoDialog isEdit currentTodo={row} handleSubmited={updateTodo} />
          <IconButton
            sx={{ ml: 1, color: 'error.main' }}
            onClick={() => {
              handleOpenConfirm();
            }}
          >
            <Iconify color="error" icon="majesticons:delete-bin-line" />
          </IconButton>
        </TableCell>
      </TableRow>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete this car?"
        action={
          <Button variant="contained" color="error" onClick={() => deleteTodo([_id])}>
            Delete
          </Button>
        }
      />
    </>
  );
}

TodoTableRow.propTypes = {
  Todo: PropTypes.object.isRequired,
  rowIndex: PropTypes.number,
  row: PropTypes.object,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
};

const mapStateToProps = (state) => ({
  Todo: state.Todo,
});

export default connect(mapStateToProps, {
  updateTodo: updateTodoRequest,
  deleteTodo: deleteTodoRequest,
})(TodoTableRow);
