//IMPORTAÇÕES BIBLIOTECAS REACT
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { axiosApi } from '../../../services/axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';


import Select from 'react-select'
import makeAnimated from 'react-select/animated'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRef } from 'react';
function OrderOfServiceMaintenance() {

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();

  const filesElement = useRef(null);

  const animatedComponents = makeAnimated();

  // CRIANDO INSTANCIA DO REACT CONTEXT
  const { onVisit } = useContext(AuthContext)
  const { userTipo } = useContext(AuthContext);

  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate = useNavigate()

  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

  //CRIANDO USESTATE DA PAGINA
  const [registrosEquipmentsWarehouse, setRegistrosEquipmentsWarehouse] = useState([]);
  const [registrosPeripherals, setRegistrosPeripherals] = useState([]);
  const [registrosEquipmentsUser, setRegistrosEquipmentsUser] = useState([]);
  const [registrosInsumos, setRegistrosInsumos] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [required, setRequired] = useState(true);

  const [selectEquipmentUsed, setSelectEquipmentUsed] = useState([]);
  const [selectPerifericoUsed, setSelectPerifericoUsed] = useState([]);
  const [selectEquipmentRemoved, setSelectEquipmentRemoved] = useState([]);
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
  const form = (formContent) => {
   
  
    const select = formContent.material_usado=selectEquipmentUsed
    const select2 = formContent.periferico=selectPerifericoUsed
    const select3 = formContent.material_retirado=selectEquipmentRemoved


    const dataForm = new FormData()

    dataForm.append("idOS", formContent.idOS)
    dataForm.append("violacao", formContent.violacao)
    dataForm.append("danos", formContent.danos)
    dataForm.append("efeito_falha[]", formContent.efeito_falha)
    dataForm.append("causa_falha[]", formContent.causa_falha)
    dataForm.append("deteccao_falha[]", formContent.deteccao_falha)
    dataForm.append("responsavel_falha[]", formContent.responsavel_falha)
    dataForm.append("descricao_violacao", formContent.descricao_violacao)
    dataForm.append("solucao[]", formContent.solucao)

    dataForm.append("material_usado", selectEquipmentUsed)
    dataForm.append("periferico", selectPerifericoUsed)
    dataForm.append("material_retirado", selectEquipmentRemoved)


/* comentei por que está gerando lentidão no sistema
    for (const file of filesElement.current.files) {
      dataForm.append('file', file);
    }
      */

    axiosApi.patch('/update_order_service_execute', formContent)
      .then(function (response) {
        if (response.data == 'sem visita') {
          alert("PRIMEIRO ABRA UMA VISITA")
          navigate(-1)
        } else {
          toast(response.data.msg)
         navigate(-1)
        }
      })
      .catch(function (error) {
        console.log(error)
      });

  }
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE INSUMOS TIPO PERIFERICO
  useEffect(() => {
    axiosApi.get("/list_peripheral_input")
      .then((response) => {
        setRegistrosPeripherals(response.data)
      })
      .catch(function (error) {
      });

  }, [])

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE EQUIPAMENTOS EM POSSO DO USUARIO EM QUESTAO
  useEffect(() => {
    if (userTipo == 'TERCEIRO') {
      axiosApi.get("/list_equipment_input_terceiro/" + id)
        .then((response) => {
          setRegistrosEquipmentsUser(response.data)
        })
        .catch(function (error) {
        });
    } else {
      axiosApi.get("/list_equipment_me")
        .then((response) => {
          setRegistrosEquipmentsUser(response.data)
        })
        .catch(function (error) {
        });
    }
  }, [])

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE EQUIPAMENTOS EM POSSE DO CLIENTE EM QUESTÇAO

  useEffect(() => {
    axiosApi.get("/list_equipment_warehouse_input/" + id)
      .then((response) => {
        setRegistrosEquipmentsWarehouse(response.data)
      })
      .catch(function (error) {
      });

  }, [])


  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE INSUMOS 
  useEffect(() => {
    axiosApi.get("/list_insumo_input")
      .then((response) => {

        setRegistrosInsumos(response.data)
      })
      .catch(function (error) {

        console.error(error);
      });

  }, [])
  //FUNÇÃO PARA ALTERNAR OS COMPOS DO FORMULÁRIO CONFORME PREENCHIMENTO
  const violacao = (value) => {
    if (value === "NAO") {
      setHidden(true)
      setRequired(false)
    } else {
      setHidden(false)
      setRequired(true)
    }
  }
  return (
    <>
      <Form className='form-os' onSubmit={handleSubmit(form)} enctype="multipart/form-data" id='meu-formulario'>
        <Form.Control type="hidden" name="idOS" value={id} required {...register("idOS")} />
        <div className='group-form-os' id="campo_violacao">
          <Form.Group className="" >
            <Form.Label>HOUVE VIOLAÇÃO?:</Form.Label>
            <Form.Select id='violacao' name='violacao' required onClick={e => violacao(e.target.value)} {...register("violacao")} >
              <option value='SIM' selected> Houve violação</option>
              <option value='NAO'> Não houve violação</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="" hidden={hidden} >
            <Form.Label>A VIOLAÇÃO CAUSOU DANOS?:</Form.Label>
            <Form.Select id='danos' name='danos' required={required}{...register("danos")}>
              <option value="NAO">Não houve danos aparente</option>
              <option value="REPARAVEL">Sim, porém foi reparado no local</option>
              <option value="IRREPARAVEL">Sim, precisou recolher o equipamento</option>
            </Form.Select>
            <Form.Label>O QUE FOI VIOLADO?:</Form.Label>
            <Form.Select id='descricao_violacao' name='descricao_violacao' required={required} hidden={hidden} {...register("descricao_violacao")}>

              {registrosInsumos.map((registro, key) => {
                return (
                  <option value={registro.id}>{registro.item}</option>
                )
              })}
            </Form.Select>
          </Form.Group>
        </div>
        <div className='group-form-os'>
          <Form.Group className="" >
            <Form.Label>EFEITO DA FALHA?:</Form.Label>
            <Form.Select name='efeito_falha[]' required {...register("efeito_falha[]")}>
              <option value='PERDA DE TRANSMISSAO'>PERDA DE TRANSMISSÃO</option>
              <option value='FALHA GERACAO DE EVENTOS'>FALHA GERACAO DE EVENTOS</option>
              <option value='CAN TRAVADA'>CAN TRAVADA</option>
              <option value='CHIP SUSPENSO'>CHIP SUSPENSO</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="" >
            <Form.Label>CAUSA DA FALHA?:</Form.Label>
            <Form.Select name='causa_falha[]' required {...register("causa_falha[]")}>
              <option value='CHICOTE DANIFICADO'>CHICOTE DANIFICADO</option>
              <option value='LEITORA DANIFICADA'>LEITORA DANIFICADA</option>
              <option value='MODULO COM AVARIA'>MODULO COM AVARIA</option>
              <option value='CAMERA ADAS COM AVARIA'>CAMERA ADAS COM AVARIA</option>
              <option value='CAMERA DSM COM AVARIA'>CAMERA DSM COM AVARIA</option>
              <option value='LEITORA DE AUDIO COM AVARIA'>LEITORA DE AUDIO COM AVARIA</option>
              <option value='BUZZER COM AVARIA'>BUZZER COM AVARIA</option>
              <option value='SD CARD CM AVARIA'>SD CARD CM AVARIA</option>
              <option value='CONFIGURACAO IRREGULAR'>ONFIGURACAO IRREGULAR'</option>
              <option value='SCRIPT DESATUALIZADO'>SCRIPT DESATUALIZADO</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="" hidden>
            <Form.Label>DETECÇÃO DA FALHA? (PREVENÇÃO):</Form.Label>
            <Form.Select name='deteccao_falha[]' required  {...register("deteccao_falha[]")}>
              <option value='VIOLACAO'>VIOLACAO</option>
              <option value='FALHA DE SCRIPT'>FALHA DE SCRIPT</option>
              <option value='FALHA DE EQUIPAMENTO'>FALHA DE EQUIPAMENTO</option>
              <option value='FALHA DE CONFIGURACAO'>FALHA DE CONFIGURACAO</option>
              <option value='FALHA DE INSTALACAO'>FALHA DE INSTALACAO</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="" >
            <Form.Label>RESPONSÁVEL PELA FALHA?:</Form.Label>
            <Form.Select name='responsavel_falha[]' required {...register("responsavel_falha[]")}>
              <option value='CLIENTE'>CLIENTE</option>
              <option value='OPERACAO'>OPERAÇÃO</option>
              <option value='EQUIPAMENTO'>EQUIPAMENTO</option>
              <option value='DESENVOLVIMENTO'>DESENVOLVIMENTO</option>
            </Form.Select>
          </Form.Group>
        </div>
        <div className='group-form-os'>
          <Form.Group className="" >
            <Form.Label>QUAL A SOLUÇÃO?:</Form.Label>
            <Form.Select id='solucao' name='solucao[]' required multiple {...register("solucao[]")}>
            <option value='TROCA DE TECNOLOGIA'>TROCA DE TECNOLOGIA</option>
              <option value='SEM PROBLEMAS DIAGNOSTICADO'>SEM PROBLEMAS DIAGNOSTICADO</option>
              <option value='SEM NECESSIDADE DE TRATATIVAS'>SEM NECESSIDADE DE TRATATIVAS</option>
              <option value='ATUALIZAÇÃO FIRMWARE/SCRIPT'>ATUALIZAÇÃO FIRMWARE/SCRIPT</option>
              <option value='CHICOTE SUBSTITUIDO/CONSERTADO'>CHICOTE SUBSTITUIDO/CONSERTADO</option>
              <option value='CHIP SUBSTITUIDO'>CHIP SUBSTITUIDO</option>
              <option value='EQUIPAMENTO SUBSTITUIDO DANIFICADO'>EQUIPAMENTO SUBSTITUIDO DANIFICADO</option>
              <option value='EQUIPAMENTO SUBSTITUIDO DEFEITO'>EQUIPAMENTO SUBSTITUIDO DEFEITO</option>
              <option value='INCLUSÃO NOVOS RECURSOS'>INCLUSÃO NOVOS RECURSOS</option>
              <option value='LEITORA SUBSTITUIDA'>LEITORA SUBSTITUIDA</option>
              <option value='LOCAL DA INSTALAÇÃO ALTERADO'>LOCAL DA INSTALAÇÃO ALTERADO</option>
              <option value='REPOSICIONAMENTO/CALIBRACAO CAMERAS'>REPOSICIONAMENTO/CALIBRAÇAO CAMERAS</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="" >
            <Form.Label>MATERIAL REMOVIDO:</Form.Label>
            <Select id='material_retirado' name='material_retirado[]'
              options={registrosEquipmentsWarehouse.map(sup => ({ value: sup.id, label: sup.tipo + " (ID " + sup.identificador + ")" }))}
              isMulti
              onChange={(item) => setSelectEquipmentRemoved(item)}
              components={animatedComponents} />
          </Form.Group>
          <Form.Group className="" >
            <Form.Label>MATERIAL UTILIZADO:</Form.Label>
            <Select id='material_usado' name='material_usado[]'
              options={registrosEquipmentsUser.map(sup => ({ value: sup.id, label: sup.tipo + " (ID " + sup.identificador + ")" }))}
              isMulti
              onChange={(item) => setSelectEquipmentUsed(item)}
              components={animatedComponents} />
          </Form.Group>
          <Form.Group className="" >
            <Form.Label>PERIFÉRICOS UTILIZADO:</Form.Label>
            <Select id="periferico" name="periferico[]"
              options={registrosPeripherals.map(sup => ({ value: sup.id, label: sup.item }))}
              isMulti
              onChange={(item) => setSelectPerifericoUsed(item)}
              components={animatedComponents} />
          </Form.Group>
          <Form.Group className="">
            <Form.Label className=''>Registro fotografico</Form.Label>
            <Form.Control type="file" name="imagem" id="imagem-input" multiple ref={filesElement} />
          </Form.Group>
        </div>
        <Form.Group className="col-md-12 col-sm-12">
          <Button variant="primary float-right" type="submit">
            Salvar
          </Button>
        </Form.Group>

      </Form>
    </>
  );
}

export default OrderOfServiceMaintenance