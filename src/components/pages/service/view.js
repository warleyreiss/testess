//IMPORTAÇÕES BIBLIOTECAS REACT
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack'
import Table from 'react-bootstrap/Table';
import { AiOutlineEye } from 'react-icons/ai';
import { BsEmojiSunglasses } from 'react-icons/bs'
import { BsFillPlayFill } from 'react-icons/bs';
import { IoPlayForward } from 'react-icons/io5';
import { BiEditAlt } from 'react-icons/bi';
import { TbListSearch } from 'react-icons/tb';
import { axiosApi } from '../../../services/axios';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom'
import { InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AccordionContext from 'react-bootstrap/AccordionContext';
import { MdManageSearch } from "react-icons/md";
import { ProgressSpinner } from 'primereact/progressspinner';
function ServiceView() {

  // CRIANDO INSTANCIA DO REACT CONTEXT
  const { onVisit } = useContext(AuthContext);
  const { onOccurrence } = useContext(AuthContext);
  const { visit } = useContext(AuthContext);
  const { occurrence } = useContext(AuthContext);
  const { endVisit } = useContext(AuthContext);
  const { endOccurrence } = useContext(AuthContext);
  const { userTipo } = useContext(AuthContext);
  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate = useNavigate()

  //CRIANDO USESTATE DA PAGINA
  const [registrosServices, setRegistrosServices] = useState([]);
  const [registrosOrderServices, setRegistrosOrderServices] = useState([]);
  const [hiddenCard, setHiddenCard] = useState(false);
  const [hiddenButtomVisit, setHiddenButtomVisit] = useState(false);
  const [hiddenButtomOccurrence, setHiddenButtomOccurrence] = useState(false);
  const [hiddenButtons, setHiddenButtons] = useState(true);
  const [visibleOccurrence, setVisibleOccurrence] = useState(false);

  const [searchNome, setSearchNome] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [fraseSpinner, setFraseSpinner] = useState('');
  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit, reset /*, formStates:{erros}*/ } = useForm();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () =>

    setShow(true);


  const atualizar = () => {


    //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE SERVICOS EM ABERTO
    axiosApi.get("/list_service")
      .then((response) => {
        setRegistrosServices(response.data)
        setFraseSpinner('Organizando as OS')
        axiosApi.get("/list_ordem_service_active")
          .then((response) => {
            setRegistrosOrderServices(response.data)
          })
          .catch(function (error) {
          });
      })
      .catch(function (error) {
      });

    setSpinner(false)
  }

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE SERVICOS EM ABERTO
  useEffect(() => {

    //STATUS SPINNER
    setSpinner(true)
    setFraseSpinner('Buscando serviços em aberto')
    setTimeout(function () {
      atualizar()
      setFraseSpinner('Organizando as OS')
    }, 3000);
  }, [])

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE ORDEM DE SERVICO != CANCELADA
  useEffect(() => {
    axiosApi.get("/list_ordem_service_active")
      .then((response) => {
        setRegistrosOrderServices(response.data)
      })
      .catch(function (error) {
      });
  }, [])

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA verificar estatus visita
  useEffect(() => {
    axiosApi.get("/open_visite")
      .then((response) => {
        if (response.data.msg == 'sem visita') {
          endVisit()
        }
      })
      .catch(function (error) {
      });
  }, [])
  //ENVIANDO FORMULARIO COM A BIBLIOTECA REACT-HOOK-FORM
  const form = (formContent) => {
    const idVisit = formContent.id = visit.id
    endVisit(formContent)
      .then((response) => {
        handleClose()
        toast("visita finalizada, até a próxima :)")
      })
      .catch(function (error) {
        toast('algo errado')
      });
  }

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
  const handleSubmitOpenVisite = (id) => {
    const data = { id };
    axiosApi.post('/open_visite', data)
      .then(function (response) {
        onVisit(response.data)
      })
      .catch(function (error) {
      });

  }
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
  const handleSubmitOpenOccurrence = (id) => {
    const data = { id };
    axiosApi.post('/open_occurrence', data)
      .then(function (response) {
        onOccurrence(response.data)
      })
      .catch(function (error) {
      });
  }
  useEffect(() => {
    if (userTipo == 'TECNICO') {
      setHiddenButtomVisit(false)
      setHiddenButtomOccurrence(false)
    }
    if (userTipo == 'GESTOR') {
      setHiddenButtons(false)
    }

  }, [])

  // useEffect(() => {
  //   console.log((visit !== null))
  //   setHiddenCard((visit !== null))
  // },[visit]) 

  const TRANSPARENT = '#ffffff00';
  const GRAY = '#ffffff00';
  function ContextAwareToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey),
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
      <button
        type="button"
        style={{ backgroundColor: isCurrentEventKey ? TRANSPARENT : GRAY }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }


  return (
    <>
      <div className="w-head-option" expand="lg" style={{ backgroundColor: 'white', color: 'Black' }} >
        <Stack className='w-head-hstack' direction="horizontal" gap={2}>
          <div className="p-2 w-head-hstack-p2"><span className='w-head-option-title'>Serviços em aberto</span></div>
          <div className="p-2 ms-auto w-head-hstack-p2">
            <div className='d-flex flex-row-reverse'>
              <Link className='link-card' to="/service/form" style={{ margin: '0px', width: '150px' }}>
                <Button className='float-right' size="sm" > Novo Serviço</Button>
              </Link>



              <InputGroup className='w-head-option-btn w-head-option-search-btn-form' size='sm' style={{ marginRight: '10px' }}>
                <Form.Control className='w-head-option-search-btn-form' placeholder="Filtrar..." value={searchNome} onChange={(e) => setSearchNome(e.target.value)} />

                <InputGroup.Text className='w-head-option-search-btn-form-text'><MdManageSearch /></InputGroup.Text>
              </InputGroup>

            </div>
          </div>
        </Stack>
      </div>
      <div>
        <ToastContainer position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
          theme="dark" />
      </div>

      <div className="col-12" hidden={!spinner}>
        <div className="text-center p-3 border-round-sm font-bold">
          <div >
            <h5>{fraseSpinner}</h5>
            <ProgressSpinner />
          </div>
        </div>
      </div>
      <div hidden={spinner}>
        {registrosServices
          .filter((servico => servico.nome.toLowerCase().includes(searchNome.toLowerCase())))
          .map((registro, key) => {
            let hidden = (visit) ? registro.id != visit.servico_id : false;
            let hiddeButton = (visit != null);
            let hiddeButtonOccurrence = (occurrence != null);
            return (

              <Card id={'card-' + registro.id} className='card-service' key={key} hidden={hidden}>
                <Card.Header>
                  <Stack direction="horizontal" gap={3}>
                    <Card.Title className='card-service-tittle'>{registro.nome}</Card.Title>
                    <div className="ms-auto card-title-aux"><Card.Title>{registro.inicio + " - " + registro.termino}</Card.Title></div>
                    <div className="ms-auto card-title-icon" >
                      <Link className='icons' to={{ pathname: `/service/show/${registro.id}` }} >
                        <AiOutlineEye />
                      </Link>

                    </div>
                  </Stack>
                </Card.Header>
                <Card.Body className='card-service-body'>
                  <Table striped bordered hover>
                    {registrosOrderServices.map((registroOs, keyOs) => {
                      if (registroOs.servico_id == registro.id) {
                        let button;
                        let button2;
                        let obs;
                        obs = (registroOs.observacao) ? registroOs.observacao : "Sem orientações para execução desta Ordem de Seviço ";
                        if (registroOs.status == "1") {
                          button =
                            <Link className='link-os'>
                              <Button className='card-service-btn btn color-theme-background'><BsFillPlayFill /></Button>
                            </Link>

                          button2 = <Link to={{ pathname: `/ordem-de-servico/assess/${registroOs.id}` }}>
                            <Button variant="primary" className='btn-form-sign'>
                              Executar OS
                            </Button>
                          </Link>;

                        }
                        if (registroOs.status == "2") {
                          if (registroOs.tipo == "INSTALACAO") {
                            button = <Link className='link-os' to={{ pathname: `/ordem-de-servico/installation/${registroOs.id}` }}>
                              <Button className='card-service-btn btn color-theme-background'><IoPlayForward /></Button>
                            </Link>;
                          }
                          if (registroOs.tipo == "MANUTENCAO" || registroOs.tipo == "SUBSTITUICAO") {
                            button = <Link className='link-os' to={{ pathname: `/ordem-de-servico/maintenance/${registroOs.id}` }}>
                              <Button className='card-service-btn btn color-theme-background'><IoPlayForward /></Button>
                            </Link>;
                          }
                          if (registroOs.tipo == "REMOCAO") {
                            button = <Link className='link-os' to={{ pathname: `/ordem-de-servico/removal/${registroOs.id}` }}>
                              <Button className='card-service-btn btn color-theme-background'><IoPlayForward /></Button>
                            </Link>;
                          }
                          if (registroOs.tipo == "TREINAMENTO") {
                            button = <Link className='link-os' to={{ pathname: `/ordem-de-servico/training/${registroOs.id}` }}>
                              <Button className='card-service-btn btn color-theme-background'><IoPlayForward /></Button>
                            </Link>;
                          }
                        } if (registroOs.status == "3") {
                          button = <Link className='link-os' to={{ pathname: `/ordem-de-servico/signature/${registroOs.id}` }}>
                            <Button className='card-service-btn btn color-theme-background'><BiEditAlt /></Button>
                          </Link>;
                        } if (registroOs.status == "4") {
                          button = <Link className='link-os ' to={{ pathname: `/ordem-de-servico/show/${registroOs.id}` }}>
                            <Button className='card-service-btn btn color-theme-background'><BsEmojiSunglasses /></Button>
                          </Link>;
                        }

                        return (
                          <>
                            <Accordion flush className='card-service-body-accordion'>
                              <Card className='card-service-body-accordion-card'>
                                <Card.Header>
                                  <ContextAwareToggle eventKey={registroOs.id}>
                                    <Container>
                                      <Row>
                                        <Col xs={2} md={2} className=''>
                                          {registroOs.id}
                                        </Col>
                                        <Col xs={3} md={3}>
                                          {registroOs.placa + " / " + registroOs.frota}
                                        </Col>
                                        <Col xs={5} md={6}>
                                          {registroOs.tipo + "-" + registroOs.produto}
                                        </Col>
                                        <Col xs={2} md={1}>
                                          {button}
                                        </Col>
                                      </Row>
                                    </Container>
                                  </ContextAwareToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={registroOs.id}>
                                  <Card.Body>

                                    <div className='card-obs' >{obs}
                                      {button2}
                                    </div>
                                  </Card.Body>
                                </Accordion.Collapse>
                              </Card>
                            </Accordion>
                          </>
                        )
                      }
                    })}

                  </Table>

                </Card.Body>
                <Card.Footer className="card-service-footer">
                  <Row className='obs-card'>
                    {registro.observacao}
                  </Row>

                  <Stack className='card-service-footer-hstack' direction="horizontal" gap={4} >

                    <div className="p-2">
                      <div hidden={userTipo != 'TECNICO'}>
                      <Link className='link-card' hidden={hiddeButton} >
                        <Button className="card-service-btn" variant="primary" as="input" type="button" value="Abrir visita" hidden={hiddeButton} onClick={e => handleSubmitOpenVisite(registro.id)} />
                      </Link>
                      <Link onClick={e => handleShow(registro.id)} className='link-card' hidden={!hiddeButton}>
                        <Button className="card-service-btn" variant="danger" as="input" type="button" value="Fechar visita" />
                      </Link>
                      </div>
                    </div>
                    <div className="p-2">
                      <div hidden={!hiddeButton} style={{ display: 'initial', }}>
                        <Link className='link-card' hidden={hiddeButtonOccurrence} >
                          <Button className="card-service-btn" variant="danger" as="input" type="button" value="Abrir Ociosidade" hidden={hiddeButtonOccurrence} onClick={e => handleSubmitOpenOccurrence(registro.id)} />
                        </Link>

                        <Link onClick={endOccurrence} className='link-card' hidden={!hiddeButtonOccurrence}>
                          <Button className="card-service-btn" variant="danger" as="input" type="button" value="Fechar Ociosidade" />
                        </Link>

                      </div>
                    </div>
                    <div className="p-2">
                    <Link className='link-card' to={{ pathname: `/service/cancel/${registro.id}` }} hidden={hiddenButtons}>
                    <Button className="card-service-btn" variant="danger" as="input" type="button" value="Cancelar" />
                  </Link>
                    </div>
                    <div className="p-2">
                      <Link className='link-card' to={{ pathname: `/service/finalize/${registro.id}` }} hidden={hiddenButtons} >
                        <Button className="card-service-btn" variant="primary" as="input" type="button" value="Concluir" />
                      </Link>
                    </div>
                    <div className="p-2">
                      <Link className='link-card' to={{ pathname: `/ordem-de-servico/form/${registro.id}` }} >
                        <Button className="card-service-btn" variant="success" as="input" type="button" value="Nova OS" />
                      </Link>
                    </div>
                  </Stack>

         
                </Card.Footer>

              </Card>

            )

          })}
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={handleSubmit(form)}>
          <Modal.Header >
            <Modal.Title>Para Finalizar sua visita, por favor informe as despesas gerada!</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form.Group>
              <Form.Label>Houve despasa com alimentação?</Form.Label>
              <Form.Select required {...register("alimentacao")} >
                <option Value='SIM' selected>SIM</option>
                <option value='NAO'>NÃO</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Houve despasa com hospedagem?</Form.Label>
              <Form.Select required {...register("hospedagem")} >
                <option Value='SIM' selected>SIM</option>
                <option value='NAO'>NÃO</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type='submit'>
              Confirmar
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>

          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ServiceView