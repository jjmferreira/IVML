import React, {useEffect, useState} from "react";
import CriarComponente from "./CriarComponente";
import InfoForm from "./InfoForm";
import CriarInteracao from "./CriarInteracao";
import Tooltips from "./Tooltips";

const Sidebar = ({createComp, nodes, selected, edges, getName, editNode, createAction, createNavigation, createTooltip, eliminateTooltip, editNavNode}) => {

    const allowsInteractions = selected !== "" && selected.type !== "grafico" && selected.type !== "varvisual"
        && selected.type !== "titulo" && selected.type !== "dashboard" && selected.type !== "link";
    const allowsSubComponents = allowsInteractions && selected.type !== "dados" && selected.type !== "botao"
        && selected.type !== "parametro";
    const [tab, setTab] = useState(allowsSubComponents ? "component" : "tooltip");

    useEffect(() => {
        //reset tab open
        setTab(allowsSubComponents ? "component" : "tooltip");
    }, [selected]);

    return (
    <div className="sidebar">
        {selected !== "" ? <>
            <InfoForm editComponent={editNode} edges={edges} nodes={nodes} getName={getName} selectedNode={selected}/><br/>
            {selected.type !== "dashboard" && selected.type !== "link" ? <>
            <h4>Adicionar Elementos</h4>
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
                                        source={selected} actionsDone={createAction} createNav={createNavigation} editNavNode={editNavNode}/> : null}
            </div></> : null}
            </> : <CriarComponente createComp={createComp} parent={""}/>}
    </div> );
};


export default Sidebar;
