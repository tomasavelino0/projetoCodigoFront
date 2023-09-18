import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { deleteAll, postJogador } from '../utils/api';

function Body() {
  const [ novoJogador, setNovoJogador ] = useState('');
  const [addJogadorHandle, setAddJogadorHandle] = useState(false);

  const newJogadorHandle = async (nome) => {
    const newPlayer = await postJogador(nome)
    console.log(newPlayer)
    if (newPlayer === 201) {
      setAddJogadorHandle(true);
    }
    return false;
  }

  return (
    <Navbar className="bg-body-tertiary justify-content-between">
      <div>
          <h4>Adicionar um jogador :</h4>
          <input
            onChange={(e) => setNovoJogador(e.target.value)}
            placeholder="ex: tomas avelino"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        <Button onClick={() => newJogadorHandle(novoJogador)} variant="success">Adicionar</Button>
        <br />
        {addJogadorHandle ? (<p>Jogador Adicionado!</p>) : null}
      </div>
      <div>
          <h4>Gerar times por sobrenome</h4>
          <Button variant="success">Gerar</Button>
      </div>
      <div>
          <h4>Excluir todos jogadores</h4>
          <Button onClick={() => deleteAll()} variant="success">Excluir</Button>
      </div>
    </Navbar>
  );
}

export default Body;