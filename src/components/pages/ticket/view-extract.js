
//IMPORTAÇÕES BIBLIOTECAS REACT
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Alert, Row } from 'react-bootstrap';
import './styleExtract.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { axiosApi } from '../../../services/axios';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React, { useRef } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';

function TicketExtract() {

  const tableRef = useRef(null);

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();

  //CONSUMO DE API COM A BIBLIOTECA AXIOS//CRIANDO USESTATE DA PAGINA
  const [tickets, setTickets] = useState([]);
  const [client, setClient] = useState('');
  const [contract, setContract] = useState('');
  const [sum, setSum] = useState('');
  const [IRPJ, setIRPJ] = useState('');
  const [PIS, setPIS] = useState('');
  const [COFIS, setCOFIS] = useState('');
  const [CSL, setCSL] = useState('');

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE TICKETS DO EXTRADO SELECIOANDO
  useEffect(() => {
    axiosApi.get('/ticket_extract/' + id)
      .then((response) => {
        setClient(response.data.client)
        setContract(response.data.contract)
        setTickets(response.data.tickets)
        setSum(response.data.sum)
      })
      .catch(function (error) {
      });
  }, [])
  return (
    <>


      <Navbar className='noprint' expand="lg" variant="light" bg="light" >

        <DownloadTableExcel
          filename="users table"
          sheet="users"
          currentTableRef={tableRef.current}
        >
            <Button className='float-right'> Exportar </Button>

        </DownloadTableExcel>
      </Navbar>
      <Container>
        <Row>
          <Container classNameName='col-md-12 col-sm-12 form-group' id="dvData">
            <Table id="datatable" ref={tableRef}>
              <tr>
                <td className="linha-superior-inicio-bordas linha-inferior-inicio-bordas text-center" rowspan="5" colspan="3">
                  <img src='https://ss-servicos2.controleepi.com/public/img/logomarca_Preta.png' width={400}></img>
                </td>
                <td className="linha-superior-final-bordas negrito-table texto-grande" colspan="4">{contract.nome}</td>
              </tr>
              <tr>
                <td className="linha-meio-final-bordas texto-medio" colspan="4" >{contract.cnpj}</td>
              </tr>
              <tr>
                <td className="linha-meio-final-bordas  texto-medio" colspan="4" >{contract.endereco} </td>
              </tr>
              <tr>
                <td className="linha-inferior-final-bordas  texto-medio" colspan="4"> {contract.responsavel + "/ " + contract.telefone + "/ " + contract.email}</td>
              </tr>
              <tr>
                <td colspan="6"></td>
              </tr>
              <tr>
                <td className="titulo-table" colspan="7" >EXTRATO DETALHADO SERVIÇOS E PRODUTOS ENTREGUES</td>
              </tr>
              <tr>
                <td className="destaque-table texto-medio" colspan="1">CLIENTE:</td>
                <td className="negrito-table texto-medio" colspan="5">{client.nome}</td>
              </tr>
              <tr>
                <td className="destaque-table texto-medio" colspan="1">CNPJ:</td>
                <td className="negrito-table texto-medio" colspan="5">{client.cnpj}</td>
              </tr>
              <tr>
                <td className="destaque-table texto-medio" colspan="1">ENDEREÇO:</td>
                <td className="negrito-table texto-medio" colspan="5">{client.endereco}</td>
              </tr>
              <tr>
                <td className="destaque-table texto-medio" colspan="1">RESPONSÁVEL:</td>
                <td className="negrito-table texto-medio" colspan="5">{client.responsavel + " / " + client.telefone}</td>
              </tr>

              <tr>
                <td colspanName="6"></td>
              </tr>
              <tr colspan="7" className="negrito-table subtitulo-table">
                <td colspan="7">DESPESAS DE SERVICOS: </td>
              </tr>
              <tr>
                <td className="linha-superior-inicio-bordas">ID:</td>
                <td className="linha-superior-inicio-bordas">DATA:</td>
                <td className="linha-superior-meio-bordas" >DESCRIÇÃO:</td>
                <td className="linha-superior-meio-bordas" colspan="2">OBSERVAÇÃO:</td>
                <td className="linha-superior-meio-bordas" >OS:</td>
                <td className="linha-superior-final-bordas" >VALOR:</td>
              </tr>
              {tickets.map((registro, key) => {
                if (registro.tipo == 'SERVICO') {
                  return (
                    <tr>
                      <td className="linha-meio-inicio-bordas" > <Link className='link-table' to={{ pathname: `/ticket/show/${registro.id}` }}>{registro.id}</Link></td>
                      <td className="linha-meio-inicio-bordas" >{registro.data_registro}</td>
                      <td className="linha-meio-bordas">{registro.descricao}</td>
                      <td className="linha-meio-bordas" colspan="2">{registro.observacao}</td>
                      <td className="linha-meio-bordas"> <Link className='link-table' to={{ pathname: `/ordem-de-servico/show/${registro.ordem_servico_id}` }}>{registro.ordem_servico_id}</Link></td>
                      <td className="linha-meio-final-bordas">{'R$ ' + registro.valor.replace('.', ',')}</td>
                    </tr>
                  )
                }
              })}

              <tr>
                <td colspanName="5"></td>
              </tr>
              <tr colspan="7">
                <td colspan="7" className="negrito-table subtitulo-table" colspan="7">DESPESAS MATERIAIS: </td>
              </tr>
              <tr>
                <td className="linha-superior-inicio-bordas">ID:</td>
                <td className="linha-superior-inicio-bordas">DATA:</td>
                <td className="linha-superior-meio-bordas" >DESCRIÇÃO:</td>
                <td className="linha-superior-meio-bordas" colspan="2">OBSERVAÇÃO:</td>
                <td className="linha-superior-meio-bordas" >OS:</td>
                <td className="linha-superior-final-bordas" >VALOR:</td>
              </tr>
              {tickets.map((registro, key) => {
                if (registro.tipo == 'MATERIAIS') {
                  return (
                    <tr>
                      <td className="linha-meio-inicio-bordas" > <Link className='link-table' to={{ pathname: `/ticket/show/${registro.id}` }}>{registro.id}</Link></td>
                      <td className="linha-meio-inicio-bordas" >{registro.data_registro}</td>
                      <td className="linha-meio-bordas">{registro.descricao}</td>
                      <td className="linha-meio-bordas" colspan="2">{registro.observacao}</td>
                      <td className="linha-meio-bordas"> <Link className='link-table' to={{ pathname: `/ordem-de-servico/show/${registro.ordem_servico_id}` }}>{registro.ordem_servico_id}</Link></td>
                      <td className="linha-meio-final-bordas">{'R$ ' + registro.valor.replace('.', ',')}</td>
                    </tr>
                  )
                }
              })}
              <tr>
                <td colspanName="5"></td>
              </tr>
              <tr colspan="7">
                <td colspan="7" className="negrito-table subtitulo-table" colspan="7">DESPESAS DE ADICIONAIS: </td>
              </tr>
              <tr>
                <td className="linha-superior-inicio-bordas">ID:</td>
                <td className="linha-superior-inicio-bordas">DATA:</td>
                <td className="linha-superior-meio-bordas" >DESCRIÇÃO:</td>
                <td className="linha-superior-meio-bordas" colspan="2">OBSERVAÇÃO:</td>
                <td className="linha-superior-meio-bordas" >OS:</td>
                <td className="linha-superior-final-bordas" >VALOR:</td>
              </tr>
              {tickets.map((registro, key) => {
                if (registro.tipo == 'ADICIONAL') {
                  return (
                    <tr>
                      <td className="linha-meio-inicio-bordas" > <Link className='link-table' to={{ pathname: `/ticket/show/${registro.id}` }}>{registro.id}</Link></td>
                      <td className="linha-meio-inicio-bordas" >{registro.data_registro}</td>
                      <td className="linha-meio-bordas">{registro.descricao}</td>
                      <td className="linha-meio-bordas" colspan="2">{registro.observacao}</td>
                      <td className="linha-meio-bordas"> <Link className='link-table' to={{ pathname: `/ordem-de-servico/show/${registro.ordem_servico_id}` }}>{registro.ordem_servico_id}</Link></td>
                      <td className="linha-meio-final-bordas">{'R$ ' + registro.valor.replace('.', ',')}</td>
                    </tr>
                  )
                }
              })}
              <tr>
                <td colspanName="5"></td>
              </tr>
              <tr colspan="7">
                <td colspan="7" className="negrito-table subtitulo-table" colspan="7">DESPESAS DE VISITA: </td>
              </tr>
              <tr>
                <td className="linha-superior-inicio-bordas">ID:</td>
                <td className="linha-superior-inicio-bordas">DATA:</td>
                <td className="linha-superior-meio-bordas" >DESCRIÇÃO:</td>
                <td className="linha-superior-meio-bordas" colspan="2">OBSERVAÇÃO:</td>
                <td className="linha-superior-meio-bordas">VISITA:</td>
                <td className="linha-superior-final-bordas" >VALOR:</td>
              </tr>
              {tickets.map((registro, key) => {
                if (registro.tipo == 'VISITA') {
                  return (
                    <tr>
                      <td className="linha-meio-inicio-bordas" > <Link className='link-table' to={{ pathname: `/ticket/show/${registro.id}` }}>{registro.id}</Link></td>
                      <td className="linha-meio-inicio-bordas" >{Date.parse(registro.data_registro)}</td>
                      <td className="linha-meio-bordas">{registro.descricao}</td>
                      <td className="linha-meio-bordas" colspan="2">{registro.observacao}</td>
                      <td className="linha-meio-bordas">{registro.ordem_servico_id}</td>
                      <td className="linha-meio-final-bordas">{'R$ ' + registro.valor.replace('.', ',')}</td>
                    </tr>
                  )
                }
              })}

              <tr colspan="7" className="linha-separacao-tabela">
                <td colspan="7" className="titulo-table " colspan="7" >RESUMO DA FATURA</td>
              </tr>
              <tr>
                <td className="texto-soma" colspan="6">VALOR TOTAL SERVIÇOS EXTRAS R$:</td>
                <td className="texto-soma" id="totalParcial" colspan="1">{sum.sum} </td>
              </tr>
              <tr>
                <td>IRPJ:</td>
                <td className="texto-direita">{contract.irpj + "%"}</td>
                <td className="texto-direita" colspan="4">IMPOSTO RETIDO IRPJ R$:</td>
                <td className="texto-soma" id="irpj" colspan="1">{(sum.sum * (contract.irpj / 100)).toFixed(2)}</td>
              </tr>
              <tr>
                <td>PIS:</td>
                <td className="texto-direita">{contract.pis + "%"}</td>
                <td className="texto-direita" colspan="4">IMPOSTO RETIDO PIS R$:</td>
                <td className="texto-soma" id="pis" colspan="1">{(sum.sum * (contract.pis / 100)).toFixed(2)}</td>
              </tr>
              <tr>
                <td>COFINS:</td>
                <td className="texto-direita">{contract.cofis + "%"}</td>
                <td className="texto-direita" colspan="4">IMPOSTO RETIDO COFINS R$:</td>
                <td className="texto-soma" id="cofis" colspan="1">{(sum.sum * (contract.cofis / 100)).toFixed(2)}</td>
              </tr>
              <tr>
                <td>CSL:</td>
                <td className="texto-direita">{contract.csl + "%"}</td>
                <td className="texto-direita" colspan="4">IMPOSTO RETIDO CSL R$:</td>
                <td className="texto-soma" id="csl" colspan="1">{(sum.sum * (contract.csl / 100)).toFixed(2)}</td>
              </tr>
              <tr>
                <td></td>
                <td className="texto-direita"></td>
                <td className="texto-direita" colspan="4">TOTAL R$:</td>
                <td className="texto-soma" id="total" colspan="1">
                  {
                    (sum.sum * ((100 - (parseFloat(contract.irpj) +
                      parseFloat(contract.pis) +
                      parseFloat(contract.cofis) +
                      parseFloat(contract.csl))) / 100)).toFixed(2)
                  }
                </td>
              </tr>
            </Table>
          </Container>
        </Row>
      </Container>
    </>
  );
}

export default TicketExtract