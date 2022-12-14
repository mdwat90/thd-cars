import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableCell from '@mui/material/TableCell';
import { OverridableComponent } from '@mui/types';


interface FlexRowProps {
    margin?: string;
    alignItems?: string;
    justifyContent?: string;
  }

export const FlexRow = styled.div<FlexRowProps>`
    display: flex;
    margin: ${(p) => p.margin};
    align-items: ${(p) => p.alignItems};
    justify-content: ${(p) => p.justifyContent};
    flex-flow: row wrap;
  `
  
export const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    border: 1px solid #000;
    background-color: #5b5f66;
    border-radius: 5px;
    box-shadow: 24;
    padding: 1.5rem;


    @media (max-width: 1024px) {
        width: 80vw;
    }
  `
  
export const StyledTextField = styled(TextField) `
    &&&.MuiFormControl-root {
        margin: 0.5rem;
        flex-grow: 1;
    }

    label {
      color: white;
    }
    input {
      color: white;
    }
    p {
      color: white;
    }
  `

export const StyledPaperWrapper = styled(Paper) `
    width: 100%;
    overflow: hidden;
    background-color: #5b5f66;
`


export const StyledPaper = styled(Paper)`
  max-width: 90vw;
  overflow: hidden;
  padding: 2rem;

  &&.MuiPaper-root {
    background-color: #5b5f66;
    color: white;
  }
`

export const StyledTableContainer = styled(TableContainer) `
    background-color: #5b5f66;
    max-height: 440px;
`

export const StyledTableCell= styled(TableCell) `
    &&&.MuiTableCell-root {
        background-color: #5b5f66;
        color: white;
    }
`

interface StyledTablePaginationProps extends OverridableComponent<any> {
    component?: string;
}

export const StyledTablePagination = styled(TablePagination)<StyledTablePaginationProps>`
    &&&.MuiTablePagination-root {
        background-color: #5b5f66;
        color: white;
        width: 100%;
    }
`

export const StyledButton = styled(Button)`
    &&&.MuiButtonBase-root {
        margin: 0.5rem;
    }
`

export const CarInfoTitle = styled.div`
    text-align: left;
    margin: 0.5rem;
`

export const CarInfoWrapper = styled.div`
    width: 40vw;
    @media (max-width: 1024px) {
        width: 80vw;
    }
`


export const HomeWrapper = styled.div`
    width: 75vw;

    @media (max-width: 1024px) {
        width: 90vw;
    }
`

interface StyledInfoProps {
    flex?: string;
    justifyContent?: string
}

export const StyledInfo = styled.div<StyledInfoProps>`
    margin: 0.5rem;
    flex: ${p => p.flex};
    justify-content: ${p => p.justifyContent};
`

