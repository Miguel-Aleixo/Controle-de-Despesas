    CREATE TABLE usuario (
        id_usuario SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL,
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE categoria (
        id_categoria SERIAL PRIMARY KEY,
        nome VARCHAR(50) NOT NULL UNIQUE,
        descricao VARCHAR(150)
    );

    CREATE TABLE despesa (
        id_despesa SERIAL PRIMARY KEY,
        descricao VARCHAR(150) NOT NULL,
        valor DECIMAL(10,2) NOT NULL CHECK (valor >= 0),
        data_despesa DATE NOT NULL DEFAULT CURRENT_DATE,
        forma_pagamento VARCHAR(30) CHECK (forma_pagamento IN ('dinheiro', 'cartao_credito', 'cartao_debito', 'pix', 'outro')),
        id_usuario INT NOT NULL,
        id_categoria INT,
        FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario) ON DELETE CASCADE,
        FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria) ON DELETE SET NULL
    );