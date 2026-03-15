import './App.css';
import Buttonsbar from './Components/Buttonsbar';
import Treeview from './Components/Treeview';
import Board from './Components/Board';

function App() {
  return (
    <div className="App">
             
      <Buttonsbar/>
      <div className="Main">
        <Treeview />
        <Board />
      </div>
    </div>
  );
}

export default App;
