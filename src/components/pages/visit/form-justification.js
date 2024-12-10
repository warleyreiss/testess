import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { axiosApi } from '../../../services/axios';
import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

function JustificationVisit() {

  // CRIANDO INSTANCIA DO REACT CONTEXT
  const  {exceed,visit} = useContext(AuthContext);
  const { signOut } = useContext(AuthContext)

  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit, reset /*, formStates:{erros}*/ } = useForm();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);
  
  const [show, setShow] = useState(exceed);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  (function() {
 }) () 
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
  const form = (formContent) => {
    //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
    formContent.id=visit.id
    axiosApi.patch('/visit_justification', formContent)
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
            <Modal.Title>Horas adicionais</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Para realizar atividades após expediente, gentileza justifique o motivo!
           
            <Form.Group className="" >
              <Form.Label>MOTIVO:</Form.Label>
              <Form.Select name="justificativa" id="justificativa" required {...register("justificativa")}>
                <option value="" selected></option>
                <option value="DEMANDA DE VEICULOS ALTA">DEMANDA DE VEÍCULOS ALTA</option>
                <option value="HORARIO AGENDADO">HORARIO AGENDADO</option>
                <option value="AGUARDANDO CHEGADA DE VEICULOS">AGUARDANDO CHEGADA DE VEICULOS</option>
                <option value="OCORRENCIA/ATRASOS TECNICOS">OCORRÊNCIA OU ATRASOS TECNICOS</option>
              </Form.Select>
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={signOut}>
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

export default JustificationVisit