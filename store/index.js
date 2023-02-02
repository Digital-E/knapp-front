import React, { useReducer, createContext } from "react";

const initialState = {
  sidePanelOpen: false,
  currentProjectReference: '',
  savePath: ''
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    const newState = state;
    switch (action.type) {
      case "sidepanel open":
        return {
          ...newState,
          sidepanelOpen: action.value
        }; 
      case "current project reference":
        return {
          ...newState,
          currentProjectReference: action.value
        };
      case "save path":
        return {
          ...newState,
          savePath: action.value
        };                    
      default:
        throw new Error();
    }
  }, initialState);


  // useEffect(() => {
  //   Object.keys(initialState).forEach((item) => {
  //     initialState[`${item}`] = JSON.parse(localStorage.getItem(item));
  //   });
  // }, []);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
