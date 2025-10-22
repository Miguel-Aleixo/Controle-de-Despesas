import { connection } from "../infra/connection";

type usuario = {
    id_usuario: number,
    nome: string,
    email: string,
    senha: string,
    data_criacao: string
}

export async function getUsers() {
    const { rows } = await connection.query('SELECT * FROM usuario');

    return rows;
};

export async function postUser(usuario: usuario) {
    await connection.query('INSERT INTO usuario(nome, email, senha) VALUES($1, $2, $3)',
        [usuario.nome, usuario.email, usuario.senha]
    );

    
};

export async function putUser(usuario: usuario) {
    await connection.query('UPDATE usuario SET nome = $1, email = $2, senha = $3 WHERE id = $4', 
        [usuario.nome, usuario.email, usuario.senha, usuario.id_usuario]
    );
};

export async function deleteUser(id: number) {
     await connection.query('DELETE FROM usuario id = $1', 
        [id]
    );
};