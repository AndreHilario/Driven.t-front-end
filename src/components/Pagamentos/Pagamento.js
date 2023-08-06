/* eslint-disable */
import styled from 'styled-components';
import React from 'react';
import AreaDePagamentoComCartao from './Cartãoform';



export default function Pag() {
  return (
    <Area>
    <h2>Ingresso e pagamento</h2>
    <h3>Ingresso escolhido</h3>
    <Boxingresso>
    <h1>Presencial + Com Hotel</h1>
    <p>R$ 600</p>
    </Boxingresso>
    
    <h3>Pagamento</h3>
    <AreaDePagamentoComCartao />
    </Area>
  );
};

const Area=styled.div`
margin: 0 auto;

width: 100%;
height: 100%;
h2{
    font-family: 'Roboto';
    font-size: 34px;
    line-height: 39.84px;
    padding-bottom: 20px;
}
h3{
    font-family: 'Roboto';
    font-size: 20px;
    line-height: 23.44px;
    color: #8E8E8E;
    padding-top: 30px;
    padding-bottom: 10px;
}
`

const Boxingresso=styled.div`
width:290px;
height: 108px;
background-color: #FFEED2;
border-radius: 20px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
h1{
    font-family: 'Roboto';
    font-size: 16px;
    line-height: 18.74px;
    color: #454545;
    padding-bottom: 5px;
}
p{
    font-family: 'Roboto';
    font-size: 14px;
    line-height: 16.44px;
    color: #898989;
}
`