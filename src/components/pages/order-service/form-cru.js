
//IMPORTAÇÕES BIBLIOTECAS REACT
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { axiosApi } from '../../../services/axios';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderOfServiceCRU() {

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();
  const animatedComponents = makeAnimated();

  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate = useNavigate()

  const { userTipo } = useContext(AuthContext);

  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);
  const [terceiroImput, setTerceiroImput] = useState(userTipo == 'GESTOR');
  const [selectVehicle, setSelectVehicle] = useState([]);

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE VEICULOS ESPECIFICO DO CLIENTE A QUAL PERTENCE O SERVICO
  useEffect(() => {
    axiosApi.get("/list_vehicle_input/" + id)
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });

  }, [])

  //REQUISIÇÃO COM A BIBLIOTECA axiosApi PARA ENVIO FORMULARIO
  const form = (formContent) => {
    const selectImputVehicle = formContent.veiculo_id = selectVehicle
    axiosApi.post('/create_order_service', formContent)
      .then(function (response) {
        navigate('/service/view')
        toast(response.data.msg)
      })
      .catch(function (error) {
      })
  }

  //FUNÇÃO PARA ALTERNAR OS COMPOS DO FORMULÁRIO CONFORME PREENCHIMENTOS, SE A OS FOR DO TIPO SUBSTITUIÇÃO
  //É OBRIGATÓRIO PREENCHER A PLACA NOVA E A ANTIGA
  const frotaSubistituir = (value) => {

    if (value == 'SUBSTITUICAO') {
      const inputSelecao = document.getElementById('formGroupSubistituir').removeAttribute('hidden');
      const input = document.getElementById('selectSubistituir').required = true;
      const qdade = document.getElementById('Selectveiculo').selectedOptions.length;
      if (qdade != 1) {
        console.log(qdade)
        const btn = document.getElementById('enviar').setAttribute('disabled', 'true');
      } else {
        const btn = document.getElementById('enviar').removeAttribute('disabled');
      }
    } else {
      const btn = document.getElementById('enviar').removeAttribute('disabled');
      const inputSelecao = document.getElementById('formGroupSubistituir').hidden = true;
      const input = document.getElementById('selectSubistituir').removeAttribute('required');
    }


  }
  const qdade = () => {
    const inputSelecao = document.getElementById('tipo').value;
    const qdade2 = document.getElementById('Selectveiculo').selectedOptions.length;
    if (inputSelecao == 'SUBSTITUICAO' && qdade2 != 1) {

      const btn = document.getElementById('enviar').setAttribute('disabled', 'true');
    } else {
      const btn = document.getElementById('enviar').removeAttribute('disabled');
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(form)}>
        <Form.Control type="hidden" name="servico_id" value={id} required {...register("servico_id")} />
        <Form.Group className="" >
          <Form.Label>TIPO DE TAREFA:</Form.Label>
          <Form.Select id="tipo" name="tipo" required onClick={e => frotaSubistituir(e.target.value)} {...register("tipo")}>
            <option value="INSTALACAO"> INSTALAÇÃO</option>
            <option value="INSTALACAO SETUP"> INSTALAÇÃO SETUP</option>
            <option value="MANUTENCAO"> MANUTENÇÃO</option>
            <option value="REMOCAO"> REMOÇÃO</option>
            <option value="SUBSTITUICAO">SUBSTITUIÇÃO FROTA</option>
            <option value="TREINAMENTO">TREINAMENTO</option>
          </Form.Select>
          {/* criar script para OS do tipo  substituição*/}
        </Form.Group>
        <Form.Group className="" >
          <Form.Label>PRODUTO:</Form.Label>
          <Form.Select name="produto" id="produto" required {...register("produto")}>
            <option value="TELEMETRIA BIPADA" > TELEMETRIA BIPADA</option>
            <option value="TELEMETRIA AUDIO" > TELEMETRIA ÁUDIO</option>
            <option value="TELEMETRIA AUDIO ROTOGRAMA">TELEMETRIA AUDIO ROTOGRAMA</option>
            <option value="RASTREAMENTO BASICO">RASTREAMENTO BÁSICO</option>
            <option value="RASTREAMENTO COM IDENTIFICACAO">RASTREAMENTO COM IDENTIFICAÇÃO</option>
            <option value="MONITORAMENTO FADIGA">MONITORAMENTO FADIGA</option>
            <option value="MONITORAMENTO CAMERAS OFFLINE">MONITORAMENTO CAMERAS OFFLINE</option>
            <option value="INTEGRACAO MAESTRIA">INTEGRACAO MAESTRIA</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="" >
          <Form.Label>VEÍCULO(S) PARA O SERVIÇO:</Form.Label>

          <Select name="veiculo_id[]" id="Selectveiculo"
            options={registros.map(sup => ({ value: sup.id, label: sup.placa }))}
            isMulti
            onChange={(item) => setSelectVehicle(item)}
            onClick={e => qdade()}
            components={animatedComponents} />
        </Form.Group>
        <Form.Group className="" id='formGroupSubistituir' hidden>
          <Form.Label>VEÍCULO A SER SUBSTITUIDO:</Form.Label>
          <Form.Select name="veiculo_remocao_id" id="selectSubistituir" {...register("veiculo_remocao_id")}>
            <option value="" selected>Selecione...</option>
            {registros.map((registro, key) => {
              return (
                <option value={registro.id}>{registro.placa + "/" + registro.frota}</option>
              )
            })}
          </Form.Select>
         
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>ORIENTAÇÕES PARA EXECUÇÃO DA TAREFA:</Form.Label>
            <Form.Control name='observacao' as="textarea" rows={3}  {...register("observacao")}/>
          </Form.Group>
        <Form.Group className="col-md-12 col-sm-12">
          <Button variant="primary float-right" type="su  bmit">
            Salvar
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default OrderOfServiceCRU