import { useState } from 'react';
import {MarkerType} from "reactflow";

const CriarInteracao = ({source, nodes, handleClose, actionsDone, getName}) => {

  const [actionName, setActionName] = useState("");
  const [targetComponents, setTargetComponents] = useState([]);
  const [actionResult, setActionResult] = useState("");
  const [sourceIcon, setSourceIcon] = useState("");

  const createAction = () =>{
    const action = {id: source.data.actions.length, name:actionName, result: actionResult, trigger: sourceIcon}
    source.data.actions.push(action);
    let edges = [];
    targetComponents.map(target => {
      edges = [...edges, { id: '', source: source.id, target: target, data: action.id, markerEnd: { type: MarkerType.Arrow },
        animated:true, sourceHandle: sourceIcon}];
    })
    actionsDone(source, edges)
  }

  
  const addTargetComponent = (targetID) =>{
    if(!targetComponents.includes(targetID)){
      setTargetComponents([...targetComponents, targetID])
    }
  }

    return (
    <div className="popup-box">
        <div className="box">
          <button className="closeButtonTop" onClick={handleClose}>x</button>
          <h2>Adicionar Interação</h2>
          <div><b><label htmlFor="text">Nome da interação: </label></b>
              <input id="text" type="text" onChange={(e) => setActionName(e.target.value)}/>
              <br/><br/>
          </div>
            <b><label htmlFor="text">Componente de partida: </label></b>
            <label> {getName(source)}</label>
            <br/> <br/>
          <b><label htmlFor="text">Resultado da Interação: </label></b>
            <br/><br/>
          <select name="category" defaultValue={'DEFAULT'} onChange={event => setActionResult(event.target.value)}>
            <option value="DEFAULT" disabled>Escolher resultado...</option>
            <option>Filtragem</option>
            <option>Destaque</option>
          </select>
        <br/> <br/>
        <b><label htmlFor="text">Tipo de interação: </label></b>
            <br/><br/>
          <select name="category" defaultValue={'DEFAULT'} onChange={event => setSourceIcon(event.target.value)}>
            <option value="DEFAULT" disabled>Escolher tipo...</option>
            <option>Clique</option>
            <option>Hover</option>
          </select>
        <br/><br/>
        <b><label htmlFor="text">Componentes Afetados:</label></b>
        <br/> <br/>
        <select name="category" defaultValue={'DEFAULT'} onChange={event => {addTargetComponent(event.target.value)}}>
        <option value="DEFAULT" disabled>Escolher componente(s)...</option>
            {nodes.map((node) => (
            <option key={node.id} value={node.id}>
            {getName(node)}
            </option>
          ))}
        </select>
        <ul>
        {targetComponents.map(targetC => <li key={targetC}> {getName(nodes.find(node => node.id === targetC))} </li>)}
        </ul>
        <button className="formButton" onClick={createAction}> Criar interação!</button><br/>
        </div>
      </div>
    );
  
  }

export default CriarInteracao;
