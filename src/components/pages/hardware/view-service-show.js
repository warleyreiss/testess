//IMPORTAÇÕES BIBLIOTECAS REACT
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form';
import CardGroup from 'react-bootstrap/CardGroup'
import { axiosApi } from '../../../services/axios';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Row, Table } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';

function HardwareServiceShow() {
  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();
//CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
const navigate = useNavigate()
  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState('');
  const [ordemServicos, setOrdemServicos] = useState([]);
  const [tickets, setTickets] = useState([]);
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DOS DADOS DO REGISTRO DO SERVICO
  useEffect(() => {
    //REQUISIÇÃO COM A BIBLIOTECA AXIOS
    axiosApi.get("/hardware/service_show/" + id)
      .then((response) => {
        setRegistros(response.data.service)
       setOrdemServicos(response.data.ordem_service)
       setTickets(response.data.tickets)
      })
      .catch(function (error) {
      });
  }, [])

  const concluir = (id)=>{
    axiosApi.patch('/hardware/service/finalize/'+id)
    .then(function (response) {
      toast(response.data.msg)
      navigate(-1)
    })
    .catch(function (error) {
    });
  }
  const retornar = (id)=>{
    console.log('ol')
    axiosApi.patch('/hardware/order_service/return/'+id)
    .then(function (response) {
      toast(response.data.msg)
    })
    .catch(function (error) {
    });
  }
  return (
    <>
      <CardGroup>
        <Card >
          <Card.Header>
            <Stack direction="horizontal" gap={2}>
              <Card.Title>
              <h5>
              DETALHAMENTO DO SERVIÇO<Badge className='float-right'style={{'position': 'absolute', 'right': '20px'}} bg="secondary">{registros.id}</Badge>
              </h5>
              </Card.Title>
              </Stack>
          </Card.Header>
          <Card.Body>
            <Form.Group className="div-show" >
              <h5 className='bg-light2'>DADOS PRINCIPAIS:</h5>
              <div className="bg-light">CLIENTE: {registros.nome}</div>
              <div className="bg-light">DATA SOLICITAÇÃO: {registros.data}</div>
            </Form.Group>

            <Form.Group className="div-show" >
              <h5 className='bg-light2'>ORDENS DE SERVIÇOS:</h5>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>NÚMERO SÉRIE:</th>
                    <th>EQUIPAMENTO:</th>
                    <th>TEMPO INSPEÇÃO:</th>
                    <th>TEMPO MANUTENÇÃO:</th>
                    <th>STATUS:</th>
                    <th>OPÇÕES</th>
                  </tr>
                </thead>
                <tbody>

                  {ordemServicos.map((registroOS, key) => {
                  
                    return (
                      <tr>
                        <td>{registroOS.numero_serie}</td>
                        <td>{registroOS.tipo}</td>
                        <td>{registroOS.duracao_inspecao}</td>
                        <td>{registroOS.duracao_manutencao}</td>
                        <td>{registroOS.status_descricao}</td>
                        <td>
                          <Link to={{ pathname: `/hardware/ordem-de-servico/show/${registroOS.id}` }}>
                            <button className='card-service-btn btn color-theme-background'>Exibir</button>
                          </Link>
                            <button className='card-service-btn btn color-theme-background' onClick={(e)=>retornar(registroOS.id)}>Retornar</button>
                        

                        </td>
                      </tr>
                    )

                  })}
                </tbody>
              </Table>

            </Form.Group>
            <Form.Group className="div-show" >
              <h5 className='bg-light2'>TICKETS GERADOS:</h5>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>DESCRIÇÃO:</th>
                    <th>OBSERVAÇÃO</th>
                    <th>QDADE:</th>
                    <th>VALOR:</th>
                    <th>STATUS:</th>
                  </tr>
                </thead>
                <tbody>

                  {tickets.map((registro, key) => {
                  
                    return (
                      <tr>
                        <td>{registro.descricao}</td>
                        <td>{registro.observacao}</td>
                        <td>{registro.quantidade +' '+ registro.unidade}</td>
                        <td>{registro.valor}</td>
                        <td>{registro.status_ticket}</td>
                        <td>
                          <Link to={{ pathname: `/ticket/show/${registro.id}` }}>
                            <button className='card-service-btn btn color-theme-background'>Exibir</button>
                          </Link>
                        </td>
                      </tr>
                    )

                  })}
                </tbody>
              </Table>

            </Form.Group>
          
          </Card.Body>

          <Card.Footer className="text-muted">
            <Form.Group className="">
              
              <Link className='float-right' onClick={e => concluir(registros.id)} >
                <Button className="card-service-btn" variant="outline-primary" as="input" type="button" value="Concluir" />
              </Link>

            </Form.Group>
          </Card.Footer>
        </Card>
      </CardGroup>
    </>
  );
}

export default HardwareServiceShow