import express from 'express';
import { userRoutes } from './route/userRouter';
import { categoriaRoutes } from './route/categoriaRouter';

const app = express();

app.set('view engine', 'ejs');

app.set('views', './src/views');

app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.render('login', { message: 'Hello' });
});

app.use(userRoutes);

app.use(categoriaRoutes);

app.listen(3333, () => {
    console.log('Servidor rodando no endereço http://localhost:3333');
});