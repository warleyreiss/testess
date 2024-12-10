//IMPORTAÇÕES BIBLIOTECAS REACT
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form';
import CardGroup from 'react-bootstrap/CardGroup'
import Figure from 'react-bootstrap/Figure';
import { axiosApi} from '../../../services/axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function OrderOfServiceShow() {

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState('');
  const [fotos, setFotos] = useState([]);
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
  useEffect(() => {
    axiosApi.get("/ordem_service_show/" + id)
      .then((response) => {
        setRegistros(response.data)
        if (response.data.registro_fotograficos) {
          setFotos(response.data.registro_fotograficos)
        }
      })
      .catch(function (error) {
      });

  }, [])
  return (
    <>
      <CardGroup>

        <Card >
          <Card.Header>
            <Stack direction="horizontal" gap={2}>
              <Card.Title>DETALHAMENTO DA ORDEM DE SERVIÇO Nº {registros.id}</Card.Title>
              <div></div>
            </Stack>
          </Card.Header>
          <Card.Body>

          <Form.Group className="div-show" >
            <h5 className='bg-light2'>DADOS PRINCIPAIS:</h5>
            <div className="bg-light">PLACA/FROTA:  {registros.placa + "/ " + registros.frota}</div>
            <div className="bg-light">DATA ÚLTIMA ATUALIZAÇÃO: {registros.data_registro}</div>
            <div className="bg-light">DATA REGISTRO: {registros.data_registro}</div>
            <div className="bg-light">TIPO SERVIÇO: {registros.tipo}</div>
            <div className="bg-light">PRODUTO: {registros.produto}</div>
            <div className="bg-light">ORIENTAÇÕES PASSADAS: {registros.observacao}</div>
            <div className="bg-light">ATENDIMENTO REALIZADO?: {registros.atendimento}</div>
            <div className="bg-light">MATERIAIS UTILIZADOS:{registros.material_usado}</div>
            <div className="bg-light">MATERIAIS REMOVIDOS:{registros.material_retirado}</div>
            <div className="bg-light">PERIFÉRICOS:{registros.periferico}</div>
            <div className="bg-light">EFEITO DA FALHA:{registros.efeito_falha}</div>
            <div className="bg-light">CAUSA DA FALHA:{registros.causa_falha}</div>
            <div className="bg-light">DETECÇÃO DA FALHA:{registros.deteccao_falha}</div>
            <div className="bg-light">RESPONSÁVEL DA FALHA:{registros.responsavel_falha}</div>
            <div className="bg-light">ATIVIDADES REALIZADAS:{registros.solucao}</div>
            <div className="bg-light">DESCRIÇÃO DA VIOLAÇÃO (SE REGISTRADO):{registros.descricao_violacao}</div>
            <div className="bg-light">RESPONSÁVEL/ACOMPANHANTE (ASS.):{registros.nome_assinatura}</div>
          </Form.Group>
          
          <Form.Group className="div-show" >
            <h5 className='bg-light2'>ASSINATURA DO RESPONSÁVEL:</h5>
            <Figure.Image src={registros.assinatura} />
          </Form.Group>
          <Form.Group className="div-show" >
            <h5 className='bg-light2'>REGISTROS FOTOGRÁFICOS:</h5>
            {fotos.map((foto) =>
              <Form.Group className="">
                <img src={foto} alt="registros" width={'500px'} />
              </Form.Group>
            )}
          </Form.Group>
          </Card.Body>
          <Card.Footer className="text-muted">

          </Card.Footer>
        </Card>
      </CardGroup>
    </>
  );
}

export default OrderOfServiceShow