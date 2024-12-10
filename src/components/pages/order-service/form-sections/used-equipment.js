import Form from 'react-bootstrap/Form';

import axios from 'axios';
import { useForm } from 'react-hook-form';

import { useState, useEffect } from 'react';
function SectionUsedEquipment() {
    //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
    const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

    //CONSUMO DE API COM A BIBLIOTECA AXIOS
    const [registrosPeripherals, setRegistrosPeripherals] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3333/list_peripheral_input")
            .then((response) => {
                setRegistrosPeripherals(response.data)
            })
            .catch(function (error) {
                console.error(error);
            });

    }, [])
    //CONSUMO DE API COM A BIBLIOTECA AXIOS
    const [registrosEquipments, setRegistrosEquipments] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3333/list_equipment_input")
            .then((response) => {
                setRegistrosEquipments(response.data)
            })
            .catch(function (error) {
                console.error(error);
            });

    }, [])
    return (
        <>
            <Form.Group className="" >
                <Form.Label>MATERIAL UTILIZADO:</Form.Label>
                <Form.Select id='material_usado' name='material_usado[]' multiple search='true' {...register("material_usado")}>
                   
                    {registrosEquipments.map((registro, key) => {
                        return (
                            <option value={registro.id}>{registro.item}</option>
                        )
                    })}
                </Form.Select>
            </Form.Group>
            <Form.Group className="" >
                <Form.Label>PERIFÉRICOS UTILIZADO:</Form.Label>
                <Form.Select id="periferico" name="periferico[]" multiple search='true' {...register("periferico")}>
                {registrosPeripherals.map((registro, key) => {
                        return (
                            <option value={registro.id}>{registro.item}</option>
                        )
                    })}
                </Form.Select>
            </Form.Group>
        </>
    );
}

export default SectionUsedEquipment