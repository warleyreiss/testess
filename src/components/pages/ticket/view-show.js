//IMPORTAÇÕES BIBLIOTECAS REACT
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form';
import CardGroup from 'react-bootstrap/CardGroup'
import { Link, useParams } from 'react-router-dom';
import { axiosApi } from '../../../services/axios';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

function TicketShow() {

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState('');

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DOS REGISTRO DO TICKET 
  useEffect(() => {
    axiosApi.get("/ticket_show/" + id)
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
              <Card.Title>DETALHAMENTO DO TICKET DE FATURAMENTO </Card.Title>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Form.Group className="" >
              <h5 className='bg-light2'>DADOS PRINCIPAIS:</h5>
              <div className="bg-light">SERVICO DE REFEREÊNCIA: <Link className='link-table' to={{ pathname: `/service/show/${registros.servico_id}` }}>{registros.servico_id}</Link></div>
              <div className="bg-light">ORDEM DE SERVIÇO DE REFERÊNCIA:<Link className='link-table' to={{ pathname: `/ordem-de-servico/show/${registros.ordem_servico_id}` }}>{registros.ordem_servico_id}</Link> </div>
              <div className="bg-light">TIPO: {registros.tipo}</div>
              <div className="bg-light">SETOR: {registros.setor}</div>
              <div className="bg-light">QUANTIDADE: {registros.quantidade} </div>
              <div className="bg-light">UNIDADE: {registros.unidade}</div>
              <div className="bg-light">VALOR:{' R$: '} <strong>{registros.valor}</strong> </div>
              <div className="bg-light">DESCRIÇÃO: {registros.descricao}</div>
              <div className="bg-light">OBSERVAÇÃO: {registros.observacao}</div>
              <div className="bg-light">DATA DE REGISTRO: {registros.data_registro}</div>
              <div className="bg-light">DATA DE LIBRAÇÃO: {registros.data_liberacao}</div>
              <div className="bg-light">DATA DE FATURAMENTO: {registros.data_faturamento}</div>
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            {/* <Link to={{ pathname: `/ticket/return/${id}` }}>
              <Button variant="primary float-right" size="sm">Retornar</Button>
            </Link>
  */}
          </Card.Footer>
        </Card>
      </CardGroup>
    </>
  );
}

export default TicketShow  