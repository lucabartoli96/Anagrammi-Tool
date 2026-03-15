import Letter from "./Letter";

const Board = ({letters, onLetterMouseDown}) => {

    return ( 
        <div className="board">
            {letters.map((letter) => (
                <Letter key={letter.id}
                        top={letter.y} 
                        left={letter.x}
                        onMouseDown={(e) => onLetterMouseDown(e, letter.id)}>
                    {letter.text}
                </Letter>
            ))}
        </div>
    );
}
 
export default Board;