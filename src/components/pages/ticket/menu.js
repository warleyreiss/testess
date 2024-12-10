//IMPORTAÇÕES BIBLIOTECAS REACT
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Stack from 'react-bootstrap/Stack';
import { HiOutlineDocumentText } from 'react-icons/hi2'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { BsStopwatch } from 'react-icons/bs'
import { AiOutlineProfile } from 'react-icons/ai'
import { useState, } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'

function TicketMenu() {

  //CRIANDO USESTATE DA PAGINA
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

//REDIRECIONAMENDO O USUARIO PELO METODO GET
  const formTicket = (formContent) => {
    navigate('/history/ticket/' + formContent.inicio + '/' + formContent.fim)
  }
  return (
    <>
      <CardGroup>
        <Link className='link-card' to="" onClick={handleShow} >
          <Card className="line" >
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Todos tickets</Card.Title>
                <AiOutlineUnorderedList className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
                Veja todas as despesas geradas
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link className='link-card' to="/ticket/consolidated">
          <Card className="line" >
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Consolidado por clientes</Card.Title>
                <HiOutlineDocumentText className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
                Gerar extrato por clientes
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link className='link-card' to="/ticket/accept" >
          <Card className="line" >
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Pendentes aprovação</Card.Title>
                <BsStopwatch className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
                Veja despesas em aprovação
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link className='link-card' to="/ticket/faturamento" >
          <Card className="line" >
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Faturamentos em aberto</Card.Title>
                <AiOutlineProfile className="ms-auto icon-card" />

              </Stack>
              <Card.Text>
                Veja faturamentos criados em aberto
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </CardGroup>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleSubmit(formTicket)}>
          <Modal.Header closeButton>
            <Modal.Title>Selecione o período:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="" >
              <Form.Label>INÍCIO:</Form.Label>
              <Form.Control type="date" name="inicio" required {...register("inicio")} />
            </Form.Group>
            <Form.Group className="" >
              <Form.Label>FIM:</Form.Label>
              <Form.Control type="date" name="fim" required {...register("fim")} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Form.Group className="">
              <Button variant="primary" type="submit">
                Salvar
              </Button>
            </Form.Group>
          </Modal.Footer>
        </Form>

      </Modal>
    </>
  );
}

export default TicketMenu