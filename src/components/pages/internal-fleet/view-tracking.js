//IMPORTAÇÕES BIBLIOTECAS REACT
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack'
import Card from 'react-bootstrap/Card'
import { Link, useParams } from 'react-router-dom';
import { axiosApi } from '../../../services/axios';
import { useState, useEffect } from 'react';

function InternalFleetTracking() {

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DO HISTÓRICO DE MOVIMENTO DE UM EQUIPAMENTO ESPECÍFICO
  useEffect(() => {
    axiosApi.get("/list_movement_Internal_fleet/" + id)
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
      });
  }, [])

  return (
    <>
      <Nav className='timeline' as="ul">
        {registros.map((registro, key) => {
          return (
            <Nav.Item className='timeline-item' as="li">

              <Card className="line" >

                <Card.Body>
                  <Stack direction="horizontal" gap={2}>
                    <Card.Title>{registro.motivo}</Card.Title>
                  </Stack>
                  <Card.Text>
                    <Stack gap={2}>
                      <Link  to={{ pathname: `/internal-fleet/transfer/show/${registro.id}` }} style={{'color':'black'}}>
                        <div className="bg-light">QUILOMETRAGEM: {registro.km_atual}</div>
                        <div className="bg-light">USUÁRIO: {registro.nome_usuario}</div>
                        <div className="bg-light">DATA: {registro.data_registro}</div>
                      </Link>
                    </Stack>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Nav.Item>
          )

        })}
     


    </Nav >
    </>
  );
}

export default InternalFleetTracking