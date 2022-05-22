import express from 'express';
import { efetuarPostagem} from './routes/posts.route';

const port = (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? 3047 : 3048);

const app = express();

app.use(express.json());

app.use( "/gerarPostInstragram", efetuarPostagem);

app.get('/', (require, response) => {
    return response.json({status: "OK"});
})

app.listen(port);