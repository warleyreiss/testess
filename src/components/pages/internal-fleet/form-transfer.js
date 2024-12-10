//IMPORTAÇÕES BIBLIOTECAS REACT
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { axiosApi } from '../../../services/axios';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import SignatureCanvas from 'react-signature-canvas'
import Modal from 'react-bootstrap/Modal';
function InternalFleetTrasnfer() {

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();

  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate = useNavigate()

  const { userTipo } = useContext(AuthContext);
  const { userId } = useContext(AuthContext);
  const { selectedCar } = useContext(AuthContext);
  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit, reset /*, formStates:{erros}*/ } = useForm();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);
  const [HiddenUser, setHiddenUser] = useState(false);
  const [registrosUsers, setRegistrosUsers] = useState([]);

  const { signature, setSignature } = useState()
  const [toDataURLSignature, setToDataURLSignature] = useState('');

  //FUNÇÃO DA BIBLIOTECA REACT-BOOSTRAP DOS COMPONENTES MODAL
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [fullscreen, setFullscreen] = useState(true);
  const [sign, setSign] = useState();


  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
  const form = (formContent) => {
    if (userTipo != "GESTOR") {
      formContent.usuario_id = userId;
      formContent.tipo = 'TROCA VEÍCULO';
    }else{
      formContent.tipo = 'INSPEÇÃO PERIÓDICA';
    }
    if (id) {
      //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
      axiosApi.patch('/transfer_internal_fleet', formContent)
        .then(function (response) {
          selectedCar(response.data.registro)
         navigate(-1)
        })
        .catch(function (error) {
        });
    } else {
      //CONSUMO DE API COM A BIBLIOTECA AXIOS
      axiosApi.post('/create_internal_fleet', formContent)
        .then(function (response) {
          navigate('/client')
        })
        .catch(function (error) {
        });
    }

  }
  //REQUISIÇÃO COM A BIBLIOTECA axiosApi PARA SOLICITAR O CADASTRO DO CLIENTE CASO SEJA UMA EDIÇÃO
  useEffect(() => {
    if (id) {
      axiosApi.get("/show_internal_fleet/" + id)
        .then((response) => {
          reset(response.data)
        })
        .catch(function (error) {
        });
    }
  }, [])

  //REQUISIÇÃO COM A BIBLIOTECA axiosApi PARA SOLICITAR O CADASTRO DE USUARIOS QUE SEJA DO TIPO DIFERENTE DE 'CLIENTE'
  useEffect(() => {
    axiosApi.get("/list_user_iternal_fleet")
      .then((response) => {
        setRegistrosUsers(response.data)
      })
      .catch(function (error) {
      });
  }, [])
  useEffect(() => {
    if (userTipo != "GESTOR") {
      setHiddenUser(true)
    }
  })



  //FUNÇÃO DA BIBLIOTECA SIGNATURE_PAD
  const handleClear = () => {
    sign.clear()
    let input = document.getElementById("input-assinatura")
    input.value = ""
  }
  const handleConfirm = () => {
    let sigImage = document.getElementById("sig-image")
    sigImage.setAttribute("src", sign.toDataURL());
    const canvas = document.getElementById("canvas-signature")
    const url = canvas.toDataURL()
    setToDataURLSignature(url)
    let input = document.getElementById("input-assinatura")
    input.value = url
    handleClose()

  }
  return (
    <>
      <Form onSubmit={handleSubmit(form)} enctype="multipart/form-data">
        <Form.Control type="hidden" name="id" value={id}  {...register("id")} />
        <Form.Group className="" >
          <Form.Label>QUILOMETRAGEM ATUAL</Form.Label>
          <Form.Control type="text" name="kmAtual" required {...register("kmAtual")} />
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"   name='farolBaixo' {...register("farolBaixo")}/>
          <Form.Label className='form-check-label'>Farois alto</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"   name='farolAlto' {...register("farolAlto")}/>
          <Form.Label className='form-check-label'>Farois baixo</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"   name='faroleteDianteiro' {...register("faroleteDianteiro")}/>
          <Form.Label className='form-check-label'>Faroletes dianteiros</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"   name='faroleteTraseiro' {...register("faroleteTraseiro")}/>
          <Form.Label className='form-check-label'>Faroletes traseiros</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"   name='luzSeta' {...register("luzSeta")}/>
          <Form.Label className='form-check-label'>Luzes de seta</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"    name='luzFreio' {...register("luzFreio")}/>
          <Form.Label className='form-check-label'>Luzes de freio</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"   name='luzRe' {...register("luzRe")}/>
          <Form.Label className='form-check-label'>Luzes de ré</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"   name='freioMao' {...register("freioMao")}/>
          <Form.Label className='form-check-label'>Regulagem freio de mão</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"   name='oleoMotor' {...register("oleoMotor")}/>
          <Form.Label className='form-check-label'>Nível de óleo motor</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"   name='oleoMotorValidade' {...register("oleoMotorValidade")}/>
          <Form.Label className='form-check-label'>validade do óleo motor</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"   name='liqArrefecimento' {...register("liqArrefecimento")}/>
          <Form.Label className='form-check-label'>Nível liq. arrefecimento</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"   name='oleoFreio' {...register("oleoFreio")}/>
          <Form.Label className='form-check-label'>Nível óleo de freio</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"  name='retrovisor' {...register("retrovisor")}/>
          <Form.Label className='form-check-label'>Retrovisores</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"  name='plotagem' {...register("plotagem")}/>
          <Form.Label className='form-check-label'>Plotagem</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"  name='limpezaInterna' {...register("limpezaInterna")}/>
          <Form.Label className='form-check-label'>Limpeza externa</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"  name='limpezaExterna' {...register("limpezaExterna")}/>
          <Form.Label className='form-check-label'>Limpeza interna/porta malas</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"  name='limpezaBanco' {...register("limpezaBanco")}/>
          <Form.Label className='form-check-label'>Limpeza bancos dianteiros e traseiros</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"  name='alarme' {...register("alarme")}/>
          <Form.Label className='form-check-label'>Alarme</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"  name='buzina' {...register("buzina")}/>
          <Form.Label className='form-check-label'>Buzina</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"  name='pneu' {...register("pneu")}/>
          <Form.Label className='form-check-label'>Pneus em bom estado</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"   name='roda' {...register("roda")}/>
          <Form.Label className='form-check-label'>Calotas ou aros</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"   name='estepe' {...register("estepe")}/>
          <Form.Label className='form-check-label'>Estepe calibrado</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"   name='vidros' {...register("vidro")}/>
          <Form.Label className='form-check-label'>Vidros/insufilme</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"   name='palhetas' {...register("palheta")}/>
          <Form.Label className='form-check-label'>Palhetas</Form.Label>
        </Form.Group>
        <Form.Group className="form-check form-switch">
          <Form.Control className='form-check-input' type="checkbox"   name='tagPedagio' {...register("tagPedagio")}/>
          <Form.Label className='form-check-label'>Tag sem parar</Form.Label>
        </Form.Group>
        <Form.Group className="" >
          <Form.Label>OBSERVAÇÕES GERAIS</Form.Label>
          <Form.Control type="text" name="observacao"  {...register("observacao")} />
        </Form.Group>
        <Form.Group className="" hidden={HiddenUser}>
          <Form.Label>USUARIO:</Form.Label>
          <Form.Select name="usuario_id" {...register("usuario_id")}>
            <option value='' > Selecione...</option>
            {registrosUsers.map((registro, key) => {
              return (
                <option value={registro.id}>{registro.nome}</option>
              )
            })}
          </Form.Select>
        </Form.Group >
        <Form.Group className="" id="imagem" >
          <Form.Label className=''>REGISTROS FOTOGRÁFICO</Form.Label>
          <Form.Control type="file" name="imagem[]" id="imagem-input" multiple {...register("imagem[]")} />
        </Form.Group>
        <Form.Control type="text" hidden name="assinatura" id="input-assinatura" required {...register("assinatura")} />
        <Form.Group className="campo-assinatura**">
          <img id="sig-image" src="" alt="" />
        </Form.Group>
        <Form.Group className="" >
          <Button variant="primary" onClick={handleShow} className='btn-form-sign'>
            Assinar transferência
          </Button>
          <Button variant="primary" type='submit' className='btn-form-sign' >
            Finalizar
          </Button>
        </Form.Group>
      </Form >
      <Modal classname='modal-sigin'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        fullscreen={fullscreen}
      >
        <Modal.Header>
          <Modal.Title>ASSINATURA DIGITAL COLABORADOR</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <SignatureCanvas penColor='green' canvasProps={{ width: 1150, height: 400, className: 'sigCanvas', id: 'canvas-signature' }} ref={data => setSign(data)} />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="secondary" onClick={handleClear}>
            Limpar
          </Button>
          <Button variant="secondary" onClick={handleConfirm}>
            Confirmar
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InternalFleetTrasnfer