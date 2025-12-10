import { Router } from "express";
import { buscarCategorias, criarCategoria, deletarCategoria, editarCategoria, mostrarCadastroCategoria } from "../controller/categoriaController";

const categoriaRoutes = Router();

// GET
categoriaRoutes.get('/buscar', buscarCategorias);

// POST
categoriaRoutes.post('/registrar', criarCategoria);

// PUT
categoriaRoutes.put('/editar', editarCategoria);

// DELETE
categoriaRoutes.delete('/deletar', deletarCategoria);

export {
    categoriaRoutes
}

