import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
export const RecallContext = createContext({
  fda: [],
  fsis: [],
  errorFsis: '',
  returnFda: () => {},
  fetchUsda: () => {}
});

function RecallProvider({ children }) {
  const [fda, setFda] = useState([]);
  const [fda1, setFda1] = useState([]);
  const [fda6, setFda6] = useState([]);
  const [fda2, setFda2] = useState([]);
  const [fda3, setFda3] = useState([]);
  const [fda4, setFda4] = useState([]);
  const [fda5, setFda5] = useState([]);
  const [fda7, setFda7] = useState([]);
  const [fda8, setFda8] = useState([]);
  const [fda9, setFda9] = useState([]);
  const [fda10, setFda10] = useState([]);
  const [fda11, setFda11] = useState([]);
  const [fsis, setFsis] = useState([]);
  const [ errorFsis, setErrorFsis] = useState('')

  useEffect(() => {
    fetchFda()
    fetchFda1()
    fetchFda2()
    fetchFda3()
    fetchFda4()
    fetchFda5()
    fetchFda6()
    fetchFda7()
    fetchFda8()
    fetchFda9()
    fetchFda10()
    fetchFda11()
    
      fetchUsda()
    
  }, []);

  const fetchFda = async () => {
    const url =
    "https://api.fda.gov/food/enforcement.json?search=report_date:[20231001+TO+20241231]&limit=1000";

    try {
      const response = await axios.get(url)
      const data = await response.data
      setFda(data.results)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchFda1 = async () => {
    const url = "https://api.fda.gov/food/enforcement.json?search=report_date:[20230323+TO+20230930]&limit=1000"
    
    try {
      const response = await axios.get(url)
      const data = await response.data
      setFda1(data.results)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchFda2 =  async () => {
      const url = "https://api.fda.gov/food/enforcement.json?search=report_date:[20220915+TO+20230322]&limit=1000"
      
      try {
        const response = await axios.get(url)
        const data = await response.data
        setFda2(data.results)
      } catch (error) {
        console.log(error)
      }
      
  }
  
  const fetchFda3 = async () => {
    const url =   "https://api.fda.gov/food/enforcement.json?search=report_date:[20220220+TO+20220914]&limit=1000"
    
    try {
      const response = await axios.get(url)
      const data = await response.data
      setFda3(data.results)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchFda4 = async () => {
      const url = "https://api.fda.gov/food/enforcement.json?search=report_date:[20210710+TO+20220219]&limit=1000"
      try {
        const response = await axios.get(url)
        const data = await response.data
        setFda4(data.results)
      } catch (error) {
        console.log(error)
      }
    }

  const fetchFda5 = async () => {
    const url =  "https://api.fda.gov/food/enforcement.json?search=report_date:[20200910+TO+20210709]&limit=1000"
    try {
      const response = await axios.get(url)
      const data = await response.data
      setFda5(data.results)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchFda6 = async () => {
    const url =  "https://api.fda.gov/food/enforcement.json?search=report_date:[20191231+TO+20200909]&limit=1000"
    try {
      const response = await axios.get(url)
      const data = await response.data
      setFda6(data.results)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchFda7 = async () => {
    const url =  "https://api.fda.gov/food/enforcement.json?search=report_date:[20190801+TO+20191230]&limit=1000"
    try {
      const response = await axios.get(url)
      const data = await response.data
      setFda7(data.results)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchFda8 = async () => {
    const url =  "https://api.fda.gov/food/enforcement.json?search=report_date:[20190225+TO+20190731]&limit=1000"
    try {
      const response = await axios.get(url)
      const data = await response.data
      setFda8(data.results)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchFda9 = async () => {
    const url =  "https://api.fda.gov/food/enforcement.json?search=report_date:[20180810+TO+20190224]&limit=1000"
    try {
      const response = await axios.get(url)
      const data = await response.data
      setFda9(data.results)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchFda10 = async () => {
   const url = "https://api.fda.gov/food/enforcement.json?search=report_date:[20180301+TO+20180809]&limit=1000"
   try {
    const response = await axios.get(url)
    const data = await response.data
    setFda10(data.results)
  } catch (error) {
    console.log(error)
  }
}
  const fetchFda11 = async () => {
    const url = "https://api.fda.gov/food/enforcement.json?search=report_date:[20180101+TO+20180228]&limit=1000"
    try {
      const response = await axios.get(url)
      const data = await response.data
      setFda11(data.results)
    } catch (error) {
      console.log(error)
    }
  }

  const returnFda = () => {
    return [
      ...fda,
      ...fda1,
      ...fda2,
      ...fda3,
      ...fda4,
      ...fda5,
      ...fda6,
      ...fda7,
      ...fda8,
      ...fda9,
      ...fda10,
      ...fda11,
    ];
  };

  /*
  const fetchUsda = async () => {
    const response = await fetch("https://corsproxy.io/?https://www.fsis.usda.gov/fsis/api/recall/v/1")
    const data = await response.json() 
    console.log(response)
    try {
      if (response.ok) {
        setFsis(data);
        console.log(data)
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error)
    };
  }*/
  const fetchUsda = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: "https://corsproxy.io/?https://www.fsis.usda.gov/fsis/api/recall/v/1",
      headers: {}
    };
    
    try {
      const response = await axios.request(config)
      const data = await response.data
      setFsis(data)
      console.log(data)
    } catch (error) {
      setErrorFsis(error.message)
      console.log(error.message)
    }
  }

  const contextValue = {
    fda: fda,
    fsis: fsis,
    errorFsis: errorFsis,
    returnFda,
    fetchUsda
  };

  return (
    <RecallContext.Provider value={contextValue}>
      {children}
    </RecallContext.Provider>
  );
}

export default RecallProvider;

export const useRecall = () => {
  return useContext(RecallContext);
};
