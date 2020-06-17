import express from "express";
// Agora vamos importar o knex para buscar os itens no banco e exibir no json como response
// import knex from "./database/connection";

// Importando a classe da rota
import PointsController from "./controllers/pointsController";
import ItemsController from "./controllers/itemsController";
import multer from "multer";
import multerConfig from "./config/multer";

const routes = express.Router();

// Lidando com upload usando o Multer
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

// Listando os items
routes.get("/items", itemsController.index);
// Mostrar todos os points (por padrão a gente chama o métod de index - listar vários)
routes.get("/points", pointsController.index);
// Mostrar um único point específico (por convenção a gente usa show)
routes.get("/points/:id", pointsController.show);

// Cadastrando os pontos de coleta
// o segundo parametro ( upload.single("image") )
routes.post("/points", upload.single("image"), pointsController.create);

export default routes;
