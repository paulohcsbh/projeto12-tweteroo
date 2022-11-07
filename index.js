import express from "express";
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body;
    if(users.find(name => name.username === username)){
      res.status(409).send("Usuário já existente");
      return;    
    }
    if(!username || !avatar){
      res.status(400).send("Todos os campos são obrigatórios");
      return;
    }
    users.push(
      { id: users.length + 1,
      username,
      avatar,
      });
  
    res.status(201).send("OK");
  });

  app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body;

    if(!tweet){
      res.status(400).send("Todos os campos são obrigatórios");
      return;
    }
    tweets.unshift(
      {
        id: tweets.length + 1,
        username,
        tweet,
      }
    )
    res.status(201).send("OK")
  });

  app.get("/tweets", (req, res)=>{

    tweets.forEach((tweet) => {
      const { avatar } = users.find((user) => user.username === tweet.username);
      tweet ["avatar"] = avatar;
    })
      
    res.send(tweets.slice(0, 10));
})

app.listen(5000, () => {
    console.log("Server running in port:5000");
});