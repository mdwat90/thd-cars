import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
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
        <Link to={`/`}> <ArrowBackIcon/> Home</Link>
        <h1>Car Info</h1>
      </div>
    )
  }