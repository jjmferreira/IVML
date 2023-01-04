import { useState } from 'react';

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


  const [targetComponents, setTargetComponents] = useState([]);

  
  const addTargetComponent = (targetID) =>{
    if(!targetComponents.includes(targetID)){
      setTargetComponents([...targetComponents, targetID])
      listTargets([...targetComponents, targetID])
    }
  }

    return (
<div className="popup-box">
        <div className="box">
          <button onClick={handleClose}>x</button>
          <br></br> <br></br>
          <b><label htmlFor="text">Resultado da Ação de Dados:</label></b>
          <br></br> <br></br>
          <select name="category" defaultValue={'DEFAULT'} onChange={event => actionResultType(event.target.value)}>
            <option value="DEFAULT" disabled>Escolhe o tipo:</option>
            <option>Filtragem</option>
            <option>Destaque</option>
          </select>
        <br></br> <br></br>
        <br></br>
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
        <br></br>
        <b><label htmlFor="text">Componente de Chegada:</label></b>
        <br></br> <br></br>
        <select name="category" defaultValue={'DEFAULT'} onChange={event => {addTargetComponent(event.target.value)}}>
        <option value="DEFAULT" disabled>Escolhe o componente:</option>
            {nodesName.map((node) => (
            <option key={node.id} value={node.id}>
            {aux(node)}
            </option>
          ))}
        </select>
        <ul>
        {targetComponents.map(targetC => <li key={keyCounter++}> {targetC} </li>)}
        </ul>
        <br></br> <br></br>
        <br></br> <br></br>
        <br></br>
        <b><label htmlFor="text">Nome dos Dados:</label></b>
        <input id="text" type="text" onChange={(e) => changeDataName(e)}/>
        <br></br><br></br>
        <button onClick={createComp}> Criar componente de dados!</button>
        </div>
      </div>
    );
  
  }

export default AcaoDadosForm;
