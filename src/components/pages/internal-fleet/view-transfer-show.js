//IMPORTAÇÕES BIBLIOTECAS REACT
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form';
import CardGroup from 'react-bootstrap/CardGroup'
import Figure from 'react-bootstrap/Figure';
import { axiosApi} from '../../../services/axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function InternalFleetTransferShow() {

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState('');

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
  useEffect(() => {
    axiosApi.get("/show_transfer_internal_fleet/" + id)
      .then((response) => {
        setRegistros(response.data)
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
              <Card.Title>DETALHAMENTO DO CHECKLIST {registros.frota_internas_id}</Card.Title>
              <div></div>
            </Stack>
          </Card.Header>
          <Card.Body>

          <Form.Group className="div-show" >
            <h5 className='bg-light2'>{registros.tipo}</h5>
            <div className="bg-light">USUÁRIO RESPONSÁVEL:  {registros.usuario_id}</div>
            <div className="bg-light">QUILOMETRAGEM: {registros.km_atual}</div>
            <div className="bg-light">FAROIS BAIXO: {registros.farol_baixo}</div>
            <div className="bg-light">FAROIS ALTO: {registros.farol_alto}</div>
            <div className="bg-light">FOROLETES DIANTEIROS: {registros.farolete_traseiro}</div>
            <div className="bg-light">FAROLETES TRASEIROS: {registros.farol_dianteiro}</div>
            <div className="bg-light">LUZES DE SETA: {registros.luz_seta}</div>
            <div className="bg-light">LUZES DE FREIO:{registros.luz_freio}</div>
            <div className="bg-light">LUZES DE RÉ:{registros.luz_re}</div>
            <div className="bg-light">NÍVEL DO ÓLEO LUBRIFICANTE DO MOTOR:{registros.oleo_motor}</div>
            <div className="bg-light">VALIDADE ÓLEO LUBRIFICANTE DO MOTOR:{registros.oleo_motor_validade}</div>
            <div className="bg-light">NÍVEL DO LIQUIDO DE ARREFECIMENTO:{registros.liq_arrefecimento}</div>
            <div className="bg-light">NÍVEL DO OLEO DE FREIO:{registros.oleo_freio}</div>
            <div className="bg-light">BUZINA:{registros.buzina}</div>
            <div className="bg-light">PNEUS:{registros.pneu}</div>
            <div className="bg-light">PNEUS:{registros.roda}</div>
            <div className="bg-light">ESTEPE:{registros.estepe}</div>
            <div className="bg-light">REGULAGEM DO FREIO DE MÃO:{registros.freio_mao}</div>
            <div className="bg-light">PALHETAS LIMPADORA DE PARABRISA:{registros.palheta}</div>
            <div className="bg-light">RETROVISORES:{registros.retrovisor}</div>
            <div className="bg-light">PLOTAGEM:{registros.plotagem}</div>
            <div className="bg-light">LIMPEZA INTERNA:{registros.limpeza_interna}</div>
            <div className="bg-light">LIMPEZA EXTERNA:{registros.limpeza_externa}</div>
            <div className="bg-light">LIMPEZA DOS BANCOS:{registros.limpeza_banco}</div>
            <div className="bg-light">ALARME:{registros.alarme}</div>
            <div className="bg-light">VIDROS:{registros.vidro}</div>
            <div className="bg-light">TAG DE PEDÁGIO:{registros.tag_pedagio}</div>
            <h5 className='bg-light2'>DATA DE REGISTRO {registros.data_registro}</h5>
          </Form.Group>
          
          <Form.Group className="div-show" >
            <h5 className='bg-light2'>ASSINATURA DO RESPONSÁVEL:</h5>
            <Figure.Image src={registros.assinatura} />
          </Form.Group>
          <Form.Group className="div-show" >
            <h5 className='bg-light2'>REGISTROS FOTOGRÁFICOS:</h5>
            <Figure.Image />
          </Form.Group>
          </Card.Body>
          <Card.Footer className="text-muted">

          </Card.Footer>
        </Card>
      </CardGroup>
    </>
  );
}

export default InternalFleetTransferShow