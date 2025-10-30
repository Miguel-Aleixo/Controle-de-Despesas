import { Request, Response } from "express";
import { deleteCategoria, getCategorias, postCategoria, putCategoria } from "../model/Categoria";

// CARREGAR PAGINAS
export function mostrarCadastroCategoria(req: Request, res: Response) {
    res.render('cadastrar_categoria', {message: ''});
};

// CRUD
export const buscarCategorias = async (req: Request, res: Response) => {
    try {
        const response = await getCategorias();

        res.status(200).render('index', { categorias: response });
    } catch (err) {
        console.log(err);
        res.status(500).render('index', { message: err });
    }
};

export const criarCategoria = async (req: Request, res: Response) => {
    try {
        const categoria = req.body;

        const response = await getCategorias();

        if(response.some(r => r.nome === categoria.nome)) {
            res.status(400).render('cadastrar_categoria', {
                message: {
                    type: 'error',
                    value: 'Já existe essa categoria'
                }
            });
            return;
        };
        
        await postCategoria(categoria);
        res.status(201).render('cadastrar_categoria', { message: {
            type: 'sucess',
            value: 'Categoria cadastrada'
        }});
    } catch (err) {
        console.log(err);
        res.status(500).render('cadastrar_categoria', { message: {
            type: 'error',
            value: err,
            title: 'Dados invalidos'
        }});
    }
};

export const editarCategoria = async (req: Request, res: Response) => {
    try {
        const categoria = req.body;
        
        await putCategoria(categoria);

        res.status(201).render('inicio', { message: {
            type: 'sucess',
            value: 'Categoria editada'
        }});
    } catch (err) {
        console.log(err);
        res.status(500).render('inicio', { message: {
            type: 'error',
            value: err,
            title: 'Erro ao editar'
        }});
    }
};

export const deletarCategoria = async (req: Request, res: Response) => {
    try {
        const id = req.body;
        
        await deleteCategoria(id);
        
        res.status(201).render('inicio', { message: {
            type: 'sucess',
            value: 'Categoria deletada'
        }});
    } catch (err) {
        console.log(err);
        res.status(500).render('incio', { message: {
            type: 'error',
            value: err,
            title: 'Erro ao deletar'
        }});
    }
};