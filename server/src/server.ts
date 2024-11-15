import express, { Request, Response } from 'express';
// import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

// Import the routes
import routes from './routes/index.js';
import path from 'path';
// import allRoutes from './middleware/middleware';

const app = express();
const PORT = process.env.PORT || 3001;

// Ensure allRoutes is a valid middleware function or an array of middleware functions
// app.use((req: Request, res: Response, next: NextFunction) => {
//     return allRoutes(req, res, next);
// });

// TODO: Serve static files of entire client dist folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../client/dist'));

app.use(routes);

app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
// TODO: Implement middleware for parsing JSON and urlencoded form data


// TODO: Implement middleware to connect the routes
app.post('/data', (req, res) => {
    console.log('JSON data:', req.body);
    res.json(req.body);
});

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
