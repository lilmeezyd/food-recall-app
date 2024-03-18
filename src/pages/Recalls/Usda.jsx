import { useState, useMemo } from 'react'
import fsis from '../../fsis/fsis.json'
import chevronDown from '../../static/chevron-down.svg'
import chevronUp from '../../static/chevron-up.svg'
import lastPage from '../../static/last_page.png'
import firstPage from '../../static/first_page.png'
import prevPage from "../../static/chevron_left.png"
import nextPage from "../../static/chevron_right.png"


function Usda() {

  const [dropDownCause, setDropDownCause] = useState(false)
  const [dropDownRisk, setDropDownRisk] = useState(false)
  const [dropDownState, setDropDownState] = useState(false)
  const [dropDownStatus, setDropDownStatus] = useState(false)
  const [dropDownYear, setDropDownYear] = useState(false)
  const [causeOpen, setCauseOpen] = useState(false)
  const [riskOpen, setRiskOpen] = useState(false)
  const [stateOpen, setStateOpen] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)
  const [yearOpen, setYearOpen] = useState(false)

  const [word, setWord] = useState('')
  const [cause, setCause] = useState([])
  const [risk, setRisk] = useState([])
  const [status, setStatus] = useState([])
  const [state, setState] = useState([])
  const [year, setYear] = useState([])
  const [curPage, setCurPage] = useState(1)

  const recalls = fsis
  const pageSize = 5

  const returnRecalls = (recalls, curPage, pageSize) => {
    const sortRecall = (x,y) => {
      if(x.field_year>y.field_year) return -1
      if(x.field_year<y.field_year) return 1
  }
    const filterRecall = (recall, idx) => {
      let start = (curPage - 1) * pageSize
      let end = curPage * pageSize
      if (idx >= start && idx < end) return true
    }
    return recalls
      .sort(sortRecall)
      .filter(filterRecall)
  }

  const returnEdited = (recalls, word, cause, state, status, risk, year) => {
    const newArray = []
    const causeArray = []
    const stateArray = []
    console.log(cause)
    if (cause.length === 0 &&
      state.length === 0 && status.length === 0 &&
      risk.length === 0 && year.length === 0) {
        console.log(recalls)
        newArray.push(...recalls)
      return newArray
      .filter(x => x.field_title.toLocaleLowerCase().includes(word.toLocaleLowerCase()))
    } else {
      cause.forEach(x => {
        newArray.push(...recalls
          .filter(y => y.field_recall_reason.includes(x)))
      })
      state.forEach(x => { 
        newArray.push(...recalls.filter(y => y.field_states.includes(x))) 
      })
      status.forEach(x => {
        newArray.push(...recalls.filter(y => y.field_recall_type === x))
      })
      risk.forEach(x => {
        newArray.push(...recalls.filter(y => y.field_recall_classification === x))
      })
      year.forEach(x => {
        newArray.push(...recalls.filter(y => y.field_year === x))
      })
      console.log(causeArray)
      console.log(newArray)
      return newArray
      .filter(x => x.field_title.toLocaleLowerCase().includes(word.toLocaleLowerCase()))
    }
  }
/*
  const editedRecall = useMemo(() => returnEdited(recalls, cause, state, status, risk, year)
    , [recalls, cause, state, status, risk, year])
*/
  const editedRecalls = useMemo(() => returnEdited(recalls, word, cause, state, status, risk, year)
    , [recalls, word, cause, state, status, risk, year])

  const filteredRecalls = useMemo(
    () => returnRecalls(
      editedRecalls, curPage, pageSize
    ), [editedRecalls, curPage, pageSize])

  let totalPages = Math.ceil(editedRecalls.length / pageSize)



  const createCauses = () => {
    const newArray = []
    editedRecalls.map(x => x.field_recall_reason).filter(x => x !== "").forEach(x => {
      if (x.includes(',')) {
        newArray.push(...x.split(','))
      } else {
        newArray.push(x)
      }
    })

    return Array.from(new Set(newArray.map(x => x.trim())))
  }


  const createStates = () => {
    const newArray = []
    editedRecalls.map(x => x.field_states).filter(x => x !== "").forEach(x => {
      if (x.includes(',')) {
        newArray.push(...x.split(','))
      } else {
        newArray.push(x)
      }
    })
    return Array.from(new Set(newArray.map(x => x.trim()))).sort((x, y) => {
      if (x > y) return 1
      return -1
    })
  }

  const showCause = () => {
    setCauseOpen(prevState => !prevState)
  }

  const showRisk = () => {
    setRiskOpen(prevState => !prevState)
  }

  const showStates = () => {
    setStateOpen(prevState => !prevState)
  }

  const showStatus = () => {
    setStatusOpen(prevState => !prevState)
  }

  const showYear = () => {
    setYearOpen(prevState => !prevState)
  }

  const onSearch = (e) => {
    setWord(e.target.value)
  }

  const onReset = () => {
    setWord('')
    setCause([])
    setRisk([])
    setState([])
    setStatus([])
    setYear([])
    setCurPage(1)
  }

  const handleCause = (e) => {
    const checkedCause = e.target.value
    if (e.target.checked) {
      setCause([...cause, checkedCause])
    } else {
      setCause(cause.filter(x => x !== checkedCause))
    }
  }
  /*
    const handleAllCauses = (e) => {
      const allCauses = createCauses().map(reason => reason)
      setCause(e.target.checked ? allCauses : [])
    }
  */
  const handleRisk = (e) => {
    const checkedRisk = e.target.value
    if (e.target.checked) {
      setRisk([...risk, checkedRisk])
    } else {
      setRisk(risk.filter(x => x !== checkedRisk))
    }
  }
  /*
    const handleAllRisks = (e) => {
      const allRisks = Array.from(new Set(fsis.map(x => x.field_recall_classification))).map(reason => reason)
      setRisk(e.target.checked ? allRisks : [])
    }
  */
  const handleStatus = (e) => {
    const checkedStatus = e.target.value
    if (e.target.checked) {
      setStatus([...status, checkedStatus])
    } else {
      setStatus(status.filter(x => x !== checkedStatus))
    }
  }
  /*
    const handleAllStatuses = (e) => {
      const allStatus = Array.from(new Set(fsis.map(x => x.field_recall_type))).map(reason => reason)
      setStatus(e.target.checked ? allStatus : [])
    }
  */
  const handleState = (e) => {
    const checkedState = e.target.value
    if (e.target.checked) {
      setState([...state, checkedState])
    } else {
      setState(state.filter(x => x !== checkedState))
    }
  }
  /*
    const handleAllStates = (e) => {
      const allStates = createStates().map(reason => reason)
      setState(e.target.checked ? allStates : [])
    }
  */
  const handleYear = (e) => {
    const checkedYear = e.target.value
    if (e.target.checked) {
      setYear([...year, checkedYear])
    } else {
      setYear(year.filter(x => x !== checkedYear))
    }
  }
  /*
    const handleAllYears = (e) => {
      const allYears = Array.from(new Set(fsis.map(x => x.field_year))).map(reason => reason)
      setYear(e.target.checked ? allYears : [])
    }
  */
  const viewNextPage = () => {
    setCurPage(curPage + 1)
  }
  const viewPreviousPage = () => {
    setCurPage(curPage - 1)
  }

  const viewFirstPage = () => {
    setCurPage(1)
  }

  const viewLastPage = () => {
    setCurPage(totalPages)
  }



  return (
    <div>
      <div className='search-filter'>
        <div className="search">
          <div className='search-filter-heading'>Search Results</div>
          <div className='form'>
            <form>
              <input placeholder='Type in keyword' onChange={onSearch} type="text" />
            </form>
          </div>
          <button onClick={onReset} className='btn'>Reset</button>
        </div>
        <div className="filter">
          <div className='search-filter-heading'>Advanced Filter</div>
          <div className="filter-param">
            <div onClick={() => {
              setDropDownCause(!dropDownCause)
              setDropDownRisk(false)
              setDropDownState(false)
              setDropDownStatus(false)
              setDropDownYear(false)
              setRiskOpen(false)
              setStateOpen(false)
              setStatusOpen(false)
              setYearOpen(false)
              showCause()
            }} className='cause'>Cause
              {dropDownCause ? <img src={chevronUp} alt="chevron-up" /> : <img src={chevronDown} alt="chevron-down" />}</div>
            {causeOpen && <div className='options'>
              {createCauses().map((reason, idx) => (
                <div key={idx} className='options-group'>
                  <div><input
                    checked={cause.includes(reason)}
                    onChange={handleCause} type="checkbox" value={reason} name={reason} id={reason} /></div>
                  <div><label htmlFor={reason}>{reason}</label></div>
                </div>
              ))}

            </div>}
          </div>
          <div className="filter-param">
            <div onClick={() => {
              setDropDownCause(false)
              setDropDownRisk(!dropDownRisk)
              setDropDownState(false)
              setDropDownStatus(false)
              setDropDownYear(false)
              setCauseOpen(false)
              setStateOpen(false)
              setStatusOpen(false)
              setYearOpen(false)
              showRisk()
            }} className='cause'>Risk Level
              {dropDownRisk ? <img src={chevronUp} alt="chevron-up" /> : <img src={chevronDown} alt="chevron-down" />}</div>
            {riskOpen && <div className='options'>
              {Array.from(new Set(editedRecalls.map(x => x.field_recall_classification))).map((reason, idx) => (
                <div key={idx} className='options-group'>
                  <div><input
                    checked={risk.includes(reason)}
                    onChange={handleRisk} type="checkbox" value={reason} name={reason} id={reason} /></div>
                  <div><label htmlFor={reason}>{reason}</label></div>
                </div>
              ))}

            </div>}
          </div>
          <div className="filter-param">
            <div onClick={() => {
              setDropDownCause(false)
              setDropDownRisk(false)
              setDropDownState(false)
              setDropDownStatus(!dropDownStatus)
              setDropDownYear(false)
              setRiskOpen(false)
              setStateOpen(false)
              setCauseOpen(false)
              setYearOpen(false)
              showStatus()
            }} className='cause'>Status
              {dropDownStatus ? <img src={chevronUp} alt="chevron-up" /> : <img src={chevronDown} alt="chevron-down" />}</div>
            {statusOpen && <div className='options'>
              {Array.from(new Set(editedRecalls.map(x => x.field_recall_type))).map((reason, idx) => (
                <div key={idx} className='options-group'>
                  <div><input
                    checked={status.includes(reason)}
                    onChange={handleStatus} type="checkbox"
                    value={reason} name={reason} id={reason} /></div>
                  <div><label htmlFor={reason}>{reason}</label></div>
                </div>
              ))}

            </div>}
          </div>
          <div className="filter-param">
            <div onClick={() => {
              setDropDownCause(false)
              setDropDownRisk(false)
              setDropDownState(!dropDownState)
              setDropDownStatus(false)
              setDropDownYear(false)
              setRiskOpen(false)
              setCauseOpen(false)
              setStatusOpen(false)
              setYearOpen(false)
              showStates()
            }} className='cause'>States
              {dropDownState ? <img src={chevronUp} alt="chevron-up" /> : <img src={chevronDown} alt="chevron-down" />}</div>
            {stateOpen && <div className='options'>
              {createStates().map((reason, idx) => (
                <div key={idx} className='options-group'>
                  <div><input
                    checked={state.includes(reason)}
                    onChange={handleState} type="checkbox" value={reason} name={reason} id={reason} /></div>
                  <div><label htmlFor={reason}>{reason}</label></div>
                </div>
              ))}

            </div>}
          </div>
          <div className="filter-param">
            <div onClick={() => {
              setDropDownCause(false)
              setDropDownRisk(false)
              setDropDownState(false)
              setDropDownStatus(false)
              setDropDownYear(!dropDownYear)
              setRiskOpen(false)
              setStateOpen(false)
              setStatusOpen(false)
              setCauseOpen(false)
              showYear()
            }} className='cause'>Year
              {dropDownYear ? <img src={chevronUp} alt="chevron-up" /> : <img src={chevronDown} alt="chevron-down" />}</div>
            {yearOpen && <div className='options'>
              {Array.from(new Set(editedRecalls.map(x => x.field_year))).sort((x, y) => {
                if (x > y) return -1
                return 1
              }).map((reason, idx) => (
                <div key={idx} className='options-group'>
                  <div><input
                    onChange={handleYear}
                    checked={year.includes(reason)} type="checkbox" value={reason} name={reason} id={reason} /></div>
                  <div><label htmlFor={reason}>{reason}</label></div>
                </div>
              ))}

            </div>}
          </div>
        </div>
      </div>
      {filteredRecalls.map((recall, idx) => (
        <div key={idx} className="recall-list">
          <div className='recall-title'>{recall.field_title}</div>
          <div className='company'>{recall.field_establishment}</div>
          <div className='recall-group'>
            <div className='risk-level'><span>Risk:</span>&nbsp;{recall.field_recall_classification}</div>
            <div className='recall-cause'><span>Cause:</span>&nbsp;{recall.field_recall_reason}</div>
            <div className='recall-status'><span>Status:</span>&nbsp;{recall.field_recall_type}</div>
          </div>
          <div className='recall-details'>
            <div className='recall-date'><span>Date:</span>&nbsp; {recall.field_recall_date}</div>
            {!!recall.field_states.length && <div className='recall-states'><span>Location:</span>&nbsp; {recall.field_states}</div>}
          </div>
        </div>
      ))}
      <div className="button-controls">
        <button disabled={curPage === 1 ? true : false} onClick={viewFirstPage} className="btn btn-controls" id="firstPage">
          <img src={firstPage} alt="first_page" />
        </button>
        <button disabled={curPage === 1 ? true : false} onClick={viewPreviousPage} className="btn btn-controls" id="prevButton">
          <img src={prevPage} alt="prev_page" />
        </button>
        <div className="pages">
          <span className="current">{curPage}</span>
          <span>of</span>
          <span className="total_pages">{totalPages}</span>
        </div>
        <button disabled={curPage === totalPages ? true : false} onClick={viewNextPage} className="btn btn-controls" id="nextButton">
          <img src={nextPage} alt="next_page" />
        </button>
        <button disabled={curPage === totalPages ? true : false} onClick={viewLastPage} className="btn btn-controls" id="lastPage">
          <img src={lastPage} alt="last_page" />
        </button>
      </div>
    </div>
  )
}

export default Usda