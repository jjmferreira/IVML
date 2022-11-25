const FormComponent = ({handleClose, handleOptionSwitch,createComp,dataSwitch, isAdd}) => {
  return (
    <div className="popup-box">
      <div className="box">
        <button onClick={handleClose}>x</button>
        <br></br> <br></br>
        {isAdd ? <select name="category" onChange={event => handleOptionSwitch(event.target.value)}>
            <option id="0" >Dados</option>
            {/*<option id="1" >Visualização</option>*/}
            <option id="2" >Legenda</option>
            <option id="3" >Filtro</option>
            <option id="4" >Titulo</option>
            <option id="5" >Botão</option>
            <option id="6" >Parâmetro</option>
            <option id="7" >Variáveis Visuais</option>
            <option id="8" >Tipos de Gráficos</option>
        </select>
        :
        <select name="category" onChange={event => handleOptionSwitch(event.target.value)}>
            <option id="1" >Visualização</option>
            <option id="2" >Legenda</option>
            <option id="3" >Filtro</option>
            <option id="4" >Titulo</option>
            <option id="5" >Botão</option>
            <option id="6" >Parâmetro</option>
        </select>
        
        }
        
        <br></br><br></br>
        {dataSwitch}
        <button onClick={createComp}> Criar componente de dados!</button>       
      </div>
    </div>
  );
};

export default FormComponent;
