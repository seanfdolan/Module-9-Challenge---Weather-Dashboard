import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();
// TODO: Define route to serve index.html
router.get('/index.html', (_req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
// TODO: Define route to serve weather.html
router.get('/weather', (_req, res) => {
    res.sendFile(path.join(__dirname, '../public/weather.html'));
});
export default router;
