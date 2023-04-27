import React from 'react';
import Flow from './Flow';
import './App.css'



export default function App() {

  return (
    <div>
      reactflow test
      <div className='flow-container'>
        <div style={{ width: '100vw', height: '100vh' }}>
          <Flow />
        </div>
      </div>
    </div>


  );
}