import axios from 'axios';

//   -> IP MALA http://localhost:5000/
const baseURL = 'https://tfg-backend-78af82b81332.herokuapp.com/'; // La URL de tu servidor Flask

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
    },
    encriptarDataDocs(datos) {
        return axios.post(`${baseURL}/encriptarDocs256`, { datos });
    }
};

export default apiService;
