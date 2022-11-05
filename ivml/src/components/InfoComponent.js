import { useState } from "react";

const InfoComponent = ({node, handleClose, resizeH, resizeW, handleCloseAndEdit, changeDataName}) => {

  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(false);
  const [heightValue, setHeightValue] = useState('');
  const [widthValue, setWidthValue] = useState('');
  const [newName, setNewName] = useState('');



  let currentHeight = node.data.height;
  let currentWidth = node.data.width;
  const toggleEdit = () => {
    setEditing(!editing);
    if(edited){
      currentHeight = heightValue;
      currentWidth = widthValue;
    }
  }

  const wasEdited = () => {
    setEdited(true);
  }

  const cancelEdit = () => {
    setEdited(false);
  }


  

    return (
        <div className="popup-box">
          <div className="box">
            {editing ? <><button onClick={ () => {toggleEdit(); cancelEdit()}}>Voltar atrás!</button></> : <><button onClick={toggleEdit}>Editar</button></>}
            <b><h3>Informações sobre o componente</h3></b> 
            <br></br>
            <h3>Nome do componente: {node.data.name}</h3>
            <h3>Altura : {currentHeight}</h3>
            <h3>Largura : {currentWidth}</h3>
            <br></br>
            { editing ? 
            <>
            <b><label htmlFor="text">Título do componente:</label></b>
            <input id="text" type="text" onChange={(e) => setNewName(e)}/>
            <br></br><br></br>
            <b><label htmlFor="text">Altura do componente:</label></b>
            <input id="text" type="number" min="50"  step="10" value={heightValue} onChange={(e) => setHeightValue(e)}/>
            <br></br><br></br>
            <b><label htmlFor="text">Largura do componente:</label></b>
            <input id="text" type="number" min="50"  step="10" value={widthValue} onChange={(e) => setWidthValue(e)}/>
            <br></br><br></br>
            <button onClick={() => {changeDataName(newName); resizeH(heightValue); resizeW(widthValue); wasEdited(); toggleEdit()}}> Guardar Alterações!</button>
            </> : edited ? <><button onClick={handleCloseAndEdit}> Fechar!</button></> : <><button onClick={handleClose}> Fechar!</button></>}
            <br></br><br></br>
          </div>
        </div>
      );
}

export default InfoComponent;