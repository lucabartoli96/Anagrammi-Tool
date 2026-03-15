import { useState } from "react";
import Letter from "./Letter";

const Board = () => {

    const [letters, setLetters] = useState([
        {id: 0, text: 'A', x: 500, y: 500},
        {id: 1, text: 'C', x: 300, y: 300},
        {id: 2, text: 'E', x: 400, y: 400},
    ]);

    const [dragInfo, setDragInfo] = useState(null);

    const handleMouseMove = (e) => {

        if (dragInfo === null) 
            return;

        const newx = e.clientX-dragInfo.correction.x;
        const newy = e.clientY-dragInfo.correction.y;
        
        setLetters(prev =>
            prev.map(letter =>
            letter.id === dragInfo.id
                ? { ...letter, 
                    x: newx, y: newy}
                : letter
            )
        )

    }

    const handleMouseUp = () => {
        setDragInfo(null)
    }


    return ( 
        <div className="board"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}>
            {letters.map((letter) => (
                <Letter key={letter.id}
                        top={letter.y} 
                        left={letter.x}
                        onMouseDown={(e)=> {

                            const rect = e.target
                                .getBoundingClientRect();

                            const parentRect = e.target
                                .parentElement
                                .getBoundingClientRect();

                            const x = parentRect.left-rect.left+e.clientX;
                            const y = parentRect.top-rect.top+e.clientY;

                            setDragInfo({
                                id: letter.id,
                                correction: {
                                    x: x,
                                    y: y
                                }
                            });
                        }}>
                    {letter.text}
                </Letter>
            ))}
        </div>
    );
}
 
export default Board;