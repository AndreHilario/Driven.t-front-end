/* eslint-disable */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineCheckCircle } from 'react-icons/ai';//https://www.npmjs.com/package/react-icons
//lista de icones https://react-icons.github.io/react-icons/icons?name=ai


export default function Vagas({ capacity, occupiedSeats, booked  })   {

   const [ocupado, setOcupado] = useState(null)
   const vaga = (capacity) - (occupiedSeats)

  useEffect(() => {

    if (occupiedSeats === capacity) {
      setOcupado(false)

    } else {

      setOcupado(true)

    }

  })

  return (


    booked ? //(ternario 01)

      <Caixa>
        <AiOutlineCheckCircle color="green" fontSize="20px"  stroke-width = "30"/>
        <HaVagas> Inscrito</HaVagas> 
      </Caixa>
      

      :
      

      ocupado ? //(ternario 02) //img pepicons porta verde (entrar)

        <Caixa>
          <img src='https://i.ibb.co/6ycWSy7/pepicons-enter.png' />
          <HaVagas> {vaga} vagas </HaVagas> 
        </Caixa>
        
        :

            //img pepicons x vermelho (fechar)
        <Caixa> 
          <img src='https://i.ibb.co/kGX6pVX/ant-design-close-circle-outlined.png' />
          <Esgotado> Esgotado </Esgotado> 
        </Caixa>
  )
}

const Caixa = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  margin-top: 6px;
`

const HaVagas = styled.p`
  color: #078632;
  margin-top: 6px;
`

const Esgotado = styled.p`
  color:#CC6666;
  margin-top: 6px;
`