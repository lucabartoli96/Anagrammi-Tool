import { useState } from "react";
import ArrowsIcon from "./svg/ArrowsIcon";

const Treeview = () => {

    const [open, setOpen] = useState(true);
    const [width, setWidth] = useState(210)

    const arrowClick = (e) => {

        if (open) {
            setWidth(10);
            setOpen(false);
        } else {
            setWidth(210)
            setOpen(true);
        }

    }

    return ( 
        <div style={{width: width}} className="treeview">
            <div className="sidebar">
            </div>
            <button className="arrows" 
                    onClick={arrowClick}
                    style={{
                        left: width+10
                    }}>
                <ArrowsIcon rotate={!open}/>
            </button>
            
        </div>
     );
}
 
export default Treeview;