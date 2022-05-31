import express from 'express'; 
import config from 'config';
import connect from './utils/connect';
import log from "./utils/logger";
import cors from 'cors';
import routes from "./routes/routes";
import deserializeUser from './middleware/deserializeUser';


const port = config.get<number>('port');


const app = express();


const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));
app.use(express.json());
app.use(deserializeUser);




app.listen(port, async () => {
    log.info(`Sadat's app is running at http://localhost:${port}`);
    await connect();

    routes(app);
});