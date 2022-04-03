import express, { Express, Request, response, Response } from 'express';
import { App } from './src/app';
const bodyParser= require('body-parser')


//Url du reseau
const RPC_URL = "https://ithacanet.smartpy.io";
// const ACCOUNT_TO_CHECK = "tz1Xqa5LRU5tayDcZEFr7Sw2GjrbDBY3HtHH";

//cle du smart contract
const COUNTER_CONTRACT = "KT19HPiEKp4M2FqaEzb1cqDLkJxQBhrjzcfZ";

const app: Express = express();

//Port de connection
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//test de route
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');

});

//test de route ajout antecedent
app.post('/addAntecedent',  (req: Request, res: Response) => {
    // console.log("response",res)
     console.log("request",req.body)
   res.send(`request body:${JSON.stringify(req.body)}`);

   new App(RPC_URL).addAntecedent(req.body,COUNTER_CONTRACT);
  
});

//test de route ajout consultation
app.post('/addConsultation',  (req: Request, res: Response) => {
  // console.log("response",res)
   console.log("request Body",req.body)
 res.send(`request body:${JSON.stringify(req.body)}`);

 new App(RPC_URL).addConsultation(req.body,COUNTER_CONTRACT);

});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});