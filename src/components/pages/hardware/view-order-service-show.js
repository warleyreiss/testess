//IMPORTAÇÕES BIBLIOTECAS REACT
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form';
import CardGroup from 'react-bootstrap/CardGroup'
import Figure from 'react-bootstrap/Figure';
import { axiosApi} from '../../../services/axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function HardwareOrderOfServiceShow() {

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState('');

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
  useEffect(() => {
    axiosApi.get("/hardware/order_service_show/" + id)
      .then((response) => {
        setRegistros(response.data)
        console.log(response.data)
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
              <Card.Title>DETALHAMENTO DA ORDEM DE SERVIÇO Nº {registros.id}</Card.Title>
              <div></div>
            </Stack>
          </Card.Header>
          <Card.Body>

          <Form.Group className="div-show" >
            <h5 className='bg-light2'>DADOS PRINCIPAIS:</h5>
            <div className="bg-light">NÚMERO SÉRIE:  {registros.numero_serie}</div>
            <div className="bg-light">TIPO: {registros.tipo}</div>
            <div className="bg-light">INÍCIO DA INSPEÇÃO: {registros.inicio_inspecao}</div>
            <div className="bg-light">TÉRMINO DA INSPEÇÃO: {registros.termino_inspecao}</div>
            <div className="bg-light">DURAÇÃO DA INSPEÇÃO: {registros.duracao_inspecao}</div>
            <div className="bg-light">OBSERVAÇÕES FEITAS DURANTE INSPEÇÃO: {registros.observacao_inspecao}</div>
            <div className="bg-light">INÍCIO DA MANUTENÇÃO {registros.inicio_manutencao}</div>
            <div className="bg-light">TÉRMINO DA MANUTENÇÃO {registros.termino_manutencao}</div>
            <div className="bg-light">DURAÇÃO DA MANUTENÇÃO {registros.duracao_manutencao}</div>
            <div className="bg-light">OBSERVAÇÕES FEITAS DURANTE MANUTENÇÃO: {registros.observacao_manutencao}</div>
          </Form.Group>
          
          </Card.Body>
          <Card.Footer className="text-muted">

          </Card.Footer>
        </Card>
      </CardGroup>
    </>
  );
}

export default HardwareOrderOfServiceShow