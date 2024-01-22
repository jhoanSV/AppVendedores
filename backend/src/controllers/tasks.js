import { connect } from "../database";
const bcrypt = require('bcryptjs');


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


//Todo: create just one quiery to send the product data if the client is logged in or not
export const ProductDataWeb = async(req, res) => {
    /*Return the whole list of product only with the necessary information deppending on if the user is logged in or not */
    try {
        if (req.body.logged == true) {
            const connection = await connect()
            const [rows] = await connection.query("SELECT p.cod, p.Descripcion, p.EsUnidadOpaquete, (SELECT (SELECT Categoria FROM categoria WHERE IDCategoria = sub.IDCategoria) AS Categoria FROM subcategorias sub WHERE IDSubCategoria = p.subcategoria) AS Categoria, p.PVenta, p.Iva, p.Agotado, p.Detalle FROM productos AS p");
            res.json(rows)
            connection.end()
            }
        else {
            const connection = await connect()
            const [rows] = await connection.query("SELECT p.cod, p.Descripcion, p.EsUnidadOpaquete, (SELECT (SELECT Categoria FROM categoria WHERE IDCategoria = sub.IDCategoria) AS Categoria FROM subcategorias sub WHERE IDSubCategoria = p.subcategoria) AS Categoria, '0' as PVenta, '0' as Iva, p.Agotado, p.Detalle FROM productos AS p");
            res.json(rows)
            connection.end()
        }
    } catch (error) {
        console.log(error)
    }
};

export const ListOfAlias = async(req, res) => {
    /*Return list of alias of the products*/
    try {
        const connection = await connect()
        const [rows] = await connection.query("SELECT Cod, Alias FROM Alias");
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log(error)
    }
};

//Todo: Function for checking if the data of connection is correct.
export const checkLogInData = async (req, res) => {
    /*Check if the data of connection is correct, and if it's then return the data of the user.*/
    try {
      const connection = await connect();  // Assuming you have a connect function
      const [rows] = await connection.query("SELECT Cod, Ferreteria, Contacto, Direccion, Telefono, Cel, Email, Contraseña FROM clientes WHERE Email = ?", [req.body.EmailUser]);
      connection.end();
      
      // Check if the password matches with the password that the user gave
      if (rows.length > 0) {
        const dbPassword = rows[0].Contraseña;  // Use index 0 to access the first row
        //console.log(dbPassword);
        bcrypt.compare(req.body.Password, dbPassword, function(err, result) {
          if (err) {
            // Handle error
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
          } else if (result) {
            // Passwords match
            delete rows[0].Contraseña
            res.json(rows[0]);
            //console.log(rows[0])
          } else {
            // Passwords do not match
            console.log('Password is incorrect');
            res.status(401).json({ error: 'Unauthorized' });
          }
          //connection.end();
        });
      } else {
        // No user found with the provided email
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('entro en este' & error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


//Todo: Function for changind the password.
export const changePassword = async (req, res) => {
    /*Check if the data of connection is correct, and if it's then hash the new password and change it into the database.*/
    try {
      const connection = await connect(); // Assuming you have a connect function
      const [rows] = await connection.query("SELECT Contraseña FROM clientes WHERE Cod = ?", [req.body.CodUser]);
      connection.end();
  
      // Check if the password matches with the password that the user gave
      if (rows.length > 0) {
        const dbPassword = rows[0].Contraseña; // Use index 0 to access the first row
        //console.log(dbPassword);
  
        try {
          const result = await new Promise((resolve, reject) => {
            bcrypt.compare(req.body.Password, dbPassword, function (err, result) {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
  
          if (result) {
            // Passwords match
            //delete rows[0].Contraseña;
            // To hash the new password
            const plainPassword = req.body.NewPassword;
            const hashedPassword = await new Promise((resolve, reject) => {
              bcrypt.hash(plainPassword, 10, function (err, hashedPassword) {
                if (err) {
                  reject(err);
                } else {
                  resolve(hashedPassword);
                }
              });
            });
  
            const connection = await connect();
            const [upRows] = await connection.query("UPDATE clientes SET Contraseña = ? WHERE Cod =  ?", [hashedPassword, req.body.CodUser]);
            res.json(upRows);
            connection.end();
            
          } else {
            // Passwords do not match
            console.log('Password is incorrect');
            res.status(401).json({ error: 'Unauthorized' });
          }
        } catch (err) {
          // Handle errors from bcrypt operations
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      } else {
        // No user found with the provided email
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('entro en este' & error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
