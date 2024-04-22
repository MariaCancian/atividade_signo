----criação da data base
CREATE DATA BASE signo;

----criação da tabela
 CREATE TABLE usuario (
 id SERIAL PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
idade INTEGER NOT NULL,
signo VARCHAR(35) NOT NULL,
datanascimento DATE NOT NULL,
 );
CREATE TABLE
aulaback=#

----criação do insert teste
 INSERT INTO usuario(nome, email, signo, datanascimento)VALUES('maria', 'mariacancian@gmail.com', 'libra', 2006/10/17);