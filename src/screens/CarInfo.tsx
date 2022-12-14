import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Typography} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Car } from '../types';
import { CarInfoWrapper, FlexRow, CarInfoTitle, StyledInfo, StyledPaper } from '../components/styled';
import { capitalizeString } from '../helpers';

export const CarInfo = () => {
    let { carId } = useParams();
    const { isLoading, error, data } = useQuery<Car>(`/cars/${carId}`);

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
        <CarInfoWrapper>
          <Link to={`/`}>
            <FlexRow  alignItems='center'>
              <ArrowBackIcon fontSize='small'/> <Typography variant='subtitle1'>Back</Typography>
            </FlexRow>
          </Link>
          <CarInfoWrapper>
            <StyledPaper>
              <CarInfoTitle>
                {data && <Typography variant='h4'>{data.make} {data.model}</Typography>}
              </CarInfoTitle> 
              <FlexRow justifyContent='flex-start'>
                {data && Object.entries(data).map(([key, value]) => {
                  if(key !== 'date' && key !== 'id') {
                    return (
                      <StyledInfo key={value} justifyContent='flex-start'>
                        <Typography variant='subtitle1' sx={{fontWeight: 'bold'}}>{capitalizeString(key)}: {typeof value === 'string' ? capitalizeString(value): value}</Typography>
                      </StyledInfo>
                    )
                  }
              })}
              </FlexRow>
            </StyledPaper>
          </CarInfoWrapper>
        </CarInfoWrapper>
      </FlexRow>
    )
  }