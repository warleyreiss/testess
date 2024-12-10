//IMPORTAÇÕES BIBLIOTECAS REACT
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Stack from 'react-bootstrap/Stack'
import { AiOutlinePlus, AiOutlineUser } from 'react-icons/ai'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { RiHistoryFill } from 'react-icons/ri'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { BsBoxes, BsStopwatch } from 'react-icons/bs'
import { Badge } from 'react-bootstrap'

function ServiceMenu() {

  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate = useNavigate()

  //CRIANDO USESTATE DA PAGINA 
  const [showService, setShowService] = useState(false);
  const handleCloseService = () => setShowService(false);
  const handleShowService = () => setShowService(true);

  const [showVisite, setShowVisite] = useState(false);
  const handleCloseVisite = () => setShowVisite(false);
  const handleShowVisite = () => setShowVisite(true);


  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

  //FUNÇÃO PADRÃO PARA EXTRAÇÃO DE DADOS DO FORMULARIO PELO REACT-HOOK-GORM E REDIRECIONAMENTO PELO METODO GET
  const formService = (formContent) => {
    navigate('/history/service/' + formContent.inicio + '/' + formContent.fim)
  }

  //FUNÇÃO PADRÃO PARA EXTRAÇÃO DE DADOS DO FORMULARIO PELO REACT-HOOK-GORM E REDIRECIONAMENTO PELO METODO GET
  const formVisite = (formContent) => {
    navigate('/history/visite/' + formContent.inicio + '/' + formContent.fim)
  }

  return (
    <>
      <CardGroup>
        <Link className='link-card' to="/service/form" >
          <Card className="line" >
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Serviço interno</Card.Title>
                <AiOutlinePlus className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
                Cadastre novos serviços ao projeto
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link className='link-card' to="/service/form/true" >
          <Card className="line"  style={{backgroundColor:'cyan'}}>
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
              
                <Card.Title>Serviço Terceiro</Card.Title>
                <AiOutlinePlus className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
                Serviços executados por terceiros
              </Card.Text>
             
            </Card.Body>
          </Card>
          
        </Link>
        <Link className='link-card' to="/service/view" >
          <Card className="line" >
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Lista de serviços abertos</Card.Title>
                <AiOutlineUnorderedList className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
                Veja os serviços em execução
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link className='link-card' to="/service/all" >
          <Card className="line" >
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Lista todos serviços</Card.Title>
                <AiOutlineUnorderedList className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
                Visualize serviços já concluídos
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link className='link-card' to="" onClick={handleShowService}>
          <Card className="line" >
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Extrato de serviços</Card.Title>
                <RiHistoryFill className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
                Visualize histórico completo
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link className='link-card' to="" onClick={handleShowVisite} >
          <Card className="line" >
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Extrato de visitas</Card.Title>
                <RiHistoryFill className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
                Visualize histórico completo
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link className='link-card' to="/equipment/me" >
          <Card className="line" style={{ 'background-color': 'moccasin' }} >
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Meu estoque</Card.Title>
                <BsBoxes className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
                Veja equipamentos em sua posse
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link className='link-card' to="/ticket/accept" >
          <Card className="line" style={{ 'background-color': 'moccasin' }}>
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Tickets pendentes</Card.Title>
                <BsStopwatch className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
                Veja despesas pendentes de aprovação
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </CardGroup>
      <Modal
        show={showService}
        onHide={handleCloseService}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleSubmit(formService)}>
          <Modal.Header closeButton>
            <Modal.Title>Selecione o período:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="" >
              <Form.Label>INÍCIO:</Form.Label>
              <Form.Control type="date" name="inicio" required {...register("inicio")} />
            </Form.Group>
            <Form.Group className="" >
              <Form.Label>FIM:</Form.Label>
              <Form.Control type="date" name="fim" required {...register("fim")} />
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
      <Modal
        show={showVisite}
        onHide={handleCloseVisite}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleSubmit(formVisite)}>
          <Modal.Header closeButton>
            <Modal.Title>Selecione o período:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="" >
              <Form.Label>INÍCIO:</Form.Label>
              <Form.Control type="date" name="inicio" required {...register("inicio")} />
            </Form.Group>
            <Form.Group className="" >
              <Form.Label>FIM:</Form.Label>
              <Form.Control type="date" name="fim" required {...register("fim")} />
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

export default ServiceMenu