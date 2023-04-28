import React from 'react';
import Flow from './Flow';
import './App.css'



export default function App() {

  return (
    <div>
      <h1> reactflow test </h1>
      <div className='flow-container' >
        <Flow />
      </div>
      <div>
      <h2>какой-то текст</h2>
      </div>

    </div>


  );
}