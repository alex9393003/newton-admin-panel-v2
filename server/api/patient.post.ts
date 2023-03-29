// import { Patient } from "~~/typeorm/entity/Patient";
// // import { saveNewPatient } from "~~/typeorm/repositories/PatientRepository";
import { PatientRepository } from "~~/typeorm/repositories/PatientRepository";

// export default defineEventHandler(async event => {
//     console.log(event);
//     const body = await readBody(event)
//     const response = await PatientRepository.saveNewPatient(body, event.res);
//     return response;
// })


// import { Request, Response } from 'express';
// import { PatientRepository } from "~~/typeorm/repositories/PatientRepository";

// // Define the event handler for the API route
// export default defineEventHandler({
//   async onRequest(req: Request, res: Response) {
//     // Handle POST requests
//     if (req.method === 'POST') {
//       // Call the saveNewPatient function from the PatientRepository
//       await PatientRepository.saveNewPatient(req, res);
//     } else {
//       // Return a 405 Method Not Allowed status for unsupported request methods
//       res.status(405).json({ message: 'Method Not Allowed' });
//     }
//   },
// });

import { defineNuxtServerMiddleware } from 'nuxt3';
import { IncomingMessage, ServerResponse } from 'http';
// import { PatientRepository } from '../repositories/PatientRepository';

export default defineNuxtServerMiddleware(async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'POST') {
    // Read the request body
    const rawData = await new Promise<string>((resolve) => {
      let data = '';
      req.on('data', (chunk) => (data += chunk));
      req.on('end', () => resolve(data));
    });

    // Parse the request body as JSON
    const body = JSON.parse(rawData);

    // Call the saveNewPatient function from the PatientRepository
    const response = await PatientRepository.saveNewPatient({ body }, res);

    // Send the response
    res.writeHead(response.statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response.locals));
  } else {
    // Return a 405 Method Not Allowed status for unsupported request methods
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Method Not Allowed' }));
  }
});
