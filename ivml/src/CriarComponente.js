import {useEffect, useState} from "react";
import area from "./imagens/Gráficos/Área.PNG";
import barras from "./imagens/Gráficos/Barras.PNG";
import barrasEmp from "./imagens/Gráficos/Barras Empilhadas.PNG";
import barrasEmp100 from "./imagens/Gráficos/Empilhadas 100.PNG";
import dispersao from "./imagens/Gráficos/Dispersão.PNG";
import gant from "./imagens/Gráficos/Gant.PNG";
import hexabin from "./imagens/Gráficos/Hexabin.PNG";
import linha from "./imagens/Gráficos/Linha.PNG";
import mapa from "./imagens/Gráficos/Mapa.PNG";
import mapaCalor from "./imagens/Gráficos/Mapa de Calor.PNG";
import mapaCoropletico from "./imagens/Gráficos/Mapa Coroplético.PNG";
import multiLinhas from "./imagens/Gráficos/Múltiplas Linhas.PNG";
import pontos from "./imagens/Gráficos/Pontos.PNG";
import relogio from "./imagens/Gráficos/Relógio.PNG";
import tabela from "./imagens/Gráficos/Tabela.PNG";
import texto from "./imagens/Gráficos/Texto.PNG";
import {FaTimes} from "react-icons/fa";
import Button from 'react-bootstrap/Button';


const CriarComponente = ({createComp, parent}) => {

    const extent = parent !== "" ? 'parent' : '';

    const nodeData = { name: '', dataType: '', compCounter: '', varName: '',
        graphType: '', dataExplain: [], parameterOptions: '', actions: [], tooltip:''};

    const [node, setNode] = useState({ id: '', type: '', position:{ x: 50, y: 50 }, data: nodeData,
        parentNode: parent === undefined ? "" : parent.id, extent:extent});

    const [componentType, setComponentType] = useState('');
    const [dataType, setDataType] = useState();
    const [option, setOption] = useState();
    const [dataOptions, setDataOptions] = useState([]);
    const [paramOptions, setParamOptions] = useState([]);
    const vars =["Cor", "Forma", "Tamanho"];
    const graficos = [area, barras, barrasEmp,barrasEmp100,dispersao, gant, hexabin, linha, mapa, mapaCalor,
        mapaCoropletico, multiLinhas, pontos, relogio, tabela, texto];

    const changeComponentType = (type) => {
        //reset
        node.data.dataType = '';
        node.data.dataExplain = [];
        node.data.parameterOptions = [];
        node.data.varName = '';
        node.data.graphType = '';
        //restore
        switch (type){
            case "dados":
                node.data.dataType = dataType;
                node.data.dataExplain = dataOptions;
                break;
            case "varvisual":
                node.data.name = 'var';
                break;
            case "grafico":
                node.data.name = 'graph';
                break;
            case "parametro":
                node.data.parameterOptions = paramOptions;
                break;
        }
        node.type = type;
        setComponentType(type);
        setNode(node);
    }

    function changeName(name){
        node.data.name = name;
        setNode(node);
    }

    const changeVarType = (type) => {
        node.data.varName = type;
        node.data.name = type;
        setNode(node);
    }

    const changeGraphType = (type) => {
        node.data.graphType = type;
        node.data.name = "Gráfico de " + type;
        setNode(node);
    }

    const changeDataType = (type) => {
        setDataType(type);
        setDataOptions([]);
        node.data.dataType = type;
        node.data.dataExplain = [];
        setNode(node);
    }

    const addDataOption = () => {
        if(option === undefined){
            alert("Option can't be blank!")
        } else{
            if (!dataOptions.includes(option)) {
                node.data.dataExplain = [...dataOptions, option];
                setNode(node);
                setDataOptions([...dataOptions, option])
            }
        }
        
    }

    const deleteDataOption = (option) => {
        if(option !== ""){
            node.data.dataExplain = dataOptions.filter(op => op !== option);
            setDataOptions(dataOptions.filter(op => op !== option));
        }
    }

    const addParamOption = () => {
        if(option === undefined){
            alert("Option can't be blank!")
        }else {
            if (!paramOptions.includes(option)) {
            node.data.parameterOptions = [...paramOptions, option];
            setNode(node);
            setParamOptions([...paramOptions, option])
            }
        }
    }

    const deleteParamOption = (option) => {
        if(option !== ""){
            node.data.parameterOptions = paramOptions.filter(op => op !== option);
            setParamOptions(paramOptions.filter(op => op !== option));
        }
    }

    //TODO: No caso do filtro e parâmetro, criar logo 1 único componente de dados
    const componentsAllowed = () => {
        const vis = {value: "visualizacao", name: "Visualização"};
        const botao = {value: "botao", name: "Botão"};
        const filtro = {value: "filtro", name: "Filtro"};
        const legenda = {value: "legenda", name: "Legenda"};
        const param = {value: "parametro", name: "Parâmetro"};
        const titulo = {value: "titulo", name: "Título"};
        const dados = {value: "dados", name: "Dados"};
        const varVis = {value: "varvisual", name: "Variáveis Visuais"};
        const graph = {value: "grafico", name: "Tipos de Gráficos"};
        let allowed = [];
        if (parent !== ""){
            switch (parent.type){
                case "filtro":
                case "parametro":
                    allowed.push(dados);
                    break
                case "legenda":
                    allowed.push(dados, varVis);
                    break;
                case "visualizacao":
                    allowed.push(botao, filtro, legenda, param, titulo, dados, varVis, graph);
                    break;
            }
        }else{
            allowed.push(botao, filtro, legenda, param, titulo, vis);
        }
        return allowed;
    }

    useEffect(() => {
        //reset form
        const select = document.getElementById("componentType");
        if (select !== null) {
            select.value = "DEFAULT";
            setComponentType("");
        }
    }, [parent])

  return componentsAllowed().length === 0 ? null :
      (<div className="box">
          {parent === "" ? <><h3>Criar Componente</h3><br/></> : null}
          <b><label htmlFor="text">Tipo: </label></b>
          <select id="componentType" name="category" defaultValue={"DEFAULT"} onChange={(event) => changeComponentType(event.target.value)}>
              <option disabled value={"DEFAULT"} >Escolher...</option>
              {componentsAllowed().map(type => <option key={type.value} value={type.value} >{type.name}</option>)}
          </select>

          <br/><br/>
          {/*detail by component type*/}
          {componentType === "varvisual" ? <div className="item" onChange={event => changeVarType(event.target.value)} >
                {vars.map((varType) => (
                        <><input key={varType} type="radio" name="selected" value={varType}/>{varType} </>
                ))}
            <br/><br/></div> :
            componentType === "grafico" ?
                <div className="wrapper">
                    {graficos.map((grafico) => (
                        <div key={grafico.id} onChange={event => changeGraphType(event.target.value)} className="item">
                            <img style={{width:"70px", height: "60px"}} src={grafico} alt={grafico} /><br/>
                            <input type="radio" name="selected" value={grafico.split("media/")[1].split(".")[0]}/>
                            <label>{grafico.split("media/")[1].split(".")[0]}</label>
                            </div>
                    ))}
                </div>
                : <div><b><label htmlFor="text">Título do componente:</label></b>
                    <input id="text" type="text" onChange={(e) => changeName(e.target.value)}/>
                    <br/><br/></div>}
          {componentType === "dados"  ?
                <div>
                    <b><label htmlFor="text">Tipo dos Dados:</label></b>
                    <select name="category" defaultValue={'DEFAULT'} onChange={(e) => changeDataType(e.currentTarget.value)}>
                        <option value="DEFAULT" disabled>Escolher...</option>
                        <option value="Binário">Binário</option>
                        <option value="Contínuo">Contínuo</option>
                        <option value="Discreto">Discreto</option>
                        <option value="Arbitrário">Arbitrário</option>
                        <option value="Ranking">Ranking</option>
                        <option value="Categórico">Categórico</option>
                    </select>
                    <br/><br/>
                    {node.data.dataType === "Ranking" ?
                            <b><label htmlFor="text">Adicionar ranking:</label></b> :
                        node.data.dataType === "Categórico" ?
                            <b><label htmlFor="text">Adicionar categoria:</label></b> : null}
                    {node.data.dataType === "Ranking" || node.data.dataType === "Categórico" ?
                        <div><input id="text" type="text" onChange={(e) => setOption(e.target.value)}/>
                        <button onClick={addDataOption}> Adicionar!</button>
                        <ul>{dataOptions.map(option => <li key={option}> {option}
                            <button onClick={() => deleteDataOption(option)} > <FaTimes pointerEvents={'none'}/></button>
                        </li>)}</ul>
                        </div>
                    : null}
                </div>
          : componentType === "parametro" ?
              <div><b><label htmlFor="text">Nova opção:</label></b>
                  <input id="text" type="text" onChange={(e) => setOption(e.target.value)}/>
                  <button onClick={addParamOption}> Adicionar!</button>
              <ul>
                  {paramOptions.map((option) => <li key={option}> {option}
                      <button style={{marginLeft:"3px"}} onClick={() => deleteParamOption(option)} > <FaTimes pointerEvents={'none'}/></button>
                  </li>)}
              </ul>
              </div> : null}
            <Button onClick={() => {createComp(node)}} variant="secondary">Criar componente</Button>{' '}
    </div>
  );
};

export default CriarComponente;
