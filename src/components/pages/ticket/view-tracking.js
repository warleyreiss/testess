//IMPORTAÇÕES BIBLIOTECAS REACT
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack'
import Card from 'react-bootstrap/Card'
import { useParams } from 'react-router-dom';
import { axiosApi} from '../../../services/axios';
import { useState, useEffect } from 'react';

function TicketTracking() {

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE REGISTRO DE MOVIEMNTAÇÃO DO TICKET
  useEffect(() => {
    axiosApi.get("/list_movement_ticket/" + id)
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
                      <div className="bg-light">USUÁRIO: {registro.nome}</div>
                      <div className="bg-light">DATA/HORA: {registro.data_registro}</div>
                    </Stack>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Nav.Item>
          )

        })}
      </Nav>
    </>
  );
}

export default TicketTracking