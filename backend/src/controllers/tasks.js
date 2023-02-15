import { connect } from "../database";

export const getTasks = async(req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("SELECT p.cod, p.Descripcion, p.EsUnidadOpaquete, (SELECT SubCategoria FROM subcategorias WHERE IDSubCategoria = p.subcategoria) AS SubCategoria, p.PVenta, p.Nota, p.PCosto FROM productos AS p");
        res.json(rows)
        connection.end()
      } catch (error) {
        console.log(error)
      }
};

/*export const getTask = async(req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT cod, Descripcion, UnidadOpaquete, EsUnidadOpaquete, SubCategoria, PVenta, Nota FROM productos WHERE cod = ? ", [req.params.cod]);
    res.send(rows[0])
    connection.end()
};*/

/*export const searchTasks = async(req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT cod, Descripcion, UnidadOpaquete, EsUnidadOpaquete, SubCategoria, PVenta, Nota FROM productos WHERE cod LIKE CONCAT('%', ?,  '%') or Descripcion LIKE CONCAT('%', ?,  '%') or SubCategoria LIKE CONCAT('%', ?,  '%')", [req.params.cod,req.params.cod,req.params.cod]);
    res.json(rows)
    connection.end()
};*/

/*export const clientes = async(req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT Cod, Nit, Ferreteria, Contacto, Telefono, Cel, Email, Direccion, Barrio, Ruta FROM clientes WHERE CodVendedor = ?", [req.params.cod]);
    res.send(rows)
    connection.end()
};*/

export const ValidarDatos = async(req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT Cod FROM colaboradores WHERE Usuario = ? AND Contraseña = ?", [req.body.Email, req.body.Contraseña]);
    res.json(rows)
    connection.end()
};

/*export const BuscarClientes = async(req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT Cod, Nit, Ferreteria, Contacto, Telefono, Cel, Email, Direccion, Barrio, Ruta, Nota FROM clientes WHERE (Nit LIKE CONCAT('%', ?,  '%') OR  Ferreteria LIKE CONCAT('%', ?,  '%') OR Contacto LIKE CONCAT('%', ?,  '%') OR Ruta LIKE CONCAT('%', ?,  '%')) AND CodVendedor = ?", [req.body.busqueda,req.body.busqueda,req.body.busqueda,req.body.busqueda, req.body.CodVendedor]);
    res.json(rows)
    connection.end()
};*/

export const BuscarClientesTodos = async(req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT c.Cod, c.Nit, c.Ferreteria, c.Contacto, c.Telefono, c.Cel, c.Email, c.Direccion, c.Barrio, (SELECT nombreRuta FROM rutas WHERE codRuta= c.ruta) AS Ruta, c.Nota FROM clientes AS c WHERE CodVendedor = ?", [req.params.cod]);
    res.json(rows)
    connection.end()
};

export const aTablas = async(req, res) => {
    try {
        const connection = await connect()
        let cadena = "INSERT INTO " + req.body.tabla + " VALUES " + req.body.cadenaDeInsercion
        const [rows] = await connection.query(cadena);
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log(error)
    }
};

export const consecutivos = async(req, res) => {
        const connection = await connect()
        const [rows] = await connection.query("SELECT (SELECT NPreFactura FROM consecutivos) As PreFactura, (SELECT MAX(ODePedido) FROM tabladeingresados) AS ODePedido");
        res.json(rows)
        connection.end()
};

export const consecutivoPrefactura = async(req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("update consecutivos set NPreFactura = ? where 1 = 1", [req.params.con]);
    res.send(rows[0])
    connection.end()
};
