import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {tacoma, hyundai, mazda3} from './mockData.js';
import { useForm, Controller, FieldValues } from "react-hook-form";
import { useMutation } from 'react-query';
import { Car } from '../../types';
import { mode, url } from '../../App';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'white',
  color: 'black',
  border: '1px solid #000',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};


interface BasicModalProps {
  open: boolean,
  setOpen: (val: boolean) => void,
  refetchData: () => void
}

export default function BasicModal({open, setOpen, refetchData}: BasicModalProps) {
  const { handleSubmit, control, reset, formState: { errors } } = useForm();
  const handleClose = () => {
    reset();
    setOpen(false)
  };

  const mutation = useMutation((newCarData: Car) => {
    return fetch(`http://${url[mode]}/api/v1/cars/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCarData)
    })
  },
  {
    onSuccess: () =>
     refetchData()
  })



  const onSubmit = (data?: FieldValues, e?:  React.BaseSyntheticEvent ) => {
    if (e) e.preventDefault();
    mutation.mutate(data as Car);
    setOpen(false);
  }
  

  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography  id="modal-modal-title" variant="h6" component="h2">Car Information</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
              <div style={{display: 'flex', margin: '2rem'}}>
                <Controller
                    name="make"
                    control={control}
                    rules={{ required: {value: true , message: "Make is required"} }}
                    render={({ field: { onChange } }) => (
                      <TextField
                        style={{margin: '0.5rem'}}
                        label="Make"
                        variant="outlined"
                        size='small'
                        onChange={onChange}
                        error={!!errors.make}
                        id="outlined-basic"
                        helperText={errors?.make?.message ? `${errors?.make?.message}` : ''}
                      />
                    )}
                  />
                <Controller
                    name="model"
                    control={control}
                    rules={{ required: {value: true , message: "Model is required"} }}
                    render={({ field: { onChange } }) => (
                      <TextField
                        style={{margin: '0.5rem'}}
                        label="Model"
                        variant="outlined"
                        size='small'
                        onChange={onChange}
                        error={!!errors.make}
                        id="outlined-basic"
                        helperText={errors?.model?.message ? `${errors?.model?.message}` : ''}
                      />
                    )}
                  />
                  <Controller
                    name="mileage"
                    control={control}
                    rules={{ required: {value: true , message: "Mileage is required"} }}
                    render={({ field: { onChange } }) => (
                      <TextField
                      style={{margin: '0.5rem'}}
                        label="Mileage"
                        variant="outlined"
                        size='small'
                        onChange={onChange}
                        error={!!errors.year}
                        id="outlined-basic"
                        helperText={errors?.mileage?.message ? `${errors?.mileage?.message}` : ''}
                      />
                    )}
                  />
               
              </div>
              <div style={{display: 'flex', margin: '2rem'}}>
              <Controller
                    name="price"
                    control={control}
                    rules={{ required: {value: true , message: "Price is required"} }}
                    render={({ field: { onChange } }) => (
                      <TextField
                      style={{margin: '0.5rem'}}
                        label="Price"
                        variant="outlined"
                        size='small'
                        onChange={onChange}
                        error={!!errors.year}
                        id="outlined-basic"
                        helperText={errors?.price?.message ? `${errors?.price?.message}` : ''}
                      />
                    )}
                  />
                
                <Controller
                    name="year"
                    control={control}
                    rules={{ required: {value: true , message: "Year is required"} }}
                    render={({ field: { onChange } }) => (
                      <TextField
                      style={{margin: '0.5rem'}}
                        label="Year"
                        variant="outlined"
                        size='small'
                        onChange={onChange}
                        error={!!errors.year}
                        id="outlined-basic"
                        helperText={errors?.year?.message ? `${errors?.year?.message}` : ''}
                      />
                    )}
                  />
                <Controller
                    name="category"
                    control={control}
                    rules={{ required: {value: true , message: "Category is required"} }}
                    render={({ field: { onChange } }) => (
                      <TextField
                      style={{margin: '0.5rem'}}
                        label="Category"
                        variant="outlined"
                        size='small'
                        onChange={onChange}
                        error={!!errors.year}
                        id="outlined-basic"
                        helperText={errors?.category?.message ? `${errors?.category?.message}` : ''}
                      />
                    )}
                  />
              </div>
              <div style={{display: 'flex', margin: '2rem'}}>
              <Controller
                    name="package"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <TextField
                      style={{margin: '0.5rem'}}
                        label="Package"
                        variant="outlined"
                        size='small'
                        onChange={onChange}
                        id="outlined-basic"
                        helperText={'(Optional)'}
                      />
                    )}
                  />

                  <Controller
                    name="color"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <TextField
                      style={{margin: '0.5rem'}}
                        label="Color"
                        variant="outlined"
                        size='small'
                        onChange={onChange}
                        id="outlined-basic"
                        helperText={'(Optional)'}
                      />
                    )}
                  />
              </div>
          
            
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Button style={{margin: '0.5rem'}} variant="text" onClick={handleClose}>Cancel</Button>
              <Button style={{margin: '0.5rem'}}  variant="contained" type='submit'>Submit</Button>
            </div>
          </form>
        </Box>
      </Modal>
  );
}