import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import CustomTable from '../components/Table';
import { CarData } from '../types';
import BasicModal from '../components/Modal';


export const Home = () => {
    const { isLoading, error, data, refetch } = useQuery<CarData>('/cars');
    const [ open, setOpen ] = useState<boolean>(false);

    const handleModal = () => {
      setOpen(!open)
    }

    if (isLoading) return <div>Loading...</div>
  
    if (error) return <div>An error has occurred...</div>

    return (
      <div>
        <div style={{display: 'flex',  justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant='h2'>All Car Data</Typography>
          <div>
            <Button variant="contained" onClick={handleModal}>ADD CAR</Button>
          </div>
        </div>
        <CustomTable data={data ? Object.values(data) : null}/>
        <BasicModal open={open} setOpen={setOpen} refetchData={refetch} />
      </div>
    )
  }