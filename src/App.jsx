import { useState } from 'react';
import './font.css';
import './style.css';
import Header from './components/Header';
import DesignExample from './components/DesignExample';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <DesignExample/>
    </>
  )
}

export default App
