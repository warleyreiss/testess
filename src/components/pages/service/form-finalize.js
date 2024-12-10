
//IMPORTAÇÕES BIBLIOTECAS REACT
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { axiosApi } from '../../../services/axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ServiceFinalize() {

    //OBTENDO VARIAVEIS PARASSADAS VIA URL
    const { id } = useParams();

    //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
    const navigate = useNavigate()

    //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
    const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

    //ENVIANDO FORMULARIO COM A BIBLIOTECA REACT-HOOK-FORM
    const form = (formContent) => {
        
        //CONSUMO DE API COM A BIBLIOTECA AXIOS
        axiosApi.patch('/service_finalized', formContent)
            .then(function (response) {
                toast(response.data.msg)
                navigate(-1)
            })
            .catch(function (error) {
                toast(error.response.data.msg)
               // console.log(error.response.data.msg)
            });

    }
    //FUNÇÃO PARA MANIPULAR O FIRMULARIO COMFORME PREENCHIMENTO DO USUÁRIO
    const atendimento = (value) => {
        const inputMotivo = document.getElementById('descricao_atendimento')
        const inputImagem = document.getElementById('imagem')
        if (value === "SIM") {
            inputImagem.setAttribute('hidden', 'true');
            inputMotivo.setAttribute('hidden', 'true');
        } else {
            inputImagem.removeAttribute('hidden');
            inputMotivo.removeAttribute('hidden');
        }
    }
    return (
        <>
         <div>
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
      </div>
            <Form onSubmit={handleSubmit(form)} enctype="multipart/form-data">
                <Form.Control type="hidden" name="id" value={id} required {...register("id")} />
                <Form.Group className="" >
                    <Form.Label>QUEM FOI ENTREVISTADO?:</Form.Label>
                    <Form.Control type="text" name="entrevistado" required {...register("entrevistado")} />
                </Form.Group>
                <Form.Group className="" >
                    <Form.Label>COMO O ENTREVISTADO AVALIA O PROFISSIONAL TÉCNICO QUE LHE ATENDEU?:</Form.Label>
                    <Form.Range name="pergunta1" min="1" max="5" step="1" required {...register("pergunta1")} />
                </Form.Group>
                <Form.Group className="" >
                    <Form.Label>COMO O ENTREVISTADO AVALIA SUA SATISFAÇÃO COM O ATENDIMENTO QUE RECEBEU?:</Form.Label>
                    <Form.Range name="pergunta2" min="1" max="5" step="1" required {...register("pergunta2")} />
                </Form.Group>
                <Form.Group className="" >
                    <Form.Label>SUGESTÕES E RECLAMAÇÕES DO ENTREVISTADO?:</Form.Label>
                    <Form.Control type="text" name="sugestao_reclamacao"  {...register("sugestao_reclamacao")} />
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

export default ServiceFinalize