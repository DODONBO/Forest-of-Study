import Header from './components/Header.jsx';
import { Outlet } from 'react-router-dom';
import './font.css';
import './style.css';

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App;
