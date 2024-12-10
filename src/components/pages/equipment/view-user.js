//IMPORTAÇÕES BIBLIOTECAS REACT
import Table from 'react-bootstrap/Table';
import { axiosApi} from '../../../services/axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EquipmentUser() {

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE EQUIPAMENTOS EM POSSE DE UM USUÁRIO ESPECÍFICO
  useEffect(() => {
    axiosApi.get("/list_equipment_user/" + id)
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
          <th>ID:</th>
          <th>TIPO:</th>
          <th>STATUS:</th>
          <th></th>
        </thead>
        <tbody>
          {registros.map((registro, key) => {
            return (
              <tr key={key}>
                <td>{registro.identificador}</td>
                <td>{registro.tipo}</td>
                <td>{registro.status_descricao}</td>
              </tr>
            )

          })}
        </tbody>
      </Table>
    </>
  );
}

export default EquipmentUser