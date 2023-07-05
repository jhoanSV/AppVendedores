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
    const [rows] = await connection.query("SELECT Cod, Cargo, Nombre FROM colaboradores WHERE Usuario = ? AND Contraseña = ?", [req.body.Email, req.body.Contraseña]);
    res.json(rows)
    connection.end()
};

export const BuscarClientesTodos = async(req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT c.Cod, c.Nit, c.Ferreteria, c.Contacto, c.Telefono, c.Cel, c.Email, c.Direccion, c.Barrio, (SELECT nombreRuta FROM rutas WHERE codRuta= c.ruta) AS Ruta, c.Geolocalizacion , c.Nota FROM clientes AS c WHERE CodVendedor = ?", [req.params.cod]);
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

export const TotalVentasDelMes = async(req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT SUM(Cantidad*VrUnitario) AS VentasMes FROM salidas WHERE MONTH(FechaDeIngreso) = MONTH(NOW()) AND CodColaborador = ?", [req.params.cod]);
    res.json(rows)
    connection.end()
};

export const PedidosEnviados = async(req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT con.NDePedido ,cli.Ferreteria, cli.Direccion, cli.Barrio, con.FechaFactura, con.FechaDeEntrega, con.VrFactura , con.Estado, con.ProcesoDelPedido FROM clientes  AS cli INNER JOIN (SELECT te.NDePedido, te.CodCliente, DATE_FORMAT(te.FechaFactura, '%d-%m-%Y') AS FechaFactura, DATE_FORMAT(te.FechaDeEntrega, '%d-%m-%Y') AS FechaDeEntrega, SUM(ti.Cantidad*ti.VrUnitario) AS VrFactura , te.Estado, te.ProcesoDelPedido FROM tabladeestados AS te INNER JOIN tabladeingresados AS ti ON te.NDePedido= ti.NDePedido AND te.Estado <> 'Cerrado' AND te.Estado <> 'Anulado' AND te.CodColaborador = ? GROUP BY te.NDePedido) AS con ON cli.Cod = con.CodCliente", [req.params.cod]);
    res.json(rows)
    connection.end()
};

export const DetalleDelPedidoVendedor = async(req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("SELECT ti.Codigo, pro.Descripcion ,ti.Cantidad, ti.VrUnitario FROM tabladeingresados AS ti LEFT JOIN productos AS pro ON ti.Codigo = pro.Cod WHERE ti.NDePedido = ?", [req.params.cod]);
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log(error)
    }
};


