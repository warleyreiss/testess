//IMPORTAÇÕES BIBLIOTECAS REACT
import Table from 'react-bootstrap/Table';
import { axiosApi} from '../../../services/axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TbListSearch} from 'react-icons/tb';
import { MdTransferWithinAStation} from 'react-icons/md';
import { AiOutlineHistory, AiOutlineSelect} from 'react-icons/ai';
import { AiOutlineSetting} from 'react-icons/ai';
function InternalFleetView() {
 //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);

 //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE VEICULOS CADASTRADOS
  useEffect(() => {
    axiosApi.get("list_internal_fleet")
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
            <th>EM USO:</th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          {registros.map((registro, key) => {
            let dispo;
            if(registro.status=='1'){
              dispo ="Disponível";
            }else{
              dispo =registro.usuario;
            }
            return (
              <tr key={key}>
                <td>{registro.placa}</td>
                <td>{registro.frota}</td>
                <td>{dispo}</td>
                <td> 
                  <Link className='btn-secondary' to={{ pathname: `/internal-fleet/transfer/${registro.id}` }}> <button className='card-service-btn btn color-theme-background'><AiOutlineSelect/> Selecionar</button> </Link>
                  <Link className='btn-secondary' to={{ pathname: `/internal-fleet/tracking/${registro.id}` }}> <button className='card-service-btn btn color-theme-background'> <MdTransferWithinAStation/> Rastrear</button> </Link>
                  {/*
                  <Link className='btn-secondary' to={{ pathname: `/history/internal-fleet/maintenance/${registro.id}` }}> <button className='card-service-btn btn color-theme-background'><AiOutlineHistory/> Serviços</button> </Link>
                  <Link className='btn-secondary' to={{ pathname: `/history/internal-fleet/fuel/${registro.id}` }}> <button className='card-service-btn btn color-theme-background'><AiOutlineHistory/> Abastecimento</button> </Link>
            */}
            </td>
              </tr>
            )
          })}

        </tbody>
      </Table>
    </>
  );
}

export default InternalFleetView