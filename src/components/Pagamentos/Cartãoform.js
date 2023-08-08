/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { toast } from 'react-toastify';
import useToken from '../../hooks/useToken';
import { pagar } from '../../services/paymentApi';

export default function AreaDePagamentoComCartao({ ticket }) {
  const token = useToken()
  const [form, setForm] = useState({
    cvc: '',
    expiry: '',
    name: '',
    number: '',
  })

  function attForm(e) {
    setForm({...form, [e.target.name]: e.target.value,
    })
  }

  async function enviarPagamento() {
    const datanumber= form.number
    const dataname=form.name
    let dataexpiry=form.expiry
    const datacvc=form.cvc

    if(datanumber==='') { toast('O Numero do Cartão deve ser Peenchido')
    return }

    if(dataname==='') { toast('O Nome do Cartão deve ser Peenchido')
    return }

    if(dataexpiry==='') { toast('A Data de Validade do Cartão deve ser Peenchido')
    return }

    if(datacvc==='') { toast('O CVC do Cartão deve ser Peenchido')
    return }

    const cvcValido = datacvc.length < 3 || datacvc.length > 3
    const dataExpiryValida = dataexpiry.length < 4 || dataexpiry.length > 7
    const numeroDoCartaoValido = datanumber < 16
    const nomeValido = dataname.length < 3

     let mes= dataexpiry[0]+dataexpiry[1]


     if(+(mes)>12){ toast ('Verifique o Mes na Data de Validade Do Cartão')
      return
     }

     
     let ano= '20' + dataexpiry[dataexpiry.length-2]+dataexpiry[dataexpiry.length-1]

  dataexpiry = `${mes}/${ano}`

 if (cvcValido) { toast('CVC Invalido') 
      return }

 if (dataExpiryValida) { toast('Data Invalida')
      return }

 if (numeroDoCartaoValido) { toast('Numero Do Cartão Incorreto')
      return }

 if (nomeValido) { toast('Nome Invalido')
      return }
   
    const issuer = 'mastercard';
    
    const bodyMontado = {
      ticketId: ticket.id,
      cardData: {
        issuer: issuer,
        number: datanumber,
        name: dataname,
        expirationDate: dataexpiry,
        cvv: datacvc,
      },
    };
 console.log(bodyMontado);
    try {
      await pagar(bodyMontado, token);
    } catch (error) {
      toast('O pagamento não foi concluido, verifique os dados e tente novamente');
    }
  }

  return (
    <>
      <PagamentoBox>
        <Cards
          cvc={form.cvc}
          expiry={form.expiry}
          focused={form.focus}
          name={form.name}
          number={form.number}
          issuer="mastercard"
        />
        <form>
          <TopBox>
            <input
              type="tel"
              name="number"
              placeholder="Card Number"
              onChange={attForm}
              value={form.number}
              maxLength="16"
            />

            <p>
              E.g.: 49...,51...,36...,37...
            </p>

            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={attForm}
              value={form.name}
              width="5px"
            />
          </TopBox>
          <InternalBox>
            <EntradaExp
              type="text"
              name="expiry"
              maxLength="7"
              placeholder="Valid Thru"
              onChange={attForm}
              value={form.expiry}
            />
            <EntradaCvc
              type="cvc"
              name="cvc"
              placeholder="CVC"
              maxLength="3"
              onChange={attForm}
              value={form.cvc}
            />
          </InternalBox>
        </form>
      </PagamentoBox>
      <BotaoFinalizar onClick={enviarPagamento}>
      <p>FINALIZAR PAGAMENTO</p>
    </BotaoFinalizar>
    </>
  );
}

const BotaoFinalizar = styled.button`
  height: 37px;
  padding: 0 12px;
  background: #dedede;
  border: none;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.25);
  cursor: pointer;
p{
  color: black;
  font-size: 15px;
  font-weight: 400;
  text-align: center;
}
`;

const PagamentoBox=styled.div`
  display: flex;
  width: 650px;
  padding-right: 48px;
  margin-bottom: 48px;
  form {
    margin-left: 19px;
  }
  input {
    height: 40px;
    font-family: 'Roboto';
    border-radius: 7px;
    margin-top: 8px;
    padding-left: 10px;
    margin-bottom: 7px;
    line-height: 19px;
    font-weight: 400;
    font-size: 20px;
    border: 1px solid #c4c4c4;
    text-align: start;
    color: #575757;
  }
  input::placeholder {
  color: #b0b0b0;
}
`;

const TopBox=styled.div`
  width: 290px;
  p{
    color: #b0b0b0;
    padding-bottom: 8px;
  }
  input {
    width: 100%;
  }
`;

const InternalBox=styled.div`
  width: 290px;
  display: flex;
  justify-content: space-between;
`;

const EntradaExp=styled.input`
  width: 57%;
`;

const EntradaCvc=styled.input`
  text-align: center;
  width: 32%;
`;