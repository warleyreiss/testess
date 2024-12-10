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

function ServiceShow() {
  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState('');
  const [ordemServicos, setOrdemServicos] = useState([]);
  const [visitas, setVisitas] = useState([]);
  const [ajuste, setAjuste] = useState(false);
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DOS DADOS DO REGISTRO DO SERVICO
  useEffect(() => {
    //REQUISIÇÃO COM A BIBLIOTECA AXIOS
    axiosApi.get("/service_show/" + id)
      .then((response) => {
        setRegistros(response.data.service)
        setOrdemServicos(response.data.ordem_service)
        setVisitas(response.data.visit)
      })
      .catch(function (error) {
      });
  }, [])

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Ajustada manualmente
    </Tooltip>
  );
  return (
    <>
      <CardGroup>
        <Card >
          <Card.Header>
            <Stack direction="horizontal" gap={2}>
              <Card.Title>DETALHAMENTO DO SERVIÇO</Card.Title>
              <div>{registros.id}</div>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Form.Group className="div-show" >
              <h5 className='bg-light2'>DADOS PRINCIPAIS:</h5>
              <div className="bg-light">CHAMADO: {registros.chamado}</div>
              <div className="bg-light">CLIENTE: {registros.nome}</div>
              <div className="bg-light">INÍCIO: {registros.inicio}</div>
              <div className="bg-light">TURNO DE TRABALHO: {registros.turno}</div>
              <div className="bg-light">MOTIVO CANCELAMENTO (SE APLICAVEL): {registros.motivo_cancelamento}</div>
              <div className="bg-light">DATA DE FINALIZAÇÃO: {registros.data_finalizado}</div>
              <div className="bg-light">ORIENTAÇÕES REPASSADAS PARA EXECUÇÃO DESTE SERVIÇO: {registros.observacao}</div>
            </Form.Group>

            <Form.Group className="div-show" >
              <h5 className='bg-light2'>ORDENS DE SERVIÇOS:</h5>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>TIPO:</th>
                    <th>PRODUTO:</th>
                    <th>VEÍCULO</th>
                    <th>EXECUTANTE:</th>
                    <th>OPÇÕES</th>
                  </tr>
                </thead>
                <tbody>

                  {ordemServicos.map((registroOS, key) => {
                    let hiddeButton2 = (registroOS.status == "1" || registroOS.status == "2");
                    let canceled = (registroOS.status == "0")? 'cancelado':'';
                    return (
                      <tr className={canceled}>
                        <td>{registroOS.tipo}</td>
                        <td>{registroOS.produto}</td>
                        <td>{registroOS.placa + "/ " + registroOS.frota}</td>
                        <td>{registroOS.nome}</td>
                        <td>
                          <Link to={{ pathname: `/ordem-de-servico/show/${registroOS.id}` }}>
                            <button className='card-service-btn btn color-theme-background'>Exibir</button>
                          </Link>
                          <Link to={{ pathname: `/ordem-de-servico/cancel/${registroOS.id}` }} hidden={!hiddeButton2} >
                            <button className='card-service-btn btn color-theme-background'>Excluir</button>
                          </Link>
                          <span>{canceled }</span>

                        </td>
                      </tr>
                    )

                  })}
                </tbody>
              </Table>

            </Form.Group>
            <Form.Group className="div-show" >
              <h5 className='bg-light2'>VISITAS REALIZADAS:</h5>
              <Table striped bordered hover size="sm">

                <thead>
                  <tr>
                    <th>INÍCIO:</th>
                    <th>TERMINO:</th>
                    <th>VISITANTE:</th>
                    <th>OPÇÕES</th>
                  </tr>
                </thead>
                <tbody>

                  {visitas.map((visita, key) => {
                    let hiddeButton = (visita.ajuste != 'true');
                    return (
                      <tr>
                        <td>{visita.inicio}</td>
                        <td>{visita.termino}
                          <span hidden={hiddeButton}>
                            <OverlayTrigger
                              placement="right"
                              delay={{ show: 250, hide: 400 }}
                              overlay={renderTooltip}
                            >
                              <Button variant="outline-warning" size="sm"> <AiOutlineExclamationCircle /> </Button>
                            </OverlayTrigger>
                          </span>
                        </td>
                        <td>{visita.nome}</td>
                        <td>
                          <Link to={{ pathname: `/visit/show/${visita.id}` }}>
                            <button className='card-service-btn btn color-theme-background'>Ver visita</button>
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
              <Link className='link-card' to={{ pathname: `/service/cancel/${registros.id}` }} >
                <Button className="card-service-btn" variant="outline-danger" as="input" type="button" value="Cancelar" />
              </Link>
              <Link className='link-card' to={{ pathname: `/service/finalize/${registros.id}` }} >
                <Button className="card-service-btn" variant="outline-primary" as="input" type="button" value="Concluir" />
              </Link>

            </Form.Group>
          </Card.Footer>
        </Card>
      </CardGroup>
    </>
  );
}

export default ServiceShow