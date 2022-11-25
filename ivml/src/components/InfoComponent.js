import { useState } from "react";

const InfoComponent = ({node, handleClose, resizeH, resizeW, handleCloseAndEdit, changeDataName}) => {

  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(false);
  const [heightValue, setHeightValue] = useState(node.data.height);
  const [widthValue, setWidthValue] = useState(node.data.width);
  const [newName, setNewName] = useState('');
  //index 0 - heigh; index 1 - width; index 2 - name - Values to display in input
  const [currentValues, setCurrentValues] = useState([node.data.height,node.data.width, node.data.name])
  const [savedValues, setSavedValues] = useState([node.data.height,node.data.width,node.data.name])



  const toggleEdit = () => {
    setEditing(!editing);
    console.log(savedValues[0] + " Valores guardados")
    setCurrentValues([savedValues[0], savedValues[1], savedValues[2]]);
  }

  const wasEdited = () => {
    setEdited(true);
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
            <br></br>
            </>
            : 
            <>

            <b><label htmlFor="text">Título do componente:</label></b>
            <input id="text" type="text" 
              value={currentValues[2]} onChange={(e) => {setCurrentValues([currentValues[0], currentValues[1], e.target.value]); setNewName(e)}}/>
            <br></br><br></br>

            <b><label htmlFor="text">Altura do componente:</label></b>
            <input id="text" type="number" min="50"  step="10" 
              value={currentValues[0]} onChange={(e) => {setCurrentValues([e.target.value, currentValues[1], currentValues[2]]); setHeightValue(e)}}/>
            <br></br><br></br>

            <b><label htmlFor="text">Largura do componente:</label></b>
            <input id="text" type="number" min="50"  step="10" 
              value={currentValues[1]} onChange={(e) => {setCurrentValues([currentValues[0], e.target.value, currentValues[2]]); setWidthValue(e)}}/>
            <br></br><br></br>           
            <button className="closeButton" onClick={() => {changeDataName(newName); resizeH(heightValue); resizeW(widthValue); wasEdited(); toggleEdit(); setSavedValues([currentValues[0], currentValues[1],currentValues[2]])}}> Guardar Alterações!</button>
            </> }
            {edited ? <><button className="closeButtonTop" onClick={handleCloseAndEdit}> Fechar!</button></> : <><button className="closeButtonTop" onClick={handleClose}> Fechar!</button></>}
            <br></br><br></br>
          </div>
        </div>
      );
}

export default InfoComponent;