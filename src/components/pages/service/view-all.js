//IMPORTAÇÕES BIBLIOTECAS REACT
import { axiosApi} from '../../../services/axios';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
function ServiceAll() {

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);

   //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE SERVICOS 
  useEffect(() => {
    axiosApi.get("/list_service_all")
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
      });
  }, [])
  
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <th>Nº SERVIÇO:</th>
        <th>CLIENTE:</th>
        <th>ÍNICIO:</th>
        <th>TERMINO:</th>
        <th>STATUS:</th>
      </thead>
      <tbody>
        {registros.map((registro, key) => {
          return (
            <tr key={key} className='clickable'>
              <td>{registro.id}</td>
              <td>{registro.nome}</td>
              <td>{registro.inicio}</td>
              <td>{registro.termino}</td>
              <td>{registro.status_descricao}</td>
              <td>
                <Link className='link-card' to={{ pathname: `/service/show/${registro.id}`}} >
                <button className='card-service-btn btn color-theme-background'>Exibir</button>
                </Link>
              </td>
            </tr>
          )

        })}
      </tbody>
    </Table>
  );
}

export default ServiceAll