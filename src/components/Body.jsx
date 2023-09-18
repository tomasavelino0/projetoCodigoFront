import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { deleteAll, getTimes, postJogador } from '../utils/api';
import axios from 'axios'

function Body() {
  const [ novoJogador, setNovoJogador ] = useState('');
  const [ addJogadorHandle, setAddJogadorHandle ] = useState(0);
  const [ times, setTimes ] = useState([]);
  const [ deleteAllHandle, setDeleteAllHandle ] = useState(false);

  const getTimesUrl = 'https://projetocodigo-production.up.railway.app/times'
  useEffect(() => {
    async function getTimesData() {
      try {
        const response = await axios.get(getTimesUrl);
        const data = response.data;
        setTimes(data);
      } catch (error) {
        console.error('Erro ao buscar os times:', error);
      }
    }

    getTimesData();
  }, [deleteAllHandle]);

  const newJogadorHandle = async (nome) => {
    const newPlayer = await postJogador(nome)
    if (newPlayer === 201) {
      setAddJogadorHandle(1);
    } else {
      setAddJogadorHandle(2);
    }
    return null;
  }

  const deleteHandle = async () => {
    await deleteAll();
    setDeleteAllHandle(!deleteAllHandle)
    return null
  }


  return (
    <>
    <Navbar className="bg-body-tertiary justify-content-between">
      <div>
          <h4>Adicionar um jogador:</h4>
          <input
            onChange={(e) => setNovoJogador(e.target.value)}
            placeholder="ex: tomas avelino"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        <Button onClick={() => newJogadorHandle(novoJogador)} variant="success">Adicionar</Button>
        <br />
        {addJogadorHandle ? <p>Jogador Adicionado!</p> : null}
      </div>
      <div>
          <h4>Gerar times por sobrenome</h4>
          <Button onClick={async () => setTimes(await getTimes())} variant="success">Gerar</Button>
      </div>
      <div>
          <h4>Excluir todos jogadores</h4>
          <Button onClick={deleteHandle} variant="success">Excluir</Button>
      </div>
    </Navbar>
    {times && (<div className='container-times'>
      <h2>Tabela de Times</h2>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Jogadores</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(times).map(([time, jogadores]) => (
            <tr key={time}>
              <td>{`${time} :`}</td>
              <td>{jogadores.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>)}
    </>  
  );
}

export default Body;