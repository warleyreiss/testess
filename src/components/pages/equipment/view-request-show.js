//IMPORTAÇÕES BIBLIOTECAS REACT
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form';
import CardGroup from 'react-bootstrap/CardGroup'
import { axiosApi } from '../../../services/axios';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Row, Table } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

function RequestShow() {
  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState('');
  const [movimentoInsumos, setMovimentosInsumos] = useState([]);
  const [movimentoEquipamentos, setMovimentosEquipamentos] = useState([]);
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DOS DADOS DO REGISTRO DO SERVICO
  useEffect(() => {
    //REQUISIÇÃO COM A BIBLIOTECA AXIOS
    axiosApi.get("/request_show/" + id)
      .then((response) => {
        setRegistros(response.data.registro)
        setMovimentosInsumos(response.data.insumos)
        setMovimentosEquipamentos(response.data.equipamentos)
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
              <Card.Title>DETALHAMENTO DO CHAMADO ATENDIDO:</Card.Title>
              <div>{registros.id}</div>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Form.Group className="div-show" >
              <h5 className='bg-light2'>DADOS PRINCIPAIS:</h5>
              <div className="bg-light">CHAMADO: {registros.chamado}</div>
              <div className="bg-light">REQUISITANTE: {registros.nomeusuario}</div>
              <div className="bg-light">CLIENTE: {registros.nomecliente}</div>
              <div className="bg-light">DATA: {registros.data}</div>
            </Form.Group>


            <Form.Group className="div-show" >
              <h5 className='bg-light2'>EQUIPAMENTOS TRANSFERIDOS:</h5>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>TIPO:</th>
                    <th>Nº SÉRIE:</th>
                    <th>IDENTIFICADOR:</th>
                  </tr>
                </thead>
                <tbody>

                  {movimentoEquipamentos.map((equipamento, key) => {
                    return (
                      <tr>
                        <td>{equipamento.tipo}</td>
                        <td>{equipamento.numero_serie}</td>
                        <td>{equipamento.identificador}</td>
                      </tr>
                    )

                  })}
                </tbody>
              </Table>

            </Form.Group>
            <Form.Group className="div-show" >
              <h5 className='bg-light2'>INSUMOS/PERIFÉRICOS FORNECIDOS:</h5>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>TIPO:</th>
                    <th>QDADE.:</th>
                  </tr>
                </thead>
                <tbody>

                  {movimentoInsumos.map((equipamento, key) => {
                    return (
                      <tr>
                        <td>{equipamento.item}</td>
                        <td>{equipamento.quantidade}</td>
                      </tr>
                    )

                  })}
                </tbody>
              </Table>

            </Form.Group>

          </Card.Body>

        </Card>
      </CardGroup>
      
    </>
  );
}

export default RequestShow