const InfoComponent = ({node, handleClose}) => {
    return (
        <div className="popup-box">
          <div className="box">
            <button onClick={handleClose}>x</button>
            <b><h3>Informações sobre o componente</h3></b> 
            <br></br>
            <h3>Nome: {node.name}</h3>
            <p></p>
            {/*<h3>Tipo de gráfico: {props.name}</h3>*/}
            <br></br><br></br>
          </div>
        </div>
      );
}

export default InfoComponent