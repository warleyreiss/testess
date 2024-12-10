//IMPORTAÇÕES BIBLIOTECAS REACT

import Table from 'react-bootstrap/Table';
import { axiosApi} from '../../../services/axios';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function EquipmentAccept() {

  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate = useNavigate()

  //CRIANDO USESTATE DA PAGINA
  const [registroEquipments, setRegistroEquipments] = useState([]);
  const [urlForm, setUrlForm] = useState([]);

  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

  const handleAccept = () => setUrlForm('/accept_equipment');
  const handleRefuse = () => setUrlForm('/refuse_equipment');

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
  const form = (formContent) => {

    // FUNÇÃO PARA FORÇAR A O INPUT DA BIBLIOTECA REACT-HOOK-FORM
    const checkBoxes = document.querySelectorAll(".input-select");
    checkBoxes.forEach(function (checkBox, i) {
      if (checkBox.checked) {
        formContent.equipamento_id.push(checkBox.id)
      }
    });

    //REQUISIÇÃO COM A BIBLIOTECA axiosApi PARA ENVIO FORMULARIO
    axiosApi.post(urlForm, formContent)//URL É CONDICIONADA PELA CHAMADA DAS FUNCOES HANDLEACCEPT E HANDREFUSE
      .then(function (response) {
        navigate(-1)
      })
      .catch(function (error) {
      });

  }

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE EQUIPAMENTOS EM POSSO DO USUARIO ATIVO AGUARDANDO APROVAÇÃO
  useEffect(() => {

    axiosApi.get("/list_equipment_accept")
      .then((response) => {
        setRegistroEquipments(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [])

  //FUNÇÃO PARA SELEÇÃO DE TODOS OS IMPUTS TIPO SELECTS DA TABELA E PREENCHIEMNTO DO FORMULARIO COM OS VALORES
  const selectAll = () => {
    const btn = document.getElementById('check-all');

    if (btn.checked) {
      const checkBoxes = document.querySelectorAll(".input-select");
      checkBoxes.forEach(function (q) {
        q.checked = true;
      });
    }
    if (!btn.checked) {
      const checkBoxes = document.querySelectorAll(".input-select");
      checkBoxes.forEach(function (q) {
        q.checked = false;
      });
    }
    select()
  }
  //FUNÇÃO PARA SELEÇÃO DOS IMPUTS TIPO SELECTS DA TABELA E PREENCHIEMNTO DO FORMULARIO COM OS VALORES
  const select = () => {

    const checkBoxes = document.querySelectorAll(".input-select");
    let qdadecheck = 0;
    checkBoxes.forEach(function (q) {

      if (q.checked) {
        qdadecheck++;
      }
      let label = document.getElementById('total-check').innerHTML = qdadecheck + " item(s)"
      if (qdadecheck > 0) {
        let form = document.getElementById('form-trasnfer').hidden = false;
      } else {
        let form = document.getElementById('form-trasnfer').hidden = true;
      }
    });
  }
  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <th>
            <label className="control control--checkbox">
              <input type="checkbox" className="js-check-all" id="check-all" onClick={e => selectAll()} />
              <div className="control__indicator"></div>
            </label>
          </th>
          <th>ID:</th>
          <th>TIPO:</th>
          <th>N. SÉRIE:</th>
        </thead>
        <tbody>
          {registroEquipments.map((registro, key) => {
            return (
              <tr key={key} className='clickable'>
                <td>
                  <label className="control control-checkbox">
                    <input className="input-select" id={registro.id} type="checkbox" onClick={e => select()} />
                    <div className="control-indicator"></div>
                  </label>
                </td>
                <td>{registro.identificador}</td>
                <td>{registro.tipo}</td>
                <td>{registro.numero_serie}</td>
              </tr>
            )

          })}
        </tbody>
      </Table>
      <Navbar id="form-trasnfer" className='nav-form' expand="lg" variant="light" bg="light" fixed="bottom" hidden>
        <Container className='container-botton'>
          <Form onSubmit={handleSubmit(form)}>
            <Form.Group className="col-md-0 col-sm-0" hidden>
              <Form.Select name="equipamento_id[]" id="Select-equipamentos" multiple {...register("equipamento_id[]")}>
                {/*o preenchimento desse input sera atráves da selecao dos registro em grid pelo usuario*/}
              </Form.Select>
            </Form.Group>
            <Row>
              <Form.Group className="col-md-4 col-sm-4 label-botton" >
                <Form.Label id="total-check" className=''></Form.Label>
              </Form.Group>

              <Form.Group className="col-md-4 col-sm-4 label-button">
                <Button variant="primary" type="submit" onClick={handleAccept}>
                  Aceitar
                </Button>
              </Form.Group>
              <Form.Group className="col-md-4 col-sm-4 label-button">
                <Button variant="primary" type="submit" onClick={handleRefuse}>
                  Recusar
                </Button>
              </Form.Group>
            </Row>
          </Form>
        </Container>
      </Navbar>
    </>
  );
}

export default EquipmentAccept