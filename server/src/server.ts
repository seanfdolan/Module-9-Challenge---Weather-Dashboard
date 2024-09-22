import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import path from 'path';
dotenv.config();
// import allroutes from './middleware/middleware.ts';

// Import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('client/dist'));
app.use

// TODO: Implement middleware for parsing JSON and urlencoded form data
const parsingResult = (req: any, res: any, next: any) => {
    if (req.is('application/json')) {
        try {
            req.body = JSON.parse(req.body);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return res.status(400).send('Invalid JSON format');
        }
    } else if (req.is('application/x-www-form-urlencoded')) {
        try {
            req.body = new URLSearchParams(req.body);
        } catch (error) {
            console.error('Error parsing URL-encoded form:', error);
            return res.status(400).send('Invalid URL-encoded form format');
        }
    }
    next();
};

// TODO: Implement middleware to connect the routes
const allRoutes = (req: Request, res: Response, next: any) => {
    console.log(`${req.method} ${req.path}`);
    next();
};
app.use(allRoutes);


// app.use(routes);
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // routes.connect();

app.use(express.static('client/dist'));
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.get('/index.html', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
