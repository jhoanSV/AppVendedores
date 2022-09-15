const API = 'http://192.168.1.107:3000/tasks';

export const getTasks = async() => {
    const res = await fetch(API)
    return await res.json()
}

export const SearchTasks = async(searchTasks) => {
    const res = await fetch(`${API}/search/${searchTasks}`, {method: 'GET'})
    return await res.json()
}