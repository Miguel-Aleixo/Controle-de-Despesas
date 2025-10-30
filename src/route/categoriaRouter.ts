import { Router } from "express";
import { buscarCategorias, criarCategoria, deletarCategoria, editarCategoria, mostrarCadastroCategoria } from "../controller/categoriaController";

const categoriaRoutes = Router();

//CARREGAR PAGINAS
categoriaRoutes.get('/cadastrar_categoria', mostrarCadastroCategoria);

categoriaRoutes.get('/inicio', buscarCategorias);

// GET
categoriaRoutes.get('/categoria/buscar', buscarCategorias);

// POST
categoriaRoutes.post('/categoria/registrar', criarCategoria);

// PUT
categoriaRoutes.put('/categoria/editar', editarCategoria);

// DELETE
categoriaRoutes.delete('/categoria/deletar', deletarCategoria);

export {
    categoriaRoutes
}

