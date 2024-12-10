//IMPORTAÇÕES BIBLIOTECAS REACT
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Stack from 'react-bootstrap/Stack'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { AiOutlineUserSwitch } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { BsHandThumbsUp } from 'react-icons/bs'
import { FiSettings} from 'react-icons/fi'
import { BsBoxes, BsStopwatch } from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify';
import { CiExport } from "react-icons/ci";
import 'react-toastify/dist/ReactToastify.css';
function EquipmentMenu() {
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
      <CardGroup>
        <Link className='link-card' to="/equipment/form" >
          <Card className="line" >
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Cadastrar equipamentos</Card.Title>
                <AiOutlinePlus className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
                Cadastre equipmentos ao projeto
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link className='link-card' to="/equipment/all" >
          <Card className="line" >
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Listar equipamentos</Card.Title>
                <AiOutlineUnorderedList className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
                Veja os equipmentos já cadastrados
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link className='link-card' to="/equipment/transfer" >
          <Card className="line" >
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Transferir via chamado</Card.Title>
                <AiOutlineUserSwitch className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
                Faça atendimento dos chamados
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link className='link-card' to="/equipment/me" >
          <Card className="line" >
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Meu estoque</Card.Title>
                <AiOutlineUser className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
                Veja equipamentos em sua posse
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link className='link-card' to="/equipment/stocks" >
          <Card className="line" >
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Outros almoxarifado</Card.Title>
                <HiOutlineUserGroup className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
                Veja equipamentos almoxarifados
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        {/*<Link className='link-card' to="/equipment/form-tracking" >
          <Card className="line" >
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Rastreio equipamentos</Card.Title>
                <HiOutlineUserGroup className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
                Veja a timeline do equipamento
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>*/}
        <Link className='link-card' to="/equipment/accept" >
          <Card className="line" >
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Aprovar transferências</Card.Title>
                <BsHandThumbsUp className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
                aceite ou recuse transferencias
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link className='link-card' to="/equipment/request-list" >
          <Card className="line">
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Chamados atendidos</Card.Title>
                <AiOutlineUnorderedList className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
                Registros dos fornecimentos
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link className='link-card' to="/ticket/accept" >
          <Card className="line" style={{ 'background-color': 'moccasin' }}>
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Tickets pendentes</Card.Title>
                <BsStopwatch className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
                Despesas pendentes de aprovação
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </CardGroup>

      <Card style={{
          backgroundColor: '#EDEDED',
        }}>
        <Card.Header style={{
          backgroundColor: '#e4dfdf',
        }}>Operações manuais</Card.Header>
        <CardGroup>
          {/*}
        <Link className='link-card' to="/equipment/form-compulsory" >
          <Card className="line" >
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Cadastro compulsório (status em uso)</Card.Title>
                <AiOutlinePlus className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
               
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link className='link-card' to="/equipment/form-compulsory-unworn"  >
          <Card className="line">
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Card.Title>Cadastro compulsório (status disponível)</Card.Title>
                <AiOutlinePlus className="ms-auto icon-card" />
              </Stack>
              <Card.Text>
               
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
                */}
          <Link className='link-card' to="/equipment/form-return"  >
            <Card className="line">
              <Card.Body>
                <Stack direction="horizontal" gap={2}>
                  <Card.Title>Retorno de equipamentos</Card.Title>
                  <AiOutlineArrowDown className="ms-auto icon-card" />
                </Stack>
                <Card.Text>
                Retorno sem origem
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
          <Link className='link-card' to="/equipment/form-adjust"  >
            <Card className="line">
              <Card.Body>
                <Stack direction="horizontal" gap={2}>
                  <Card.Title>Ajustes compulsório</Card.Title>
                  <FiSettings className="ms-auto icon-card" />
                </Stack>
                <Card.Text>
               Acerte estoques manualmente
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </CardGroup>
      </Card>

    </>
  );
}

export default EquipmentMenu