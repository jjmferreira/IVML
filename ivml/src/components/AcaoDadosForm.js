const AcaoDadosForm = ({handleActionStart, handleActionFinish, createComp, nodesName,handleClose, changeDataName, actionResultType}) => {

    return (
      <div className="popup-box">
        <div className="box">
          <button onClick={handleClose}>x</button>
          <br></br> <br></br>
          <b><label htmlFor="text">Resultado da Ação de Dados:</label></b>
          <br></br> <br></br>
          <select name="category" defaultValue={'DEFAULT'} onChange={event => actionResultType(event.target.value)}>
            <option value="DEFAULT" disabled>Escolhe o tipo:</option>
            <option>Filtragem</option>
            <option>Destaque</option>
        </select>
        <br></br> <br></br>
        <br></br>
        <b><label htmlFor="text">Componente de partida:</label></b>
        <br></br> <br></br>
        <select name="category" defaultValue={'DEFAULT'} onChange={event => handleActionStart(event.target.value)}>
            <option value="DEFAULT" disabled>Escolhe o componente:</option>
            {nodesName.map((node) => (
            <option key={node.id} value={node.id}>
            {node.data.compCounter}              
            </option>
          ))}
        </select>
        <br></br> <br></br>
        <br></br>
        <b><label htmlFor="text">Componente de Chegada:</label></b>
        <br></br> <br></br>
        <select name="category" defaultValue={'DEFAULT'} onChange={event => handleActionFinish(event.target.value)}>
        <option value="DEFAULT" disabled>Escolhe o componente:</option>
            {nodesName.map((node) => (
            <option key={node.id} value={node.id}>
              {node.data.compCounter}
            </option>
          ))}
        </select>
        <br></br> <br></br>
        <br></br>
        <b><label htmlFor="text">Nome dos Dados:</label></b>
        <input id="text" type="text" onChange={(e) => changeDataName(e)}/>
        <br></br><br></br>
        <button onClick={createComp}> Criar componente de dados!</button>
        </div>
      </div>
    );
  
  }

export default AcaoDadosForm;
