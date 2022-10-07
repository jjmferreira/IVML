import { useCallback, useState} from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, ReactFlowProvider, useReactFlow} from 'react-flow-renderer';
//import {Button} from '@mui/material';

//import { SmartBezierEdge } from '@tisoap/react-flow-smart-edge'

import Dados from './components/Dados';
import Vis from './components/Vis';
import LegendaComponente from './components/LegendaComponente';
import FiltroComponente from './components/FiltroComponente';
import TituloComponente from './components/TituloComponente';
import AcaoDadosComponente from './components/AcaoDadosComponente';
import VarVisuaisImgComponente from './components/VarVisuaisImgComponente';
import GraficoComponente from "./components/GraficoComponente";
import DynamicForm from './components/DynamicForm';



import './components/components.css';
import FormComponent from './components/FormComponent';
import AcaoDadosForm from './components/AcaoDadosForm';
import InfoComponent from './components/InfoComponent';




const rfStyle = {
  backgroundColor: '#B8CEFF',
};

const flowKey = 'example-flow';


const nodeTypes = { dadosUpdater: Dados, visUpdater: Vis, legendaUpdater: LegendaComponente, filtroUpdater: FiltroComponente, 
  tituloUpdater: TituloComponente, acaoDadosUpdater: AcaoDadosComponente, imgUpdater: VarVisuaisImgComponente, graficoUpdater: GraficoComponente,};

const initialNodes = [
  //{ id: 'node-1', type: 'visUpdater', position: { x: 0, y: 0 }, data: { name: 'Tratamento', datatype: 'Arbitrário'}},
  //{ id: 'node-2', type: 'dadosUpdater', position: { x: 10, y: 10 }, data: { name: 'Dados1' }, parentNode:"node-1", extent:'parent'},

];

 
const initialEdges = [
  //{ id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
];
// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component


function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [newDataName, setDataName] = useState("");
  const [newDataType, setDataType] = useState("");
  const [newDataSpec, setDataSpec] = useState([]);
  const [varType, setVarType] = useState('Cor');
  const [graphType, setGraphType] = useState("");
  const [dataComponent, setDataComponent] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [actionForm, setActionForm] = useState(false);
  const [newComponent, setnewComponent] = useState(false);
  const [infoForm, setInfoForm] = useState(false);
  const [nodeInfo, setNodeInfo] = useState([]);
  const [allNodesName, setAllNodesName] = useState([]);
  const [parentNodeClicked, setParentNodeClicked] = useState("");

  const [edgeActionStart, setedgeActionStart] = useState("");
  const [edgeActionEnd, setedgeActionEnd] = useState("");

  //Counters
  const [visCounter, setVisCounter] = useState(0);
  const [legCounter, setLegCounter] = useState(0);
  const [filCounter, setFilCounter] = useState(0);
  const [titCounter, setTitCounter] = useState(0);
  const [nodeIDCounter, setNodeIDCounter] = useState(0);
  const [edgeIDCounter, setEdgeIDCounter] = useState(0);


  //Save and restore - /Export and import
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      const json = {...flow, visCounter, legCounter, filCounter, titCounter, nodeIDCounter, edgeIDCounter};
      localStorage.setItem(flowKey, JSON.stringify(json));
    }
  }, [rfInstance,visCounter, legCounter, filCounter,titCounter,nodeIDCounter, edgeIDCounter]);

  const exportJSON = () => {
    const flow = rfInstance.toObject();
    const json = {...flow, visCounter, legCounter, filCounter, titCounter,nodeIDCounter, edgeIDCounter};
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(json)
      )}`;
      const link = document.createElement("a");
      link.href = jsonString;
      link.download = "dashboardPrototype.json";
  
      link.click();
  }


  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
        setVisCounter(flow.visCounter)
        setLegCounter(flow.legCounter)
        setFilCounter(flow.filCounter)
        setTitCounter(flow.titCounter)
        setNodeIDCounter(flow.nodeIDCounter)
        setEdgeIDCounter(flow.edgeIDCounter)
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  
  
  
  const chooseFile = (event) => {
    const fileReader = new FileReader();
      fileReader.readAsText(event.target.files[0], "UTF-8");
      fileReader.onload = e => {
        importJSON(e.target.result)
      };
  }
  
  const importJSON = useCallback((file) => {
    const restoreFlow = async () => {
      const flow = JSON.parse(file);
  
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
        setVisCounter(flow.visCounter)
        setLegCounter(flow.legCounter)
        setFilCounter(flow.filCounter)
        setTitCounter(flow.titCounter)
        setNodeIDCounter(flow.nodeIDCounter)
        setEdgeIDCounter(flow.edgeIDCounter)

      }
    };
  
    restoreFlow();
  }, [setNodes, setViewport]);
    
 


  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const createDataComp = (parentNodeClicked) => {
    const nodeid = '' + nodeIDCounter + '';
    console.log("Id dos nós: " + parentNodeClicked + " nos " + nodes)
    const nodeposition = { x: 0, y: 0 };
    let nodeCounter;
    switch(dataComponent){
      case "visUpdater": setVisCounter(visCounter + 1);
      nodeCounter = "V" + visCounter;
      break;
      case "legendaUpdater": setLegCounter(legCounter + 1);      
      console.log(legCounter + " ENTREIII")
      nodeCounter = "L" + legCounter;
      break;
      case "filtroUpdater": setFilCounter(filCounter + 1);
      nodeCounter = "F" + filCounter;
      break;
      case "tituloUpdater": setTitCounter(titCounter + 1);
      nodeCounter = "T" + titCounter;
      break;
      default: console.log("Yooo"); break;
    }
    const nodeData = { name: newDataName, datatype: newDataType, dataExplain: newDataSpec, varName: varType, graphType: graphType, compCounter: nodeCounter};
    let extentAtt = 'parent';
    if(parentNodeClicked.length === 0){
      extentAtt = ''
    }
    setNodes([...nodes, { id: nodeid, type: dataComponent, position:nodeposition, data: nodeData, parentNode: parentNodeClicked, extent:extentAtt}])
    setDataName("");
    setDataType("");
    setDataSpec([]);
    setVarType("Cor");
    setDataComponent("");
    setParentNodeClicked("");
    setNodeIDCounter(nodeIDCounter + 1);
    if(edgeActionStart !== "" && edgeActionEnd !== ""){
      setEdges([...edges, { id: '' + edgeIDCounter + '', source: edgeActionStart, target: nodeid, type: 'straight', sourceHandle: 'a' } , 
      { id: '' + Math.random() + '', source: nodeid, target: edgeActionEnd,animated:true, type: 'straight', sourceHandle: 'b'}])
      setEdgeIDCounter(edgeIDCounter + 1);
    }
    closeWindow();
  }

 
  const closeWindow = () => {
    setIsOpen(false);
    setnewComponent(false);
    setInfoForm(false);
    setActionForm(false);
    setParentNodeClicked("");
    setedgeActionEnd("");
    setedgeActionStart("");
  }

  const toggleCompPopup = () => {
    setIsOpen(true);
    setnewComponent(true);
    setDataComponent("dadosUpdater")
  }
  
  
  const toggleActionPopup = () => {
    setIsOpen(true);
    setActionForm(true)
    setAllNodesName(nodes.filter((node) => node.data.name))
    setDataComponent("acaoDadosUpdater")
   }


  const showInfoPopUp = (node) => {
    setIsOpen(!isOpen);
    setInfoForm(true)
    setNodeInfo(node);
   }

   const addANewComponentToNode = (nodeId) =>{
    setParentNodeClicked(nodeId);
    setIsOpen(true);
    setnewComponent(true);
    setDataComponent("dadosUpdater")
   }

   const removeComponent = (nodeId) => {
    setNodes(nodes.filter((node) => (node.id !== nodeId) && (node.parentNode !== nodeId)));
  }

  const handleAddDataSpecs = (event) => {
    let aux = event.target.value
    setDataSpec([...newDataSpec, {aux}])
    console.log(newDataName + " Dados Spec")
  }


  const handleVarType = (event) => {
    switch(event.target.value){
      case "Cor":  setVarType(varType);
      break;
      case "Tamanho": setVarType(varType);
      break;
      case "Forma": setVarType(varType);
      break;
      default: setVarType("Cor");
    } 
  }

  const handleDataComponentChange = (dataComponent) => {
    switch(dataComponent){
      case "Visualização": dataComponent = "visUpdater"
      break;
      case "Dados": dataComponent = "dadosUpdater"
      break;
      case "Legenda": dataComponent = "legendaUpdater"
      break;
      case "Filtro": dataComponent = "filtroUpdater"
      break;
      case "Titulo": dataComponent = "tituloUpdater"
      break;
      case "Variáveis Visuais": dataComponent = "imgUpdater"
      break;
      case "Tipos de Gráficos": dataComponent = "graficoUpdater"
      break;
      default: dataComponent = "dadosUpdater"
    } 
    setDataComponent(dataComponent);
 }

 const handleGraphChange = (event) => {
  let name = event.target.value.split("media/")[1].split(".")[0];
  setGraphType(name);
 }

 const handleNameChange = (event) => {
  setDataName(event.target.value)
}

 const infoDataSwitch = (dataComponent) => {
  switch(dataComponent){
    case "dadosUpdater": 
    return (<><DynamicForm changeDataName={handleNameChange} dataExplain={true} specifyData={handleAddDataSpecs}></DynamicForm>
    </>
    )

    case "visUpdater": 
    return (<DynamicForm changeDataName={handleNameChange}></DynamicForm>)

    case "legendaUpdater": 
    return (<DynamicForm changeDataName={handleNameChange}></DynamicForm>)

    case "tituloUpdater": 
    return (<DynamicForm changeDataName={handleNameChange}></DynamicForm>)

    case "filtroUpdater": 
    return (<DynamicForm changeDataName={handleNameChange}></DynamicForm>)

    case "imgUpdater": 
    return (<DynamicForm changeVar={true} handleVarType={handleVarType}></DynamicForm>)

    case "graficoUpdater": 
    return(<DynamicForm changeGraph={true} onTry={handleGraphChange}></DynamicForm>)

    default: return("");
  } 
 }
 
 const iconsSetUp = (click, node) => {
  console.log(click.target)
  let buttonName = click.target.name;
    switch(buttonName){
      case "Info": showInfoPopUp(node);
      break;
      case "Add": addANewComponentToNode(node.id);
      break;
      case "Remove": removeComponent(node.id);
      break;
      default: return ("");
    } 
 }

 const handleActionStart = (startNodeID) => {
  setedgeActionStart('' + startNodeID + '')
}

const handleActionFinish = (endNodeID) => {
  setedgeActionEnd('' + endNodeID + '')
}
  

  return (
    <div style={{ height: 800 }}>
    <input
      type="button"
      value="Criar Componente!"
      onClick={toggleCompPopup}
    />
    <input
      type="button"
      value="Criar Ação de dados!"
      onClick={toggleActionPopup}
    />
    {!isOpen ? <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      onNodeClick={(event, node) => iconsSetUp(event, node)}
      fitView
      style={rfStyle}    
      onInit={setRfInstance}

    > 
    <div className="save__controls">
        <button onClick={onSave}>Guardar</button>
        <button onClick={onRestore}>Restaurar</button>
        <button onClick={exportJSON}>Exportar Dashboard</button>
        <input type="file" onChange={chooseFile}/>
      </div>
    </ReactFlow> : ""}
    {isOpen && newComponent ? <FormComponent
      content={<>
        <br></br> <br></br>
        <select name="category" onChange={event => handleDataComponentChange(event.target.value)}>
            <option id="0" >Dados</option>
            <option id="1" >Visualização</option>
            <option id="2" >Legenda</option>
            <option id="3" >Filtro</option>
            <option id="4" >Titulo</option>
            <option id="5" >Variáveis Visuais</option>
            <option id="6" >Tipos de Gráficos</option>
        </select>
        <br></br><br></br>
        {infoDataSwitch(dataComponent)}
        <button onClick={() => {createDataComp(parentNodeClicked)}}> Criar componente de dados!</button>
      </>}
      handleClose = {closeWindow}
    ></FormComponent> : "" }
    {isOpen && infoForm ? <InfoComponent
      node={nodeInfo}
      handleClose = {closeWindow}
    ></InfoComponent> : "" }
    {isOpen && actionForm ? <AcaoDadosForm
      content={<>
        <br></br> <br></br>
        <br></br>
        <b><label htmlFor="text">Componente de partida:</label></b>
        <br></br> <br></br>
        <select name="category" defaultValue={'DEFAULT'} onChange={event => handleActionStart(event.target.value)}>
            <option value="DEFAULT" disabled>Escolhe o componente:</option>
            {allNodesName.map((node) => (
            <option key={node.id} value={node.id}>
            {node.data.name}              
            </option>
          ))}
        </select>
        <br></br> <br></br>
        <br></br>
        <b><label htmlFor="text">Componente de Chegada:</label></b>
        <br></br> <br></br>
        <select name="category" defaultValue={'DEFAULT'} onChange={event => handleActionFinish(event.target.value)}>
        <option value="DEFAULT" disabled>Escolhe o componente:</option>
            {allNodesName.map((node) => (
            <option key={node.id} value={node.id}>
              {node.data.name}
            </option>
          ))}
        </select>
        <br></br> <br></br>
        <br></br>
        <b><label htmlFor="text">Nome dos Dados:</label></b>
        <input id="text" type="text" onChange={(e) => setDataName(e.target.value)}/>
        <br></br><br></br>
        <button onClick={() => {createDataComp(parentNodeClicked)}}> Criar componente de dados!</button>
      </>}    
      handleClose = {closeWindow}
    ></AcaoDadosForm> : "" }
    </div>
  );
}

export default () => (<ReactFlowProvider>
  <App />
</ReactFlowProvider>);