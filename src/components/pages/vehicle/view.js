//IMPORTAÇÕES BIBLIOTECAS REACT
import Table from 'react-bootstrap/Table';
import { axiosApi} from '../../../services/axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TbListSearch} from 'react-icons/tb';

function VehicleView() {
 //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);

 //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE VEICULOS CADASTRADOS
  useEffect(() => {
    axiosApi.get("/list_vehicle")
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
      });

  }, [])
  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>PLACA:</th>
            <th>FROTA/DESCRIÇÃO:</th>
            <th>TIPO:</th>
            <th>CLIENTE:</th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          {registros.map((registro, key) => {
            return (
              <tr key={key}>
                <td>{registro.placa}</td>
                <td>{registro.frota}</td>
                <td>{registro.tipo}</td>
                <td>{registro.nome}</td>
                <td> <Link className='btn-secondary' to={{ pathname: `/vehicle/form/${registro.id}` }}> <button className='card-service-btn btn color-theme-background'>Exibir</button> </Link></td>
              </tr>
            )
          })}

        </tbody>
      </Table>
    </>
  );
}

export default VehicleView