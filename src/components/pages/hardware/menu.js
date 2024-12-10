//IMPORTAÇÕES BIBLIOTECAS REACT
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Stack from 'react-bootstrap/Stack'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { AiOutlineUserSwitch } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { MdOutlineNoteAlt } from 'react-icons/md'
import {BiWrench } from "react-icons/bi";

import { RiHistoryFill } from 'react-icons/ri'
import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { BsBoxes, BsStopwatch } from 'react-icons/bs'
function HardwareMenu() {
  
  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate = useNavigate()

   //CRIANDO USESTATE DA PAGINA 
   const [showService, setShowService] = useState(false);
   const handleCloseService = () => setShowService(false);
   const handleShowService = () => setShowService(true);

   
  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

  //FUNÇÃO PADRÃO PARA EXTRAÇÃO DE DADOS DO FORMULARIO PELO REACT-HOOK-GORM E REDIRECIONAMENTO PELO METODO GET
  const formService = (formContent) => {
    navigate('/hardware/history/service/' + formContent.inicio + '/' + formContent.fim)
  }

  return (
    <>
      <CardGroup>     
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
        <Link className='link-card' to="/hardware/list-inspection" >
          <Card className="line" >
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Diponíveis Inspeção</Card.Title>
                <MdOutlineNoteAlt className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
               Selecione aqui os equipamentos
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link className='link-card' to="/hardware/list-maintenance" >
          <Card className="line" >
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Diponíveis manutenção</Card.Title>
                <BiWrench className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
               Selecione aqui os equipamentos
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link className='link-card' to="/hardware/list-services" >
          <Card className="line" >
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Solicitações</Card.Title>
                <BiWrench className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
              Veja o status das trasnferencias
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link className='link-card' to="/equipment/stocks" >
          <Card className="line" >
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Outros almoxarifados</Card.Title>
                <HiOutlineUserGroup className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
                Veja equipamentos almoxarifados
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
    </>
  );
}

export default HardwareMenu