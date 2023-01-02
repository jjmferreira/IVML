import { useCallback, useEffect, useState} from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, ReactFlowProvider, useReactFlow, MarkerType} from 'react-flow-renderer';
import '@reactflow/node-resizer/dist/style.css';



//import { SmartBezierEdge } from '@tisoap/react-flow-smart-edge'

import Dados from './components/Dados';
import Vis from './components/Vis';
import LegendaComponente from './components/LegendaComponente';
import FiltroComponente from './components/FiltroComponente';
import TituloComponente from './components/TituloComponente';
import AcaoDadosComponente from './components/AcaoDadosComponente';
import ButComponente from './components/ButComponente';
import ParameterComponente from './components/ParameterComponente';
import ParameterBindingComponente from './components/ParameterBindingComponente.js';


import './components/components.css';
import FormComponent from './components/FormComponent';
import AcaoDadosForm from './components/AcaoDadosForm';
import InfoComponent from './components/InfoComponent';
import DynamicForm from './components/DynamicForm';
import GraficoComponente from "./components/GraficoComponente";
import VarVisuaisImgComponente from './components/VarVisuaisImgComponente';
import ParameterBindingForm from './components/ParameterBindingForm';



import clique from "./imagens/Icones/Clique.PNG"
import hover from "./imagens/Icones/Hover.PNG"



const rfStyle = {
  backgroundColor: '#B8CEFF',
};

const flowKey = 'example-flow';


const nodeTypes = { dadosUpdater: Dados, visUpdater: Vis, legendaUpdater: LegendaComponente, filtroUpdater: FiltroComponente, 
  tituloUpdater: TituloComponente, acaoDadosUpdater: AcaoDadosComponente, imgUpdater: VarVisuaisImgComponente, graficoUpdater: GraficoComponente, 
  buttonUpdater: ButComponente, parameterUpdater: ParameterComponente, parameterBindingUpdater: ParameterBindingComponente};

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

  //definir restrições de escolher
  const [isAdd, setIsAdd] = useState(false)

  const [isOpen, setIsOpen] = useState(false);
  const [actionForm, setActionForm] = useState(false);
  const [parameterForm, setParameterForm] = useState(false);
  const [newComponent, setnewComponent] = useState(false);
  const [infoForm, setInfoForm] = useState(false);
  const [nodeInfo, setNodeInfo] = useState([]);
  //Ações e parâmetros
  const [allNodesName, setAllNodesName] = useState([]);
  const [paramNodes, setParamNodes] = useState([]);


  const [parentNodeClicked, setParentNodeClicked] = useState("");

  const [edgeActionStart, setedgeActionStart] = useState("");
  const [edgeActionEnd, setedgeActionEnd] = useState("");

  //interaction Icons set up source
  const [currentSource, setCurrentSource] = useState("");
  const [typeOfInterIcon, setTypeOfInterIcon] = useState("");


  //No editado
  const [currentEditedNode, setCurrentEditedNode] = useState([]);

  //Counters
  const [visCounter, setVisCounter] = useState(0);
  const [legCounter, setLegCounter] = useState(0);
  const [filCounter, setFilCounter] = useState(0);
  const [titCounter, setTitCounter] = useState(0);
  const [buttCounter, setButtCounter] = useState(0);
  const [parameterCounter, setParameterCounter] = useState(0);


  const [nodeIDCounter, setNodeIDCounter] = useState(0);
  const [edgeIDCounter, setEdgeIDCounter] = useState(0);

  //VisCompSize passed on Data
  const minSizeValue = 75;
  const [newH, setH] = useState(minSizeValue);
  const [newW, setW] = useState(minSizeValue);


  //ParamterOptionsList
  const [paramList, setParamList] = useState([]);

  //icones açao de dados
  const [actionIconType, setActionIconType] = useState("");


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
        setButtCounter(flow.buttCounter)
        setParameterCounter(flow.parameterCounter)
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
        setButtCounter(flow.buttCounter)
        setParameterCounter(flow.parameterCounter)
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
    const nodeposition = { x: 0, y: 0 };
    let nodeCounter = undefined;
    switch(dataComponent){
      case "visUpdater": setVisCounter(visCounter + 1);
      nodeCounter = "V" + visCounter;
      break;
      case "legendaUpdater": setLegCounter(legCounter + 1);      
      nodeCounter = "L" + legCounter;
      break;
      case "filtroUpdater": setFilCounter(filCounter + 1);
      nodeCounter = "F" + filCounter;
      break;
      case "buttonUpdater": setButtCounter(buttCounter + 1);
      nodeCounter = "B" + buttCounter;
      break;
      case "parameterUpdater": setParameterCounter(parameterCounter + 1);
      nodeCounter = "P" + parameterCounter;
      break;
      default: console.log("Yooo"); break;
    }
    const nodeData = { name: newDataName, datatype: newDataType, dataExplain: newDataSpec, varName: varType, graphType: graphType, compCounter: nodeCounter,
     height: newH, width: newW, parameterOptions: paramList, actionResultType: actionIconType, interIcon: ""}; 
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
    setH(minSizeValue);
    setW(minSizeValue);
    setIsAdd(false);
    if(edgeActionStart !== "" && edgeActionEnd !== ""){
      setCurrentSource(edgeActionStart)
      setEdges([...edges, { id: '' + edgeIDCounter + '', source: edgeActionStart, target: nodeid,label: 'dash/url', markerEnd: { type: MarkerType.Arrow }, type: 'straight', sourceHandle: 'a' } , 
      { id: '' + Math.random() + '', source: nodeid, target: edgeActionEnd, markerEnd: { type: MarkerType.Arrow }, animated:true, type: 'straight', sourceHandle: 'b'}])
      setEdgeIDCounter(edgeIDCounter + 1);
    }
    closeWindow();
  }

  // Função para alterar os handles para as imagens
  useEffect(() => {
    if(currentSource !== ""){
       
      setNodes((nds) => 
      nds.map((node) => {
        if(node.id === currentSource) {
          console.log("Entreii no if do use")
          console.log("Current type: " + node.data.interIcon)
          switch(typeOfInterIcon){
            case "Clique" : node.data.interIcon = clique;
            break;
            case "Hover": node.data.interIcon = hover;
            break;
            default: node.data.interIcon = "";
          }
          setCurrentSource("");
          setTypeOfInterIcon("");
        }
        return node;
      })
    ) 
    }

    if(currentEditedNode.length !== 0){

      setNodes((nds) => 
      nds.map((node) => {
        if(node.id === currentEditedNode.id){
          if(newH !== minSizeValue){
            node.data.height = newH;
          }
          if (newW !== minSizeValue){
            node.data.width = newW;
          } 
          
          if (newDataName !== ""){
            node.data.name = newDataName;
          }
  
          if(newDataType !== ""){
            node.data.datatype = newDataType;
          }

          setCurrentEditedNode([]);
          setH(minSizeValue);
          setW(minSizeValue);
          setDataName("");
          setDataType("");

        }

        return node;
      })
     )
    }
    
  }, [nodes, setNodes])


  const closeWindow = () => {
    setIsOpen(false);
    setnewComponent(false);
    setInfoForm(false);
    setActionForm(false);
    setParameterForm(false)
    setParentNodeClicked("");
    setedgeActionEnd("");
    setedgeActionStart("");
    setIsAdd(false);
    setParamList([]);
  }

  const toggleCompPopup = () => {
    setIsOpen(true);
    setnewComponent(true);
    setDataComponent("visUpdater")
  }
  
  
  const toggleActionPopup = () => {
    setIsOpen(true);
    setActionForm(true)
    setAllNodesName(nodes.filter((node) => (node.parentNode !== "" && hasNick(node.parentNode)) || node.data.compCounter !== undefined))
    setDataComponent("acaoDadosUpdater")
   }

   const hasNick = (nodeid) => {
    let aux = false;
    nodes.map((curNode) => {
      if(curNode.data.compCounter !== undefined && curNode.id === nodeid){
        aux = true
        return;
      }
    })
    return aux;
   }

   const toggleParameterBindingPopup = () => {
    setIsOpen(true);
    setParameterForm(true)
    setParamNodes(nodes.filter(node =>  node.type === "parameterUpdater"))
    //setAllNodesName(nodes.filter((node) => node.data.name))
    setAllNodesName(nodes.filter((node) => (node.parentNode !== "" && hasNick(node.parentNode)) || node.data.compCounter !== undefined))
    setDataComponent("parameterBindingUpdater")
   }


  const showInfoPopUp = (node) => {
    setIsOpen(!isOpen);
    setInfoForm(true)
    setNodeInfo(node);
   }

   const addANewComponentToNode = (nodeId) =>{
    setParentNodeClicked(nodeId);
    setIsOpen(true);
    setIsAdd(true)
    setnewComponent(true);
    setDataComponent("dadosUpdater")
   }

   const removeComponent = (nodeId) => {
    setNodes(nodes.filter((node) => (node.id !== nodeId) && (node.parentNode !== nodeId)));
  }

  const handleAddDataSpecs = (dataList) => {
    setDataSpec(dataList);
  }

  const handleAddDataType = (dataType) => {
    setDataType(dataType)
  }

  const handleVarType = (event) => {
    switch(event.target.value){
      case "Cor":  setVarType(event.target.value);
      break;
      case "Tamanho": setVarType(event.target.value);
      break;
      case "Forma": setVarType(event.target.value);
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
      case "Botão": dataComponent = "buttonUpdater"
      break;
      case "Parâmetro": dataComponent = "parameterUpdater"
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
  if(event.target !== undefined){
    setDataName(event.target.value)
  }
}

const handleHeightChange = (event) => {
  if(event.target !== undefined){
    setH(event.target.value)
  }
}

const handleWidhtChange = (event) => {
  if(event.target !== undefined){
    setW(event.target.value)
  }
}

const handleActionIcon = (actionName) => {
  switch(actionName){
    case "Filtragem": setActionIconType("filtragem");
    break;
    case "Destaque": setActionIconType("destaque");
    break;
    default: setActionIconType("");
  } 
}

const handleUpdate = () =>{
  //updateNodeData(nodeInfo)
  setCurrentEditedNode(nodeInfo)
  closeWindow();
}

 const infoDataSwitch = (dataComponent) => {
  switch(dataComponent){
    case "dadosUpdater": 
    return (<><DynamicForm changeDataName={handleNameChange} dataExplain={true} handleSetDataType={handleAddDataType} dataSpecs={handleAddDataSpecs}></DynamicForm>
    </>
    )

    case "visUpdater": 
    return (<DynamicForm changeDataName={handleNameChange} changeHeight={handleHeightChange} changeWidth={handleWidhtChange}></DynamicForm>)

    case "legendaUpdater": 
    return (<DynamicForm changeDataName={handleNameChange} changeHeight={handleHeightChange} changeWidth={handleWidhtChange}></DynamicForm>)

    case "tituloUpdater": 
    return (<DynamicForm changeDataName={handleNameChange} changeHeight={handleHeightChange} changeWidth={handleWidhtChange}></DynamicForm>)

    case "filtroUpdater": 
    return (<DynamicForm changeDataName={handleNameChange} changeHeight={handleHeightChange} changeWidth={handleWidhtChange}></DynamicForm>)

    case "buttonUpdater": 
    return (<DynamicForm changeDataName={handleNameChange} changeHeight={handleHeightChange} changeWidth={handleWidhtChange}></DynamicForm>)

    case "parameterUpdater": 
    return (<DynamicForm changeDataName={handleNameChange} changeHeight={handleHeightChange} changeWidth={handleWidhtChange}></DynamicForm>)

    case "imgUpdater": 
    return (<DynamicForm changeVar={true} handleVarType={handleVarType}></DynamicForm>)

    case "graficoUpdater": 
    return(<DynamicForm changeGraph={true} onTry={handleGraphChange}></DynamicForm>)

    default: return("");
  } 
 }
 
 const iconsSetUp = (click, node) => {
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

const handleActionFinish = (endNodeID, number) => {
  setedgeActionEnd('' + endNodeID + '')
}


const handleSetUpInterIcon = (iconType) => {
  setTypeOfInterIcon(iconType)
}

const handleSetUpTypeAndSourceID = (icontype, actionDataID) => {
  if(icontype !== ""){
    setTypeOfInterIcon(icontype)
    edges.map((edge) => {
      if(edge.target === actionDataID){
        setCurrentSource(edge.source)
      }
    })
  }
}

const parameterOptionsList = (options) => {
  setParamList(options);
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
     <input
      type="button"
      value="Criar Parameter Binding!"
      onClick={toggleParameterBindingPopup}
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
      isAdd={isAdd}
      handleOptionSwitch={handleDataComponentChange}
      dataSwitch={infoDataSwitch(dataComponent)}
      createComp={() => createDataComp(parentNodeClicked)}
      handleClose = {closeWindow}
    ></FormComponent> : "" }
    {isOpen && infoForm ? <InfoComponent
      node={nodeInfo}
      handleClose = {closeWindow}
      resizeH={handleHeightChange}
      resizeW={handleWidhtChange}
      changeDataName={handleNameChange}
      setUpInterTypeAndSourceID={handleSetUpTypeAndSourceID}
      handleCloseAndEdit={handleUpdate}
      handleSetDataType={handleAddDataType} 
      //dataSpecs={handleAddDataSpecs}
    >
    </InfoComponent> : "" }
    {isOpen && actionForm ? <AcaoDadosForm
      handleActionStart={handleActionStart}
      handleActionFinish={handleActionFinish} 
      nodesName={allNodesName}
      changeDataName={handleNameChange}
      actionResultType={handleActionIcon}
      handleSetupSourceIcon={handleSetUpInterIcon}
      //endPointNodeList={handleEndPointList}
      createComp={() => createDataComp(parentNodeClicked)}  
      handleClose = {closeWindow}
    ></AcaoDadosForm> : "" }
    {isOpen && parameterForm ? <ParameterBindingForm 
    handleClose={closeWindow}
    handleActionStart={handleActionStart}
    handleActionFinish={handleActionFinish} 
    changeDataName={handleNameChange}
    newList={parameterOptionsList}
    handleSetupSourceIcon={handleSetUpInterIcon}
    nodesName={allNodesName}
    parameterNodes={paramNodes}
    createComp={() => createDataComp(parentNodeClicked)}>
    </ParameterBindingForm> :<></>}
    </div>
  );
}

export default () => (<ReactFlowProvider>
  <App />
</ReactFlowProvider>);