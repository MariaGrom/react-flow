import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
} from 'reactflow';
import axios from 'axios';
import 'reactflow/dist/style.css';
import './index.css';
import MyNode from './MyNode';


// Определение пользовательского узла
const nodeTypes = { customNode: MyNode };

const Flow = () => {
  const flowKey = 'example-flow';

  // фон подложки
  const rfStyle = {
    backgroundColor: '#B8CEFF',
  };


  const initialNodes = [
    { id: 'node-1', type: 'customNode', position: { x: 100, y: 100 }, data: { label: `мой узел 1`, question: 'текст с вопросом №1', answerYes: 'да', answerNo: 'нет' } },
    { id: 'node-2', type: 'customNode', position: { x: 400, y: 100 }, data: { label: `мой узел 2`, question: 'если по вопросу №1 ответ ДА', answerYes: 'да', answerNo: 'нет' } },
    { id: 'node-3', type: 'customNode', position: { x: 800, y: 100 }, data: { label: `мой узел 3`, question: 'если по вопросу №1 ответ НЕТ', answerYes: 'да', answerNo: 'нет' } },
    { id: 'node-4', type: 'customNode', position: { x: 1200, y: 100 }, data: { label: `мой узел 4`, question: 'текст с ФИНАЛЬНЫМ вопросом', answerYes: 'да', answerNo: 'нет' } },
  ];

  const initialEdges = [];


  // определение переменных узлов, ребер
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState(null);

  const { setViewport } = useReactFlow();

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  //  функция сохранения текущего положения граф.карты
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  //   функция восстановления прошлого положения граф.карты
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };
    restoreFlow();
  }, [setNodes, setViewport]);


   // функция добавления новых узлов
   const addNode = useCallback(()=>{
    const newNode = {
    id: `randomnode_${+new Date()}`,
    type: 'customNode',
    data:
    {
      label: `Добавленный узел с кнопки`,
      question: 'Узел с кнопки, возможно лучше сделать узел в возможностью инпута',
      answerYes: 'да',
      answerNo: 'нет'
    },
    position: {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    },
  };
  setNodes((nds) => nds.concat(newNode));
}, [setNodes]);

  // функция вызова API и генерации нового узла из даннных с сервера
  useEffect(() => {
    const axiosData = async () => {
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=2/`)
        const nodeAxiosData = res.data;
        const newAxiosNode = nodeAxiosData.map(item => ({
          id: `node-test-${item.id}`,
          type: 'customNode',
          data:
          {
            label: `сгенерированный узел ${item.id}`,
            question: item.title,
            answerYes: 'да',
            answerNo: 'нет'
          },
          position: {
            x: Math.random() * window.innerWidth - 100,
            y: Math.random() * window.innerHeight,
          },
        }))
        setNodes((nds) => nds.concat(newAxiosNode));
      } catch (err) {
        console.log(err)
      }
    }
    axiosData()
  }, [])

  if (!nodes.length) return null
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setRfInstance}
      nodeTypes={nodeTypes}
      style={rfStyle}
    >
      {/* кнопки можно вынести в shared */}
      <div className="save__controls">
        <button onClick={onSave}>save</button>
        <button onClick={onRestore}>restore</button>
        <button onClick={addNode}>add node</button>
      </div>
    </ReactFlow>
  );
};

export default () => (
  <ReactFlowProvider>
    <Flow className="flow-container" />
  </ReactFlowProvider>
);