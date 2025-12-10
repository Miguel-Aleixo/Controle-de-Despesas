import { Request, Response } from "express";
import { deleteUser, getUsers, postUser, putUser, loginUser } from "../model/User"; 

interface FlashMessage {
    type: 'success' | 'error' | 'warning';
    value: string;
    title?: string;
}

const handleControllerError = (res: Response, err: any, view: string, defaultTitle: string) => {
    console.error(`[ERRO] ${defaultTitle}:`, err);
    
    const errorMessage: FlashMessage = {
        type: 'error',
        value: err instanceof Error ? err.message : 'Ocorreu um erro inesperado no servidor.',
        title: defaultTitle
    };
    
    res.status(500).render(view, { message: errorMessage });
};

// CARREGAR PAGINAS
export function mostrarLogin(req: Request, res: Response) {
    res.render('login', { message: null });
};

export function mostrarCadastro(req: Request, res: Response) {
    res.render('cadastro', { message: null });
};

// AUTENTICAÇÃO
export const fazerLogin = async (req: Request, res: Response) => {
    const errorTitle = 'Erro de Autenticação';

    try {
        const { email, senha } = req.body;

        const user = await loginUser(email, senha);

        if (!user) {
            const message: FlashMessage = {
                type: 'error',
                value: 'Email ou senha inválidos.',
                title: 'Falha no Login'
            };
            res.status(401).render('login', { message });
            return;
        };
        
     
        req.session.user = { id: user.id_usuario, nome: user.nome, email: user.email };
        
        res.status(200).redirect('/dashboard/inicio');
    } catch (err) {
        handleControllerError(res, err, 'login', errorTitle);
    }
};

export const fazerLogout = (req: Request, res: Response) => {
    // @ts-ignore
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao destruir a sessão:', err);
        }
        res.redirect('/usuario/login');
    });
};


// CRUD
export const buscarUsuarios = async () => {
    try {
        const response = await getUsers();

       return response
    } catch (err) {
        return false
    }
};

export const criarUsuario = async (req: Request, res: Response) => {
    const view = 'cadastro';
    const successView = 'login';
    const errorTitle = 'Erro ao cadastrar usuário';

    try {
        const user = req.body;

        const response = await getUsers();
        if(response.some(r => r.email === user.email)) {
            const message: FlashMessage = {
                type: 'error',
                value: 'Já existe um usuário com este email.',
                title: 'Duplicidade'
            };
            res.status(400).render(view, { message });
            return;
        };
        
        await postUser(user);

        const successMessage: FlashMessage = {
            type: 'success',
            value: 'Usuário cadastrado com sucesso! Faça login para continuar.'
        };
        
        res.status(201).render(successView, { message: successMessage });
    } catch (err) {
        handleControllerError(res, err, view, errorTitle);
    }
};

export const editarUsuario = async (req: Request, res: Response) => {
    const view = 'login';
    const errorTitle = 'Erro ao editar usuário';

    try {
        const usuario = req.body;
        
        await putUser(usuario);

        const successMessage: FlashMessage = {
            type: 'success',
            value: 'Usuário editado com sucesso!'
        };

        res.status(200).render(view, { message: successMessage });
    } catch (err) {
        handleControllerError(res, err, view, errorTitle);
    }
};

export const deletarUsuario = async (req: Request, res: Response) => {
    const view = 'login';
    const errorTitle = 'Erro ao deletar usuário';

    try {
        const id = req.body;
        
        await deleteUser(id);
        
        const successMessage: FlashMessage = {
            type: 'success',
            value: 'Usuário deletado com sucesso!'
        };

        res.status(200).render(view, { message: successMessage });
    } catch (err) {
        handleControllerError(res, err, view, errorTitle);
    }
};