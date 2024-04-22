const express = require("express");
const { Pool } = require("pg");
const app = express();
const PORT = 3000;

//conexao com o banco de dados
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "aulaback",
  password: "05111729",
  port: 5432,
});

app.use(express.json());

//ROTA TESTE
app.get("/", (req, res) => {
  res.end("a rota funcionando!🚀");
});

//rota que obtem todos os usuarios
app.get("/usuarios", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM usuario");
    res.json({
      total: resultado.rowCount,
      usuarios: resultado.rows,
    });
  } catch (error)

  {
    console.error("Erro ao obter todos os usuarios", error);
    res.status(500).send("Erro ao obter todos os usuario");
  }
});

//rota que insere usuarios
app.post("/usuarios", async (req, res) => {
  try {
    const { nome, email } = req.body;
    await pool.query("INSERT INTO usuario (nome, email) VALUES ($1, $2)", [
      nome,
      email,
    ]);
    res.status(201).send({mensagem: 'Usuarios criado com sucesso'});
  } catch (error) {
    console.error("Erro ao criar o usuarios", error);
    res.status(500).send("erro ao criar usuarios");
  }
});

//rota que deleta usuarios

app.delete('/:id', async (req, res)=>{
    try{
const{id} = req.params;
 await pool.query('DELETE FROM usuario WHERE id = $1', [id]);
 res.status(200).send({mensagem: 'usuario deletado'})

    }catch{error}{
        console.error("Erro ao apagar o usuarios", error);
    res.status(500).send("erro ao criar usuarios");
    }
})

//rota para editar
app.put('/usuarios/:id', async (req,res)=>{
    try{
        const{id} = req.params;
        const { nome, email } = req.body;
        await pool.query ('UPDATE usuario SET nome = $1, email=$2 WHERE id= $3', [nome,email,id]);
        res.status(200).send("usuario atualizado");


    }catch{error}{
        console.error("Erro ao editar o usuarios", error);
    res.status(500).send("erro ao editar usuarios");

    }
})
//get usuarios por id

app.get('/usuarios/:id', async(req,res)=>{
    try{
        const{id} = req.params;
        const resultado = await pool.query("SELECT * FROM usuario WHERE id = $1 ", [id]);
        if(resultado.rowCount == 0){
            res.status(404).send('id não encontrado')
        }else{
        res.json({usuarios: resultado.rows[0]})
            
        }

    }catch(error){
        console.error("Erro ao pegar o usuarios pelo id", error);
        res.status(500).send("erro ao pegar usuarios pelo id");
    
    }
})

app.listen(PORT, () => {
  console.log(`Servindor rodando na porta ${PORT}🚀`);
});
