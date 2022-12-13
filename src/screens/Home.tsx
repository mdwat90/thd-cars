import React from 'react';
import { useQuery } from 'react-query';
import { Link } from "react-router-dom";
import { Car, CarData } from '../types';


export const Home = () => {
    const { isLoading, error, data } = useQuery<CarData>('/cars');

    if (isLoading) return <div>Loading...</div>
  
    if (error) return <div>An error has occurred...</div>

    return (
      <div>
        <h1>All Car Data</h1>
        <div>{data && Object.values(data).map((car: Car) => 
          <div key={car.id}>
            <Link to={`car-info/${car.id}`}>{car.make} {car.model}</Link>
          </div>
        )}
        </div>
      </div>
    )
  }