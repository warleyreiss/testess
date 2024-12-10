//IMPORTAÇÕES BIBLIOTECAS REACT
import Table from 'react-bootstrap/Table';
import { axiosApi } from '../../../services/axios';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { InputGroup, OverlayTrigger, Row, Stack, Tooltip } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import React, { useRef } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

import { MdManageSearch } from "react-icons/md";
import { CgSoftwareDownload} from "react-icons/cg";

function HardwareListMaintenance() {


  const { userSetor } = useContext(AuthContext);

  const [searchType, setSearchType] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchSN, setSearchSN] = useState('');
  const tableRef = useRef(null);

  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate = useNavigate()

  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

  //CRIANDO USESTATE DA PAGINA
  const [registroEquipments, setRegistroEquipments] = useState([]);
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE TODOS EQUIPAMENTOS EM POSSO DO USUARIO ATIVO
  useEffect(() => {
    axiosApi.get("/hardware/list_order_service_maintenance")
      .then((response) => {
        setRegistroEquipments(response.data)
      })
      .catch(function (error) {
      });
  }, [])


  //ENVIANDO FORMULARIO COM A BIBLIOTECA REACT-HOOK-FORM
  const form = (formContent) => {
    const equipamento_id = []
    // FUNÇÃO PARA FORÇAR A O INPUT DA BIBLIOTECA REACT-HOOK-FORM
    const checkBoxes = document.querySelectorAll(".input-select");
    checkBoxes.forEach(function (checkBox, i) {
      if (checkBox.checked) {
        equipamento_id.push(checkBox.id)
      }
    });
    console.log(equipamento_id)
    console.log(typeof (equipamento_id))
    navigate("/hardware/maintenance/" + equipamento_id)
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
  const filterTable = (value) => {
    setSearchValue(value)
    const search = value.toLowerCase();
    console.log('pesquisando por... ' + search)
    const trs = [...document.querySelectorAll('#datatable tbody tr')];
    trs.forEach(el => {
      const matches = el.textContent.toLowerCase().includes(search);
      el.style.display = matches ? '' : 'none';
    });
  }
  return (
    <>
      <div className="w-head-option" expand="lg" style={{ backgroundColor: '#12192C', color: 'white' }} >
        <Stack className='w-head-hstack' direction="horizontal" gap={2}>
          <div className="p-2 w-head-hstack-p2"><span className='w-head-option-title'>EQUIPAMEMTOS PARA MANUTENÇÃO</span></div>
          <div className="p-2 ms-auto w-head-hstack-p2">
            <div className='d-flex flex-row-reverse'>

              <OverlayTrigger placement='bottom'
                overlay={
                  <Tooltip >
                    {'Baixe esta lista'}
                  </Tooltip>
                }
              >
                <div>
                  <DownloadTableExcel filename='lista' sheet="consolidado" currentTableRef={tableRef.current}>
                    <Button className='w-head-option-btn' size="sm"><CgSoftwareDownload /></Button>
                  </DownloadTableExcel>
                </div>
              </OverlayTrigger>
              <InputGroup className='w-head-option-btn w-head-option-search-btn-form' size='sm'>
              <Form.Control className='w-head-option-search-btn-form' placeholder="" value={searchValue} onChange={(e) => filterTable(e.target.value)} />
               <InputGroup.Text className='w-head-option-search-btn-form-text'><MdManageSearch /></InputGroup.Text>
              </InputGroup>
            </div>
          </div>
        </Stack>
      </div>

      <Table striped bordered hover size="sm" id="datatable" ref={tableRef}>
        <thead>
          <th>
            <label className="control control--checkbox">
              <input type="checkbox" className="js-check-all" id="check-all" onClick={e => selectAll()} />
              <div className="control__indicator"></div>
            </label>
          </th>
          <th>TIPO:</th>
          <th>ID:</th>
          <th>SN:</th>
        </thead>
        <tbody>
          {registroEquipments
            .filter((item => item.tipo.toLowerCase().includes(searchType.toLowerCase())))
            .filter((item => item.numero_serie.toLowerCase().includes(searchSN.toLowerCase())))
            .filter((item => item.identificador.toString().toLowerCase().includes(searchId.toString().toLowerCase())))
            .map((registro, key) => {
              return (
                <tr key={key} className='clickable'>
                  <td>
                    <label className="control control-checkbox">
                      <input className="input-select" id={registro.id} type="checkbox" onClick={e => select()} />
                      <div className="control-indicator"></div>
                    </label>
                  </td>
                  <td>{registro.tipo}</td>
                  <td>{registro.identificador}</td>
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
              <Form.Group className="col-md-6 col-sm-12 label-botton" >
                <Form.Label id="total-check" className=''></Form.Label>
              </Form.Group>
              <Form.Group className="col-md-6 col-sm-12 label-button">
                <Button variant="primary" type="submit">
                  Confimar e inicar manutenção
                </Button>
              </Form.Group>
            </Row>
          </Form>
        </Container>
      </Navbar>
    </>
  );
}
export default HardwareListMaintenance