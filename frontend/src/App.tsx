import React, { useEffect, useState } from 'react';
import './App.css';
import {Log} from "./models/Log"

function App() {
  const [logs, setLogs] = useState<Log[]>([]);
  useEffect(() => {
    async function getLogs(){
      const response = await fetch('http://localhost:2000/logs', {method: 'GET'});
      const logs = await response.json()
      setLogs(logs);
    }

    getLogs();
    
  }, [])
  return (
    <>
      {JSON.stringify(logs)}
    </>
  );
}

export default App;
