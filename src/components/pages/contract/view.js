//IMPORTAÇÕES BIBLIOTECAS REACT
import Table from 'react-bootstrap/Table';
import { axiosApi} from '../../../services/axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TbListSearch } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom'

function ContractView() {

    //CRIANDO USESTATE DA PAGINA
    const [registros, setRegistros] = useState([]);

    //REQUISIÇÃO COM A BIBLIOTECA AXIOS
    useEffect(() => {
        axiosApi.get("/list_contract")
            .then((response) => {
                setRegistros(response.data)
            })
            .catch(function (error) {
            });

    }, [])
    return (
        <>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>NOME:</th>
                        <th>IRPJ:</th>
                        <th>PIS:</th>
                        <th>COFINS:</th>
                        <th>CSL:</th>
                        <th>IBPT</th>
                        <th>ULT.ATUAL.:</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {registros.map((registro, key) => {
                        return (
                            <tr key={key}>
                                <td>{registro.nome}</td>
                                <td>{registro.irpj + "%"}</td>
                                <td>{registro.pis + "%"}</td>
                                <td>{registro.cofis + "%"}</td>
                                <td>{registro.csl + "%"}</td>
                                <td>{registro.ibpt}</td>
                                <td>{registro.data_registro}</td>
                                <td> <Link className='btn-secondary' to={{ pathname: `/contract/form/${registro.id}` }}> <button className='card-service-btn btn color-theme-background'>Exibir</button> </Link></td>
                            </tr>
                        )

                    })}
                </tbody>
            </Table>
        </>
    );


}

export default ContractView