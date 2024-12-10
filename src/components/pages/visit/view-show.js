//IMPORTAÇÕES BIBLIOTECAS REACT
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form';
import CardGroup from 'react-bootstrap/CardGroup'
import { axiosApi} from '../../../services/axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function VisitShow() {
   //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const {id}  = useParams();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState('');

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
  useEffect(() => {
    axiosApi.get("/visite_show/"+ id)
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
      });

  }, [])
                          
    return (
      <>
      <CardGroup>

        <Card >
          <Card.Header>
            <Stack direction="horizontal" gap={2}>
              <Card.Title>DETALHAMENTO DA VISITA Nº</Card.Title>
              <div></div>
            </Stack>
          </Card.Header>
          <Card.Body>
           
            <Form.Group className="" >
              <Form.Label>DATA/HORA INÍCIO:  {registros.inicio}</Form.Label>
            </Form.Group>
            <Form.Group className="" >
              <Form.Label>DATA/HORA TERMMINO: {registros.termino}</Form.Label>
            </Form.Group>
            <Form.Group className="" >
              <Form.Label>DURAÇÃO TOTAL: {registros.duracao}</Form.Label>
            </Form.Group>
            <Form.Group className="" >
              <Form.Label>PREVISTO HOSPEDAGEM: {registros.hospedagem}</Form.Label>
            </Form.Group>
            <Form.Group className="" >
              <Form.Label>PREVISTO ALIMENTAÇÃO: {registros.alimentacao}</Form.Label>
            </Form.Group>
            <Form.Group className="" >
              <Form.Label>DESLOCAMENTO (km): {registros.distancia}</Form.Label>
            </Form.Group>
            <Form.Group className="" >
              <Form.Label>PREVISTO USO DE FROTA INTERNA:{registros.veiculo}</Form.Label>
            </Form.Group>
            <Form.Group className="" >
              <Form.Label>AJUSTADO MANUALMENTE:{registros.ajuste}</Form.Label>
            </Form.Group>
            <Form.Group className="" >
              <Form.Label>JUSTIFICATIVA POR EXECER HORÁRIO:{registros.justificativa}</Form.Label>
            </Form.Group>
          </Card.Body>
          <Card.Footer className="text-muted">

          </Card.Footer>
        </Card>
      </CardGroup>
    </>
    );
  }

  export default VisitShow