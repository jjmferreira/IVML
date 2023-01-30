import {useEffect, useState} from 'react';
import {MarkerType} from "reactflow";
import {FaTimes} from "react-icons/fa";
import Button from 'react-bootstrap/Button';


const CriarInteracao = ({source, nodes, edges, actionsDone, getName, createNav}) => {

  const [actionName, setActionName] = useState("");
  const [targetComponents, setTargetComponents] = useState([]);
  const [actionResult, setActionResult] = useState("");
  const [sourceIcon, setSourceIcon] = useState("");

  const [newInteractionFormat, setNewInteractionFormat] = useState("");
  const [selectedInteraction, setSelectedInteraction] = useState("");

  const [newCompName, setNewCompName] = useState('');


  const nodeData = { name: '', datatype: '', compCounter: '', varName: '',
  graphType: '', dataExplain: [], parameterOptions: '', actions: [], tooltip:''};

  const [node, setNode] = useState({ id: '', type: '', position:{ x: 50, y: 50 }, data: nodeData,
  parentNode: "", extent: ''});


  useEffect(() => {
    clearForm();
  }, [source])

  const clearForm = () => {
    const options = document.getElementsByName("selected")
    for(const option of options)
      option.checked = false;
    setNewInteractionFormat("");
    setSelectedInteraction("")
    setTargetComponents([]);
    setActionResult("")
    setActionName("");
  }

  const createNavigation = () => {
    if(actionName === ""){
      alert('O nome da interação é obrigatório')
    } else{
      if(source.data.actions.find(a => a.name === actionName)){
        alert('Já existe uma interação com esse nome. Altere o nome ou escolha a opção "Selecionar existente"')
      }else if(targetComponents.length === 0){
        const action = {id: source.data.actions.length, name:actionName, result: actionResult, trigger: sourceIcon}
        source.data.actions.push(action);
        nodeData.name = newCompName;
        node.data = nodeData;
        node.type = actionResult.toLocaleLowerCase();
        setNode(node);
        let edge = { id: '', source: source.id, target: '', label: actionResult, data: action.id, markerEnd: { type: MarkerType.Arrow },
        animated:true, sourceHandle: sourceIcon}
        createNav(node, source, edge);
        clearForm();
      }else{
        const action = {id: source.data.actions.length, name:actionName, result: actionResult, trigger: sourceIcon}
        source.data.actions.push(action);
        extendAction(action, actionResult)
      }
      
    }
  }

  const createAction = () =>{
    if(actionName === ""){
      alert('O nome da interação é obrigatório')
    } else if(targetComponents.length === 0){
      alert('Pelo menos um componente afetado devará ser afetado pela interação')
    }else{
      if(source.data.actions.find(a => a.name === actionName)){
        alert('Já existe uma interação com esse nome. Altere o nome ou escolha a opção "Selecionar existente"')
      }else{
        const action = {id: source.data.actions.length, name:actionName, result: actionResult, trigger: sourceIcon}
        source.data.actions.push(action);
        extendAction(action, "");
      }
    } 
    
  }

  const extendAction = (action, label) => {
    let edges = [];
    targetComponents.map(target => {
      edges = [...edges, { id: '', source: source.id, target: target, label: label, data: action.id, markerEnd: { type: MarkerType.Arrow },
        animated:true, sourceHandle: action.trigger}];
    })
    actionsDone(source, edges);
    clearForm();
  }

  
  const addTargetComponent = () =>{
    const targetID = document.getElementById("targets").value;
    if(targetID === "DEFAULT"){
      alert("You didn't choose an option!")
    } else{
      if(!targetComponents.includes(targetID) &&
        (selectedInteraction === "" || !getTargets(selectedInteraction).includes(targetID))){
      setTargetComponents([...targetComponents, targetID])
    }
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
      if(edge.source === source.id && interaction.id === edge.data){
        currentTargetsID = [...currentTargetsID, edge.target]
      }
    })
    return currentTargetsID;
  }
  

  const hasTarget = () => {
    if(targetComponents.length !== 0){
      return true;
    }
    return false;
  }

    return (
    <div>
        <div className="box">
          <div key={"newOrExist"} onChange={event => {setNewInteractionFormat(event.target.value); setSelectedInteraction("");}} className="item">
              <b><input type="radio" name="selected" value={"Nova"}/>{" Criar "} </b>
              <b><input type="radio" disabled={source.data.actions.length === 0} name="selected" value={"Existente"}/>{" Selecionar Existente"}</b>
              <br/>
          </div>
          {newInteractionFormat === "Nova" ? <><br/>
          
          <div><b><label htmlFor="text">Nome da interação: </label></b>
              <input id="text" type="text" onChange={(e) => setActionName(e.target.value)}/>
              <br/><br/>
          </div>
            <b><label htmlFor="text">Componente de partida: </label></b>
            <label> {getName(source)}</label>
            <br/> <br/>
            <b><label htmlFor="text">Tipo de interação: </label></b>
              <br/><br/>
            <select name="category" defaultValue={'DEFAULT'} onChange={event => setSourceIcon(event.target.value)}>
              <option value="DEFAULT" disabled>Escolher tipo...</option>
              <option>Clique</option>
              <option>Hover</option>
            </select>
          <br/><br/>
          <b><label htmlFor="text">Resultado da Interação: </label></b>
            <br/><br/>
          <select name="category" defaultValue={'DEFAULT'} onChange={event => {setActionResult(event.target.value); setTargetComponents([])}}>
            <option value="DEFAULT" disabled>Escolher resultado...</option>
            <option>Filtragem</option>
            <option>Destaque</option>
            <option>Dashboard</option>
            <option>Link</option>
          </select>
          <br/> <br/>
          {actionResult === "" || actionResult === "Filtragem" || actionResult === "Destaque" ?
          <>
          <b><label htmlFor="text">Componentes Afetados:</label></b>
          <br/> <br/>
          <select id="targets" style={{width: "18vh"}} name="category" defaultValue={'DEFAULT'} >
          <option value="DEFAULT" disabled>Escolher...</option>
              {nodes.map((node) => (
                node.type !== "varvisual" && node.type !== "grafico" && node.type !== "dashboard" ?              
                <option key={node.id} value={node.id}>
                  {getName(node)}
                </option> : ''
            ))}
          </select>
          {' '}<Button onClick={() => {addTargetComponent()}} variant="outline-secondary">Adicionar</Button>
          <ul>
          {targetComponents.map(targetC => <li key={targetC}> {getName(nodes.find(node => node.id === targetC))} 
          <button onClick={() => deleteTargetComp(targetC)} > <FaTimes pointerEvents={'none'}/></button> </li>)}
          </ul>
          <Button onClick={createAction} variant="secondary">Criar interação!</Button>{' '}
          </> : 
          <>
          <div>
          <select id="targets" style={{maxWidth: "20vh"}} name="category" defaultValue={'DEFAULT'} >
          <option value="DEFAULT" disabled>Escolher...</option>
              {nodes.map((node) => (
                node.type === actionResult.toLocaleLowerCase() ?              
                <option key={node.id} value={node.id}>
                  {getName(node)}
                </option> : ''
            ))}
          </select>{' '}<Button onClick={() => {addTargetComponent()}} variant="outline-secondary">Adicionar</Button>
          <ul>
          {targetComponents.map(targetC => <li key={targetC}> {getName(nodes.find(node => node.id === targetC))} 
          <button onClick={() => deleteTargetComp(targetC)} > <FaTimes pointerEvents={'none'}/></button> </li>)}
          </ul>
          {!hasTarget() ? <>
          {actionResult === 'Dashboard' ? <b><label htmlFor="text">Título do componente:</label></b> : <b><label htmlFor="text">Link:</label></b>}
          <input id="text" type="text" onChange={(e) => setNewCompName(e.target.value)}/>
          <br/><br/>
          </> : ""} 
          <Button onClick={createNavigation} variant="outline-secondary">Criar interação!</Button>{' '}      
          </div>
          </>  } 
          </>: 
          newInteractionFormat === "Existente" ?
          <><br/>
          <b><label htmlFor="text">Interações de {getName(source)}:</label></b>
          <br/> <br/>
          <select name="category" style={{maxWidth: "30vh"}} defaultValue={'DEFAULT'}
                  onChange={event => {setSelectedInteraction(source.data.actions.find(action => action.name === event.target.value))}}>
          <option value="DEFAULT" disabled>Escolher interação...</option>
              {source.data.actions.map((action) => (            
                <option key={action.id} value={action.name}>
                  {action.name}
                </option>
            ))}
          </select>
          { selectedInteraction !== "" ?
          <>
            <br></br><br></br>
            <b><label htmlFor="text"> Tipo de Interação: </label></b>{selectedInteraction.trigger}
            <br></br><br></br>
            <b><label htmlFor="text"> Resultado da Interação: </label></b>{selectedInteraction.result}
            <br></br><br></br>
            {selectedInteraction.result !== "Dashboard" && selectedInteraction.result !== "Link" ? 
            <>
            <b><label htmlFor="text"> Componentes afetados: </label></b><br/><br/>
            <select id="targets" style={{maxWidth: "20vh"}} name="category" defaultValue={'DEFAULT'} >
              <option value="DEFAULT" disabled>Escolher...</option>
              {nodes.map((node) => (
                  node.type !== "varvisual" && node.type !== "grafico" && node.type !== "dashboard"?
                      <option key={node.id} value={node.id}>
                        {getName(node)}
                      </option> : ''
              ))}
            </select>{' '}<Button onClick={() => {addTargetComponent()}} variant="outline-secondary">Adicionar</Button>
            </> : 
            <>
            <b><label htmlFor="text"> Componentes afetados: </label></b><br/><br/>
            <select id="targets" style={{maxWidth: "20vh"}} name="category" defaultValue={'DEFAULT'} >
              <option value="DEFAULT" disabled>Escolher...</option>
              {nodes.map((node) => (
                  node.type === selectedInteraction.result.toLocaleLowerCase() ?
                      <option key={node.id} value={node.id}>
                        {getName(node)}
                      </option> : ''
              ))}
            </select><button onClick={() => {addTargetComponent()}}>Adicionar</button></>}
            
            <ul>
              {getTargets(selectedInteraction).map(targetid => <li key={targetid}> {getName(nodes.find(node => node.id === targetid))}</li>)}
              {targetComponents.map(targetC => <li key={targetC}> {getName(nodes.find(node => node.id === targetC))}
                <button onClick={() => deleteTargetComp(targetC)} > <FaTimes pointerEvents={'none'}/></button> </li>)}
            </ul>
            <Button variant={"secondary"} onClick={() => extendAction(selectedInteraction)}> Editar Interação!</Button><br/>
          </> : ""
          }
          
          </> : ""
          }
      
          </div>
        </div>
    );
  
  }

export default CriarInteracao;
