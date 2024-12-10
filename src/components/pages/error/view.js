//IMPORTAÇÕES BIBLIOTECAS REACT
import { useState, useEffect } from 'react';
import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { Snake } from 'react-snake-lib';
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
function ErrorView() {

  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate = useNavigate()

  //FUNÇÃO DA BIBLIOTECA REACT-BOOSTRAP DOS COMPONENTES ACCODION
  const values = [true, 'sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down'];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(true);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  //FUNÇÃO PARA RETORNAR A PAGINA EM CASO DE ERRO
  const back = () => {
    navigate(-1)
  }

  return (
    <> <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
      <Modal.Header >
        <Modal.Title>Algo errado não está certo !</Modal.Title>
        <Button onClick={e => back()}>voltar</Button>
      </Modal.Header>
      <Modal.Body>
        <Snake />
      </Modal.Body>
    </Modal>


    </>
  );
}

export default ErrorView