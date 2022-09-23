import { connect } from "../database";

export const getTasks = async(req, res) => {
    //const connection = await connect()
    //const [rows] = await connection.query("SELECT cod, Descripcion, UnidadOpaquete, EsUnidadOpaquete, SubCategoria, PVenta, Nota FROM productos");
    //res.json(rows)
    try {
        const connection = await connect()
        const [rows] = await connection.query("SELECT cod, Descripcion, UnidadOpaquete, EsUnidadOpaquete, SubCategoria, PVenta, Nota FROM productos");
        res.json(rows)
      } catch (error) {
        console.log(error)
      }
};

export const getTask = async(req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT cod, Descripcion, UnidadOpaquete, EsUnidadOpaquete, SubCategoria, PVenta, Nota FROM productos WHERE cod = ? ", [req.params.cod]);
    res.send(rows[0])
};

export const searchTasks = async(req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT cod, Descripcion, UnidadOpaquete, EsUnidadOpaquete, SubCategoria, PVenta, Nota FROM productos WHERE cod LIKE CONCAT('%', ?,  '%') or Descripcion LIKE CONCAT('%', ?,  '%') or SubCategoria LIKE CONCAT('%', ?,  '%')", [req.params.cod,req.params.cod,req.params.cod]);
    res.json(rows)
};

export const saveTasks = (req, res) => {
    res.send('Hello word')
};

export const deleteTasks = (req, res) => {
    res.send('Hello word')
};

export const updateTasks = (req, res) => {
    res.send('Hello word')
};