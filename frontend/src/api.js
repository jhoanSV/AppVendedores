const API = 'http://192.168.1.110:3000/tasks';
/*44.209.105.117:80/tasks*/
export const getTasks = async() => {
    const res = await fetch(API)
    return await res.json()
}

export const validateUser = async(validateValueUser) => {
    const res = await fetch(`${API}/validar`,{
        method: 'POST',
        headers: { Accept: 'application/json','Content-Type': 'application/json'},
        body: JSON.stringify(validateValueUser)
    })
    return await res.json()
}

export const SearClientesTodos = async(searchCliente) => {
    const res = await fetch(`${API}/BuscarClientesTodos/${searchCliente}`, {method: 'GET'})
    return await res.json()
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

/*export const consPrefactura = async(nuevoConsecutivo) => {
    const res = await fetch(`${API}/consecutivoPrefactura/${nuevoConsecutivo}`, {method: 'POST'})
    return res
}*/
