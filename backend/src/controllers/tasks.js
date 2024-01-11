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
    try {
        const connection = await connect()
        const [rows] = await connection.query("SELECT Cod, Cargo, Nombre FROM colaboradores WHERE Usuario = ? AND Contraseña = ?", [req.body.Email, req.body.Contraseña]);
        res.json(rows)
    connection.end()
    } catch (error) {
        console.log(error)
    }
};

export const BuscarClientesTodos = async(req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("SELECT c.Cod, c.Nit, c.Ferreteria, c.Contacto, c.Telefono, c.Cel, c.Email, c.Direccion, c.Barrio, (SELECT nombreRuta FROM rutas WHERE codRuta= c.ruta) AS Ruta, c.Geolocalizacion , c.Nota FROM clientes AS c WHERE CodVendedor = ?", [req.params.cod]);
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log(error);
    }
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

export const DatosProgreso = async(req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("SELECT me.Meta, me.Meta2, (SELECT MAX(re.Valor_por_fecha) AS record FROM (SELECT SUM(sa.Cantidad*sa.VrUnitario) AS Valor_por_fecha , DATE_FORMAT(sa.FechaDeIngreso, '%m-%Y') AS Fecha, sa.CodColaborador FROM salidas AS sa WHERE CodColaborador <> '000' GROUP BY MONTH(FechaDeIngreso), CodColaborador) AS re) AS record ,IFNULL(Vm.VentasMes, 0) AS VentasMes FROM DM_Metas AS me LEFT JOIN (SELECT IFNULL(SUM(sa.Cantidad * sa.VrUnitario), 0) AS VentasMes, sa.CodColaborador FROM salidas AS sa WHERE sa.CodColaborador = ? AND MONTH(sa.FechaDeIngreso) = MONTH(NOW()) AND YEAR(sa.FechaDeIngreso) = YEAR(NOW()) GROUP BY sa.CodColaborador) AS Vm ON 1=1 WHERE YEAR(me.Fecha) = YEAR(NOW()) AND MONTH(me.Fecha) = MONTH(NOW())", [req.params.cod]);
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log(error);
    }
};

export const PedidosEnviados = async(req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("SELECT con.NDePedido ,cli.Ferreteria, cli.Direccion, cli.Barrio, con.FechaFactura, con.FechaDeEntrega, con.VrFactura , con.Estado, con.ProcesoDelPedido, con.NotaVenta, con.NotaEntrega FROM clientes  AS cli INNER JOIN (SELECT te.NDePedido, te.CodCliente, DATE_FORMAT(te.FechaFactura, '%d-%m-%Y') AS FechaFactura, DATE_FORMAT(te.FechaDeEntrega, '%d-%m-%Y') AS FechaDeEntrega, SUM(ti.Cantidad*ti.VrUnitario) AS VrFactura , te.Estado, te.ProcesoDelPedido, te.NotaVenta, te.NotaEntrega FROM tabladeestados AS te INNER JOIN tabladeingresados AS ti ON te.NDePedido= ti.NDePedido AND te.Estado <> 'Cerrado' AND te.Estado <> 'Anulado' AND te.CodColaborador = ? GROUP BY te.NDePedido) AS con ON cli.Cod = con.CodCliente", [req.params.cod]);
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log(error);
    }
};

export const PedidosCerrados = async(req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("SELECT con.NDePedido ,cli.Ferreteria, cli.Direccion, cli.Barrio, con.FechaFactura, con.FechaDeEntrega, con.VrFactura , con.Estado, con.ProcesoDelPedido, con.NotaVenta, con.NotaEntrega FROM clientes  AS cli INNER JOIN (SELECT te.NDePedido, te.CodCliente, DATE_FORMAT(te.FechaFactura, '%d-%m-%Y') AS FechaFactura, DATE_FORMAT(te.FechaDeEntrega, '%d-%m-%Y') AS FechaDeEntrega, SUM(ti.Cantidad*ti.VrUnitario) AS VrFactura , te.Estado, te.ProcesoDelPedido, te.NotaVenta, te.NotaEntrega FROM tabladeestados AS te INNER JOIN salidas AS ti ON te.NDePedido= ti.NDePedido AND te.Estado = 'Cerrado' AND MONTH(te.FechaDeEstado) = MONTH(NOW()) AND YEAR(te.FechaDeEstado) = YEAR(NOW()) AND te.CodColaborador = ? GROUP BY te.NDePedido) AS con ON cli.Cod = con.CodCliente", [req.params.cod]);
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log(error);
    }
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

export const PedidosPorEntregar = async(req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("SELECT con.NDePedido ,cli.Ferreteria, cli.Direccion, cli.Barrio, con.FechaFactura, con.FechaDeEntrega, con.VrFactura , con.Estado, con.ProcesoDelPedido, con.NotaVenta, con.NotaEntrega FROM clientes  AS cli INNER JOIN (SELECT te.NDePedido, te.CodCliente, DATE_FORMAT(te.FechaFactura, '%d-%m-%Y') AS FechaFactura, DATE_FORMAT(te.FechaDeEntrega, '%d-%m-%Y') AS FechaDeEntrega, SUM(ti.Cantidad*ti.VrUnitario) AS VrFactura , te.Estado, te.ProcesoDelPedido, te.NotaVenta, te.NotaEntrega FROM tabladeestados AS te INNER JOIN flujodeestados AS ti ON te.NDePedido= ti.NDePedido AND te.Estado = 'Verificado' AND te.Repartidor = ? GROUP BY te.NDePedido) AS con ON cli.Cod = con.CodCliente", [req.params.cod]);
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log(error)
    }
};

export const DetallePedidoEntregas = async(req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("SELECT fe.Codigo, pro.Descripcion ,fe.Cantidad, fe.VrUnitario FROM flujodeestados AS fe LEFT JOIN productos AS pro ON fe.Codigo = pro.Cod WHERE fe.NDePedido = ?", [req.params.cod]);
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log(error)
    }
};

export const ActualizarProcesoDelPedido = async(req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("UPDATE tabladeestados SET NotaEntrega = ?, ProcesoDelPedido = ? WHERE NDepedido =  ?", [req.body.NotaEntrega, req.body.ProcesoDelPedido, req.body.NDepedido]);
        res.json(rows)
    connection.end()
    } catch (error) {
        console.log(error)
    }
};

export const DetallePedidoCerrado = async(req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("SELECT sa.Codigo, pro.Descripcion ,sa.Cantidad, sa.VrUnitario FROM salidas AS sa LEFT JOIN productos AS pro ON sa.Codigo = pro.Cod WHERE sa.NDePedido = ?", [req.params.cod]);
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log(error)
    }
};

