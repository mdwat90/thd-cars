import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Typography } from '@mui/material';
import CustomTable from '../components/Table';
import { CarData } from '../types';
import BasicModal from '../components/Modal';
import { FlexRow, HomeWrapper, StyledButton } from '../components/styled';
import CustomSnackbar from '../components/CustomSnackbar';


export const Home = () => {
    const { isLoading, error, data, refetch } = useQuery<CarData>('/cars');
    const [ openSb, setOpenSb ] = useState<boolean>(false);
    const [ open, setOpen ] = useState<boolean>(false);
    const [sbMessage, setSbMessage] = useState<string | null>(null);
    const [severity, setSeverity] = useState<"error" | "warning" | "info" | "success">('success');

    const handleModal = () => {
      setOpen(!open)
    }

    if (isLoading) return <Typography variant='h6'>Loading...</Typography>
  
    if (error) {
      return (
        <div>
          <Typography variant='h6'>Oops! An error has occurred...</Typography>
          <Typography variant='subtitle1'><>Error message: {error}</></Typography>
        </div>
      )
    } 


    return (
      <FlexRow justifyContent='center'>
        <CustomSnackbar open={openSb} vertical='top' horizontal='center' message={sbMessage} severity={severity} setOpen={setOpenSb} />
        <HomeWrapper>
          <FlexRow justifyContent='space-between' alignItems='center'>
            <Typography data-testid='heading' variant='h4'>All Car Data</Typography>
            <StyledButton data-testid='add-car-btn' variant="contained" onClick={handleModal}>ADD CAR</StyledButton>
          </FlexRow>
          <CustomTable data={data ? Object.values(data) : null}/>
          <BasicModal open={open} setOpen={setOpen} setOpenSb={setOpenSb} setSeverity={setSeverity} setSbMessage={setSbMessage} refetchData={refetch} />
        </HomeWrapper>
      </FlexRow>
    )
  }