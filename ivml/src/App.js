import React, {useCallback, useEffect, useState} from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges,
  ReactFlowProvider, useReactFlow, MarkerType} from 'reactflow';
import { SmartStepEdge } from '@tisoap/react-flow-smart-edge';
//import '@reactflow/node-resizer/dist/style.css';
import 'reactflow/dist/style.css';


import Dados from './components/Dados';
import Vis from './components/Vis';
import LegendaComponente from './components/LegendaComponente';
import FiltroComponente from './components/FiltroComponente';
import TituloComponente from './components/TituloComponente';
import ButComponente from './components/ButComponente';
import ParameterComponente from './components/ParameterComponente';
import ParameterBindingComponente from './components/ParameterBindingComponente.js';


import './components/components.css';
import FormComponent from './components/FormComponent';
import InteractionForm from './components/InteractionForm';
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

const edgeTypes = {
  default: SmartStepEdge,
  straight: SmartStepEdge //backwards compatibility for previous dashboards
}

const nodeTypes = { dadosUpdater: Dados, visUpdater: Vis, legendaUpdater: LegendaComponente, filtroUpdater: FiltroComponente, 
  tituloUpdater: TituloComponente, imgUpdater: VarVisuaisImgComponente, graficoUpdater: GraficoComponente, 
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


  //Variável para passar o nó do componente de partida
  const [startInteractionComponentID, setStartInteractionComponentID] = useState('')


  //ParamterOptionsList e Action Edge Targets
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
      setCounters(flow);
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
      setCounters(flow);

    };

    restoreFlow();
  }, [setNodes, setViewport]);

  function setCounters(flow){
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
    parameterOptions: paramList, interIcon: "", hasInteraction: false, actions: []}; 
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
    setIsAdd(false);
    closeWindow();
  }


  const createInteractionEdges = (actions) => {
    if(actions !== []){
      setCurrentSource(startInteractionComponentID)
      addActionsToNode(startInteractionComponentID,actions)
      let edgeCounter = edgeIDCounter;
      let edgesToAdd = []
      actions.map((action) => {
        edgesToAdd = [...edgesToAdd, 
        { id: '' + edgeCounter + '', source: startInteractionComponentID, target: action.targetID, data:action.id, markerEnd: { type: MarkerType.Arrow }, animated:true, sourceHandle: action.trigger}]
        edgeCounter += 1;
      })
      setEdges([...edges, ...edgesToAdd])
      setEdgeIDCounter(edgeCounter)
    }
    closeWindow();
  }

  const addActionsToNode = (nodeid, actions) => {
    nodes.map((node) => {
      if(node.id === nodeid){
        node.data.actions = [...node.data.actions, ... actions];
      }
    })
  }

  // Função para alterar os handles para as imagens
  useEffect(() => {
    if(currentSource !== ""){
      setNodes((nds) => 
      nds.map((node) => {
        if(node.id === currentSource) {
          node.data.hasInteraction = true;
          setCurrentSource("");
        }
        return node;
      })
    ) 
    }

    if(currentEditedNode.length !== 0){

      setNodes((nds) => 
      nds.map((node) => {
        if(node.id === currentEditedNode.id){
          if (newDataName !== ""){
            node.data.name = newDataName;
          }
  
          if(newDataType !== ""){
            node.data.datatype = newDataType;
          }

          if(actionIconType !== ""){
            node.data.actionResultType = actionIconType;
          }
          

          setCurrentEditedNode([]);
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
    setIsAdd(false);
    setParamList([]);
    setStartInteractionComponentID("")

  }

  const toggleCompPopup = () => {
    setIsOpen(true);
    setnewComponent(true);
    setDataComponent("visUpdater")
  }
  
  
  const toggleActionPopup = (nodeid) => {
    setIsOpen(true);
    setActionForm(true)
    setAllNodesName(nodes.filter((node) => (node.parentNode !== "" && hasNick(node.parentNode)) || node.data.compCounter !== undefined))
    setStartInteractionComponentID(nodeid)
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


const handleActionIcon = (actionName) => {
  switch(actionName){
    case "Filtragem": setActionIconType("Filtragem");
    break;
    case "Destaque": setActionIconType("Destaque");
    break;
    default: setActionIconType("");
  } 
}

const handleUpdate = () =>{
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
    return (<DynamicForm changeDataName={handleNameChange} ></DynamicForm>)

    case "legendaUpdater": 
    return (<DynamicForm changeDataName={handleNameChange} ></DynamicForm>)

    case "tituloUpdater": 
    return (<DynamicForm changeDataName={handleNameChange} ></DynamicForm>)

    case "filtroUpdater": 
    return (<DynamicForm changeDataName={handleNameChange} ></DynamicForm>)

    case "buttonUpdater": 
    return (<DynamicForm changeDataName={handleNameChange} ></DynamicForm>)

    case "parameterUpdater": 
    return (<DynamicForm changeDataName={handleNameChange} ></DynamicForm>)

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
      case "Interação": toggleActionPopup(node.id);
      break;
      default: return ("");
    } 
 }

 const deleteActionFromNode = (edges) => {
  edges.map((edge)=> {
    nodes.map((node) => {
      if(node.id === edge.source){
        console.log(node.data.actions)

        node.data.actions = node.data.actions.filter((action) => (action.id !== edge.data))
        console.log(nodes.find((n) =>     n.id === node.id  ))

      }

    })
  })
 }


 /*
 const handleActionStart = (startNodeID) => {
  setedgeActionStart('' + startNodeID + '')
}*/

/*const handleActionFinish = (endNodeID, number) => {
  setedgeActionEnd('' + endNodeID + '')
}*/


/*
const handleEndPointList = (targets) => {
  setTargetList(targets)
}*/


const handleSetUpInterIcon = (iconType) => {
  setTypeOfInterIcon(iconType)
}

const handleSetUpTypeAndSourceID = (icontype, actionDataID) => {
  if(icontype !== ""){
    setTypeOfInterIcon(icontype)
    edges.map((edge) => {
      if(edge.source === actionDataID){
        setCurrentSource(edge.source)
      }
    })
  }
}

const parameterOptionsList = (options) => {
  setParamList(options);
}

const actionsCreated = (actions) => {
  createInteractionEdges(actions)
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
      value="Criar Parameter Binding!"
      onClick={toggleParameterBindingPopup}
    />
    {!isOpen ? <ReactFlow
      nodes={nodes}
      edges={edges}
      edgeTypes={edgeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      onNodeClick={(event, node) => iconsSetUp(event, node)}
      fitView
      style={rfStyle}    
      onInit={setRfInstance}
      onEdgesDelete={(edges) => deleteActionFromNode(edges)}
      deleteKeyCode={'Delete'}
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
    /> : "" }
    {isOpen && infoForm ? <InfoComponent
      node={nodeInfo}
      handleClose = {closeWindow}
      changeDataName={handleNameChange}
      setUpInterTypeAndSourceID={handleSetUpTypeAndSourceID}
      actionResultType={handleActionIcon}
      handleCloseAndEdit={handleUpdate}
      handleSetDataType={handleAddDataType}
    >
    </InfoComponent> : "" }
    {isOpen && actionForm ? <InteractionForm
      startcomp={startInteractionComponentID}
      nodesName={allNodesName}
      changeDataName={handleNameChange}
      actionsDone={actionsCreated}
      handleClose = {closeWindow}
    ></InteractionForm> : "" }
    {isOpen && parameterForm ? <ParameterBindingForm 
    handleClose={closeWindow}
    //handleActionStart={handleActionStart}
    //handleActionFinish={handleActionFinish} 
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