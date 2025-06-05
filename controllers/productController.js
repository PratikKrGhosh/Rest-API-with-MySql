import db from "../config/db.js";

export const addProduct = async (req, res) =>{
    try{
        const {name, desc} = req.body;

        const [data] = await db.execute("INSERT INTO products(name, description) VALUES(?, ?)", [name, desc]);

        res.status(201).send(data);
    }catch(err){
        res.status(400).send("Couldn't Add Product");
    }
}

export const getProduct = async (req, res) =>{
    try{
        const {name} = req.query;

        if (!name){
            const [data] = await db.execute("SELECT * FROM products");
            res.status(200).send(data);
        }else{
            const [data] = await db.execute("SELECT * FROM products WHERE name = ?", [name]);
            res.status(200).send(data);
        }
    }catch(err){
        res.status(400).send("Couldn't Find Product");
    }
}

export const updateProduct = async (req, res) =>{
    try{
        const [name, desc, available, launch] = req.body;
        let query = "";

        if (name){
            query += `name = ${name}`;
        }

        if (desc){
            query += `description = ${desc}`;
        }

        if (available){
            query += `available = ${available}`;
        }

        if (launch){
            query += `launch = ${launch}`;
        }

        const [data] = await db.execute("UPDATE products SET ? WHERE name = ?", [query, req.params.name]);

        res.status(200).send(data);
    }catch(err){
        res.status(400).send("Couldn't Update Product");
    }
}

export const deleteProduct = async (req, res) =>{
    try{
        const [name] = req.params;
        const [data] = await db.execute("DELETE FROM products WHERE name = ?", [name]);
        res.status(200).send(data);
    }catch(err){
        res.status(400).send("Couldn't Delete Product");
    }
}