----criação da data base
CREATE DATA BASE aulaback;

----criação da tabela
 CREATE TABLE usuario (
 id SERIAL PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 email VARCHAR(100) NOT NULL
 );
CREATE TABLE
aulaback=#

----criação do insert teste
 INSERT INTO usuario(nome, email)VALUES('joao', 'joaosantos@gmail.com');