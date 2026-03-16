const Letter = ({children, top, left, onMouseDown}) => {

    return (
        <div className="letter"
            style={{
                top: top,
                left: left
            }}
            onMouseDown={onMouseDown}>
            {children}
        </div>
    );
}

export default Letter;