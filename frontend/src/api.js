const API = 'http://44.209.105.117:80/tasks';

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