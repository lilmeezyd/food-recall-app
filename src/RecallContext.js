import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const RecallContext = createContext({
  fda: [],
  fsis: [],
});

function RecallProvider({ children }) {
  const [fda, setFda] = useState([]);
  const [fsis, setFsis] = useState([]);

  useEffect(() => {
    const url = "https://api.fda.gov/food/enforcement.json?limit=1000";
    try {
      axios.get(url).then((res) => {
        setFda(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }

    axios.get('https://corsproxy.io/?https://www.fsis.usda.gov/fsis/api/recall/v/1')
     .then(response => {
      setFsis(response.data)
     })
     .catch(error => console.log(error))
  }, []);

  

const contextValue = {
  fda: fda,
  fsis, fsis
};

return (
  <RecallContext.Provider value={contextValue}>
    {children}
  </RecallContext.Provider>
);
}

export default RecallProvider;
