// api conect to mongodb atlas

const { PrismaClient } = require('@prisma/client') //importa o prisma

const prisma = new PrismaClient() //cria uma instancia do prisma para salvar tudo do prisma

const express = require('express');
const  app = express();
app.use(express.json()); // informando que vai usar json no body
const port = 3000;

const users = []

// envia um post para o servidor e cria um usuario 
app.post('/usuarios', async (req, res) => { //async para poder usar o await

    await prisma.user.create({ //cria um usuario com a funçao await que espera a funçao terminar
        data: {
            //id não precisa ser passado pois é autoincremento no banco de dados
            email: req.body.email,
            nome: req.body.nome,
            idade: req.body.idade

        }
    }).then((result) => {
        res.status(201).json(result) //retorna o status 201 para informar que foi criado e retorna o usuario criado
    }).catch((error) => {
        res.status(400).json({ error: error.message }) //retorna o status 400 para informar que deu erro
    })
    res.status(201).json(req.body) //retorna o status 201 para informar que foi criado e retorna o usuario criado
});

// tras informacoes do servidor
app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany()
    res.status(200).json(users); //retorna o status 200 e os usuarios, caso fosse somente res.json(users)  seria somente os usuarios

}); 

//atualiza um usuario
app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({ 
        where: { 
            id: req.params.id
        },
        data: { //dados que vao ser atualizados
            email: req.body.email, 
            nome: req.body.nome,    
            idade: req.body.idade
        }
    });
    res.status(201).json(req.body) //retorna o status 201 para informar que foi criado e retorna o usuario criado
});


//deleta um usuario
app.delete('/usuarios/:id', async (req, res) => { //id do usuario que vai ser deletado

    await prisma.user.delete({ //
        where: { //o id que vai ser deletado
            id: req.params.id  //pega o id que foi passado na url
        }
    });
    res.status(200).json({message: "usuario deletado"}); //retorna o status 200 para informar que foi deletado
});


//inicializa o servidor
app.listen(port, () => {       
    console.log(`Example app listening at http://localhost:${port}`);
});
