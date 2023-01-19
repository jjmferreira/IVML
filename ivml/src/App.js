import React, {useCallback, useState} from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges,
  ReactFlowProvider, useReactFlow} from 'reactflow';
import { SmartStepEdge } from '@tisoap/react-flow-smart-edge';
import 'reactflow/dist/style.css';

import Dados from './components/Dados';
import Visualizacao from './components/Visualizacao';
import Legenda from './components/Legenda';
import Filtro from './components/Filtro';
import Titulo from './components/Titulo';
import Botao from './components/Botao';
import Parametro from './components/Parametro';
import Grafico from "./components/Grafico";
import VarVisuais from './components/VariavelVisual';


import './components/componentes.css';
import CriarComponente from './CriarComponente';
import CriarInteracao from './CriarInteracao';
import InfoForm from './InfoForm';

const edgeTypes = {
  default: SmartStepEdge,
  straight: SmartStepEdge //backwards compatibility
}

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { dados: Dados, visualizacao: Visualizacao, legenda: Legenda, filtro: Filtro,
  titulo: Titulo, varvisual: VarVisuais, grafico: Grafico, botao: Botao, parametro: Parametro};

const initialNodes = [
  //{ id: 'node-1', type: 'visUpdater', position: { x: 0, y: 0 }, data: { name: 'Tratamento', datatype: 'Arbitrário'}},
  //{ id: 'node-2', type: 'dadosUpdater', position: { x: 10, y: 10 }, data: { name: 'Dados1' }, parentNode:"node-1", extent:'parent'},
];

const initialEdges = [
  //{ id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
];

const rfStyle = {backgroundColor: '#B8CEFF'};
const flowKey = 'example-flow';

function App() {

  const { setViewport } = useReactFlow();
  const [rfInstance, setRfInstance] = useState(null);

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  //CREATE - Criar componente | INTERACTION - Adicionar interacao | Info - Ver detalhes do componente
  const [openForm, setOpenForm] = useState("");

  //Variável para passar o id do parent node
  const [parentNode, setParentNode] = useState("");

  //Variável para passar o nó do componente de partida
  const [interactionSource, setInteractionSource] = useState('')

  /** Save and export flow **/
  //save
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);


  //export
  const exportJSON = () => {
    const flow = rfInstance.toObject();
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(flow)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "dashboardPrototype.json";

    link.click();
  }

  /** Restore and import flow **/
  //restore
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      setupFlow(flow);
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  //import
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
      setupFlow(flow);
    };
    restoreFlow();
  }, [setNodes, setViewport]);

  //setup for import and restore
  function setupFlow(flow){
    if (flow) {
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      setViewport({ x, y, zoom });
      }
    }


  /** Default flow change callbacks */
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



  const createNode = (node) => {
    setParentNode("");
    if (node === undefined || node.type === ''){
      alert('Undefined Component; Choose a type')
      return;
    }
    //tirar selecao de todos os outros nodes
    nodes.filter(n => n.selected === true).map(n => n.selected = false);
    //adicionar novo node
    let n = node;
    n.id = nodes.length === 0 ? "0" : "" + (parseInt(nodes[nodes.length-1].id)+1);
    const components = nodes.filter(nd => nd.type === node.type);
    const lastIndex = components.length === 0 ? "0" : "" +(parseInt(components[components.length-1].id)+1);
    if(n.type !== "titulo" && n.type !== "dados" && n.type !== "varvisual" && n.type !== "grafico")
      n.data.compCounter = node.type.substr(0,1).toUpperCase() + lastIndex;
    setNodes([...nodes, n]);
    setOpenForm("");
  }

  function editNode(node){
    const idx = nodes.findIndex(n => n.id === node.id); //find index of node to edit
    setNodes([...nodes.slice(0, idx), node, ...nodes.slice(idx+1)]); //replace nodes[idx] with edited node
  }

  const createInteraction = (source, eds) => {
    //add actions to node
    editNode(source);
    //add new edges
    let counter = edges.length === 0 ? 0 : parseInt(edges[edges.length-1].id)+1;
    eds.map(edge => {
      edge.id = '' + counter;
      counter++;
    });
    setEdges([...edges, ...eds]);
    closeWindow();
  }

  const deleteActionFromNode = (eds) => {
    eds.map(edge => {
      const sourceNode = nodes.find(node => node.id === edge.source);
      //delete only if no more edges with same source and action
      if(edges.find(ed => ed.id !== edge.id && ed.source === edge.source && ed.data === edge.data) === undefined)
        sourceNode.data.actions = sourceNode.data.actions.filter((action) => (action.id !== edge.data));
    });
  }

  const nodeLabel = (node) => {
    let nodeName = node.data.name;
    if(node.data.compCounter !== ''){
      return node.data.compCounter;
    } else {
      let string = nodeName === '' ? "Componente de " + node.type : nodeName;
      if(node.parentNode !== ""){
        const parentNode = nodes.find(n => n.id === node.parentNode);
        string += " (em " + parentNode.data.compCounter + ")";
      }
      return string;
    }
  }

  const closeWindow = () => {
    setOpenForm("");
    setParentNode("");
    setInteractionSource("")
  }
 
 const iconsSetUp = (click, node) => {
  let buttonName = click.target.name;
    switch(buttonName){
      case "Info":
        setOpenForm("INFO");
        break;
      case "Add":
        setOpenForm("CREATE");
        setParentNode(node);
        break;
      case "Remove":
        const result = nodes.filter((n) => (n.id !== node.id) && (n.parentNode !== node.id));
        setNodes(result);
        setEdges(edges.filter((ed) => (result.includes(n => n.id === ed.source || n.id === ed.target))));
        break;
      case "Interação":
        setOpenForm("INTERACTION");
        setInteractionSource(node.id);
        break;
      default: return;
    } 
 }

  return (<>
    <div className='side'><ReactFlow
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
      <div className="header">
        <button style={{position: "absolute", top: '10px', left:"10px"}}
                onClick={() => {setOpenForm("CREATE")}}>Criar Componente</button>
        <div className="save__controls">
          <button onClick={onSave}>Guardar</button>
          <button onClick={onRestore}>Restaurar</button>
          <button onClick={exportJSON}>Exportar Dashboard</button>
          <input type="file" onChange={chooseFile}/>
        </div>
      </div>
    </ReactFlow>
    {openForm === "CREATE" ? <CriarComponente
    parent={parentNode}
    createComp={createNode}
    handleClose = {closeWindow}
    />: "" }
    
    {openForm === "INFO" && nodes.filter(n => n.selected === true).length > 0 ? <InfoForm
      nodes={nodes}
      edges={edges}
      handleClose = {closeWindow}
      editComponent={editNode}
      getName={nodeLabel}
    /> : "" }
    {openForm === "INTERACTION" && nodes.filter(n => n.selected === true).length > 0 ? <CriarInteracao
    source={nodes.find(n => n.id === interactionSource)}
    nodes={nodes.filter((node) => node.parentNode === "" ||
        (node.parentNode !== interactionSource && node.type !== 'grafico' && node.type !== 'varVisual'))}
    edges={edges.filter(edge => edge.source === interactionSource)}
    actionsDone={createInteraction}
    getName={nodeLabel}
    handleClose = {closeWindow}
    /> : "" }
    </div>
    
    </>
  );
}

export default () => (<ReactFlowProvider>
  <App />
</ReactFlowProvider>);