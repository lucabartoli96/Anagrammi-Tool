import FolderIcon from "./svg/FolderIcon"

const Buttonsbar = () => {
    return ( 
        <nav className="buttons-bar">
            <button>
                <FolderIcon />
            </button>
            <h1>Nome Progetto</h1>
        </nav>
     );
}
 
export default Buttonsbar;