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

export const ValidarDatos = async(req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT Cod FROM colaboradores WHERE Usuario = ? AND Contraseña = ?", [req.body.Email, req.body.Contraseña]);
    res.json(rows)
    connection.end()
};

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
    try {
        const connection = await connect()
        const [rows] = await connection.query("SELECT MAX("+ req.body.Columna +") + 1  As consecutivo FROM "+ req.body.Tabla);/*"SELECT (SELECT NPreFactura FROM consecutivos) As PreFactura, (SELECT MAX(ODePedido) FROM tabladeingresados) AS ODePedido");*/
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log(error)
    }
};

