import { Router } from "express";
import { buscarUsuarios, criarUsuario, deletarUsuario, editarUsuario, fazerLogin, fazerLogout, mostrarCadastro, mostrarLogin } from "../controller/userController";

const userRoutes = Router();

//CARREGAR PAGINAS
userRoutes.get('/login', mostrarLogin);
userRoutes.get('/cadastro', mostrarCadastro);

// GET
userRoutes.get('/buscar', buscarUsuarios);

// LOGIN
userRoutes.post('/login', fazerLogin);

// LOGOUT
userRoutes.get('/logout', fazerLogout);

// POST
userRoutes.post('/registrar', criarUsuario);

// PUT
userRoutes.put('/editar', editarUsuario);

// DELETE
userRoutes.delete('/deletar', deletarUsuario);

export {
    userRoutes
}

