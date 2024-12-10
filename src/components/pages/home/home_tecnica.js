//IMPORTAÇÕES BIBLIOTECAS REACT
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Stack from 'react-bootstrap/Stack'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { RiHistoryFill } from 'react-icons/ri'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { axiosApi } from '../../../services/axios';
import { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap'
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import makeAnimated from 'react-select/animated'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Home() {

  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate = useNavigate()

  const { userTipo,userId } = useContext(AuthContext);
  //CRIANDO USESTATE DA PAGINA 
  const [registrosUsers, setRegistrosUsers] = useState([]);
  const [registrosVisits, setRegistrosVisits] = useState([]);
  const [border, setBorder] = useState(null);
  const [idUser, setIdUser] = useState('')
  const [showService, setShowService] = useState(false);
  const [button, setButton] = useState(userTipo == 'TECNICO');
  const handleCloseService = () => setShowService(false);
  const handleShowService = () => setShowService(true);

  const [showVisite, setShowVisite] = useState(false);
  const handleCloseVisite = () => setShowVisite(false);
  const handleShowVisite = () => setShowVisite(true);
console.log(userTipo, userId)

  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

  const teste = (id) => {
    setIdUser(id)
    setShowVisite(true)
  }
  //FUNÇÃO PADRÃO PARA EXTRAÇÃO DE DADOS DO FORMULARIO PELO REACT-HOOK-GORM E REDIRECIONAMENTO PELO METODO GET
  const formVisite = (formContent) => {
    const ajuste = formContent.ajuste='true'
    axiosApi.patch('/closed_visite', formContent)
        .then(function (response) {
          navigate(0)
          navigate(0)
          setShowVisite(false )
        })
        .catch(function (error) {
          alert('oi')
        });
  }
  useEffect(() => {
    axiosApi.get("/list_user_input")
      .then((response) => {
        setRegistrosUsers(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });


  }, [])
  useEffect(() => {
    axiosApi.get("/list_visite")
      .then((response) => {
        setRegistrosVisits(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [])

  return (
    <>
      <CardGroup>
        {registrosUsers.map((user, key) => {
          return (
            <div className='card-user'>
              <Card className="line" >
                <Card.Img variant="top" src="" />
                <Card.Body>
                  <Stack direction="horizontal" gap={2} className='body-card-user'>
                    <Card.Title><h5>{user.nome}</h5></Card.Title>
                  </Stack>
                  <Card.Text>

                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted footer-card-user">
                  {registrosVisits.map((visit, key) => {
                    if (user.id == visit.usuario_id) {
                      return (
                        <>
                          <ListGroup.Item>{visit.nomecliente}</ListGroup.Item>
                          <ListGroup.Item>INÍCIO: {visit.inicio}</ListGroup.Item>
                          <ListGroup.Item>
                            <Form.Group className="col-md-12 col-sm-12" hidden={button}>
                              <Link >
                                <Button className="card-service-btn" variant="primary" as="input" type="button" value='Fechar visita  '    onClick={e => teste(visit.usuario_id)} />
                              </Link>
                            </Form.Group></ListGroup.Item>
                        </>
                      )
                    }
                  })}
                </Card.Footer>
              </Card>
            </div>
          )
        })
        }
      </CardGroup>
      <Modal
        show={showVisite}
        onHide={handleCloseVisite}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleSubmit(formVisite)}>
          <Modal.Header closeButton>
            <Modal.Title>Informe horário de saída:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="" >
              <Form.Control type="hidden" name="usuario_id" value={idUser}  {...register("usuario_id")} />
              <Form.Label>FIM:</Form.Label>
              <Form.Control type="datetime-local" name="termino" required {...register("termino")} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Form.Group className="">
              <Button variant="primary" type="submit">
                Salvar
              </Button>
            </Form.Group>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Home