import { useState, useReducer } from 'react'
import fsis from '../../fsis/fsis.json'
import chevronDown from '../../static/chevron-down.svg'
import chevronUp from '../../static/chevron-up.svg'


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



  const createCauses = () => {
    const newArray = []
    fsis.map(x => x.field_recall_reason).filter(x => x !== "").forEach(x => {
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
    fsis.map(x => x.field_states).filter(x => x !== "").forEach(x => {
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
    console.log(e.target.value)
  }

  const handleCause = (e) => {
    const checkedCause = e.target.value
    if (e.target.checked) {
      setCause([...cause, checkedCause])
    } else {
      setCause(cause.filter(x => x !== checkedCause))
    }
  }

  const handleAllCauses = (e) => {
    const allCauses = createCauses().map(reason => reason)
    setCause(e.target.checked ? allCauses : [])
  }

  const handleRisk = (e) => {
    const checkedRisk = e.target.value
    if (e.target.checked) {
      setRisk([...risk, checkedRisk])
    } else {
      setRisk(risk.filter(x => x !== checkedRisk))
    }
  }

  const handleAllRisks = (e) => {
    const allRisks = Array.from(new Set(fsis.map(x => x.field_recall_classification))).map(reason => reason)
    setRisk(e.target.checked ? allRisks : [])
  }

  const handleStatus = (e) => {
    const checkedStatus = e.target.value
    if (e.target.checked) {
      setStatus([...status, checkedStatus])
    } else {
      setStatus(status.filter(x => x !== checkedStatus))
    }
  }

  const handleAllStatuses = (e) => {
    const allStatus = Array.from(new Set(fsis.map(x => x.field_recall_type))).map(reason => reason)
    setStatus(e.target.checked ? allStatus : [])
  }

  const handleState = (e) => {
    const checkedState = e.target.value
    if (e.target.checked) {
      setState([...state, checkedState])
    } else {
      setState(state.filter(x => x !== checkedState))
    }
  }

  const handleAllStates = (e) => {
    const allStates = createStates().map(reason => reason)
    setState(e.target.checked ? allStates : [])
  }

  const handleYear = (e) => {
    const checkedYear = e.target.value
    if (e.target.checked) {
      setYear([...year, checkedYear])
    } else {
      setYear(year.filter(x => x !== checkedYear))
    }
  }

  const handleAllYears = (e) => {
    const allYears = Array.from(new Set(fsis.map(x => x.field_year))).map(reason => reason)
    setYear(e.target.checked ? allYears : [])
  }



  return (
    <div>{console.log(fsis.filter(x => x.field_recall_reason.trim().toLocaleLowerCase() === "Unreported Allergens".toLocaleLowerCase()))}
      {console.log(fsis[1])}
      <div className='search-filter'>
        <div className="search">
          <div className='search-filter-heading'>Search Results</div>
          <div className='form'>
            <form>
              <input onChange={onSearch} type="text" />
              <button type='submit' className='btn'>Search</button>
            </form>
          </div>
          <button className='btn'>Reset</button>
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
              <div className="options-group">
                <div>
                  <input
                    value='All' name='All'
                    checked={createCauses().length === cause.length ? true : false} onChange={handleAllCauses} type="checkbox" />
                </div>
                <div><label htmlFor="All">All</label></div>
              </div>
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
              <div className="options-group">
                <div>
                  <input
                    value='All' name='All'
                    checked={Array.from(new Set(fsis.map(x => x.field_recall_classification))).map(reason => reason).length === risk.length ? true : false} onChange={handleAllRisks} type="checkbox" />
                </div>
                <div><label htmlFor="All">All</label></div>
              </div>
              {Array.from(new Set(fsis.map(x => x.field_recall_classification))).map((reason, idx) => (
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
            <div className="options-group">
                <div>
                  <input
                    value='All' name='All'
                    checked={Array.from(new Set(fsis.map(x => x.field_recall_type))).map(reason => reason).length === status.length ? true : false} onChange={handleAllStatuses} type="checkbox" />
                </div>
                <div><label htmlFor="All">All</label></div>
              </div>
              {Array.from(new Set(fsis.map(x => x.field_recall_type))).map((reason, idx) => (
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
            <div className="options-group">
                <div>
                  <input
                    value='All' name='All'
                    checked={createStates().map(reason => reason).length === state.length ? true : false} onChange={handleAllStates} type="checkbox" />
                </div>
                <div><label htmlFor="All">All</label></div>
              </div>
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
            <div className="options-group">
                <div>
                  <input
                    value='All' name='All'
                    checked={Array.from(new Set(fsis.map(x => x.field_year))).map(reason => reason).length === year.length ? true : false} onChange={handleAllYears} type="checkbox" />
                </div>
                <div><label htmlFor="All">All</label></div>
              </div>
              {Array.from(new Set(fsis.map(x => x.field_year))).sort((x, y) => {
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
      {fsis.filter((x, idx) => idx < 20).map((recall, idx) => (
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
    </div>
  )
}

export default Usda