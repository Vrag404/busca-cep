import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import api from './services/api';
import './styles.css'

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  const handleChange = (e) => {
    setInput(e.target.value);
  }

   const handleSearch = async () => {
      if (input === '') {
        alert('O campo não pode estar vazio.')
        return;
      }

      try {
        const response = await api.get(`${input}/json`);
        setCep(response.data)
        setInput('');
        
        if (Object.keys(response.data).length === 1) {
          alert("Verifique o campo preenchido e tente novamente!");
        }
      } catch {
        alert('O cep não existe!')
        setInput('');
      }
  }

  return (
    <div className="container">
      <h1 className='title'>BuscaCep</h1>
        <div className='containerInput'>
          <input type='text' placeholder='Digite seu cep...' value={input} onChange={handleChange} />

          <button className="buttonSearch" onClick={handleSearch}>
            <FiSearch size={25} color='#FFF' />
            </button>
        </div>

      {Object.keys(cep).length > 1 && (
        <main className='main'>
        <h2>Cep: {cep.cep}</h2>

        <span title='Rua'>{cep.logradouro}</span>
        {cep.complemento !== '' && <span>Complemento: {cep.complemento}</span>}
        <span title='Bairro'>{cep.bairro}</span>
        <span title='Cidade e Estado'>{cep.localidade} - {cep.uf}</span>
      </main>
      )}

      <footer className='footer'>
        <p>
        Criado por <a href='https://www.linkedin.com/in/diegohoc/' rel='noreferrer' target='_blank'>Diego Costa</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
