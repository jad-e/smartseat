import { createContext, useReducer } from "react";

export const StudentDataContext = createContext(); //creates a context

export const studentDataReducer = (state, action) => {
  switch (action.type) {
    case "SET_STUDENT":
      return { studentData: action.payload };

    case "EDIT_STUDENT":
      return { studentData: action.payload };

    default:
      return state;
  }
};

export const StudentDataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studentDataReducer, {
    studentData: null,
  });

  return (
    <StudentDataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StudentDataContext.Provider>
  );
};
