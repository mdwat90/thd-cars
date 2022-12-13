import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import {Box, Typography} from '@mui/material';
import Paper from '@mui/material/Paper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Car } from '../types';


export const CarInfo = () => {
    let { carId } = useParams();
    const { isLoading, error, data } = useQuery<Car>(`/cars/${carId}`);

    if (isLoading) return <div>Loading...</div>
  
    if (error) return <div>An error has occurred...</div>

    if (data) console.log('car data:', data);

    return (
      <div>
        <Link to={`/`}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <ArrowBackIcon fontSize='small'/> <Typography variant='subtitle1'>Home</Typography>
          </div>
        </Link>
        <div style={{textAlign: 'left'}}>
          <Typography variant='h2'>Car Info</Typography>
        </div>
      <Paper sx={{ width: '100%', overflow: 'hidden'}}>
        <Typography variant='h6'>Make</Typography>
      </Paper>
      </div>
    )
  }