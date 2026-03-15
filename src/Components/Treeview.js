import ArrowsIcon from "./svg/ArrowsIcon";

const Treeview = ({isOpen, width, resizing, onArrowsButtonClick, onSideBarMouseDown}) => {

    return ( 
        <div style={{width: width}} className="treeview">
            <div className={"sidebar " + (resizing ? "dragging": "")}
                onMouseDown={onSideBarMouseDown}>
            </div>
            <button className="arrows" 
                    onClick={onArrowsButtonClick}
    
                    style={{
                        left: width+10
                    }}>
                <ArrowsIcon rotate={!isOpen}/>
            </button>
            
        </div>
     );
}
 
export default Treeview;