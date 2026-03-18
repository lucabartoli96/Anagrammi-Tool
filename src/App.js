import './App.css';
import { useEffect, useState, useRef } from 'react';
import Buttonsbar from './Components/Buttonsbar';
import Sidebar from './Components/Sidebar';
import Treeview from './Components/Treeview';
import Board from './Components/Board';

function App() {

  const [dragInfo, setDragInfo] = useState(null);
  const dragRef = useRef(null);

  /* Board State */
  const [letters, setLetters] = useState([
    { id: 0, text: 'A', x: 500, y: 500 },
    { id: 1, text: 'C', x: 300, y: 300 },
    { id: 2, text: 'E', x: 400, y: 400 },
  ]);

  /* Treeview State */
  const [sidebar, setSidebar] = useState({
    isOpen: true,
    width: 210
  });

  const handleArrowsButtonClick = (e) => {
    setSidebar(prev => ({ ...prev, isOpen: !prev.isOpen }));
  }

  const handleResizeBarMouseDown = (e) => {
    if (sidebar.isOpen) {

      setDragInfo({
        dragging: 'sidebar-resizebar'
      });
    }
  }


  const handleMouseMove = (e) => {

    if (dragInfo === null)
      return;

    if (dragInfo.dragging === 'letter') {

      const newx = e.clientX - dragInfo.offset.x;
      const newy = e.clientY - dragInfo.offset.y;

      // Use requestAnimationFrame for smoother updates
      if (dragRef.current) {
        cancelAnimationFrame(dragRef.current);
      }
      dragRef.current = requestAnimationFrame(() => {
        setLetters(prev =>
          prev.map(letter =>
            letter.id === dragInfo.id
              ? {
                ...letter,
                x: Math.max(0, newx),
                y: Math.max(0, newy)
              }
              : letter
          )
        );
      });

    } else if (dragInfo.dragging === 'sidebar-resizebar') {
      setSidebar(prev => (
        { ...prev, width: Math.min(Math.max(e.clientX, 50), 300) }
      ))
    }

  }

  const handleLetterMouseDown = (e, letterId) => {

    const {left: boardLeft, top: boardTop} = e.target.parentElement.getBoundingClientRect()
    const {left: letterLeft, top: letterTop} = e.target.getBoundingClientRect();

    /*
          Quando avviene l'evento di drag di una 
          lettera, implementato sopra in mousemove,
          chiaramente non si può assegnare agli
          attributi top e left della <Letter /> 
          e.clientX ed e.clientY, perché questo non
          tiene conto del fatto che queste sono
          le distanze dall'angolo in alto a destra
          dell'elemento contenitore (cioè la Board).
          Quindi è essenziale salvare le coordinate
          della Board all'inizio del trascinamento
          di modo da realizzare una prima correzione:

            const offsetX = boardLeft;
            const offsetY = boardTop;

          e in mousemove:

            const newx = e.clientX - dragInfo.offset.x;
            const newy = e.clientY - dragInfo.offset.y;

          Tuttavia questo fa sì che non appena si
          comincia a trascinare l'angolo in alto a 
          sinistra delle tesserina salta a (newX, newY),
          indipendentemente da dove la si è "afferrata".
          Per evitare questo, nel nostro offset 
          memorizziamo anche un'altra informazione.
          Calcoliamo:

                    Dx = e.clientX - letterLeft
                    Dy = e.clientY - letterTop

          ovvero la differenza tra le coordinate assolute
          del click e quelle della lettera. A questo 
          punto calcoliamo offsetX e offsetY con:

                  const offsetX = boardLeft + Dx;
                  const offsetY = boardTop  + Dy;
          
          e in mousemove diventa:

              const newx = e.clientX - boardLeft - Dx;
              const newy = e.clientY - boardTop  - Dy;
          
          che in definitiva sono le coordinate dell'evento
          diminuite del bordo a sinistra e in alto della
          Board, e diminuito della differenza tra l'angolo in
          alto a sinistra e il punto di "afferramento" della
          tesserina.
     */
    console.log(letterLeft - e.clientX);
    
    const offsetX = boardLeft + e.clientX - letterLeft;
    const offsetY = boardTop  + e.clientY - letterTop;

    setDragInfo({
      dragging: 'letter',
      id: letterId,
      offset: {
        x: offsetX,
        y: offsetY
      }
    });
  }

  useEffect(() => {
    const handleMouseUp = () => {
      setDragInfo(null);
      if (dragRef.current) {
        cancelAnimationFrame(dragRef.current);
        dragRef.current = null;
      }
    }

    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      if (dragRef.current) {
        cancelAnimationFrame(dragRef.current);
      }
    }
  }, []);

  


  return (
    <div className={'App' + (dragInfo?.dragging === 'sidebar-resizebar' ? " dragging-sidebar-resizebar" : "")}
         onMouseMove={handleMouseMove}>

      <Buttonsbar />
      <div className="Main">
        <Sidebar isOpen={sidebar.isOpen}
          width={sidebar.isOpen ? sidebar.width : 3}
          resizing={dragInfo && dragInfo.dragging === 'sidebar-resizebar'}
          onArrowsButtonClick={handleArrowsButtonClick}
          onResizeBarMouseDown={handleResizeBarMouseDown}>
          <Treeview />
        </Sidebar>
        <Board letters={letters}
          onLetterMouseDown={handleLetterMouseDown} />
      </div>
    </div>
  );
}

export default App;
