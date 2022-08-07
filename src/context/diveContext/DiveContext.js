import { createContext, useReducer } from "react";
import diveReducer from './DiveReducer'

const DiveContext = createContext()

export const DiveProvider = ({ children }) => {
  const initialState = {
    dives: [],
    current: [],
    editing: false,
    id: '',
    fetchedDives: []
  }

  const [state, dispatch] = useReducer(diveReducer, initialState)


  return (
    <DiveContext.Provider value={{
      ...state,
      dispatch
    }}>
      {children}
    </DiveContext.Provider>
  )
}

export default DiveContext