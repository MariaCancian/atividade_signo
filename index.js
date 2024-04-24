const express = require("express");
const { Pool } = require("pg");
const app = express();
const PORT = 3000;

//conexao com o banco de dados pg
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "signo",
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
  } catch (error) {
    console.error("Erro ao obter todos os usuarios", error);
    res.status(500).send("Erro ao obter todos os usuario");
  }
});

//rota que insere usuarios
app.post("/usuarios", async (req, res) => {
  try {
    const { nome, email, datanascimento, sobrenome } = req.body;
    const dataNascimento = new Date(datanascimento);
    //pega o dia de hj
    const hoje = new Date();
    //pega o ano mes e dia 
    const anoNascimento = dataNascimento.getFullYear();
    const mesNascimento = dataNascimento.getMonth() + 1;
    const diaNascimento = dataNascimento.getDate();

    // Calcula a idade
    let idade = hoje.getFullYear() - anoNascimento;
    if (
      mesNascimento > hoje.getMonth() + 1 ||
      (mesNascimento === hoje.getMonth() + 1 && diaNascimento > hoje.getDate())
    ) {
      idade--;
    }

    // Calculando o signo
    let signo = "";
if (
  (mesNascimento === 1 && diaNascimento >= 20) ||
  (mesNascimento === 2 && diaNascimento <= 18)
) {
  signo = "Aquário";
} else if (
  (mesNascimento === 2 && diaNascimento >= 19) ||
  (mesNascimento === 3 && diaNascimento <= 20)
) {
  signo = "Peixes";
} else if (
  (mesNascimento === 3 && diaNascimento >= 21) ||
  (mesNascimento === 4 && diaNascimento <= 19)
) {
  signo = "Áries";
} else if (
  (mesNascimento === 4 && diaNascimento >= 20) ||
  (mesNascimento === 5 && diaNascimento <= 20)
) {
  signo = "Touro";
} else if (
  (mesNascimento === 5 && diaNascimento >= 21) ||
  (mesNascimento === 6 && diaNascimento <= 20)
) {
  signo = "Gêmeos";
} else if (
  (mesNascimento === 6 && diaNascimento >= 21) ||
  (mesNascimento === 7 && diaNascimento <= 22)
) {
  signo = "Câncer";
} else if (
  (mesNascimento === 7 && diaNascimento >= 23) ||
  (mesNascimento === 8 && diaNascimento <= 22)
) {
  signo = "Leão";
} else if (
  (mesNascimento === 8 && diaNascimento >= 23) ||
  (mesNascimento === 9 && diaNascimento <= 22)
) {
  signo = "Virgem";
} else if (
  (mesNascimento === 9 && diaNascimento >= 23) ||
  (mesNascimento === 10 && diaNascimento <= 22)
) {
  signo = "Libra";
} else if (
  (mesNascimento === 10 && diaNascimento >= 23) ||
  (mesNascimento === 11 && diaNascimento <= 21)
) {
  signo = "Escorpião";
} else if (
  (mesNascimento === 11 && diaNascimento >= 22) ||
  (mesNascimento === 12 && diaNascimento <= 21)
) {
  signo = "Sagitário";
} else {
  signo = "Capricórnio";
}

    // Inserindo usuário no banco de dados
    await pool.query(
      "INSERT INTO usuario (nome, email, datanascimento, idade, signo, sobrenome) VALUES ($1, $2, $3, $4, $5, $6)",
      [nome, email, datanascimento, idade, signo, sobrenome]
    );

    res.status(201).send({ mensagem: "Usuário criado com sucesso" });
  } catch (error) {
    console.error("Erro ao criar o usuário", error);
    res.status(500).send("Erro ao criar usuário");
  }
});

//rota que deleta usuarios

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM usuario WHERE id = $1", [id]);
    res.status(200).send({ mensagem: "usuario deletado" });
  } catch {
    error;
  }
  {
    console.error("Erro ao apagar o usuarios", error);
    res.status(500).send("erro ao criar usuarios");
  }
});

//rota para editar
app.put("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, sobrenome, email, datanascimento } = req.body;
    const dataNascimento = new Date(datanascimento);
    const hoje = new Date();
    const anoNascimento = dataNascimento.getFullYear();
    const mesNascimento = dataNascimento.getMonth() + 1;
    const diaNascimento = dataNascimento.getDate();

    // Calculando a idade
    let idade = hoje.getFullYear() - anoNascimento;
    if (
      mesNascimento > hoje.getMonth() + 1 ||
      (mesNascimento === hoje.getMonth() + 1 && diaNascimento > hoje.getDate())
    ) {
      idade--;
    }

    // Calculando o signo
    let signo = "";
    if (
      (mesNascimento === 1 && diaNascimento >= 20) ||
      (mesNascimento === 2 && diaNascimento <= 18)
    ) {
      signo = "Aquário";
    } else if (
      (mesNascimento === 2 && diaNascimento >= 19) ||
      (mesNascimento === 3 && diaNascimento <= 20)
    ) {
      signo = "Peixes";
    } else if (
      (mesNascimento === 3 && diaNascimento >= 21) ||
      (mesNascimento === 4 && diaNascimento <= 19)
    ) {
      signo = "Áries";
    } else if (
      (mesNascimento === 4 && diaNascimento >= 20) ||
      (mesNascimento === 5 && diaNascimento <= 20)
    ) {
      signo = "Touro";
    } else if (
      (mesNascimento === 5 && diaNascimento >= 21) ||
      (mesNascimento === 6 && diaNascimento <= 20)
    ) {
      signo = "Gêmeos";
    } else if (
      (mesNascimento === 6 && diaNascimento >= 21) ||
      (mesNascimento === 7 && diaNascimento <= 22)
    ) {
      signo = "Câncer";
    } else if (
      (mesNascimento === 7 && diaNascimento >= 23) ||
      (mesNascimento === 8 && diaNascimento <= 22)
    ) {
      signo = "Leão";
    } else if (
      (mesNascimento === 8 && diaNascimento >= 23) ||
      (mesNascimento === 9 && diaNascimento <= 22)
    ) {
      signo = "Virgem";
    } else if (
      (mesNascimento === 9 && diaNascimento >= 23) ||
      (mesNascimento === 10 && diaNascimento <= 22)
    ) {
      signo = "Libra";
    } else if (
      (mesNascimento === 10 && diaNascimento >= 23) ||
      (mesNascimento === 11 && diaNascimento <= 21)
    ) {
      signo = "Escorpião";
    } else {
      signo = "Sagitário";
    }

    await pool.query(
      "UPDATE usuario SET nome = $1, sobrenome = $2, email = $3, datanascimento = $4, idade = $5, signo = $6 WHERE id = $7",
      [nome, sobrenome, email, datanascimento, idade, signo, id]
    );
    res.status(200).send("Usuário atualizado");
  } catch (error) {
    console.error("Erro ao editar o usuário", error);
    res.status(500).send("Erro ao editar usuário");
  }
});

//get usuarios por id

app.get("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query("SELECT * FROM usuario WHERE id = $1 ", [
      id,
    ]);
    if (resultado.rowCount == 0) {
      res.status(404).send("id não encontrado");
    } else {
      res.json({ usuarios: resultado.rows[0] });
    }
  } catch (error) {
    console.error("Erro ao pegar o usuarios pelo id", error);
    res.status(500).send("erro ao pegar usuarios pelo id");
  }
});

app.listen(PORT, () => {
  console.log(`Servindor rodando na porta ${PORT}🚀`);
});
