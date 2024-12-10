//IMPORTAÇÕES BIBLIOTECAS REACT
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { axiosApi } from '../../../services/axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import { Card } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack'

import { saveAs } from 'file-saver'
import ReactDOM from 'react-dom';
import { Row } from 'react-bootstrap';
import Papa from 'papaparse';

function EquipmentCRU() {

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();

  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate = useNavigate()

  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit, reset /*, formStates:{erros}*/ } = useForm();
  const [registroUsers, setRegistroUsers] = useState([]);
  const [qrCode, setQrCode] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [usuario, setUsuario] = useState('')
  const [tipoEquip, setTipoEquip] = useState('')
  const [dados, setDados] = useState([]);
  const [label, setLabel] = useState(0);
  //ENVIANDO FORMULARIO COM A BIBLIOTECA REACT-HOOK-FORM
  const form = (formContent) => {
    if (id) {
      //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
      axiosApi.patch('/update_equipment', formContent)
        .then(function (response) {
          navigate(-1)
        })
        .catch(function (error) {
        });
    } else {
      //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
      axiosApi.post('/create_equipment', formContent)
        .then(function (response) {
          navigate(-1)
        })
        .catch(function (error) {
          toast(error.response.data.msg)
        });
    }
  }
  //ENVIANDO FORMULARIO COM A BIBLIOTECA REACT-HOOK-FORM
  const formImport = (formContent) => {

    formContent.lista = dados

    //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
    axiosApi.post('/create_equipment_import', formContent)

      .then(function (response) {
        toast(response.data.msg)
        setTimeout(() => {
          navigate(-1)
        }, 5000);
       
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE INUSMOS DO TIPO EQUIPAMENTOS POR TIPO
  const [registrosInputs, setRegistrosInputs] = useState([]);
  useEffect(() => {
    axiosApi.get("/list_equipment_input")
      .then((response) => {
        setRegistrosInputs(response.data)
      })
      .catch(function (error) {
      });

  }, [])
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE USUARIOS DO SETOR DE HARDWARE
  useEffect(() => {
    axiosApi.get("/list_user_hardware")
      .then((response) => {
        console.log(response)
        setRegistroUsers(response.data)
      })
      .catch(function (error) {
      });
  }, [])
  //REQUISIÇÃO COM A BIBLIOTECA axiosApi PARA SOLICITAR O CADASTRO DO CLIENTE CASO SEJA UMA EDIÇÃO
  useEffect(() => {
    if (id) {
      axiosApi.get("/show_equipment/" + id)
        .then((response) => {
          reset(response.data)
        })
        .catch(function (error) {
        });
    }
    if (id) {
      //console.log(reset)
    }
  }, [])


  const lerDadosArquivo = (e) => {
    const arquivo = e.target.files[0];

    // Verificar se existe o arquivo
    if (arquivo) {

      // Usar a biblioteca para analisar o arquivo
      Papa.parse(arquivo, {
        //Papa.parse('arquivo_inexistente.csv', { // Simular erro
        //download: true,  // Simular erro
        header: false, // Define se a primeira linha do CSV é um cabeçalho
        dynamicTyping: true, // Converte automaticamente números e datas
        complete: (result) => { // Acessar complete após realizar a leitura do CSV
          //console.log(result.data);
          setDados(result.data);
          console.log(result.data)
          setLabel(result.data.length)
        },
        error: (error) => { // Acessar error se houver erro na leitura do CSV
          alert('Erro ao analisar o CSV:', error.message);
        },
      });
    }
  }
  return (
    <>
      <ToastContainer position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="dark" />

      <Button variant="danger float-right" style={{ width: '80px' }} onClick={handleShow}>
        importar
      </Button>
      <Row>

      </Row>

      <Form onSubmit={handleSubmit(form)}>
        <Stack direction="horizontal" gap={2}>
        

          <div className='col-md-9 col-sm-12'>
            <Form.Control type="hidden" name="id" value={id}  {...register("id")} />

            <Form.Group className="" >
              <Form.Label>IDENTIFICADOR(ID):</Form.Label>
              <Form.Control type="text" name="identificador" required  {...register("identificador")} />
            </Form.Group>
            <Form.Group className="" >
              <Form.Label>NÚMERO DE SERIE:</Form.Label>
              <Form.Control type="text" name="numero_serie" id="numero_serie" required disabled={id ? true : false} {...register("numero_serie")} />
            </Form.Group>
            <Form.Group className="" >
              <Form.Label>TIPO DE EQUIPAMENTO:</Form.Label>
              <Form.Select name="tipo" id="tipo" required disabled={id ? true : false} {...register("tipo")}>
                <option value=''>Selecione...</option>
                {registrosInputs.map((registro, key) => {
                  return (
                    <option value={registro.item}>{registro.item}</option>
                  )
                })}
              </Form.Select>
            </Form.Group>
          </div>

        </Stack>

        <Form.Group className="col-md-12 col-sm-12">
          <Button variant="primary float-right" type="submit">
            Salvar
          </Button>
        </Form.Group>
      </Form>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={handleSubmit(formImport)} enctype="multipart/form-data" >
          <Modal.Header closeButton>
            <Modal.Title>IMPORTAR EQUIPAMENTOS</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group style={{ paddingLeft: '20px', border: 'solid 1px', marginBottom: '5px' }}>
              <Row> Leia atentamente as instruções:</Row>
              <Row>-Importe um tipo de equipamento por vez</Row>
              <Row> -O Arquivo não deve conter cabeçalhos</Row>
              <Row> -1º coluna destinada ao ID</Row>
              <Row> -2º coluna destinada ao número de série</Row>
              <Row> -Confira os dados antes de processeguir, não será possível refazer a operação!</Row>
            </Form.Group>
            <Card className='form-div'>
            <Form.Group>
              <Form.Label>TIPO DE EQUIPAMENTO:</Form.Label>
              <Form.Select name="tipo_import" id="tipo" required {...register("tipo_import")}>
                <option value=''>Selecione...</option>
                {registrosInputs.map((registro, key) => {
                  return (
                    <option value={registro.item}>{registro.item}</option>
                  )
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Selecione o arquivo...</Form.Label>
              <Form.Control type="file" accept=".csv" onChange={lerDadosArquivo}  required/>
            </Form.Group>
            <label>{label + " Equipamentos selecionados"}</label>
          </Card>
          <Card className='form-div'>
            <Form.Group className="col-md-12 col-sm-12" >
              <Form.Label>DESTINATÁRIO DO HARDWARE:</Form.Label>
              <Form.Select name="usuario_id_import" id="selectUsuario" {...register("usuario_id_import")}>
                <option value="">...</option>
                {registroUsers.map((registro, key) => {
                  return (
                    <option value={registro.id}>{registro.nome_usuario}</option>
                  )

                })}
              </Form.Select>
            </Form.Group>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type='submit'> Enviar</Button>
        </Modal.Footer>
      </Form>

    </Modal >
    </>
  );
}

export default EquipmentCRU
