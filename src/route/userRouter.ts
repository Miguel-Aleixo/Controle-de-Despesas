import { Router } from "express";
import { buscarUsuarios, criarUsuario, deletarUsuario, editarUsuario, mostrarCadastro, mostrarLogin } from "../controller/userController";

const userRoutes = Router();

//CARREGAR PAGINAS
userRoutes.get('/usuario/login', mostrarLogin);
userRoutes.get('/usuario/cadastro', mostrarCadastro);

// GET
userRoutes.get('/usuario/buscar', buscarUsuarios);

// POST
userRoutes.post('/usuario/registrar', criarUsuario);

// PUT
userRoutes.put('/usuario/editar', editarUsuario);

// DELETE
userRoutes.delete('/usuario/deletar', deletarUsuario);

export {
    userRoutes
}

