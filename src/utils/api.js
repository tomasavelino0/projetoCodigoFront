import axios from "axios";

const baseUrl = 'https://projetocodigo-production.up.railway.app/jogador';

async function postJogador(name) {
  const request = await axios.post(baseUrl, {
        nome: `${name}`
    });
  return request.status;
}

export default postJogador;
  