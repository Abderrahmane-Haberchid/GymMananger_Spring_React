import { createContext } from "react";


const SharedState = createContext({
    membreAdded: false, 
    setMembreAdded: () => {},
    membreUpdated:false,
    setMembreUpdated: () => {}, 
    productAdded: false,
    setProductAdded: () => {},
    saleAdded: false,
    setSaleAdded: () => {}
})

export default SharedState;