import React, {useEffect, useState} from "react";
import CriarComponente from "./CriarComponente";
import InfoForm from "./InfoForm";
import CriarInteracao from "./CriarInteracao";
import Tooltips from "./Tooltips";

const Sidebar = ({createComp, nodes, selected, edges, getName, editNode, createAction, createNavigation, createTooltip, eliminateTooltip}) => {

    const allowsInteractions = selected !== "" && selected.type !== "varvisual" && selected.type !== "grafico";
    const allowsSubComponents = allowsInteractions && selected.type !== "dados" && selected.type !== "botão" && selected.type !== "parametro";
    const [tab, setTab] = useState(allowsSubComponents ? "component" : "tooltip");

    useEffect(() => {
        //reset tab open
        setTab(allowsSubComponents ? "component" : "tooltip");
    }, [selected]);

    return (
    <div className="sidebar">
        {selected !== "" ? <>
            <InfoForm editComponent={editNode} edges={edges} nodes={nodes} getName={getName} selectedNode={selected}/>
            <h3>Adicionar Elementos</h3>
            <div style={{display: "flex", flexDirection: "row"}}>
                <button disabled={!allowsSubComponents} onClick={() => setTab("component")}
                        className={tab === "component" ? "tab tab-selected" : "tab"}>Componente</button>
                <button onClick={() => setTab("tooltip")}
                        className={tab === "tooltip" ? "tab tab-selected" : "tab"}>Tooltip</button>
                <button disabled={!allowsInteractions} onClick={() => setTab("interaction")}
                        className={tab === "interaction" ? "tab tab-selected" : "tab"}>Interação</button>
            </div>
            <div style={{border:"1px solid lightgrey", padding:"12px"}}>
                {tab === "component" ? <CriarComponente createComp={createComp} parent={selected}/>
                : tab === "tooltip"  && selected.type === "visualizacao" ? <Tooltips nodes={nodes} parent={selected} getName={getName} createTooltip={createTooltip} eliminateTooltip={eliminateTooltip} />
                : allowsInteractions && tab === "interaction" ?
                        <CriarInteracao getName={getName} edges={edges} nodes={nodes}
                                        source={selected} actionsDone={createAction} createNav={createNavigation}/> : null}
            </div></>
            : <CriarComponente createComp={createComp} parent={""}/>}
        {/*<div><div className="box-header"><b>Dashboard</b></div><hr/> {createLayout(nodes, selectNode)}</div>
        {selected !== undefined ? (
            nodeDetail(nodes, nodes.find(node => node.id === selected),
                edges.filter(edge => edge.source === selected || edge.target === selected), editNode)
        ) : null}*/}
    </div> );
};

function createLayout(nodes, selectNode, getName){
    const parents = nodes.slice();
    const children = nodes.slice();
    return <div className="box-content" style={{height: "300px", overflowY: "scroll", overflowX: "hidden", whiteSpace: "nowrap"}}>
        <ul style={{textOverflow: "ellipsis", margin: "0px", paddingLeft: "16px"}}>{parents.filter((node) => node.parentNode === "").map((node) => (
        <li key={node.id} value={node.id} >
            <label onClick={() => selectNode(node.id)}>{getName(node)}</label>
            <ul>
            {children.filter((child) => child.parentNode === node.id).map((n) => (
                <li key={n.id} value={n.id}>
                    <i onClick={() => selectNode(n.id)}>{getName(n)}</i>
                </li>
            ))}</ul>
        </li>
    ))}</ul></div>
};

export default Sidebar;
