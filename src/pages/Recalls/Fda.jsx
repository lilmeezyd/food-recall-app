import React from 'react'
import enforcement from '../../fda/enforcement.json'
import events from '../../fda/events.json'

function Fda() {
  return (
    <div>{console.log(enforcement.results)}
    <div className="recall-header">
        <div>Recalls</div>
        <div>Charts</div>
      </div>
      <div className='search-filter'>
      <div className="search">
          <div className='form'>
            <form>
              <input type="text" />
              <button type='submit' className='btn'>Search</button>
            </form>
          </div>
          <button className='btn'>Reset</button>
        </div>
        <div className="filter"></div>
      </div>
      <div className="recall-list">
        <div className='recall-title'>{enforcement.results[0].reason_for_recall}</div>
        <div className='company'>{enforcement.results[0].recalling_firm}</div>
        <div className='recall-group'>
          <div className='risk-level'><span>Risk:</span>&nbsp;{enforcement.results[0].classification}</div>
          <div className='recall-cause'><span>Cause:</span>&nbsp;{enforcement.results[0].classification}</div>
          <div className='recall-status'><span>Status:</span>&nbsp;{enforcement.results[0].status}</div>
        </div>
        <div className='recall-details'>
            <div className='recall-date'>
              <span>Date:</span>&nbsp;
              {enforcement.results[0].recall_initiation_date.substring(0,4)}</div>
            <div className='recall-states'><span>Location:</span>&nbsp; {enforcement.results[0].distribution_pattern}</div>
          </div>
      </div>
    </div>
  )
}

export default Fda