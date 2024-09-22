import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { Router, Request, Response } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

        //const express = require('express');
        //const router = express.Router();

// TODO: Define route to serve index.html
// router.get('/', (_req: Request, res: Response) => {
//     res.sendFile(path.join(__dirname, '../public/index.html'));
//   });
router.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

// TODO: Define route to serve weather.html
// router.get('/weather', (_req: Request, res: Response) => {
//     res.sendFile(path.join(__dirname, '../public/weather.html'));
//   });
// router.get('/weather.html', (_req: Request, res: Response) => {
//     res.sendFile(path.join(__dirname, '../public/weather.html'));
//   });


  
// router get('/api/weather/history', async (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, '../searchHistory.json'));

  // route = __dirname + '/weather.html';

// const routeWeatherHTML = path.join(__dirname, 'weather.html');
// const route = path.join(__dirname, 'public/weather.html');
//         // OR
// route = __dirname + '/weather.html';
// route = path.join(__dirname, __filename, 'weather.html');
// route = path.join(__dirname, __filename, '../public/weather.html');
// route = path.join(__dirname, 'public/weather.html');


// router.get('/', (_req, res) => {
//     router.get('/index.html', (req: Request, res: Response) =>
//     res.sendFile(path.join(__dirname, '../public/index.html'));
//   });
//     // OR
// app.get('/', (req, res) => {
// app.get('/index.html', (_req: Request, res: Response) => {
//     res.sendFile(path.join(__dirname, '../public/index.html'));
//   });


export default router;
