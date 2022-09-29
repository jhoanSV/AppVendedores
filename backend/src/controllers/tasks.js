import { connect } from "../database";

export const getTasks = async(req, res) => {
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

export const clientes = async(req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT Cod, Nit, Ferreteria, Contacto, Telefono, Cel, Email, Direccion, Barrio, Ruta FROM clientes WHERE CodVendedor = ?", [req.params.cod]);
    res.send(rows)
};

export const ValidarDatos = async(req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT Cod FROM colaboradores WHERE Email = ? AND Contraseña = ?", [req.body.Email, req.body.Contraseña]);
    res.json(rows)
};

export const updateTasks = (req, res) => {
    res.send('Hello word')
};