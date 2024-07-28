import { createContext } from "react";


const SharedState = createContext({
    membreAdded: false, 
    setMembreAdded: () => {},
    membreUpdated:false,
    setMembreUpdated: () => {}, 
    membreDeleted:false,
    setMembreDeleted: () => {}, 
    productAdded: false,
    setProductAdded: () => {},
    saleAdded: false,
    setSaleAdded: () => {},
    productDeleted: '',
    setProductDeleted: () => {},
    saleDeleted: '',
    setSaleDeleted: () => {}
})

export default SharedState;