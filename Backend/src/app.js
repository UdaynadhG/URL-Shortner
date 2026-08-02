import express from 'express'
import urlRoute from './routes/urlRoute.js';
import { urlRedirect } from './controllers/urlController.js';

const app = express();

app.use(express.json());
app.use('/api', urlRoute);
app.get('/decode/:id', urlRedirect);
app.get('/get', (req, res) => {
    res.json({ message: "OK" });
});

export default app;
