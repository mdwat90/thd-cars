import { rest } from 'msw';
import { allCarData, tacoma } from './mockData';


export const handlers = [
    // Handles a GET /cars request
    rest.get('http://localhost:3000/api/v1/cars', (req, res, ctx) => {
        return res(
         // Respond with a 200 status code
         ctx.status(200),
         ctx.json(allCarData),
        )
    }),
    
    // Handles a GET /cars/:id request
    rest.get('http://localhost:3000/api/v1/cars/1', (req, res, ctx) => {
        return res(
         // Respond with a 200 status code
         ctx.status(200),
         ctx.json(tacoma),
        )
    }),
    
    // Handles a POST /cars/post request
    rest.post('http://localhost:3000/api/v1/cars/post', (req, res, ctx) => {
        return res(
         // Respond with a 200 status code
         ctx.status(200),
        )
    }),
  ]