//IMPORTAÇÕES BIBLIOTECAS REACT
import Table from 'react-bootstrap/Table';
import { axiosApi } from '../../../services/axios';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'

import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

import { DownloadTableExcel } from 'react-export-table-to-excel';
import React, { useRef } from 'react';
function TicketAccept() {

  const tableRef = useRef(null);

  // CRIANDO INSTANCIA DO REACT CONTEXT
  const { userSetor } = useContext(AuthContext);
  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONAMENTO
  const navigate = useNavigate()

  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);
  const [urlForm, setUrlForm] = useState([]);

  const [registroAccept, setRegistrosAccept] = useState(true);
  const handleAccept = () => setUrlForm('/accept_ticket');
  const handleRefuse = () => setUrlForm('/refuse_ticket');

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE TICKETS PARA APROVAÇÃO
  useEffect(() => {
    axiosApi.get("/list_ticket_accept")
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
      });
  }, [])

  //ENVIANDO FORMULARIO COM A BIBLIOTECA REACT-HOOK-FORM
  function form(formContent) {
    // FUNÇÃO PARA FORÇAR A O INPUT DA BIBLIOTECA REACT-HOOK-FORM
    const checkBoxes = document.querySelectorAll(".input-select");
    checkBoxes.forEach(function (checkBox, i) {
      if (checkBox.checked) {
        formContent.faturamento_id.push(checkBox.id);
      }
    });

    //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
    axiosApi.post(urlForm, formContent)
      .then(function (response) {
        navigate(0);
      })
      .catch(function (error) {
      });
  }

  //FUNÇÃO PARA SELEÇÃO DOS IMPUTS TIPO SELECTS DA TABELA E PREENCHIEMNTO DO FORMULARIO COM OS VALORES
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

  //FUNÇÃO PARA ALTERNAR OS COMPOS DO FORMULÁRIO CONFORME PREENCHIMENTOS
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
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE TODOS EQUIPAMENTOS EM POSSO DO USUARIO ATIVO
  useEffect(() => {
    axiosApi.get("/list_ticket_return")
      .then((response) => {
        setRegistrosAccept(response.data)
        return response.data.length > 0 ? setRegistrosAccept(false) : setRegistrosAccept(true)

      })
      .catch(function (error) {
      });
  }, [])

  return (
    <>
      <div className="d-flex flex-row-reverse bd-highlight" expand="lg" variant="light" bg="light">
        <div className="p-2">
          <DownloadTableExcel filename='lista' sheet="consolidado" currentTableRef={tableRef.current}>
            <Button className='float-right' size="sm"> Exportar </Button>
          </DownloadTableExcel>
        </div>
        <div className="p-2">
          <Link className='btn-secondary' to={{ pathname: `/ticket/return` }} hidden={registroAccept}>
            <Button className='float-right' variant="danger" size="sm"> Há tickets que foram retornados para você</Button>
          </Link>
        </div>
      </div>
      <Table striped bordered hover size="sm" ref={tableRef}>
        <thead>
          <tr>
            <th >
              <label className="control control--checkbox">
                <input type="checkbox" className="js-check-all" id="check-all" onClick={e => selectAll()} />
                <div className="control__indicator"></div>
              </label>
            </th>
            <th>ID:</th>
            <th>CLIENTE</th>
            <th>TIPO:</th>
            <th>DESCRIÇÃO:</th>
            <th>SETOR</th>
            <th>DATA/HORA:</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro, key) => {
            if (registro.setor == userSetor) {
              return (
                <tr key={key} className='clickable'>
                  <td>
                    <label className="control control-checkbox">
                      <input className="input-select" id={registro.id} type="checkbox" onClick={e => select()} />
                      <div className="control-indicator"></div>
                    </label>
                  </td>
                  <td><strong>{registro.id}</strong></td>
                  <td>{registro.nome_cliente}</td>
                  <td>{registro.tipo}</td>
                  <td>{registro.descricao}</td>
                  <td>{registro.setor}</td>
                  <td>{registro.data_registro}</td>
                  <td>
                    <Link to={{ pathname: `/ticket/show/${registro.id}` }}>
                      <button className='card-service-btn btn color-theme-background'>Ver</button>
                    </Link>
                    <Link to={{ pathname: `/ticket/edite/${registro.id}` }}>
                      <button className='card-service-btn btn color-theme-background'>Editar</button>
                    </Link>
                  </td>
                </tr>
              )
            }

          })}
        </tbody>
      </Table>
      <Navbar id="form-trasnfer" className='nav-form' expand="lg" variant="light" bg="light" fixed="bottom" hidden>
        <Container className='container-botton'>
          <Form onSubmit={handleSubmit(form)}>
            <Form.Group className="col-md-0 col-sm-0" hidden>
              <Form.Select name="faturamento_id[]" id="Select-tickets" multiple  {...register("faturamento_id[]")}>
                {/*o preenchimento desse input sera atráves da selecao dos registro em grid pelo usuario*/}
              </Form.Select>
            </Form.Group>
            <Row>
              <Form.Group className="col-md-4 col-sm-2 label-botton" >
                <Form.Label id="total-check" className=''></Form.Label>
              </Form.Group>

              <Form.Group className="col-md-4 col-sm-4 label-button">
                <Button variant="primary" type="submit" onClick={handleAccept}>
                  Confirmar
                </Button>
              </Form.Group>
              <Form.Group className="col-md-4 col-sm-5 label-button">
                <Button variant="primary" type="submit" onClick={handleRefuse}>
                  Desconsiderar
                </Button>
              </Form.Group>
            </Row>
          </Form>
        </Container>
      </Navbar>
    </>
  )

}

export default TicketAccept