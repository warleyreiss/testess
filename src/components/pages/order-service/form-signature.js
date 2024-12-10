//IMPORTAÇÕES BIBLIOTECAS REACT
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { axiosApi } from '../../../services/axios';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import React from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom'
import Image from 'react-bootstrap/Image';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Row } from 'react-bootstrap';

function OrderOfServiceSignature() {
  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();

  // CRIANDO INSTANCIA DO REACT CONTEXT
  const { onVisit } = useContext(AuthContext)

  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate = useNavigate()

  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

  //CRIANDO USESTATE DA PAGINA
  const { signature, setSignature } = useState()
  const [nameSignature, setNameSignature] = useState('')
  const [registro, setRegistro] = useState([]);
  const [fotos, setFotos] = useState([]);
  const [toDataURLSignature, setToDataURLSignature] = useState('');
  //FUNÇÃO DA BIBLIOTECA REACT-BOOSTRAP DOS COMPONENTES MODAL
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [fullscreen, setFullscreen] = useState(true);
  const [sign, setSign] = useState();

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA OS DADOS DA ORDEM DE SERVICO EM QUESTAOS
  useEffect(() => {
    axiosApi.get("/ordem_service_show/" + id)
      .then((response) => {
        setRegistro(response.data)
        if (response.data.registro_fotograficos) {
          setFotos(response.data.registro_fotograficos)
        }
      })
      .catch(function (error) {
      });

  }, [])

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
  const form = (formContent) => {
    formContent.assinatura = toDataURLSignature
    formContent.nome_assinatura = nameSignature
    axiosApi.patch('/update_order_service_assignature', formContent)
      .then(function (response) {
        if (response.data == 'sem visita') {
          alert("PRIMEIRO ABRA UMA VISITA")
          navigate(-1)
        } else {
          navigate(-1)
        }
      })
      .catch(function (error) {
        console.error(error);
      });

  }


  //FUNÇÃO DA BIBLIOTECA SIGNATURE_PAD
  const handleClear = () => {
    sign.clear()
    let input = document.getElementById("input-assinatura")
    input.value = ""
  }
  const handleConfirm = () => {
    let sigImage = document.getElementById("sig-image") 
    sigImage.setAttribute("src", sign.toDataURL());
    const canvas = document.getElementById("canvas-signature")
    const url = canvas.toDataURL()
    setToDataURLSignature(url)
    let input = document.getElementById("input-assinatura")
    input.value = url
    handleClose()

  }
  return (
    <>
      <Card>
        <Card.Header>CONFIRMAÇÃO DO SERVIÇO REALIZADO</Card.Header>
        <Card.Body>
          <Form.Group className="">
            <Form.Label>Tipo de serviço: {registro.tipo}</Form.Label>
          </Form.Group>
          <Form.Group className="">
            <Form.Label>Produto: {registro.produto}</Form.Label>
          </Form.Group>
          <Form.Group className="">
            <Form.Label>Inicio: {registro.inicio}</Form.Label>
          </Form.Group>
          <Form.Group className="">
            <Form.Label>Término: {registro.termino}</Form.Label>
          </Form.Group>
          <Form.Group className="">
            <Form.Label>Duração: {registro.duracao}</Form.Label>
          </Form.Group>
          <Form.Group className="">
            <Form.Label>Foi possível atendimento: {registro.atendimento}</Form.Label>
          </Form.Group>
          <Form.Group className="">
            <Form.Label>Motivo não atendimento (se houver): {registro.motivo_nao_atendimento}</Form.Label>
          </Form.Group>
          <Form.Group className="">
            <Form.Label>Materiais utilizados (se houver): {registro.material_usado}</Form.Label>

          </Form.Group>
          <Form.Group className="">
            <Form.Label>Materiais recolhidos (se houver): {registro.material_retirado}</Form.Label>
          </Form.Group>
          <Form.Group className="">
            <Form.Label>insumos/periféricos (se houver): {registro.perifericos}</Form.Label>
          </Form.Group>
          <Form.Group className="">
            <Form.Label>Soluções aplicadas: {registro.atendimento}</Form.Label>
          </Form.Group>
          <Form.Group className="">
            <Form.Label>Houve violação: {registro.violacao}</Form.Label>
          </Form.Group>
          <Form.Group className="">
            <Form.Label>Descrição violação (se houver): {registro.descricao_violacao}</Form.Label>
          </Form.Group>
          <Form.Group className="">
            <Form.Label>Houve danos: {registro.danos}</Form.Label>
          </Form.Group>
          <Form.Group className="">
            <Form.Label>Soluções aplicadas: {registro.atendimento}</Form.Label>
          </Form.Group>
          <Form.Group className="">
            <Form.Label>Registros fotográficos: </Form.Label>
            {fotos.map((foto) =>
              <Form.Group className="">
                <img src={foto} alt="registros" width={'300px'} />
              </Form.Group>
            )}
          </Form.Group>

          <Form.Group className="">
            
 <img src='' alt="assinatura" id='sig-image' />
          </Form.Group>
          <Form.Group className="">
            <Form.Label>Dados do assinante/acompanhante: {nameSignature}</Form.Label>
          </Form.Group>
        </Card.Body>

        <Card.Footer className="text-muted">
          <Form onSubmit={handleSubmit(form)} enctype="multipart/form-data" >
            <Form.Control type="hidden" name="idOS" value={id} required {...register("idOS")} />
            <Form.Control type="text" hidden name="assinatura" id="input-assinatura" required {...register("assinatura")} />
            <Button variant="primary" onClick={handleShow} className='btn-form-sign'>
              Assinar OS
            </Button>
            <Button variant="primary" type='submit' className='btn-form-sign' >
              Finalizar OS
            </Button>
          </Form>
        </Card.Footer>
      </Card>
      <Modal classname='modal-sigin'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        fullscreen={fullscreen}
      >
        <Modal.Header>
          <Modal.Title>ASSINATURA DIGITAL CLIENTE</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body-signature' style={{ padding: '0px !important' }}>

          <SignatureCanvas penColor='green' canvasProps={{ width: 410, height: 480, className: 'sigCanvas', id: 'canvas-signature' }} ref={data => setSign(data)} />
          <Form.Group className="" style={{ margin: '5px' }} >
            <Form.Label>NOME/CARGO DO ASSINANTE:</Form.Label>
            <Form.Control type="text" name="name_signature" required onChange={e => setNameSignature(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="secondary" onClick={handleClear}>
            Limpar
          </Button>
          <Button variant="secondary" onClick={handleConfirm}>
            Confirmar
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrderOfServiceSignature