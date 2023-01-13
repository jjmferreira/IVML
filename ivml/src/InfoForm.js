import { useState } from "react";
import {FaTimes} from "react-icons/fa";

const InfoForm = ({nodes, handleClose, editComponent, getName}) => {

  const node = nodes.find(node => node.selected);

  const [component, setComponent] = useState(JSON.parse(JSON.stringify(node))); //copy node
  const [editing, setEditing] = useState(false);
  const [optionName, setOptionName] = useState("");
  const [options, setOptions] = useState(node.data.dataExplain);
  const [paramOptions, setParamOptions] = useState([]);

  let keyCounter = 0;

  const resetChanges = () => {
    setOptionName("");
    setOptions(node.data.dataExplain);
    setParamOptions(node.data.parameterOptions);
    setComponent(JSON.parse(JSON.stringify(node))); //copy node
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
    if(option !== ""){
      component.data.parameterOptions = paramOptions.filter(op => op !== option);
      setParamOptions(paramOptions.filter(op => op !== option));
    }
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

    //TODO: Info das ações de dados
    return (
        <div className="popup-box">
          <div className="box">
            
            {editing ? <><button onClick={() => resetChanges()}>Voltar atrás!</button></>
                : <><button className="editButton" onClick={() => setEditing(true)}>Editar</button></>}
            {!editing ?
            <><b><h2>Informações sobre o componente</h2></b><br/>
            <b>Nome do componente: </b>{getName(node)}<br/>
              {node.data.parameterOptions !== "" ?<>
                <br/><b><label htmlFor="text">Opções:</label></b>
                <ul>{component.data.parameterOptions.map((option) => <li key={option}> {option}
                </li>)}</ul></> : null}
            {node.data.dataType !== "" ? <><br/><b>Tipo de Dados: </b>{node.data.dataType}<br/></> : ''}
            {node.data.dataType !== "" && options.length !== 0 ? <><br/><b>Especificação dos Dados: </b>{node.data.dataExplain.map(option => <li key={keyCounter++}> {option} </li>)}<br/></> : ''}
            <br/>
            </>
            : 
            <><b><h2>Editar componente</h2></b>
              <b><label htmlFor="text">Título: </label></b>
            <input id="text" type="text" 
              defaultValue={component.data.name} onChange={(e) => (component.data.name = e.target.value)}/>
            <br/><br/>
            {node.type === "dados" ? <>
            <b><label htmlFor="text">Tipo dos Dados:</label></b>
            <select name="category" defaultValue={node.data.dataType} onChange={(e) => {component.data.datatype = e.target.value}}>
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
            : node.type === "parametro" ? <>
                      <b><label htmlFor="text">Opções:</label></b>
                        <ul>
                          {component.data.parameterOptions.map((option) => <li key={option}> {option}
                            <button style={{marginLeft:"3px"}} onClick={() => deleteParamOption(option)} > <FaTimes pointerEvents={'none'}/></button>
                          </li>)}
                        </ul>
                        <input id="text" type="text" onChange={(e) => setOptionName(e.target.value)}/>
                        <button onClick={addParamOption}> Adicionar!</button>
                    </>
            : ""}
              <button className="closeButton" 
              onClick={() => {editComponent(component); setEditing(false)}}> Guardar Alterações!</button>

            </>      
            }
            <><button className="closeButtonTop" onClick={handleClose}> Fechar!</button></>
            <br></br><br></br>
          </div>
        </div>
      );
}

export default InfoForm;