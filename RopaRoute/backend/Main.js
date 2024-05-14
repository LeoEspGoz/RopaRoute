import express from "express";
import {getTiendas,crearUsuario,getUsuario,crearTienda,getTiendasVendedor,eliminarTienda, actualizarTienda,addFavorito,getFavorito,elimFavorito} from "./Consultas.js";
import cors from "cors";
import {dirname, join} from "path";
import {fileURLToPath} from "url";
import{check, validationResult} from "express-validator";

const app = express();
const _dirname=dirname(fileURLToPath(import.meta.url));

//app.set("views", join(_dirname,'..','views'));
app.set('view engine','ejs');
app.use(express.json());
app.use(cors());
app.use(express.static(join(_dirname,'..','pages')));
app.use(express.static(join(_dirname,'..','css')));
app.use(express.static(join(_dirname,'..','js')));
app.use(express.static(join(_dirname,'..','img')));


console.log(_dirname);
//app.use('/css', express.static(path.join(__dirname, 'css')));

//console.log(join(_dirname,'..','views'));

app.get("/perfil", (req, res) => {
  //res.sendFile(join(_dirname,"..","pages","login.html"));
});

app.get("/", (req, res) => {
  res.sendFile(join(_dirname,"..","index.html"));
});

/* app.get("/tiendasIndex", (req, res) => {
  getTiendas2((error,result)=>{
    if(error){
      res.send(error);
    }else{
      res.send(result);
    }
  });
  
}); */

app.post("/login", (req, res) => {
  getUsuario(req.body, (error, result) => {
    
    if (error || result.length==0) {
      //console.log(":(");
      res.send([-1]);
    } else  {
      res.send([result[0].id, result[0].rol]);
      
    // console.log(result);
    }
  });
});

app.post("/registro", (req, res) => {
  crearUsuario(req.body, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      //console.log(result);
      //res.sendFile(join(_dirname,"..","pages","login.html"));
      res.send(result);
      
    }
  });
});


app.post("/addTienda", (req, res) => {
  crearTienda(req.body, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
});

app.post("/tiendas", (req, res)=>{
  getTiendasVendedor(req.body,(error, result)=>{
    if(error){
      console.log(error);
    }else{
      res.send(result);
    }
  });
});

app.get("/tiendas", (req, res)=>{
  getTiendas((error, result)=>{
    if(error){
      console.log(error);
    }else{
      res.send(result);
    }
  });
});

app.post("/eliminarTienda", (req, res)=>{
  eliminarTienda(req.body,(error, result)=>{
    if(error){
      console.log(error);
      res.send("error");
    }else{
      res.send(result);
    }
  });
});

app.post("/actualizarTienda", (req, res)=>{
  actualizarTienda(req.body,(error, result)=>{
    if(error){
      console.log(error);
      res.send("error");
    }else{
      res.send(result);
    }
  });
});

app.post("/addFavorito", (req, res)=>{
  addFavorito(req.body,(error, result)=>{
    if(error){
      console.log(error);
      res.send("error");
    }else{
      res.send(result);
    }
  });
});
app.post("/getFavorito", (req, res)=>{
  getFavorito(req.body,(error, result)=>{
    if(error){
      console.log(error);
      res.send("error");
    }else{
      res.send(result);
    }
  });
});
app.post("/elimFavorito", (req, res)=>{
  elimFavorito(req.body,(error, result)=>{
    if(error){
      console.log(error);
      res.send("error");
    }else{
      res.send(result);
    }
  });
});

app.listen(3000);
console.log("server en el puerto 3000");
