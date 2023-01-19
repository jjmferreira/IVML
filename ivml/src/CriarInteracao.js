import { useState } from 'react';
import {MarkerType} from "reactflow";
import {FaTimes} from "react-icons/fa";

const CriarInteracao = ({source, nodes, edges, handleClose, actionsDone, getName}) => {

  const [actionName, setActionName] = useState("");
  const [targetComponents, setTargetComponents] = useState([]);
  const [actionResult, setActionResult] = useState("");
  const [sourceIcon, setSourceIcon] = useState("");

  const [newInteractionFormat, setNewInteractionFormat] = useState("");
  const [selectedInteraction, setSelectedInteraction] = useState();
  const [t, setT] = useState()

  const createAction = () =>{
    if(actionName === ""){
      alert('An interaction must have a name!')
    } else if(targetComponents.length === 0){
      alert('You need to choose the target components!')
    }else{
      if(source.data.actions.find(a => a.name === actionName)){
        alert('That action alreay exist! Choose a diferent name')
      }else{
        const action = {id: source.data.actions.length, name:actionName, result: actionResult, trigger: sourceIcon}
        source.data.actions.push(action);
        let edges = [];
        targetComponents.map(target => {
          edges = [...edges, { id: '', source: source.id, target: target, data: action.id, markerEnd: { type: MarkerType.Arrow },
            animated:true, sourceHandle: sourceIcon}];
        })
        actionsDone(source, edges)
      }
    } 
    
  }

  
  const addTargetComponent = (targetID) =>{
    if(!targetComponents.includes(targetID)){
      setTargetComponents([...targetComponents, targetID])
    }
  }

  const deleteTargetComp = (target) => {
    if(target !== ""){
      setTargetComponents(targetComponents.filter(t => t !== target));
    }
  }

  const getTargets = (interaction) => {
    let currentTargetsID = [];
    edges.map((edge) => {
      if(interaction.id === edge.data){
        
        currentTargetsID = [...currentTargetsID, edge.target]
      }
    })
    return currentTargetsID;
  }
  

    return (
    <div className="popup-box">
        <div className="box">
          <button className="closeButtonTop" onClick={handleClose}>x</button>
          <h2>Adicionar Interação</h2>
          <br></br>
          <div key={"newOrExist"} onChange={event => setNewInteractionFormat(event.target.value)} className="item">
              <b><input type="radio" name="selected" value={"Nova"}/>{"Nova Interação!"}</b>
              <b><input type="radio" name="selected" value={"Existente"}/>{"Ação Existente!"}</b>
              <br></br><br></br>
          </div>
          {newInteractionFormat === "Nova" ? <>
          
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
                node.type !== "varvisual" && node.type !== "grafico" ?              
                <option key={node.id} value={node.id}>
                  {getName(node)}
                </option> : ''
            ))}
          </select>
          <ul>
          {targetComponents.map(targetC => <li key={targetC}> {getName(nodes.find(node => node.id === targetC))} 
          <button onClick={() => deleteTargetComp(targetC)} > <FaTimes pointerEvents={'none'}/></button> </li>)}
          </ul>
          <button className="formButton" onClick={createAction}> Criar interação!</button><br/>
          </>  : 
          newInteractionFormat === "Existente" ?
          <>
          <b><label htmlFor="text">Interações de {getName(source)}:</label></b>
          <br/> <br/>
          <select name="category" defaultValue={'DEFAULT'} onChange={event => {setSelectedInteraction(source.data.actions.find(action => action.name === event.target.value))}}>
          <option value="DEFAULT" disabled>Escolher interação...</option>
              {source.data.actions.map((action) => (            
                <option key={action.id} value={action.name}>
                  {action.name}
                </option>
            ))}
          </select>
          { selectedInteraction !== undefined ?
          <>
            <br></br><br></br>
            <b><label htmlFor="text"> Tipo de Interação: {selectedInteraction.trigger}</label></b>
            <br></br><br></br>
            <b><label htmlFor="text"> Resultado da Interação: {selectedInteraction.result}</label></b>
            <br></br><br></br>
            <b><label htmlFor="text"> Componentes afetados: </label></b>
            <ul>
              {getTargets(selectedInteraction).map(targetid => <li key={targetid}> {getName(nodes.find(node => node.id === targetid))}</li>)}
            </ul>
            <b><label htmlFor="text">Componentes não afetados:</label></b>
            <br/> <br/>
            <select name="category" defaultValue={'DEFAULT'} onChange={event => {setT(event.target.value)}}>
            <option value="DEFAULT" disabled>Escolher componente(s)...</option>
                {nodes.filter((node) => !getTargets(selectedInteraction).includes(node.id)).map(
                  (n) =><option key={n.id} value={n.id}>{getName(n)}</option>
                )}
            </select>
            <button className="formButton" onClick={console.log(t)}> Adicionar componente!</button><br/>
          </> : console.log("Nao selecionou")
          }
          
          </> : ""
          }
      
          </div>
        </div>
    );
  
  }

export default CriarInteracao;
