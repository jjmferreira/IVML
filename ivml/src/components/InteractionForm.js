import { useState } from 'react';

const InteractionForm = ({startcomp, nodesName,handleClose, actionsDone}) => {

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

  const lastActionIndex = () =>{
    let result = 0;
    nodesName.map((node) => {
      if(node.id === startcomp){
        let size = node.data.actions.length;
        if( size > 0){
          result = node.data.actions[size -1].id + 1;
        }
        return result;
      }
    })
    return result;
  }


  const [actions, setAllActions] = useState([]);
  const [actionName, setActionName] = useState("");
  const [targetComponents, setTargetComponents] = useState([]);
  const [actionResult, setActionResult] = useState("");
  const [sourceIcon, setSourceIcon] = useState("");
  const [actionID, setActionID] = useState(lastActionIndex());


  const createActions = () =>{
    let idAux = actionID;
    let actionAux = [];
    targetComponents.map((targetComp) => {
      actionAux = [...actionAux, {id: idAux, name:actionName, result: actionResult, targetComp, trigger: sourceIcon, targetID: targetComp}]
      idAux++;
      console.log(idAux + " ssd")
    })
    setActionID(idAux)
    actionsDone([...actions, ...actionAux])
  }

  
  const addTargetComponent = (targetID) =>{
    if(!targetComponents.includes(targetID)){
      setTargetComponents([...targetComponents, targetID])
    }
  }

    return (
<div className="popup-box">
        <div className="box">
          <button onClick={handleClose}>x</button>
          <br></br> <br></br>
          <div><b><label htmlFor="text">Nome da interação:</label></b>
          <input id="text" type="text" onChange={(e) => setActionName(e.target.value)}/>
          <br></br><br></br></div>
          <b><label htmlFor="text">Resultado da Interação:</label></b>
          <br></br> <br></br>
          <select name="category" defaultValue={'DEFAULT'} onChange={event => setActionResult(event.target.value)}>
            <option value="DEFAULT" disabled>Escolhe o tipo:</option>
            <option>Filtragem</option>
            <option>Destaque</option>
          </select>
        <br></br> <br></br>
        <br></br>
        <b><label htmlFor="text">Componente de partida:</label></b>
        <br></br> <br></br>
        <b> {nodesName.map((node) =>{ 
           if(node.id === startcomp){
            return aux(node)
        }} )}</b>
        <br></br> <br></br>
        <b><label htmlFor="text">Tipo de interação:</label></b>
          <br></br> <br></br>
          <select name="category" defaultValue={'DEFAULT'} onChange={event => setSourceIcon(event.target.value)}>
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
        <button onClick={createActions}> Criar componente de dados!</button>
        </div>
      </div>
    );
  
  }

export default InteractionForm;
