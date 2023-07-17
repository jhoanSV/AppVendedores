const API = 'http://44.209.105.117:80/tasks';
/*44.209.105.117:80/tasks*/
export const getTasks = async() => {
    try {
        const res = await fetch(API)
        return await res.json()
    }catch(error) {
        console.log(error)
    }
}

export const validateUser = async(validateValueUser) => {
    try {
        const res = await fetch(`${API}/validar`,{
            method: 'POST',
            headers: { Accept: 'application/json','Content-Type': 'application/json'},
            body: JSON.stringify(validateValueUser)
        })
        return await res.json()
    }catch(error) {
        console.log(error)
    }
}

export const SearClientesTodos = async(searchCliente) => {
    try {
        const res = await fetch(`${API}/BuscarClientesTodos/${searchCliente}`, {method: 'GET'})
        return await res.json()
    }catch(error) {
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
