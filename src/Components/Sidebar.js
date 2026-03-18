import ArrowsIcon from "./svg/ArrowsIcon";

const Sidebar = ({isOpen, width, resizing, onArrowsButtonClick, onResizeBarMouseDown, children}) => {

    return ( 
        <div style={{width: width}} className="sidebar">
            <div className={"resizebar" + (isOpen ? " open" : "") + (resizing ? " dragging" : "")}
                onMouseDown={onResizeBarMouseDown}>
            </div>
            <button className="arrows" 
                    onClick={onArrowsButtonClick}
    
                    style={{
                        left: width+10
                    }}>
                <ArrowsIcon rotate={!isOpen}/>
            </button>
            {children}
        </div>
     );
}
 
export default Sidebar;
