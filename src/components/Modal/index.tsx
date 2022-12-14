import * as React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm, Controller, FieldValues } from "react-hook-form";
import { useMutation } from 'react-query';
import { Car } from '../../types';
import { mode, url } from '../../App';
import { FlexRow, StyledBox, StyledButton, StyledTextField } from '../styled.js';

interface BasicModalProps {
  open: boolean,
  setOpen: (val: boolean) => void,
  setOpenSb: (val: boolean) => void,
  setSbMessage: (val: string) => void,
  setSeverity: (val: "error" | "warning" | "info" | "success") => void,
  refetchData: () => void
}

export default function BasicModal({open, setOpen, setOpenSb, setSeverity, setSbMessage, refetchData}: BasicModalProps) {
  const { handleSubmit, control, reset, formState: { errors } } = useForm();
  const handleClose = () => {
    reset();
    setOpen(false);
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
    onSuccess: async (data) => {
      const { message } =  await data.json();
      refetchData();
      setSbMessage(message);
      setSeverity('success');
      setOpenSb(true);
    },
    onError: (err) =>  {
      setSbMessage(err as string);
      setSeverity('error');
      setOpenSb(true);
    },
  })

  const onSubmit = (data?: FieldValues, e?:  React.BaseSyntheticEvent ) => {
    if (e) e.preventDefault();
    mutation.mutate(data as Car);
    handleClose();
  }

  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledBox>
          <Typography  id="modal-modal-title" variant="h6" component="h2">Car Information</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
              <FlexRow margin='2rem' justifyContent='space-evenly'>
                <Controller
                    name="make"
                    control={control}
                    rules={{ required: {value: true , message: "Make is required"} }}
                    render={({ field: { onChange } }) => (
                      <StyledTextField
                        id="outlined-basic"
                        label="Make"
                        variant="outlined"
                        size='small'
                        onChange={onChange}
                        error={!!errors.make}
                        helperText={errors?.make?.message ? `${errors?.make?.message}` : ''}
                      />
                    )}
                  />
                <Controller
                    name="model"
                    control={control}
                    rules={{ required: {value: true , message: "Model is required"} }}
                    render={({ field: { onChange } }) => (
                      <StyledTextField
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
                      <StyledTextField
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
                   <Controller
                    name="price"
                    control={control}
                    rules={{ required: {value: true , message: "Price is required"} }}
                    render={({ field: { onChange } }) => (
                      <StyledTextField
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
                      <StyledTextField
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
                      <StyledTextField
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

                <Controller
                    name="package"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <StyledTextField
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
                      <StyledTextField
                        label="Color"
                        variant="outlined"
                        size='small'
                        onChange={onChange}
                        id="outlined-basic"
                        helperText={'(Optional)'}
                      />
                    )}
                  />              
              </FlexRow>
            
            <FlexRow justifyContent={'flex-end'}>
              <StyledButton variant="text" onClick={handleClose}>Cancel</StyledButton>
              <StyledButton  variant="contained" type='submit'>Submit</StyledButton>
            </FlexRow>
          </form>
        </StyledBox>
      </Modal>
  );
}