import { useState } from "react";

const InfoComponent = ({node, handleClose, handleCloseAndEdit, changeDataName, handleSetDataType, dataSpecs,setUpInterTypeAndSourceID, actionResultType}) => {

  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(false);
  const [newName, setNewName] = useState('');
  const [choosenDataType, setChoosenDataType] = useState('')
  const [newInterTypeIcon, setNewInterTypeIcon] = useState('')
  const [currentNodeID, setCurrentNodeID] = useState('');
  const iconNameReconfig = "";
  //index 0 - name index 1- data type index 2- hasInteraction index 3- actionresultType    index 4 - type of Interaction         Values to display in input (BEFORE RENDER)
  const [currentValues, setCurrentValues] = useState([node.data.name, node.data.datatype, node.data.hasInteraction, node.data.actionResultType, node.data.typeOfInteraction])
  //value after clicked save
  //index 0 - heigh; index 1 - width; index 2 - name - Values to display in input; index 3 - Result of interaction index 4 - type of Interaction  
  const [savedValues, setSavedValues] = useState([node.data.name, node.data.datatype, node.data.hasInteraction, node.data.actionResultType, node.data.typeOfInteraction])


  //current dataType Specs
  const [currentListOfDataSpec, setCurrentListOfDataSpec] = useState(node.data.dataExplain);
  const [optionName, setOptionName] = useState("");

  let keyCounter = 0;


  const toggleEdit = () => {
    setEditing(!editing);
    console.log(savedValues[0] + " Valores guardados")
    setCurrentValues([savedValues[0], savedValues[1],savedValues[2], savedValues[3], savedValues[4]]);
  }

  const wasEdited = () => {
    setEdited(true);
  }


  const addOption = () => {
    if(optionName !== ""){
      setCurrentListOfDataSpec([...currentListOfDataSpec, optionName]);
      dataSpecs([...currentListOfDataSpec, optionName]);
    }
  }

  const handleDataSpec = (datatype) => {
    switch(datatype){
      case "Ranking": return <><b><label htmlFor="text">Adicionar ranking:</label></b>
      <input id="text" type="text" onChange={(e) => setOptionName(e.target.value)}/>
      <button onClick={addOption}> Adicionar!</button>
      {currentListOfDataSpec.map(option => <li key={keyCounter++}> {option} </li>)}
      <br></br><br></br></>
      case "Categórico": return <><b><label htmlFor="text">Adicionar categoria:</label></b>
      <input id="text" type="text" onChange={(e) => setOptionName(e.target.value)}/>
      <button onClick={addOption}> Adicionar!</button>
      <br></br><br></br></> 
      default: break;
    } 
  }


    return (
        <div className="popup-box">
          <div className="box">
            
            {editing ? <><button onClick={()=>{toggleEdit()}}>Voltar atrás!</button></> : <><button className="editButton" onClick={() => {toggleEdit()}}>Editar</button></>}
            <b><h3>Informações sobre o componente</h3></b> 
            {!editing ? 
            <>
            <br></br>
            <h3>Nome do componente: { savedValues[0]}</h3>
            {savedValues[1] !== "" ? <h3>Tipo de Dados: {savedValues[1]}</h3> : <></>}
            {node.data.dataExplain.length !== 0 ? <h3>Especificação dos Dados: {node.data.dataExplain.map(option => <li key={keyCounter++}> {option} </li>)}</h3> : ''}
            {savedValues[2] ?
            <>
            <h3>Resultado da Interação: {savedValues[3]}</h3>
            <h3>Tipo da Interação: {savedValues[4]}</h3>
            </>
            : ""}
            <br></br>
            </>
            : 
            <>

            <b><label htmlFor="text">Título do componente:</label></b>
            <input id="text" type="text" 
              value={currentValues[0]} onChange={(e) => {setCurrentValues([e.target.value, currentValues[1], currentValues[2], currentValues[3], , currentValues[4]]); setNewName(e)}}/>
            <br></br><br></br>

            {node.type === "dadosUpdater" ? <>
            <b><label htmlFor="text">Tipo dos Dados:</label></b>
            <select name="category" defaultValue={'DEFAULT'} onChange={(e) => {setChoosenDataType(e.target.value); setCurrentValues([currentValues[0], e.target.value, currentValues[2],currentValues[3], currentValues[4]])}}>
                    <option value="DEFAULT" disabled>Escolhe o componente:</option>
                    <option id="1">Binário</option>
                    <option id="2">Contínuo</option>
                    <option id="3">Discreto</option>
                    <option id="4">Arbitrário</option>
                    <option id="5">Ranking</option>
                    <option id="6">Categórico</option>            
            </select>
             <br></br><br></br>{handleDataSpec(choosenDataType)}
            </> 
            : 
            savedValues[2] ? <>
            <br></br> <br></br>
              <b><label htmlFor="text">Resultado da Interação:</label></b>
              <br></br> <br></br>
            <select name="category" defaultValue={'DEFAULT'} onChange={event => {actionResultType(event.target.value); setCurrentValues([currentValues[0], currentValues[1], true, event.target.value, currentValues[4]])}}>
              <option value="DEFAULT" disabled>Escolhe o tipo:</option>
              <option>Filtragem</option>
              <option>Destaque</option>
            </select>
            <br></br> <br></br>
            <b><label htmlFor="text">Tipo de interação:</label></b>
            <br></br><br></br>
            <select name="category" defaultValue={'DEFAULT'} onChange={event => {setNewInterTypeIcon(event.target.value); setCurrentNodeID(node.id); setCurrentValues([currentValues[0], currentValues[1], true, currentValues[3], event.target.value])}}>
              <option value="DEFAULT" disabled>Escolhe o tipo:</option>
              <option>Clique</option>
              <option>Hover</option>
            </select>
            <br></br> <br></br>          
            </>
          : ""}
              <button className="closeButton" 
              onClick={() => {changeDataName(newName); handleSetDataType(choosenDataType); wasEdited(); 
              toggleEdit(); setUpInterTypeAndSourceID(newInterTypeIcon, currentNodeID)
              setSavedValues([currentValues[0], currentValues[1], currentValues[2], currentValues[3], currentValues[4]])}}> Guardar Alterações!</button>

            </>      
            }
            {edited ? <><button className="closeButtonTop" onClick={handleCloseAndEdit}> Fechar!</button></> : <><button className="closeButtonTop" onClick={handleClose}> Fechar!</button></>}
            <br></br><br></br>
          </div>
        </div>
      );
}

export default InfoComponent;