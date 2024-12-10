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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import { useRef } from 'react';
function OrderOfServiceRemoval() {
  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();
  const filesElement = useRef(null);

  // CRIANDO INSTANCIA DO REACT CONTEXT
  const { onVisit } = useContext(AuthContext)


  const animatedComponents = makeAnimated();

  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate = useNavigate()

  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();
  const [registrosEquipmentsWarehouse, setRegistrosEquipmentsWarehouse] = useState([]);
  const [registrosInsumos, setRegistrosInsumos] = useState([]);
  const [selectEquipmentRemoved, setSelectEquipmentRemoved] = useState([]);
  const [selectEquipmentUsed, setSelectEquipmentUsed] = useState([]);
  const [selectPerifericoUsed, setSelectPerifericoUsed] = useState([]);
  
  const [hidden, setHidden] = useState(false);
  const [required, setRequired] = useState(true);
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
  const form = (formContent) => {
    
    

    const select3 = formContent.material_retirado=selectEquipmentRemoved

    const dataForm = new FormData()

    dataForm.append("idOS", formContent.idOS)
    dataForm.append("violacao", formContent.violacao)
    dataForm.append("danos", formContent.danos)
    dataForm.append("descricao_violacao", formContent.descricao_violacao)
    dataForm.append("material_retirado", selectEquipmentRemoved)

    /* comentei por que está gerando lentidão no sistema
    for (const file of filesElement.current.files) {
      dataForm.append('file', file);
    }
      */
    //CONSUMO DE API COM A BIBLIOTECA AXIOS
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
      });
  }

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE EQUIPAMENTOS EM POSSE DO CLIENTEEM QUESTAO
  useEffect(() => {
    axiosApi.get("/list_equipment_warehouse_input_removal/"+ id)
      .then((response) => {
        console.log(response.data)
        setRegistrosEquipmentsWarehouse(response.data)
      })
      .catch(function (error) {
      
      });

  }, [])


  //REQUISIÇÃO COM A BIBLIOTECA axiosApi PARA SOLICITAR LISTA DE TODOS INUSMOS
  useEffect(() => {
    axiosApi.get("/list_insumo_input")
      .then((response) => {
        setRegistrosInsumos(response.data)
      })
      .catch(function (error) {
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
      <Form onSubmit={handleSubmit(form)} enctype="multipart/form-data" id='meu-formulario'>
        <Form.Control type="hidden" name="idOS" value={id} required {...register("idOS")} />
        <div className='group-form-os' id="campo_violacao">
          <Form.Group className="" >
            <Form.Label>HOUVE VIOLAÇÃO?:</Form.Label>
            <Form.Select id='violacao' name='violacao' required onClick={e => violacao(e.target.value)} {...register("violacao")} >
              <option value='SIM' selected> Houve violação</option>
              <option value='NAO'> Não houve violação</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="" hidden={hidden}>
            <Form.Label>A VIOLAÇÃO CAUSOU DANOS?:</Form.Label>
            <Form.Select id='danos' name='danos' required={required}  {...register("danos")}>
              <option value="NAO">Não houve danos aparente</option>
              <option value="REPARAVEL">Sim, porém foi reparado no local</option>
              <option value="IRREPARAVEL">Sim, precisou recolher o equipamento</option>
            </Form.Select>
            <Form.Label>O QUE FOI VIOLADO?:</Form.Label>
            <Form.Select id='descricao_violacao' name='descricao_violacao' required={required}  {...register("descricao_violacao")}>

              {registrosInsumos.map((registro, key) => {
                return (
                  <option value={registro.id}>{registro.item}</option>
                )
              })}
            </Form.Select>
          </Form.Group>
        </div>

        <Form.Group className="" >
          <Form.Label>MATERIAL REMOVIDO:</Form.Label>
          <Select  id='material_retirado' name='material_retirado[]' 
          options={registrosEquipmentsWarehouse.map(sup=>({value:sup.id, label:sup.tipo +" (ID "+ sup.identificador +")"}))} 
          isMulti 
          onChange={(item)=>setSelectEquipmentRemoved(item)}
          components={animatedComponents}/>
        </Form.Group>
        <Form.Group className="">
          <Form.Label className=''>Registro fotografico</Form.Label>
          <Form.Control type="file" name="imagem" id="imagem-input" multiple ref={filesElement} />
        </Form.Group>
        <Form.Group className="col-md-12 col-sm-12">
          <Button variant="primary float-right" type="submit">
            Salvar
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default OrderOfServiceRemoval