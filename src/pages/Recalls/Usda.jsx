import {useState} from 'react'
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
  return (
    <div>{console.log(fsis.filter(x => x.field_recall_reason.trim().toLocaleLowerCase() === "Unreported Allergens".toLocaleLowerCase()))}
      {console.log(fsis[1])}
      <div className='search-filter'>
        <div className="search">
        <div className='search-filter-heading'>Search Results</div>
          <div className='form'>
            <form>
              <input type="text" />
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
              {createCauses().map((reason, idx) => (
                <div key={idx} className='options-group'>
                  <div><input type="checkbox" name={reason} id={reason} /></div>
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
              {Array.from(new Set(fsis.map(x => x.field_risk_level))).map((reason, idx) => (
                <div key={idx} className='options-group'>
                  <div><input type="checkbox" name={reason} id={reason} /></div>
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
              {Array.from(new Set(fsis.map(x => x.field_recall_type))).map((reason, idx) => (
                <div key={idx} className='options-group'>
                  <div><input type="checkbox" name={reason} id={reason} /></div>
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
                  <div><input type="checkbox" name={reason} id={reason} /></div>
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
              {Array.from(new Set(fsis.map(x => x.field_year))).sort((x, y) => {
                if (x > y) return -1
                return 1
              }).map((reason, idx) => (
                <div key={idx} className='options-group'>
                  <div><input type="checkbox" name={reason} id={reason} /></div>
                  <div><label htmlFor={reason}>{reason}</label></div>
                </div>
              ))}

            </div>}
          </div>
        </div>
      </div>
      {fsis.filter((x, idx) => idx < 2).map((recall, idx) => (
        <div key={idx} className="recall-list">
          <div className='recall-title'>{recall.field_title}</div>
        <div className='company'>{recall.field_establishment}</div>
        <div className='recall-group'>
          <div className='risk-level'><span>Risk:</span>&nbsp;{recall.field_risk_level}</div>
          <div className='recall-cause'><span>Cause:</span>&nbsp;{recall.field_recall_reason}</div>
          <div className='recall-status'><span>Status:</span>&nbsp;{recall.field_recall_type}</div>
        </div>
        <div className='recall-details'>
            <div className='recall-date'><span>Date:</span>&nbsp; {recall.field_recall_date}</div>
            <div className='recall-states'><span>Location:</span>&nbsp; {recall.field_states}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Usda