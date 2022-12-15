import { rest } from 'msw';
import { allCarData } from './mockData';


export const handlers = [
    // Handles a GET /cars request
    rest.get('http://localhost:3000/api/v1/cars', (req, res, ctx) => {
        return res(
         // Respond with a 200 status code
         ctx.status(200),
        //  ctx.json(allCarData),
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