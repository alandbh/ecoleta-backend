import knex from "../database/connection";
import { Response, Request } from "express";

class PointsController {
    // Método para a criação de Points
    async create(request: Request, response: Response) {
        // Recebendo os dados vindos no body da requisição HTTP

        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items,
        } = request.body; // Usando desestruturação

        // Usando uma transaction = útil para fazer com que as requisições que são dependentes não sejam quebradas quando uma delas falhar
        const trx = await knex.transaction();

        // Inserindo os dados recebidos no banco usando o knex
        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        };
        const insertedIds = await trx("points").insert(point); // Quando o nome da propriedade é igual o nome da variavel, usamos o short-sitaxe

        const point_id = insertedIds[0];

        // Criando o relacionamento do Point com a tabela Items
        // Mapeia os items vindos da requisição HTTP atrelando cada item_id com o novo id criado pela requisiçao

        // UPDATE,
        // Com a mudança no formato de envio de JSON para Mutipart Form (para comportar o recebimento de arquivos)...
        // ... os itens estão vindo como uma string separada por virgula. Por isso o Split e o Trim antes do Map
        const pointItems = items
            .split(",")
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
                return {
                    item_id,
                    point_id: point_id, // Quando o knex injeta um item na tabela ele retorna o ID único que foi gerado automaticamente (linha 39)
                };
            });

        // Insere no banco, na tabela "point_items"
        await trx("point_items").insert(pointItems);

        await trx.commit(); // É preciso dar commit no final

        return response.json({ id: point_id, ...point });
    }

    // Método para buscar um Point específico
    async show(request: Request, response: Response) {
        const { id } = request.params; //Request params é indicado para quando o parametro está na rota visivelmente

        const point = await knex("points").where("id", id).first();

        if (!point) {
            return response.status(400).json({ message: "point not found" });
        }

        const items = await knex("items")
            .join(
                // Fazer uma junção da tabela items...
                "point_items", // ...com a tabela "point_items"
                "items.id", // onde o id da tabela items ("items.id")...
                "=", // ...seja igual...
                "point_items.item_id" // ...ao ID da tabela "point_items"
            )
            .where("point_items.point_id", id) // Aonde o "point_id" da tabela "point_items" seja igual ao "id" que chegou via HHTP (linha 60 = const { id } = request.params;)
            .select("items.title"); // Apenas para mostrar só o título em vez do objeto inteiro

        const serializedPoint = {
            ...point,
            image_url: `http://192.168.0.6:3333/uploads/${point.image}`,
        };

        // faz a query no banco buscando pelo id
        return response.json({ point: serializedPoint, items });
    }

    // Método para listar todos os Points
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(",")
            .map((item) => Number(item.trim()));

        const points = await knex("points")
            .join("point_items", "points.id", "=", "point_items.point_id")
            .whereIn("point_items.item_id", parsedItems)
            .where("city", String(city))
            .where("uf", String(uf))
            .distinct()
            .select("points.*");

        // Para iserir o caminho da imagem no objeto do Point
        const serializedPoints = points.map((point) => {
            return {
                ...point,
                image_url: `http://192.168.0.6:3333/uploads/${point.image}`,
            };
        });

        // const points = await knex("points")
        //     .where("city", String(city))
        //     .where("uf", String(uf))
        //     .select("points.*");

        return response.json(serializedPoints);
    }
}

export default PointsController;
