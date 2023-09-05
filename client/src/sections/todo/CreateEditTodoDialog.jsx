import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as Yup from "yup";
import { useEffect, useMemo, useState } from "react";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import {
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Box,
} from "@mui/material";
import FormProvider, {
  RHFTextField,
  RHFCheckbox,
} from "../../components/hook-form";
import Iconify from "../../components/iconify";
// ----------------------------------------------------------------------

function CreateEditTodoDialog({
  Todo: { message },
  isEdit = false,
  currentTodo,
  handleSubmited,
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const NewTodoSchema = Yup.object().shape({
    title: Yup.string().min(3).max(50).required("Title is required"),
    description: Yup.string().required("Description is required"),
    isComplete: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentTodo?.title || "",
      description: currentTodo?.description || "",
      isComplete: currentTodo?.isComplete || false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentTodo]
  );

  const methods = useForm({
    resolver: yupResolver(NewTodoSchema),
    defaultValues,
  });
  const { reset, handleSubmit } = methods;

  useEffect(() => {
    if (isEdit && currentTodo) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentTodo]);

  useEffect(() => {
    if (message) {
      handleClose();
    }

    // eslint-disable-next-line
  }, [message]);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const todoData = {
        title: data.title ? data.title : null,
        description: data.description ? data.description : null,
        isComplete: data.isComplete ? data.isComplete : false,
      };

      if (!isEdit) {
        handleSubmited(todoData);
        reset();
      } else {
        handleSubmited({ todoData, _id: currentTodo._id });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {(isEdit && (
        <IconButton sx={{ color: "primary.main" }} onClick={handleClickOpen}>
          <Iconify icon="material-symbols:edit-square-outline" />
        </IconButton>
      )) || (
        <Button
          sx={{ marginTop: 3, marginRight: 3 }}
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          Add Todo
        </Button>
      )}
      <Dialog fullWidth open={open} onClose={handleClose}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Add Todo</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <Grid container rowSpacing={2} columnSpacing={1}>
                <Grid item xs={12} sm={12}>
                  <RHFTextField name="title" label="Title *" />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <RHFTextField
                    name="description"
                    label="Description *"
                    multiline
                    rows={4}
                  />
                </Grid>
                {isEdit && (
                  <Grid item xs={12} sm={12}>
                    <RHFCheckbox name="isComplete" label="Task Completed" />
                  </Grid>
                )}
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="inherit">
              Cancel
            </Button>

            <Button type="submit" variant="contained">
              {!isEdit ? "Submit" : "Update"}
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}

CreateEditTodoDialog.propTypes = {
  Todo: PropTypes.object.isRequired,
  isEdit: PropTypes.bool,
  currentTodo: PropTypes.object,
  handleSubmited: PropTypes.func,
};

const mapStateToProps = (state) => ({
  Todo: state.Todo,
});

export default connect(mapStateToProps, {})(CreateEditTodoDialog);
