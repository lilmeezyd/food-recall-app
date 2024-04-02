import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const RecallContext = createContext({
  fda: [],
  fsis: [],
  returnFda: () => {}
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

  useEffect(() => {
    const url = "https://api.fda.gov/food/enforcement.json?search=report_date:[20231001+TO+20241231]&limit=1000";
    
      axios.get(url).then((res) => {
        setFda(res.data.results);
      }).catch (error =>
      console.log(error))
    axios.get("https://api.fda.gov/food/enforcement.json?search=report_date:[20230323+TO+20230930]&limit=1000")
    .then((res) => {
        setFda1(res.data.results)
    })
    .catch(err => console.log(err))
    
    axios.get("https://api.fda.gov/food/enforcement.json?search=report_date:[20220915+TO+20230322]&limit=1000")
    .then((res) => {
        setFda2(res.data.results)
    })
    .catch(err => console.log(err))

    axios.get("https://api.fda.gov/food/enforcement.json?search=report_date:[20220220+TO+20220914]&limit=1000")
    .then((res) => {
        setFda3(res.data.results)
    })
    .catch(err => console.log(err))

    axios.get("https://api.fda.gov/food/enforcement.json?search=report_date:[20210710+TO+20220219]&limit=1000")
    .then((res) => {
        setFda4(res.data.results)
    })
    .catch(err => console.log(err))

    axios.get("https://api.fda.gov/food/enforcement.json?search=report_date:[20200910+TO+20210709]&limit=1000")
    .then((res) => {
        setFda5(res.data.results)
    })
    .catch(err => console.log(err))

    axios.get("https://api.fda.gov/food/enforcement.json?search=report_date:[20191231+TO+20200909]&limit=1000")
    .then((res) => {
        setFda6(res.data.results)
    })
    .catch(err => console.log(err))

    
    axios.get("https://api.fda.gov/food/enforcement.json?search=report_date:[20190801+TO+20191230]&limit=1000")
    .then((res) => {
        setFda7(res.data.results)
    })
    .catch(err => console.log(err))

    axios.get("https://api.fda.gov/food/enforcement.json?search=report_date:[20190225+TO+20190731]&limit=1000")
    .then((res) => {
        setFda8(res.data.results)
    })
    .catch(err => console.log(err))

    axios.get("https://api.fda.gov/food/enforcement.json?search=report_date:[20180810+TO+20190224]&limit=1000")
    .then((res) => {
        setFda9(res.data.results)
    })
    .catch(err => console.log(err))

    axios.get("https://api.fda.gov/food/enforcement.json?search=report_date:[20180301+TO+20180809]&limit=1000")
    .then((res) => {
        setFda10(res.data.results)
    })
    .catch(err => console.log(err))

    axios.get("https://api.fda.gov/food/enforcement.json?search=report_date:[20180101+TO+20180228]&limit=1000")
    .then((res) => {
        setFda11(res.data.results)
    })
    .catch(err => console.log(err))
    
     
    axios.get('https://corsproxy.io/?https://www.fsis.usda.gov/fsis/api/recall/v/1')
     .then(response => {
      setFsis(response.data)
     })
     .catch(error => console.log(error))
  }, []);

  const returnFda = () => {
    return [...fda, ...fda1, ...fda2, ...fda3, ...fda4, ...fda5, ...fda6,
        ...fda7, ...fda8, ...fda9, ...fda10, ...fda11]
  }

  

const contextValue = {
  fda: fda,
  fsis: fsis,
  returnFda
};

return (
  <RecallContext.Provider value={contextValue}>
    {children}
  </RecallContext.Provider>
);
}

export default RecallProvider;
