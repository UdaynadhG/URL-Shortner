import express from 'express'
import urlRoute from './routes/urlRoute.js';
import userRoute from './routes/userRoute.js'
import cookieParser from 'cookie-parser';
import { urlRedirect } from './controllers/urlController.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api', urlRoute);
app.use('/auth', userRoute);
app.get('/decode/:id', urlRedirect);
app.get('/get', (req, res) => {
    res.json({ message: "OK" });
});
app.use((err, req, res, next) => {
  console.log("err object in express error handle: ", err);
  res.status(res.statusCode === 200 ? 500 : res.statusCode).send({ message: err.message });
});
export default app;
