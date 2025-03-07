
import './App.css'
import  { useEffect, useState } from 'react';
import axios from 'axios';
import Logo from './assets/Logo.png'
import { HiOutlineSearch } from "react-icons/hi";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";



function App() {
  const [employees, setEmployees] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [ativar, setAtivar] = useState(null)
 
  useEffect(() => {
    axios.get('http://localhost:3000/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => console.error('Erro ao carregar os dados:', error));
  }, []);

  
  const filteredEmployees = employees.filter(employee => {
    return (
      employee.name.toLowerCase().includes(filtro.toLowerCase()) ||
      employee.job.toLowerCase().includes(filtro.toLowerCase()) ||
      employee.phone.includes(filtro)
    );
  });

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatoFone = (fone) => {
    return fone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const verinfo = (id) => {
    setAtivar(ativar === id ? null : id)
  }

 

  

  return (
    <div className='container'>

      <div className="header">
        <img className='logo' src={Logo} alt="Logo" />
      </div>

      <div className="search">

        <h1>Funcionários</h1> 
        <div className="searchInput">
          <input
           type="text"
           placeholder="Pesquisar"
           value={filtro}
           onChange={(e) => setFiltro(e.target.value)}/>
         <HiOutlineSearch className='searchIcon'/>
        </div>
      </div>

      <table>
        
        <thead>
          <tr >
            <th className='th1' >FOTO</th>
            <th className='th2' >NOME</th>
            <th className='th3' >CARGO</th>
            <th className='th3' >DATA DE ADMISSÃO</th>
            <th className='th3' >TELEFONE</th>
            <th className="ponto">
              <div className="ball"></div>
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.map(employee => (
          <tr key={employee.id} >

             <td className='th1' >
              <img style={{ borderRadius: '100px' }} src={employee.image} alt={employee.name} width="50" />
              </td>

              <td className='th2' >{employee.name}  </td>
              <td className='th3' >{employee.job}</td>
              <td className='th3' >{formatDate(employee.admission_date)}</td>
              <td className='th3' >{formatoFone(employee.phone)}</td>

              <td className='button'>
              <button className={`botao ${ativar === employee.id ? 'ativo' : ''}`}
               onClick={() => verinfo(employee.id)}
               >
                {ativar === employee.id ? <FaChevronUp size={18} color="grey"/> : <FaChevronDown size={18} color="grey"/>}                  
              </button> 
              </td>              

              <td className='exibir'>
                {ativar === employee.id && (
                  <div >
                    <p><strong>Cargo:</strong> {employee.job} </p>
                    <p><strong>Admissão:</strong> {formatDate(employee.admission_date)}</p>
                    <p><strong>Telefone:</strong> {formatoFone(employee.phone)}</p>
                  </div>
                )} 
              </td>
            </tr>
            
          ))}

        </tbody>
        
       </table>      
    </div>
  );
}

export default App;

