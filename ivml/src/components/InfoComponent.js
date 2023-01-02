import { useState } from "react";

const InfoComponent = ({node, handleClose, resizeH, resizeW, handleCloseAndEdit, changeDataName, handleSetDataType, dataSpecs,setUpInterTypeAndSourceID}) => {

  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(false);
  const [heightValue, setHeightValue] = useState(node.data.height);
  const [widthValue, setWidthValue] = useState(node.data.width);
  const [newName, setNewName] = useState('');
  const [choosenDataType, setChoosenDataType] = useState('')
  const [newInterTypeIcon, setNewInterTypeIcon] = useState('')
  const [currentNodeID, setCurrentNodeID] = useState('');
  //index 0 - heigh; index 1 - width; index 2 - name - Values to display in input
  const [currentValues, setCurrentValues] = useState([node.data.height,node.data.width, node.data.name, node.data.datatype])
  //value after clicked save
  //index 0 - heigh; index 1 - width; index 2 - name - Values to display in input; index 3 - tipo de dados
  const [savedValues, setSavedValues] = useState([node.data.height,node.data.width,node.data.name, node.data.datatype])


  //current dataType Specs
  const [currentListOfDataSpec, setCurrentListOfDataSpec] = useState(node.data.dataExplain);
  const [optionName, setOptionName] = useState("");

  let keyCounter = 0;


  const toggleEdit = () => {
    setEditing(!editing);
    console.log(savedValues[0] + " Valores guardados")
    setCurrentValues([savedValues[0], savedValues[1], savedValues[2], savedValues[3]]);
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
            <h3>Nome do componente: { savedValues[2]}</h3>
            <h3>Altura : { savedValues[0]}</h3>
            <h3>Largura : { savedValues[1]}</h3>
            {savedValues[3] !== "" ? <h3>Tipo de Dados: {savedValues[3]}</h3> : <></>}
            {node.data.dataExplain.length !== 0 ? <h3>Especificação dos Dados: {node.data.dataExplain.map(option => <li key={keyCounter++}> {option} </li>)}</h3> : ''}
            <br></br>
            </>
            : 
            <>

            <b><label htmlFor="text">Título do componente:</label></b>
            <input id="text" type="text" 
              value={currentValues[2]} onChange={(e) => {setCurrentValues([currentValues[0], currentValues[1], e.target.value, currentValues[3]]); setNewName(e)}}/>
            <br></br><br></br>

            <b><label htmlFor="text">Altura do componente:</label></b>
            <input id="text" type="number" min="50"  step="10" 
              value={currentValues[0]} onChange={(e) => {setCurrentValues([e.target.value, currentValues[1], currentValues[2],currentValues[3]]); setHeightValue(e)}}/>
            <br></br><br></br>

            <b><label htmlFor="text">Largura do componente:</label></b>
            <input id="text" type="number" min="50"  step="10" 
              value={currentValues[1]} onChange={(e) => {setCurrentValues([currentValues[0], e.target.value, currentValues[2], currentValues[3]]); setWidthValue(e)}}/>
            <br></br><br></br>      
            {node.type === "dadosUpdater" ? <>
            <b><label htmlFor="text">Tipo dos Dados:</label></b>
            <select name="category" defaultValue={'DEFAULT'} onChange={(e) => {setChoosenDataType(e.target.value); setCurrentValues([currentValues[0], currentValues[1], currentValues[2], e.target.value])}}>
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
            node.type === "acaoDadosUpdater" ? <>
            <b><label htmlFor="text">Tipo de interação:</label></b>
            <br></br><br></br>
            <select name="category" defaultValue={'DEFAULT'} onChange={event => {setNewInterTypeIcon(event.target.value); setCurrentNodeID(node.id)}}>
              <option value="DEFAULT" disabled>Escolhe o tipo:</option>
              <option>Clique</option>
              <option>Hover</option>
            </select>
            <br></br> <br></br>          
            </>
          : ""}
              <button className="closeButton" 
              onClick={() => {changeDataName(newName); resizeH(heightValue); resizeW(widthValue); 
              handleSetDataType(choosenDataType); wasEdited(); toggleEdit(); setUpInterTypeAndSourceID(newInterTypeIcon, currentNodeID)
              setSavedValues([currentValues[0], currentValues[1],currentValues[2], currentValues[3]])}}> Guardar Alterações!</button>

            </>      
            }
            {edited ? <><button className="closeButtonTop" onClick={handleCloseAndEdit}> Fechar!</button></> : <><button className="closeButtonTop" onClick={handleClose}> Fechar!</button></>}
            <br></br><br></br>
          </div>
        </div>
      );
}

export default InfoComponent;