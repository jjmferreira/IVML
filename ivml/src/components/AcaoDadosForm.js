import { useState } from 'react';
import {FaTimes} from "react-icons/fa";

const AcaoDadosForm = ({handleActionStart, handleActionFinish, createComp, nodesName,handleClose, changeDataName, actionResultType,handleSetupSourceIcon, listTargets}) => {

  let keyCounter = 0;

  const aux = (curNode) => {
    let nodeName = curNode.data.name;
    if(curNode.data.compCounter !== undefined){
      return curNode.data.compCounter;
    } else{
      let string = "";
      nodesName.map((node) => {
        if(node.id === curNode.parentNode){
          //console.log(nodeName + "(" + node.data.compCounter + ")")
          string = nodeName + "(" + node.data.compCounter + ")";
          return string
        }
      })
      return string;
    }
  }


  const [selected, setSelected] = useState();
  const [targetComponents, setTargetComponents] = useState([]);

  
  const addTargetComponent = () =>{
    if(!targetComponents.includes(selected)){
      setTargetComponents([...targetComponents, selected])
      listTargets([...targetComponents, selected])
    }
  }

    const deleteTarget = (target) => {
        if(target !== ""){
            setTargetComponents(targetComponents.filter(t => !t.includes(target)));
            listTargets(targetComponents.filter(t => !t.includes(target)));
        }
    }

    return (
<div className="popup-box">
        <div className="box">
          <button className="closeButtonTop" onClick={handleClose}>x</button>
          <br></br>
            <b><label htmlFor="text">Nome da Ação de Dados:</label></b>
            <input id="text" type="text" onChange={(e) => changeDataName(e)}/>
            <br></br><br></br>
          <b><label htmlFor="text">Tipo de Ação:</label></b>
          <br></br> <br></br>
          <select name="category" defaultValue={'DEFAULT'} onChange={event => actionResultType(event.target.value)}>
            <option value="DEFAULT" disabled>Escolhe o tipo:</option>
            <option>Filtragem</option>
            <option>Destaque</option>
          </select>
        <br></br> <br></br>
        <b><label htmlFor="text">Componente de partida:</label></b>
        <br></br> <br></br>
        <select name="category" defaultValue={'DEFAULT'} onChange={event => handleActionStart(event.target.value)}>
            <option value="DEFAULT" disabled>Escolhe o componente:</option>
            {nodesName.map((node) => (
            <option key={node.id} value={node.id}>
            {aux(node)}              
            </option>
          ))}
        </select>
        <br></br> <br></br>
        <b><label htmlFor="text">Tipo de interação:</label></b>
          <br></br> <br></br>
          <select name="category" defaultValue={'DEFAULT'} onChange={event => handleSetupSourceIcon(event.target.value)}>
            <option value="DEFAULT" disabled>Escolhe o tipo:</option>
            <option>Clique</option>
            <option>Hover</option>
          </select>
        <br></br> <br></br>
        <b><label htmlFor="text">Componente(s) de Chegada:</label></b>
        <br></br> <br></br>
        <select name="category" defaultValue={'DEFAULT'} onChange={event => {setSelected(event.target.value)}}>
            <option value="DEFAULT" disabled>Escolhe o componente:</option>
            {nodesName.map((node) => (
            <option key={node.id} value={node.id}>
            {aux(node)}
            </option>
          ))}
        </select>
        <button style={{marginLeft:"3px"}} onClick={() => addTargetComponent()}> Adicionar</button>
        <ul>
        {targetComponents.map(targetC =>
            <li key={keyCounter++}> {aux(nodesName.find(node => node.id === targetC))}
                <button style={{marginLeft:"3px"}} onClick={() => deleteTarget(targetC)} > <FaTimes pointerEvents={'none'}/></button>
            </li>)}
        </ul>
        <br></br> <br></br>
        <button className="formButton" onClick={createComp}> Criar Ação de dados!</button>
        </div>
      </div>
    );
  
  }

export default AcaoDadosForm;
