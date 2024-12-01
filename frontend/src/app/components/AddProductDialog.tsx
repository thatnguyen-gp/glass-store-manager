import React, { ChangeEvent, useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TransitionProps } from '@mui/material/transitions';
import { Slide } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import { FormControl } from '@mui/base';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide
    direction="up"
    ref={ref} {...props} />;
});

export const AddProductDialogComponent: React.FC<{
  open: boolean;
  handleClose: () => void;
  onAddProduct: () => void;
}> = ({ open, handleClose, onAddProduct }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const ADD_PRODUCTS = gql`
    mutation ($name: String!, $description: String) {
      addProduct(name: $name, description: $description) {
        id
        name
        description
      }
    }
  `;

  const [addProduct] = useMutation(ADD_PRODUCTS);

  const handleNameChange = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setName(event.currentTarget.value);
  }, [setName]);

  const handleDescriptionChange = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setDescription(event.currentTarget.value);
  }, [setDescription]);
  const handleSubmit = useCallback(async () => {
    try {
      await addProduct({ variables: { name, description } });
      setName('');
      setDescription('');
      onAddProduct();
    } catch (err) {
      console.error(err);
    }
  }, [addProduct, name, description]);

  const handleOnClose = useCallback(async () => {
    handleClose();
    setName('');
    setDescription('');
  }, [handleClose, setName, setDescription]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleOnClose}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add new product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Put product name and description.
          </DialogContentText>
          <FormControl>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              onChange={handleNameChange}
            />
          </FormControl>
          <FormControl>
            <TextField
              autoFocus
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={description}
              onChange={handleDescriptionChange}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            color={'secondary'}
            onClick={handleClose}
          >Cancel</Button>
          <Button
            color={'primary'}
            onClick={handleSubmit}
            type="submit"
          >Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};