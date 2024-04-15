import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
export const RecallContext = createContext({
  fda: [],
  fsis: [],
  errorFsis: '',
  errorFda: '',
  returnFda: () => {},
  fetchUsda: () => {}
});

function RecallProvider({ children }) {
  const [fda, setFda] = useState([]);
  const [fsis, setFsis] = useState([]);
  const [ errorFsis, setErrorFsis] = useState('')
  const [ errorFda, setErrorFda ] = useState('')

  useEffect(() => {

    const createFda = (fdas) => {
      const newFda = []
      fdas.map(fda => newFda.push(...fda.results))
      setFda(newFda)
    }
    async function makeAPICall(endpoint) {
      const response = await axios.get(endpoint);
      const data = await response.data;
      return data;
    }
  
    async function makeMultipleAPICalls(endpoints) {
      const promises = endpoints.map(makeAPICall);
      const responses = await Promise.all(promises);
      createFda(responses)
      console.log(responses)
      return responses;
    }
    (async () => {
      try {
      await makeMultipleAPICalls([
        "https://api.fda.gov/food/enforcement.json?api_key=UfWlZLSEWUUJqeY3s0Qagdt7u5vsDThx1Jb4zKSA&search=report_date:[20231001+TO+20241231]&limit=1000",
        "https://api.fda.gov/food/enforcement.json?api_key=UfWlZLSEWUUJqeY3s0Qagdt7u5vsDThx1Jb4zKSA&search=report_date:[20230323+TO+20230930]&limit=1000",
        "https://api.fda.gov/food/enforcement.json?api_key=UfWlZLSEWUUJqeY3s0Qagdt7u5vsDThx1Jb4zKSA&search=report_date:[20220915+TO+20230322]&limit=1000",
        "https://api.fda.gov/food/enforcement.json?api_key=UfWlZLSEWUUJqeY3s0Qagdt7u5vsDThx1Jb4zKSA&search=report_date:[20220220+TO+20220914]&limit=1000",
        "https://api.fda.gov/food/enforcement.json?api_key=UfWlZLSEWUUJqeY3s0Qagdt7u5vsDThx1Jb4zKSA&search=report_date:[20210710+TO+20220219]&limit=1000",
        "https://api.fda.gov/food/enforcement.json?api_key=UfWlZLSEWUUJqeY3s0Qagdt7u5vsDThx1Jb4zKSA&search=report_date:[20200910+TO+20210709]&limit=1000",
        "https://api.fda.gov/food/enforcement.json?api_key=UfWlZLSEWUUJqeY3s0Qagdt7u5vsDThx1Jb4zKSA&search=report_date:[20191231+TO+20200909]&limit=1000",
        "https://api.fda.gov/food/enforcement.json?api_key=UfWlZLSEWUUJqeY3s0Qagdt7u5vsDThx1Jb4zKSA&search=report_date:[20190801+TO+20191230]&limit=1000",
        "https://api.fda.gov/food/enforcement.json?api_key=UfWlZLSEWUUJqeY3s0Qagdt7u5vsDThx1Jb4zKSA&search=report_date:[20190225+TO+20190731]&limit=1000",
        "https://api.fda.gov/food/enforcement.json?api_key=UfWlZLSEWUUJqeY3s0Qagdt7u5vsDThx1Jb4zKSA&search=report_date:[20180810+TO+20190224]&limit=1000",
        "https://api.fda.gov/food/enforcement.json?api_key=UfWlZLSEWUUJqeY3s0Qagdt7u5vsDThx1Jb4zKSA&search=report_date:[20180301+TO+20180809]&limit=1000",
        "https://api.fda.gov/food/enforcement.json?api_key=UfWlZLSEWUUJqeY3s0Qagdt7u5vsDThx1Jb4zKSA&search=report_date:[20180101+TO+20180228]&limit=1000",
        "https://api.fda.gov/food/enforcement.json?api_key=UfWlZLSEWUUJqeY3s0Qagdt7u5vsDThx1Jb4zKSA&search=report_date:[20170901+TO+20171231]&limit=1000",
        "https://api.fda.gov/food/enforcement.json?api_key=UfWlZLSEWUUJqeY3s0Qagdt7u5vsDThx1Jb4zKSA&search=report_date:[20170725+TO+20170831]&limit=1000",
        "https://api.fda.gov/food/enforcement.json?api_key=UfWlZLSEWUUJqeY3s0Qagdt7u5vsDThx1Jb4zKSA&search=report_date:[20170325+TO+20170724]&limit=1000",
        "https://api.fda.gov/food/enforcement.json?api_key=UfWlZLSEWUUJqeY3s0Qagdt7u5vsDThx1Jb4zKSA&search=report_date:[20161221+TO+20170324]&limit=1000",
        "https://api.fda.gov/food/enforcement.json?api_key=UfWlZLSEWUUJqeY3s0Qagdt7u5vsDThx1Jb4zKSA&search=report_date:[20160925+TO+20161220]&limit=1000",
        "https://api.fda.gov/food/enforcement.json?api_key=UfWlZLSEWUUJqeY3s0Qagdt7u5vsDThx1Jb4zKSA&search=report_date:[20160515+TO+20160924]&limit=1000",
        "https://api.fda.gov/food/enforcement.json?api_key=UfWlZLSEWUUJqeY3s0Qagdt7u5vsDThx1Jb4zKSA&search=report_date:[20160101+TO+20160514]&limit=1000",
        "https://api.fda.gov/food/enforcement.json?api_key=UfWlZLSEWUUJqeY3s0Qagdt7u5vsDThx1Jb4zKSA&search=report_date:[20150801+TO+20151231]&limit=1000",
        "https://api.fda.gov/food/enforcement.json?api_key=UfWlZLSEWUUJqeY3s0Qagdt7u5vsDThx1Jb4zKSA&search=report_date:[20150501+TO+20150731]&limit=1000",
        "https://api.fda.gov/food/enforcement.json?api_key=UfWlZLSEWUUJqeY3s0Qagdt7u5vsDThx1Jb4zKSA&search=report_date:[20150210+TO+20150430]&limit=1000",
        
      ]);
        
      } catch (error) {
        setErrorFda(error.message)
        console.log(error.message)
      }
    })()
    
    
      fetchUsda()
    
  }, []);
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
    errorFda: errorFda,
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
