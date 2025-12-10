import { connection } from "../infra/connection";
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

type usuario = {
    id_usuario: number,
    nome: string,
    email: string,
    senha: string,
    data_criacao?: string
}

export async function loginUser(email: string, senha: string): Promise<usuario | null> {
    const { rows } = await connection.query('SELECT * FROM usuario WHERE email = $1', [email]);

    if (rows.length === 0) {
        return null;
    }

    const user = rows[0] as usuario;
    
    const match = await bcrypt.compare(senha, user.senha);

    if (match) {
        return user; 
    }

    return null;
}

export async function getUsers() {
    const { rows } = await connection.query('SELECT id_usuario, nome, email, data_criacao FROM usuario'); 
    return rows as usuario[];
};

export async function postUser(usuario: usuario) {
    const hashedPassword = await bcrypt.hash(usuario.senha, saltRounds);

    await connection.query('INSERT INTO usuario(nome, email, senha) VALUES($1, $2, $3)',
        [usuario.nome, usuario.email, hashedPassword] 
    );
};

export async function putUser(usuario: usuario) {
    let query = 'UPDATE usuario SET nome = $1, email = $2';
    let params: (string | number)[] = [usuario.nome, usuario.email];
    let paramIndex = 3;

    if (usuario.senha) {
        const hashedPassword = await bcrypt.hash(usuario.senha, saltRounds);
        query += `, senha = $${paramIndex++}`;
        params.push(hashedPassword);
    }

    query += ` WHERE id_usuario = $${paramIndex}`;
    params.push(usuario.id_usuario!);

    await connection.query(query, params);
};

export async function deleteUser(id: number) {
     await connection.query('DELETE FROM usuario WHERE id_usuario = $1', 
        [id]
    );
};