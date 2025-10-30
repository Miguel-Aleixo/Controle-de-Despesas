import { connection } from "../infra/connection";

type categoria = {
    id_categoria: number,
    nome: string,
    descricao: string,
}

export async function getCategorias() {
    const { rows } = await connection.query('SELECT * FROM categoria');

    return rows;
};

export async function postCategoria(categoria: categoria) {
    await connection.query('INSERT INTO categoria(nome, descricao) VALUES($1, $2)',
        [categoria.nome, categoria.descricao]
    );

    
};

export async function putCategoria(categoria: categoria) {
    await connection.query('UPDATE categoria SET nome = $1, descricao = $2 WHERE id = $3', 
        [categoria.nome, categoria.descricao, categoria.id_categoria]
    );
};

export async function deleteCategoria(id: number) {
     await connection.query('DELETE FROM categoria id = $1', 
        [id]
    );
};