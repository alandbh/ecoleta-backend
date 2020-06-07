import knex from "../database/connection";
import { Response, Request } from "express";

class ItemsController {
    // Método para a criação de Points
    // Index é o nome da funcao que a gente mesmo escolhe
    // É uma convenção usar a palavra "index" para listar, assim como "create para criar" e "destroy" para deletar
    async index(request: Request, response: Response) {
        const items = await knex("items").select("*");

        // Para mostrar o caminho dos arquivos por completo
        // O nome disso é serialização

        const serializedItems = items.map((item) => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`,
            };
        });

        return response.json(serializedItems);
    }
}

export default ItemsController;
