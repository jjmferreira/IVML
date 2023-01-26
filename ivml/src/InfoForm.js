import React, {useEffect, useState} from "react";
import {FaTimes, FaArrowLeft, FaPencilAlt, FaChevronDown, FaChevronUp} from "react-icons/fa";

const InfoForm = ({nodes, edges, selectedNode, editComponent, getName}) => {


  const [component, setComponent] = useState(selectedNode !== undefined ? JSON.parse(JSON.stringify(selectedNode)): null); //copy node
  const [editing, setEditing] = useState(false);
  const [optionName, setOptionName] = useState("");
  const [options, setOptions] = useState(selectedNode.data.dataExplain);
  const [paramOptions, setParamOptions] = useState([]);
  const [openActions, setOpenActions] = useState(false);

  let keyCounter = 0;

  const resetChanges = () => {
    setOptionName("");
    setOptions(selectedNode.data.dataExplain);
    setParamOptions(selectedNode.data.parameterOptions);
    setComponent(JSON.parse(JSON.stringify(selectedNode))); //copy node
    setEditing(false);
  }

  const addOption = () => {
    if (!options.includes(optionName)) {
      component.data.dataExplain = [...options, optionName];
      setComponent(component);
      setOptions([...options, optionName])
    }
  }

  const deleteOption = (option) => {
    if(option !== ""){
      component.data.dataExplain = options.filter(op => op !== option);
      setOptions(options.filter(op => op !== option));
    }
  }

  const addParamOption = () => {
    if (!paramOptions.includes(optionName)) {
      component.data.parameterOptions = [...paramOptions, optionName];
      setParamOptions([...paramOptions, optionName])
    }
  }

  const deleteParamOption = (option) => {
      component.data.parameterOptions = paramOptions.filter(op => op !== option);
      setParamOptions(paramOptions.filter(op => op !== option));
  }

  const handleDataSpec = () => {
    let header = "";
    switch(component.data.dataType){
      case "Ranking":
        header = (<b><label htmlFor="text">Adicionar ranking:</label></b>);
        break;
      case "Categórico":
        header = (<b><label htmlFor="text">Adicionar categoria:</label></b>);
        break;
      default: return;
    }
    return <>{header} <input id="text" type="text" onChange={(e) => setOptionName(e.target.value)}/>
        <button onClick={addOption}> Adicionar!</button>
        <ul>{options.map(option => <li key={option}> {option}
          <button onClick={() => deleteOption(option)} > <FaTimes pointerEvents={'none'}/></button>
        </li>)}</ul>
    </>
  }

  const getTargets = (interaction) => {
    let currentTargetsID = [];
    edges.map((edge) => {
      if(interaction.id === edge.data && edge.source === selectedNode.id){
        console.log(edge.data + " Edge data " + interaction.id)
        currentTargetsID = [...currentTargetsID, edge.target]
      }
    })
    return currentTargetsID;
  }

  const showActions = (actions) =>{
    let clique = [];
    let hover = [];
    actions.map(action => {
      console.log(action.id + " Shw")
      switch(action.trigger){
        case 'Clique': 
          clique.push(action);
          break;
        case 'Hover': 
          hover.push(action);
          break;
        default: return;
      }
    })
    return <><div style={{border:"1px solid lightgrey", paddingLeft:"12px", paddingRight:"12px"}}>
      {clique.length !== 0 ? <><h3> Interações de clique:</h3></> : ''}
      {clique.map((act) => <>      
        <b>Nome do interação: </b>{act.name}<br/>
        <b>Resultado da interação: </b>{act.result}<br/>
        <b>Componente(s) afetado(s): </b>
            {console.log(act)}
            <ul>
              {getTargets(act).map(targetid => <li key={targetid}> {getName(nodes.find(node => node.id === targetid))}</li>)}
            </ul>
        </>)
      }
      {clique.length > 0 && hover.length > 0 ? <hr/> : null}
      {hover.length !== 0 ? <><h3> Interações de Hover:</h3></>: ''}
      {hover.map((act) => <>      
        <b>Nome do interação: </b>{act.name}<br/>
        <b>Resultado da interação: </b>{act.result}<br/>
        <b>Componente(s) afetado(s): </b>
        {console.log(act)}
            <ul>
              {getTargets(act).map(targetid => <li key={targetid}> {getName(nodes.find(node => node.id === targetid))}</li>)}
            </ul>
        </>)
      }
    </div></>
  }

  useEffect(() => setOpenActions(false), [selectedNode]);

    return (
          <div className="box">
            {!editing ?
            <><b><h2>Informações sobre o componente <FaPencilAlt style={{alignItems: "center", cursor: "pointer"}} onClick={() => setEditing(true)}/></h2></b>
            <b>Nome do componente: </b>{getName(selectedNode)}<br/>
              {selectedNode.data.parameterOptions.length > 0 ? <>
                <br/><b><label htmlFor="text">Opções:</label></b>
                <ul>{component.data.parameterOptions.map((option) => <li key={option}> {option}
                </li>)}</ul></> : null}
            {selectedNode.data.dataType !== "" ? <><br/><b>Tipo de Dados: </b>{selectedNode.data.dataType}<br/></> : ''}
            {selectedNode.data.dataType !== "" && options.length !== 0 ? <><br/><b>Especificação dos Dados: </b>{selectedNode.data.dataExplain.map(option => <li key={keyCounter++}> {option} </li>)}<br/></> : ''}
            {selectedNode.data.actions.length !== 0 ? <>
              <br/><button style={{width:"100%", display:"inline-grid"}} className={"tab"} onClick={() => setOpenActions(!openActions)}>
                Ver Interações {openActions ? <FaChevronUp style={{position:"absolute", justifySelf:"end"}}/>
                : <FaChevronDown style={{position:"absolute", justifySelf:"end"}}/>}</button>
                {openActions ? showActions(selectedNode.data.actions) : null}</> : <><br/><hr/></>}
            </>
            : 
            <><b><h2><FaArrowLeft style={{alignItems: "center", cursor: "pointer"}} onClick={() => resetChanges()}/> Editar componente</h2></b><br/>
              <b><label htmlFor="text">Título: </label></b>
            <input id="text" type="text" 
              defaultValue={component.data.name} onChange={(e) => (component.data.name = e.target.value)}/>
            <br/><br/>
            {selectedNode.type === "dados" ? <>
            <b><label htmlFor="text">Tipo dos Dados:</label></b>
            <select name="category" defaultValue={selectedNode.data.dataType} onChange={(e) => {component.data.datatype = e.target.value}}>
                    <option value="DEFAULT" disabled>Escolher...</option>
                    <option value="Binário">Binário</option>
                    <option value="Contínuo">Contínuo</option>
                    <option value="Discreto">Discreto</option>
                    <option value="Arbitrário">Arbitrário</option>
                    <option value="Ranking">Ranking</option>
                    <option value="Categórico">Categórico</option>
            </select>
             <br/><br/>{handleDataSpec()}
            </>
            : selectedNode.type === "parametro" ? <>
                      <b><label htmlFor="text">Opções:</label></b>
                        <ul>
                          {component.data.parameterOptions.map((option) => <li key={option}> {option}
                            <button style={{marginLeft:"3px"}} onClick={() => deleteParamOption(option)} > <FaTimes pointerEvents={'none'}/></button>
                          </li>)}
                        </ul>
                        <input id="text" type="text" onChange={(e) => setOptionName(e.target.value)}/>
                        <button onClick={addParamOption}> Adicionar!</button>
                    </>
            : ""}<br/>
              <button onClick={() => {editComponent(component); setEditing(false)}}> Guardar Alterações!</button>
            <br/><br/></>
            }
          </div>
      );
}

export default InfoForm;