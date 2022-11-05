import area from "../imagens/Gráficos/Área.PNG"
import barras from "../imagens/Gráficos/Barras.PNG"
import barrasEmp from "../imagens/Gráficos/Barras Empilhadas.PNG"
import barrasEmp100 from "../imagens/Gráficos/Empilhadas 100.PNG"
import dispersao from "../imagens/Gráficos/Dispersão.PNG"
import gant from "../imagens/Gráficos/Gant.PNG"
import hexabin from "../imagens/Gráficos/Hexabin.PNG"
import linha from "../imagens/Gráficos/Linha.PNG"
import mapa from "../imagens/Gráficos/Mapa.PNG"
import mapaCalor from "../imagens/Gráficos/Mapa de Calor.PNG"
import mapaCoropletico from "../imagens/Gráficos/Mapa Coroplético.PNG"
import multiLinhas from "../imagens/Gráficos/Múltiplas Linhas.PNG"
import pontos from "../imagens/Gráficos/Pontos.PNG"
import relogio from "../imagens/Gráficos/Relógio.PNG"
import tabela from "../imagens/Gráficos/Tabela.PNG"
import texto from "../imagens/Gráficos/Texto.PNG"
import { useState } from "react"

const DynamicForm = ({changeDataName, changeVar, handleVarType, changeGraph, onTry, dataExplain, visComp, changeHeight,changeWidth, specifyData, props}) => {


    const graficos = [area, barras, barrasEmp,barrasEmp100,dispersao, gant, hexabin, linha, mapa, mapaCalor, mapaCoropletico, multiLinhas, pontos, relogio, tabela, texto]
    const vars =["Cor", "Forma", "Tamanho"]
    const [test, setTest] = useState("")


    const handleDataSpec = (datatype) => {
      switch(datatype){
        case "Ranking": /*return(<><b><label htmlFor="text">Rankings a adicionar:</label></b>
        <input id="text" type="text" onChange={(e) => specifyData(e)}/>
        <button onClick={props.handleClose}>x</button>
        <br></br><br></br></>)*/
        break;
        default: break;
      } 
    }

    return (
        <>
        {changeVar ? <div className="wrapper">
         {vars.map((varType) => (
            <div key={varType.id} onChange={event => handleVarType(event)} className="item"><label>{varType}</label>
            <input type="radio" value={varType} name="var"/></div>
           ))}
         </div> : 
        
        changeGraph ? 
         <div className="wrapper">
         {graficos.map((grafico) => (
             <div key={grafico.id} onChange={event => onTry(event)} className="item"><img src={grafico} alt={grafico} ></img><br></br><label>{grafico.split("media/")[1].split(".")[0]}</label>
             <input type="radio" value={grafico} name="grafico"/></div>
           ))}
         </div> : 
        
        dataExplain ? 
        <div><b><label htmlFor="text">Título do componente:</label></b>
        <input id="text" type="text" onChange={(e) => changeDataName(e)}/>
        <br></br><br></br>
        <b><label htmlFor="text">Tipo dos Dados:</label></b>
        <select name="category" defaultValue={'DEFAULT'} onChange={(e) => setTest(e.target.value)}>
                    <option value="DEFAULT" disabled>Escolhe o componente:</option>
                    <option id="1">Binário</option>
                    <option id="2">Contínuo</option>
                    <option id="3">Discreto</option>
                    <option id="4">Arbitrário</option>
                    <option id="5">Ranking</option>
                    <option id="6">Categórico</option>            
                    </select>
        <br></br><br></br>{handleDataSpec(test)} </div>  : 
        <div><b><label htmlFor="text">Título do componente:</label></b>
        <input id="text" type="text" onChange={(e) => changeDataName(e)}/>
        <br></br><br></br>
        <b><label htmlFor="text">Altura do componente:</label></b>
        <input id="text" type="number" min="50"  step="10" onChange={(e) => changeHeight(e)}/>
        <br></br><br></br>
        <b><label htmlFor="text">Largura do componente:</label></b>
        <input id="text" type="number" min="50"  step="10" onChange={(e) => changeWidth(e)}/>
        <br></br><br></br></div> 
        }
        </>
    )
  };
  
  export default DynamicForm;
  