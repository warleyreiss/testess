import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Row, Card } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { axios } from '../../../services/axios';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { IoPlayForward } from 'react-icons/io5';
import Background from "./login-bg.png"
import Logo from "./logomarca_preta.png"
import './style.css';
function Signin() {
  const navigate = useNavigate()
  const { signIn } = useContext(AuthContext)
  const { signed } = useContext(AuthContext)
  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

  //FUNÇÃO PADRÃO PARA EXTRAÇÃO DE DADOS DO FORMULARIO PELO REACT-HOOK-GORM

  //9- envio o formulario acionando a funcao signin
  const form = async (formContent) => {
    await signIn(formContent)
  }

  if (signed) {
    navigate('/service/view')
  } else {
    return (
      <div className='login'>
        <div className='logo_login'>
          <Image src={Logo} alt="login image" className="logo__form__img" />
         
        </div>
        {/*<Image src={Background} alt="login image" className="login__img" />*/}

        <Form onSubmit={handleSubmit(form)} className='login__form'>
          <h5>BEM-VINDO</h5>
          <div className='login__content'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>EMAIL DE ACESSO:</Form.Label>
              <Form.Control type="email" required {...register("email")} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>SENHA:</Form.Label>
              <Form.Control type="password"  {...register("password")} />
            </Form.Group>
            <Button variant="primary" type="submit" className='button-login'>
              Entrar
            </Button>
          </div>
        </Form>
        <Navbar className='botton_login' expand="lg" variant="light" fixed="bottom" >
        
        </Navbar>
      </div>

    );
  }
}

export default Signin;