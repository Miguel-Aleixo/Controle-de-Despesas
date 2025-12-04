import express, { Request, Response, NextFunction } from 'express';
import session from "express-session"; 
import { userRoutes } from './route/userRouter';
import { categoriaRoutes } from './route/categoriaRouter';

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'S3gr3d0_Sup3r_M3ga_L0ng0_9a8sd7f6a8s7df6a8s7df6a8s7d6f8as7df68as7df68ASDFA98SD7F6A98SDF765ASD',
    resave: false, 
    saveUninitialized: false, 
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24, // 24 horas
        secure: process.env.NODE_ENV === 'production' 
    }
}));

function requireAuth(req: Request, res: Response, next: NextFunction) {
    
    if (!req.session.user) {
        return res.redirect('/usuario/login');
    }
    next();
}

// Rotas Publicas
app.get('/', function (req, res) {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    res.render('login', { message: 'Hello' });
});

// Rotas Protegidas
app.get('/dashboard', requireAuth, function (req, res) {
    res.render('dashboard');
});

// Rotas de Usuário e Categoria (Contendo Login/Logout)
app.use(userRoutes);
app.use(categoriaRoutes);

// Início do Servidor
app.listen(3333, () => {
    console.log('Servidor rodando no endereço http://localhost:3333');
});