// import { useCallback, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
// import axios from 'axios';
import './MyNode.css'

// стили для "ручек" (точки входа)
const handleStyle = { top: 50 };
const handleStyleAnswer = { top: 170 };

function MyNode({ data, isConnectable }) {

    return (
        <div className="my-node">
            <label htmlFor="text">{data.label}</label>
            <div className="my-node-question">
                <Handle type="target" position={Position.Left} style={handleStyle} isConnectable={isConnectable} />
                {data.question}
            </div>
            <div className="my-node-answer">
                <Handle type="source" position={Position.Right} id="a" isConnectable={isConnectable} />
                <Handle type="source" position={Position.Right} id="b" style={handleStyleAnswer} isConnectable={isConnectable} />
                <div className="my-node-answer_container">
                    <p className="my-node-answer_yes">{data.answerYes}</p>
                    <p className="my-node-answer_no">{data.answerNo}</p>
                </div>

            </div>
        </div>
    )
}

export default MyNode;
