import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { axiosApi } from '../../../services/axios';
import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

function CorrectionVisit() {

  // CRIANDO INSTANCIA DO REACT CONTEXT
  const { correction, visit } = useContext(AuthContext);


  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit, reset /*, formStates:{erros}*/ } = useForm();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);

  const [show, setShow] = useState(correction);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  (function () {
  })()
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
  const form = (formContent) => {
    //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
    axiosApi.patch('/closed_visite', formContent)
      .then(function (response) {
        console.log('deu certo')
      })
      .catch(function (error) {
        console.log('errou-se')
      });

  }
  return (
    <>
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
            <Modal.Title>Visita anterior aberta!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="" >
              <Form.Label>Aparentimente você esqueceu de fechar sua última visita, gentileza informar o horário de saida:</Form.Label>
              <Form.Control type="datetime-local" name="termino" required {...register("termino")} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onclick="">
              Close
            </Button>
            <Button variant="secondary" type="submit">
              Justificar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default CorrectionVisit