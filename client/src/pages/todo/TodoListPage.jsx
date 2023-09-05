import { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
// import { paramCase } from 'change-case';
// @mui
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Card,
  Table,
  Button,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer,
} from "@mui/material";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// components
import Iconify from "../../components/iconify";
// import Scrollbar from '../../components/scrollbar';
import ConfirmDialog from "../../components/confirm-dialog";
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from "../../components/table";
// sections

import {
  TodoTableToolbar,
  TodoTableRow,
  CreateEditTodoDialog,
} from "../../sections/todo";

import {
  getTodoRequest,
  deleteTodoRequest,
  createTodoRequest,
  completeTodoRequest,
  clearTodoList,
  clearMessage,
  clearError,
} from "../../actions/todo";
// routes
import { PATH_AUTH } from "../../routes/paths";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "index", label: "No.", align: "center" },
  { id: "title", label: "Title", align: "center" },
  { id: "description", label: "Description", align: "center" },
  { id: "isComplete", label: "Status", align: "center" },
  { id: "action", label: "Action", align: "center" },
];

// ----------------------------------------------------------------------

function TodoListPage({
  Todo: { todoList, message, error },
  Auth: { isAuthenticated },
  getTodo,
  completeTodo,
  deleteTodo,
  clrTodoList,
  createTodo,
  clrMessage,
  clrError,
}) {
  const [tableData, setTableData] = useState([]);

  const msgToast = (msg) =>
    toast.success(msg, { autoClose: 5000, onClose: () => clrMessage() });

  const errToast = (err) =>
    toast.error(err, { autoClose: 5000, onClose: () => clrError() });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PATH_AUTH.login, { replace: true });
    }

    if (todoList == null) {
      getTodo();
    } else {
      setTableData(todoList);
    }

    // eslint-disable-next-line
  }, [isAuthenticated, todoList]);

  useEffect(() => {
    if (message) {
      msgToast(message);
    }
    if (error) {
      errToast(error);
    }

    // eslint-disable-next-line
  }, [message, error]);

  useEffect(
    () => () => clrTodoList(),
    // eslint-disable-next-line
    []
  );

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,

    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    setPage,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState(false);

  const [activeOpenConfirm, setActiveOpenConfirm] = useState(false);
  const [filterName, setFilterName] = useState("");

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const dataInPage = dataFiltered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== "";

  const isNotFound = !dataFiltered.length && !!filterName;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleResetFilter = () => {
    setFilterName("");
  };

  const handleDeleteRows = (selectedRows) => {
    deleteTodo(selectedRows);
    setSelected([]);

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === dataFiltered.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage =
          Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };
  const handleCompletedRows = (selectedRows) => {
    completeTodo(selectedRows);
    setSelected([]);
  };

  const handleActiveOpenConfirm = () => {
    setActiveOpenConfirm(true);
  };

  const handleActiveCloseConfirm = () => {
    setActiveOpenConfirm(false);
  };

  return (
    <>
      <Helmet>
        <title> Todo: List</title>
      </Helmet>

      <ToastContainer />
      <Container maxWidth="lg">
        <Box sx={{ mb: 1 }}>
          <Stack direction="row-reverse" alignItems="center">
            <Box sx={{ flexShrink: 0 }}>
              <CreateEditTodoDialog handleSubmited={createTodo} />
            </Box>
          </Stack>
        </Box>

        <Card>
          <TodoTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            onFilterName={handleFilterName}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row._id)
                )
              }
              action={
                <>
                  <Tooltip title="Complete">
                    <IconButton
                      color="primary"
                      onClick={handleActiveOpenConfirm}
                    >
                      <Iconify icon="teenyicons:tick-circle-outline" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" sx={{ mr: 1 }}>
                    <IconButton color="error" onClick={handleOpenConfirm}>
                      <Iconify icon="ic:outline-delete" />
                    </IconButton>
                  </Tooltip>
                </>
              }
            />

            <Table size={dense ? "small" : "medium"} sx={{ minWidth: 300 }}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={tableData.length}
                onSort={onSort}
                numSelected={selected.length}
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    tableData.map((row) => row._id)
                  )
                }
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TodoTableRow
                      key={row._id}
                      rowIndex={index + 1}
                      row={row}
                      selected={selected.includes(row._id)}
                      onSelectRow={() => onSelectRow(row._id)}
                    />
                  ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                />

                <TableNoData isNotFound={isNotFound} />
              </TableBody>
            </Table>
            {/* </Scrollbar> */}
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPageOptions={[25, 50, 100]}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Banned"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong>{" "}
            Task?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
      <ConfirmDialog
        open={activeOpenConfirm}
        onClose={handleActiveCloseConfirm}
        title="Complete"
        content={
          <>
            Are you sure want to Complete these{" "}
            <strong> {selected.length} </strong> task?
          </>
        }
        action={
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleCompletedRows(selected);
              handleActiveCloseConfirm();
            }}
          >
            Completed
          </Button>
        }
      />
    </>
  );
}

TodoListPage.propTypes = {
  Todo: PropTypes.object.isRequired,
  Auth: PropTypes.object.isRequired,
  getTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  clrTodoList: PropTypes.func.isRequired,
  createTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
  clrMessage: PropTypes.func,
  clrError: PropTypes.func,
};

const mapStateToProps = (state) => ({
  Todo: state.Todo,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  getTodo: getTodoRequest,
  deleteTodo: deleteTodoRequest,
  completeTodo: completeTodoRequest,
  clrTodoList: clearTodoList,
  createTodo: createTodoRequest,
  clrMessage: clearMessage,
  clrError: clearError,
})(TodoListPage);
// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterName }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);
  if (filterName) {
    inputData = inputData.filter(
      (data) =>
        data.title.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
