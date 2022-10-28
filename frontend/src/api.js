const API = 'http://192.168.1.104:3000/tasks';

export const getTasks = async() => {
    const res = await fetch(API)
    return await res.json()
}

export const SearchTasks = async(searchTasks) => {
    const res = await fetch(`${API}/search/${searchTasks}`, {method: 'GET'})
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

export const getClientes = async(obtenerClientes) => {
    const res = await fetch(`${API}/BuscarClientes`,{
        method: 'POST',
        headers: { Accept: 'application/json','Content-Type': 'application/json'},
        body: JSON.stringify(obtenerClientes)
    })
    return await res.json()
}

export const SearClientesTodos = async(searchCliente) => {
    const res = await fetch(`${API}/BuscarClientesTodos/${searchCliente}`, {method: 'GET'})
    return await res.json()
}
