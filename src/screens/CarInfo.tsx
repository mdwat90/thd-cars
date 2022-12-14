import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import {Box, Typography} from '@mui/material';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Car } from '../types';
import { CarInfoWrapper, FlexRow, CarInfoTitle, StyledInfo } from '../components/styled';

const StyledPaper = styled(Paper)`
  max-width: 90vw;
  overflow: hidden;
  padding: 2rem;

  &&.MuiPaper-root {
    background-color: #5b5f66;
    color: white;
  }
`

export const CarInfo = () => {
    let { carId } = useParams();
    const { isLoading, error, data } = useQuery<Car>(`/cars/${carId}`);

    if (isLoading) return <div>Loading...</div>
  
    if (error) return <div>An error has occurred...</div>

    return (
      <FlexRow justifyContent='center'>
        <CarInfoWrapper>
          <Link to={`/`}>
            <FlexRow  alignItems='center'>
              <ArrowBackIcon fontSize='small'/> <Typography variant='subtitle1'>Back</Typography>
            </FlexRow>
          </Link>
          <CarInfoTitle>
            {data && <Typography variant='h4'>{data.make} {data.model}</Typography>}
          </CarInfoTitle>
            <StyledPaper>
              <FlexRow justifyContent='flex-start'>
                {data && Object.entries(data).map(([key, value]) => {
                  const strArr = key.split('');
                  const firstLetter = strArr[0].toLocaleUpperCase();
                  strArr.splice(0, 1, firstLetter);
                  const capitalized = strArr.join('');
                  if(key !== 'date' && key !== 'id') {
                    return (
                      <StyledInfo key={value}>
                        <Typography variant='body1'>{capitalized}: {value}</Typography>
                      </StyledInfo>
                    )
                  }
              })}
              </FlexRow>
            </StyledPaper>
        </CarInfoWrapper>
      </FlexRow>
    )
  }