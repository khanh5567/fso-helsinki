import axios from "axios";
const URL = "/api/persons";

const getAll = () => {
  return axios.get(URL).then((res) => res.data);
};

const createPerson = (person) => {
  return axios.post(URL, person).then((res) => res.data);
};

const deletePerson = (id) => {
  return axios.delete(`${URL}/${id}`);
};

const updatePerson = (id, person) => {
  return axios.put(`${URL}/${id}`, person).then((res) => res.data);
};

export default { getAll, createPerson, deletePerson, updatePerson };
