import axios from "axios";
const URL = "http://localhost:3001/persons";

const getAll = () => {
    return axios.get(URL).then(res => res.data)
}

const createPerson = (person) => {
    return axios.post(URL, person).then(res => res.data)
}

const deletePerson = (id) => {
    return axios.delete(`${URL}/${id}`)
}

export default
{getAll, createPerson, deletePerson}