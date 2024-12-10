//IMPORTAÇÕES BIBLIOTECAS REACT
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { axiosApi } from '../../../services/axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';
function OrderOfServiceAssess() {
    const filesElement = useRef(null);
    //OBTENDO VARIAVEIS PARASSADAS VIA URL
    const { id } = useParams();

    // CRIANDO INSTANCIA DO REACT CONTEXT
    const { onVisit } = useContext(AuthContext)

    //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
    const navigate = useNavigate()

    //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
    const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

    //CRIANDO USESTATE DA PAGINA
    const [hiddenMotivo, setHiddenMotivo] = useState(false);
    const [hiddenControl, setHiddenControl] = useState(true);
    const [requiredMotivo, setRequiredMotivo] = useState(true);
    const [requiredControl, setRequiredControl] = useState(false);
    const [imagens, setImagens] = useState([]);
    //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
    const form = (formContent) => {
        console.log(formContent)
        const dataForm= new FormData()
        dataForm.append("atendimento", formContent.atendimento)
        dataForm.append("motivo_nao_atendimento", formContent.motivo_nao_atendimento)  
        dataForm.append("idOS", formContent.idOS)
        /* comentei por que está gerando lentidão no sistema
        for (const file of filesElement.current.files) {
          dataForm.append('file', file);
        }
        */
       
 
        //CONSUMO DE API COM A BIBLIOTECA AXIOS
        
        axiosApi.patch('/update_order_service_assess',formContent) 
       //funciona
       /*
        const dataForm = new FormData();
        for (const file of filesElement.current.files) {
          dataForm.append('file', file);
        }
        console.log(dataForm)
  
 
        //CONSUMO DE API COM A BIBLIOTECA AXIOS
        axiosApi.patch('/upload',dataForm, {  headers: {
            Accept: "multipart/form-data",
       }})  */
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
    //FUNÇÃO PARA ALTERNAR OS COMPOS DO FORMULÁRIO CONFORME PREENCHIMENTOS
    const atendimento = (value) => {

        if (value === "SIM") {
            setHiddenMotivo(true)
            setRequiredMotivo(false)
            setHiddenControl(false)
            setRequiredControl(true)
        } else {
            setHiddenMotivo(false)
            setRequiredMotivo(true)
            setHiddenControl(true)
            setRequiredControl(false)
        }
    }
    return (
        <>
            <Form onSubmit={handleSubmit(form)} enctype="multipart/form-data" id='meu-formulario'>
                <Form.Control type="hidden" name="idOS" value={id} required {...register("idOS")} />
                <Form.Group className="">
                    <Form.Label>É POSSÍVEL REALIZAR O ATENDIMENTO?:</Form.Label>
                    <Form.Select id='atendimento' name='atendimento' required onClick={e => atendimento(e.target.value)}  {...register("atendimento")}>
                        <option value='SIM'>SIM- ATENDIMENTO REALIZADO</option>
                        <option value='NAO' selected>NÃO- ATENDIMENTO FRUSTADO</option>
                    </Form.Select>

                    {/* criar script alterar o estado do campo abaixo*/}
                </Form.Group>
                <Form.Group className="" id="Rowatendimento" hidden={hiddenMotivo}>
                    <Form.Label>MOTIVO:</Form.Label>
                    <Form.Select id='descricao_atendimento' name='motivo_nao_atendimento' required={requiredMotivo} {...register("motivo_nao_atendimento")}>
                        <option selected value=''>selecione...</option>
                        <option value='VEÍCULO COM AVARIAS'>VEÍCULO COM AVARIAS</option>
                        <option value='VEÍCULO EM MANUTENÇÃO'>VEÍCULO EM MANUTENÇÃO</option>
                        <option value='VEÍCULO INDISPONÍVEL'>VEÍCULO INDISPONÍVEL</option>
                        <option value='VEÍCULO PARADO'>VEÍCULO PARADO</option>
                        <option value='TREINAMENTO ADIADO IN LOCO'>TREINAMENTO ADIADO IN LOCO</option>
                        <option value='TREINAMENTO SEM PARTICIPANTE'>TREINAMENTO SEM PARTICIPANTE</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="form-check form-switch" id="Rowavaliacao" hidden={hiddenControl}>
                    <Form.Control className='form-check-input' type="checkbox" required={requiredControl} />
                    <Form.Label className='form-check-label'>Painel em bom estado de conservação, sem avarias</Form.Label>
                </Form.Group>
                <Form.Group className="form-check form-switch" id="Rowavaliacao" hidden={hiddenControl} >
                    <Form.Control className='form-check-input' type="checkbox" required={requiredControl} />
                    <Form.Label className='form-check-label'>Sem luzes de avarias acessas</Form.Label>
                </Form.Group>
                <Form.Group className="form-check form-switch" id="Rowavaliacao" hidden={hiddenControl}>
                    <Form.Control className='form-check-input' type="checkbox" required={requiredControl} />
                    <Form.Label className='form-check-label'>Veículo liga normalmente</Form.Label>
                </Form.Group>
                <Form.Group className="form-check form-switch" id="Rowavaliacao" hidden={hiddenControl}>
                    <Form.Control className='form-check-input' type="checkbox" required={requiredControl} />
                    <Form.Label className='form-check-label'>Luzes e setas funcionando</Form.Label>
                </Form.Group>
                <Form.Group className="form-check form-switch" id="Rowavaliacao" hidden={hiddenControl} >
                    <Form.Control className='form-check-input' type="checkbox" required={requiredControl} />
                    <Form.Label className='form-check-label'>instalações do veículo isoladas e sem risco de intercorrência que possa vir a ser incumbido no meu serviço</Form.Label>
                </Form.Group>
                <Form.Group className="" id="imagem"  hidden={!hiddenControl}>
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

export default OrderOfServiceAssess