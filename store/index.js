import React, { useReducer, createContext } from "react";

const initialState = {
  sidePanelOpen: false,
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
