//IMPORTAÇÕES BIBLIOTECAS REACT
import Table from 'react-bootstrap/Table';
import { axiosApi } from '../../../services/axios';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import React, { useRef } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';


function EquipmentMe() {

  
  const { userSetor} = useContext(AuthContext);

  const tableRef = useRef(null);

  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate = useNavigate()

  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

  //CRIANDO USESTATE DA PAGINA
  const [registroEquipments, setRegistroEquipments] = useState([]);
  const [registroUsers, setRegistroUsers] = useState([]);
  const [registroAccept, setRegistrosAccept] = useState(true);
  const [btnHardware, setbtnHardware] = useState(userSetor=="HARDWARE");
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE TODOS EQUIPAMENTOS EM POSSO DO USUARIO ATIVO
  useEffect(() => {
    axiosApi.get("/list_equipment_me")
      .then((response) => {
        setRegistroEquipments(response.data)
      })
      .catch(function (error) {
      });
  }, [])

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE TODOS USUARIOS DA APLICAÇÃO

  useEffect(() => {
    axiosApi.get("/list_user_all_input")
      .then((response) => {
        setRegistroUsers(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [])

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE TODOS EQUIPAMENTOS EM POSSO DO USUARIO ATIVO
  useEffect(() => {
    axiosApi.get("/list_equipment_accept")
      .then((response) => {
        setRegistrosAccept(response.data)
        return response.data.length > 0 ? setRegistrosAccept(false): setRegistrosAccept(true)
        
      })
      .catch(function (error) {
      });
  }, [])
  //ENVIANDO FORMULARIO COM A BIBLIOTECA REACT-HOOK-FORM
  const form = (formContent) => {

    // FUNÇÃO PARA FORÇAR A O INPUT DA BIBLIOTECA REACT-HOOK-FORM
    const checkBoxes = document.querySelectorAll(".input-select");
    checkBoxes.forEach(function (checkBox, i) {
      if (checkBox.checked) {
        formContent.equipamento_id.push(checkBox.id)
      }
    });

    //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
    axiosApi.post('/transfer_equipment', formContent)
      .then(function (response) {
        navigate(0)
      })
      .catch(function (error) {
      });
  }
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
      <Navbar classNameName='' expand="lg" variant="light" bg="light" hidden={registroAccept} >
        <Link className='btn-secondary' to={{ pathname: `/equipment/accept` }}>
          <button className='card-service-btn btn color-theme-background'>Há equipamentos aguardando aprovação</button>
        </Link>
      </Navbar>
      <Table striped bordered hover size="sm" id="datatable" ref={tableRef}>
        <thead>
          <th>
            <label className="control control--checkbox">
              <input type="checkbox" className="js-check-all" id="check-all" onClick={e => selectAll()} />
              <div className="control__indicator"></div>
            </label>
          </th>
          <th>ID:</th>
          <th>TIPO:</th>
          <th>SN:</th>
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
              <Form.Select name="equipamento_id[]" id="Select-equipamentos" multiple   {...register("equipamento_id[]")}>
                {/*o preenchimento desse input sera atráves da selecao dos registro em grid pelo usuario*/}
              </Form.Select>
            </Form.Group>
            <Row>
              <Form.Group className="col-md-2 col-sm-12 label-botton" >
                <Form.Label id="total-check" className=''></Form.Label>
              </Form.Group>
              <Form.Group className="col-md-8 col-sm-12" >

                <Form.Select name="usuario_id" id="selectUsuario" required {...register("usuario_id")}>
                  <option value="">Selecione destinatário</option>
                  {registroUsers.map((registro, key) => {
                    return (
                      <option value={registro.id}>{registro.nome_usuario + "-" + registro.nome_cliente}</option>
                    )

                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group className="col-md-2 col-sm-12 label-button">
                <Button variant="primary" type="submit">
                  Enviar
                </Button>
              </Form.Group>
            </Row>
          </Form>
        </Container>
      </Navbar>
    </>
  );
}
export default EquipmentMe