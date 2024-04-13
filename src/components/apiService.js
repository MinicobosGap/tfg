import axios from 'axios';

const baseURL = 'https://encryptdata.netlify.app/.netlify/functions'; // La URL de tu servidor Flask

const apiService = {
    encriptarData(datos) {
        return axios.post(`${baseURL}/encriptar256`, { datos });
    },
    hashearData256(data) {
        return axios.post(`${baseURL}/hashear256`, { data });
    },
    hashearDataBcrypt(data) {
        return axios.post(`${baseURL}/hashearbcrypt`, { data });
    },
    hashearData256Dos(datos) {
        return axios.post(`${baseURL}/hashear256Dos`, { datos });
    }
};

export default apiService;
