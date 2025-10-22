import { Request, Response } from "express";
import { deleteUser, getUsers, postUser, putUser } from "../model/User";

// CARREGAR PAGINAS
export function mostrarLogin(req: Request, res: Response) {
    res.render('login', {message: ''});
};

export function mostrarCadastro(req: Request, res: Response) {
    res.render('cadastro', {message: ''});
};

// CRUD
export const buscarUsuarios = async (req: Request, res: Response) => {
    try {
        const response = await getUsers();

        res.status(200).render('list', { users: response });
    } catch (err) {
        console.log(err);
        res.status(500).render('list', { message: err });
    }
};

export const criarUsuario = async (req: Request, res: Response) => {
    try {
        const user = req.body;

        const response = await getUsers();

        if(response.some(r => r.email === user.email)) {
            res.status(400).render('cadastro', {
                message: {
                    type: 'error',
                    value: 'Já existe esse email'
                }
            });
            return;
        };
        
        await postUser(user);
        res.status(201).render('cadastro', { message: {
            type: 'sucess',
            value: 'Usuario cadastrado'
        }});
    } catch (err) {
        console.log(err);
        res.status(500).render('cadastro', { message: {
            type: 'error',
            value: err,
            title: 'Dados invalidos'
        }});
    }
};

export const editarUsuario = async (req: Request, res: Response) => {
    try {
        const usuario = req.body;
        
        await putUser(usuario);

        res.status(201).render('login', { message: {
            type: 'sucess',
            value: 'Usuario editado'
        }});
    } catch (err) {
        console.log(err);
        res.status(500).render('login', { message: {
            type: 'error',
            value: err,
            title: 'Erro ao editar'
        }});
    }
};

export const deletarUsuario = async (req: Request, res: Response) => {
    try {
        const id = req.body;
        
        await deleteUser(id);
        
        res.status(201).render('login', { message: {
            type: 'sucess',
            value: 'Usuario deletado'
        }});
    } catch (err) {
        console.log(err);
        res.status(500).render('login', { message: {
            type: 'error',
            value: err,
            title: 'Erro ao deletar'
        }});
    }
};