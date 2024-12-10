//IMPORTAÇÕES BIBLIOTECAS REACT
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack'
import { AiOutlineArrowsAlt } from 'react-icons/ai';
import { Link } from 'react-router-dom'
import { axiosApi} from '../../../services/axios';
import { useState, useEffect } from 'react';

//FUNÇÃO DA BIBLIOTECA REACT-BOOSTRAP DOS COMPONENTES ACCODION
function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );
  return (
    <button
      type="button"

      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

function EquipmentStocks() {

  //CRIANDO USESTATE DA PAGINA
  const [registrosClient, setRegistrosClients] = useState([]);
  const [registrosUser, setRegistrosUsers] = useState([]);

   //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE TODOS CLIENTES DA APLICAÇÃO
  useEffect(() => {
    axiosApi.get("/list_client_input")
      .then((response) => {
        setRegistrosClients(response.data)
      })
      .catch(function (error) {
      });
  }, [])

 //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE TODOS USUARIOS DA APLICAÇÃO
  useEffect(() => {
    axiosApi.get("/list_user_all_input")
      .then((response) => {
        setRegistrosUsers(response.data)
      })
      .catch(function (error) {
      });
  }, [])


  return (
    <>
      {registrosClient.map((registroClient, keyClient) => {/* FUNÇÃO PARA PECORRER TODOS OS CLIENTES*/
        return (
          <Accordion  className='accordion'>
            <Card className="accordion-card">
              <CustomToggle eventKey="0" className="accordion-toggle">
                <Card.Header>
                  <Stack direction="horizontal" gap={2}>
                    <Card.Title>{registroClient.nome}</Card.Title>
                    <Link className="ms-auto" to={{ pathname: `/equipment/warehouse/${registroClient.id}`}} >
                      <AiOutlineArrowsAlt  />
                    </Link>
                  </Stack>
                </Card.Header>
              </CustomToggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  {registrosUser.map((registroUser, keyUSer) => {/* FUNÇÃO PARA TESTAR SE O USUÁRIO PERCENCE AO CLEINTE*/
                    if (registroUser.cliente_id == registroClient.id) {
                      return (
                        <Stack direction="horizontal" gap={2} className='row-accordion'>
                          <Card.Text> {registroUser.nome_usuario}</Card.Text>
                          <Link className="ms-auto" to={{ pathname: `/equipment/user/${registroUser.id}` }} >
                           
                            <AiOutlineArrowsAlt className="ms-auto" />
                          </Link>
                        </Stack>
                      )
                    }
                  })}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

          </Accordion>
        )
      })}

    </>
  );}

export default EquipmentStocks