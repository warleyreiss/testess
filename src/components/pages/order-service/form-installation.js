//IMPORTAÇÕES BIBLIOTECAS REACT
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { axiosApi } from '../../../services/axios';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';


import Select from 'react-select'
import makeAnimated from 'react-select/animated'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRef } from 'react';
function OrderOfServiceInstallation() {

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();

  const filesElement = useRef(null);

  // CRIANDO INSTANCIA DO REACT CONTEXT
  const { onVisit } = useContext(AuthContext)
  const { userTipo } = useContext(AuthContext);
  const animatedComponents = makeAnimated();

  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate = useNavigate()

  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

  //CRIANDO USESTATE DA PAGINA
  const [registrosPeripherals, setRegistrosPeripherals] = useState([]);
  const [registrosEquipments, setRegistrosEquipments] = useState([]);
  const [selectEquipmentUsed, setSelectEquipmentUsed] = useState([]);
  const [selectPerifericoUsed, setSelectPerifericoUsed] = useState([]);
  const [selectEquipmentRemoved, setSelectEquipmentRemoved] = useState([]);
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
  const form = (formContent) => {

    
    const select = formContent.material_usado=selectEquipmentUsed
    const select2 = formContent.periferico=selectPerifericoUsed

    const dataForm = new FormData()

    dataForm.append("idOS", formContent.idOS)
    dataForm.append("material_usado", selectEquipmentUsed)
    dataForm.append("periferico", selectPerifericoUsed)

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
      });

  }
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE INSUMOS
  useEffect(() => {
    axiosApi.get("/list_peripheral_input")
      .then((response) => {
        setRegistrosPeripherals(response.data)
      })
      .catch(function (error) {
      });

  }, [])

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE EQUIPAMENTOS DO USUÁRIO EM QUESTÃO
  useEffect(() => {
    if (userTipo=='TERCEIRO'){  
      axiosApi.get("/list_equipment_input_terceiro/"+id)
      .then((response) => {
        setRegistrosEquipments(response.data)
      })
      .catch(function (error) {
      });
    }else{
      axiosApi.get("/list_equipment_me")
      .then((response) => {
        setRegistrosEquipments(response.data)
      })
      .catch(function (error) {
      });
    }
   

  }, [])
  return (
    <>
      <Form onSubmit={handleSubmit(form)} enctype="multipart/form-data" id='meu-formulario'>
        <Form.Control type="hidden" name="idOS" value={id} required {...register("idOS")} />
        <Form.Group className="" >
          <Form.Label>MATERIAL UTILIZADO:</Form.Label>
          <Select id='material_usado' name='material_usado[]'
            options={registrosEquipments.map(sup => ({ value: sup.id, label: sup.tipo + " (ID " + sup.identificador + ")" }))}
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
        <Form.Group className="col-md-12 col-sm-12">
          <Button variant="primary float-right" type="submit">
            Salvar
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default OrderOfServiceInstallation