import axios from "axios";

const postUrlJogador = 'https://projetocodigo-production.up.railway.app/jogador';
const getTimesUrl = 'https://projetocodigo-production.up.railway.app/times'
const deleteAllUrl = 'https://projetocodigo-production.up.railway.app/jogador/all'


const APP_JSON = 'application/json'; 

async function postJogador(name) {
  const config = {
        headers: {
          'Content-Type': APP_JSON,
        },
      };  

  const request = await axios.post(postUrlJogador, {
        nome: `${name}`
    }, config);
  const response = await request.status
  return response
}

async function getTimes() {
    const request = await axios.get(getTimesUrl);
    const response = request.status
    return response.status
}

async function deleteAll() {
    const request = await axios.delete(deleteAllUrl);
    const response = await request.status
    return response
}

export  { postJogador, getTimes, deleteAll };
  