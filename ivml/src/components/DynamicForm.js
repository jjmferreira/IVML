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

const DynamicForm = ({changeDataName, changeVar, handleVarType, changeGraph, onTry, dataExplain, handleSetDataType, dataSpecs}) => {

    let keyCounter = 0;
    const graficos = [area, barras, barrasEmp,barrasEmp100,dispersao, gant, hexabin, linha, mapa, mapaCalor, mapaCoropletico, multiLinhas, pontos, relogio, tabela, texto]
    const vars =["Cor", "Forma", "Tamanho"]
    const [options, setOptions] = useState([]);
    const [optionName, setOptionName] = useState("");
    const [currentType, setCurrentType] = useState("")



    const addOption = () => {
      if(optionName !== ""){
        setOptions([...options, optionName]);
        console.log("Options " + [...options, optionName]);
        dataSpecs([...options, optionName]);
      }
    }

    const handleDataSpec = (datatype) => {
      switch(datatype){
        case "Ranking": return <><b><label htmlFor="text">Adicionar ranking:</label></b>
        <input id="text" type="text" onChange={(e) => setOptionName(e.target.value)}/>
        <button onClick={addOption}> Adicionar!</button>
        {options.map(option => <li key={keyCounter++}> {option} </li>)}
        <br></br><br></br></>
        case "Categórico": return <><b><label htmlFor="text">Adicionar categoria:</label></b>
        <input id="text" type="text" onChange={(e) => setOptionName(e.target.value)}/>
        <button onClick={addOption}> Adicionar!</button>
        <br></br><br></br></> 
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
        <select name="category" defaultValue={'DEFAULT'} onChange={(e) => {handleSetDataType(e.target.value); setCurrentType(e.target.value)}}>
                    <option value="DEFAULT" disabled>Escolhe o componente:</option>
                    <option id="1">Binário</option>
                    <option id="2">Contínuo</option>
                    <option id="3">Discreto</option>
                    <option id="4">Arbitrário</option>
                    <option id="5">Ranking</option>
                    <option id="6">Categórico</option>            
                    </select>
        <br></br><br></br>{handleDataSpec(currentType)} </div>  : 
        
        <div><b><label htmlFor="text">Título do componente:</label></b>
        <input id="text" type="text" onChange={(e) => changeDataName(e)}/>
        <br></br><br></br>
        </div> 
        }
        </>
    )
  };
  
  export default DynamicForm;
  