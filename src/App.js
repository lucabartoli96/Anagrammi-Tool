import './App.css';
import { useEffect, useState } from 'react';
import Buttonsbar from './Components/Buttonsbar';
import Treeview from './Components/Treeview';
import Board from './Components/Board';
import { renderToStaticMarkup } from 'react-dom/server';

function App() {

  const [dragInfo, setDragInfo] = useState(null);

  /* Board State */
  const [letters, setLetters] = useState([
    { id: 0, text: 'A', x: 500, y: 500 },
    { id: 1, text: 'C', x: 300, y: 300 },
    { id: 2, text: 'E', x: 400, y: 400 },
  ]);

  /* Treeview State */

  const [treeview, setTreeview] = useState({
    isOpen: true,
    width: 210
  });

  const handleArrowsButtonClick = (e) => {
    setTreeview(prev => ({ ...prev, isOpen: !prev.isOpen }));
  }

  const handleSidebarMouseDown = (e) => {
    if (treeview.isOpen) {
      
      setDragInfo({
        dragging: 'treeview-sidebar'
      });
    }
  }


  const handleMouseMove = (e) => {

    if (dragInfo === null)
      return;

    if (dragInfo.dragging === 'letter') {
      const newx = e.clientX - dragInfo.correction.x;
      const newy = e.clientY - dragInfo.correction.y;

      setLetters(prev =>
        prev.map(letter =>
          letter.id === dragInfo.id
            ? {
              ...letter,
              x: newx > 0 ? newx : 0,
              y: newy > 0 ? newy : 0
            }
            : letter
        )
      )

    } else if (dragInfo.dragging === 'treeview-sidebar') {
      setTreeview(prev => (
        {...prev, width: e.clientX}
      ))
    }



  }

  const handleLetterMouseDown = (e, letterId) => {

    const rect = e.target
      .getBoundingClientRect();

    const parentRect = e.target
      .parentElement
      .getBoundingClientRect();

    const x = parentRect.left - rect.left + e.clientX;
    const y = parentRect.top - rect.top + e.clientY;

    setDragInfo({
      dragging: 'letter',
      id: letterId,
      correction: {
        x: x,
        y: y
      }
    });
  }

  useEffect(() => {
    const handleMouseUp = () => {
      setDragInfo(null);
    }

    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    }
  }, []);


  return (
    <div className="App"
      onMouseMove={handleMouseMove}>

      <Buttonsbar />
      <div className="Main">
        <Treeview isOpen={treeview.isOpen}
          width={treeview.isOpen ? treeview.width : 3}
          resizing = {dragInfo && dragInfo.dragging === 'treeview-sidebar'}
          onArrowsButtonClick={handleArrowsButtonClick}
          onSideBarMouseDown={handleSidebarMouseDown} />
        <Board letters={letters}
          onLetterMouseDown={handleLetterMouseDown} />
      </div>
    </div>
  );
}

export default App;
