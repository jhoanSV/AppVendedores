//const API = 'http://44.209.105.117:80/tasks';
const API = 'http://192.168.101.15:3100/app';
const API_INT = 'http://192.168.101.15:5000/int';
/*44.209.105.117:80/tasks*/
export const getTasks = async() => {
    try {
        const res = await fetch(API)
        return await res.json()
    }catch(error) {
        console.log(error)
    }
}

export const checkLogindDataApi = async(validateValueUser) => {
    try {
        const res = await fetch(`${API_INT}/checklogindata`,{
            method: 'POST',
            headers: { Accept: 'application/json','Content-Type': 'application/json'},
            body: JSON.stringify(validateValueUser)
        })
        return await res.json()
    }catch(error) {
        alert(`error al validar usuario: ${error} ${API}`);
        console.log(error)
    }
}

export const getProductDetailAllApi = async(parametros) => {
    /*const res = await fetch(`${API}/con`, {method: 'POST'})
    return await res.json()*/
    try {
        const res = await fetch(`${API}/getProductDetailAll`,{
            method: 'POST',
            headers: { Accept: 'application/json','Content-Type': 'application/json'},
            body: JSON.stringify(parametros)
        })
    return await res.json()
    }catch(error) {
        console.log(error)
    }
}

/*export const validateUser = async(validateValueUser) => {
    try {
        const res = await fetch(`${API}/validar`,{
            method: 'POST',
            headers: { Accept: 'application/json','Content-Type': 'application/json'},
            body: JSON.stringify(validateValueUser)
        })
        return await res.json()
    }catch(error) {
        alert(`error al validar usuario: ${error} ${API}`);
        console.log(error)
    }
}*/

export const SearClientesTodos = async(searchCliente) => {
    try {
        const res = await fetch(`${API}/BuscarClientesTodos/${searchCliente}`, {method: 'GET'})
        return await res.json()
    }catch(error) {
        alert(`error al buscar clientes: ${error}`);
        console.log(error)
    }
}

export const aTablas = async(parametros) => {
    try {
        const res = await fetch(`${API}/aTablas`,{
            method: 'POST',
            headers: { Accept: 'application/json','Content-Type': 'application/json'},
            body: JSON.stringify(parametros)
        })
    return await res.json()
    }catch(error) {
        console.log(error)
    }
}

export const consecutivos = async(parametros) => {
    /*const res = await fetch(`${API}/con`, {method: 'POST'})
    return await res.json()*/
    try {
        const res = await fetch(`${API}/con`,{
            method: 'POST',
            headers: { Accept: 'application/json','Content-Type': 'application/json'},
            body: JSON.stringify(parametros)
        })
    return await res.json()
    }catch(error) {
        console.log(error)
    }
}

export const pedidosEnviados = async(CodVendedor) => {
    try {
        const res = await fetch(`${API}/PedidosEnviados/${CodVendedor}`, {method: 'GET'})
        return await res.json()
    }catch(error) {
        console.log(error)
    }
}

export const pedidosCerrados = async(CodVendedor) => {
    try {
        const res = await fetch(`${API}/PedidosCerrados/${CodVendedor}`, {method: 'GET'})
        return await res.json()
    }catch(error) {
        console.log(error)
    }
}

export const DetallePedido = async(NPedido) => {
    try {
        const res = await fetch(`${API}/DetallePedidoVendedor/${NPedido}`, {method: 'GET'})
        return await res.json()
    }catch(error){
        console.log(error)
    }
}

export const DatosVentas = async(searchUser) => {
    try {
        const res = await fetch(`${API}/DatosProgreso/${searchUser}`, {method: 'GET'})
        return await res.json()
    }catch(error) {
        console.log(error)
    }
}

export const PedidosPorEntregar = async(searchUser) => {
    try {
        const res = await fetch(`${API}/PedidosPorEntregar/${searchUser}`, {method: 'GET'})
        return await res.json()
    }catch(error) {
        console.log(error)
    }
}

export const DetallePedidoCerrado = async(NDePedido) => {
    try {
        const res = await fetch(`${API}/DetallePedidoCerrado/${NDePedido}`, {method: 'GET'})
        return await res.json()
    }catch(error) {
        console.log(error)
    }
}

export const DetallePedidoEntregas = async(NDePedido) => {
    try {
        const res = await fetch(`${API}/DetallePedidoEntregas/${NDePedido}`, {method: 'GET'})
        return await res.json()
    }catch(error) {
        console.log(error)
    }
}

export const ActualizarProcesoDelPedido = async(DatosActualizar) => {
    try {
        const res = await fetch(`${API}/ActualizarProcesoDelPedido`,{
            method: 'POST',
            headers: { Accept: 'application/json','Content-Type': 'application/json'},
            body: JSON.stringify(DatosActualizar)
        })
        return await res.json()
    }catch(error) {
        console.log(error)
    }
}


export const SubirPedido = async(sale) => {
    try {
        const res = await fetch(`${API}/SendSale`,{
            method: 'POST',
            headers: { Accept: 'application/json','Content-Type': 'application/json'},
            body: JSON.stringify(sale)
        })
        return await res.json()
    }catch(error) {
        console.log(error)
    }
}

export const NewSaleApi = async(saleData) => {
    //Return the list of all the clients
    try {
        const res = await fetch(`${API_INT}/newsale`,{
            method: 'POST',
            headers: { Accept: 'application/json','Content-Type': 'application/json'},
            body: JSON.stringify(saleData)
        })
        return await res.json()
    }catch(error) {
        console.log('TheError NewSaleApi: '+ error)
    }
};
