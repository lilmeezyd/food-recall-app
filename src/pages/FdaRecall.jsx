import { useParams } from 'react-router-dom'
import enforcement from '../fda/enforcement.json'

function FdaRecall() {

    const recalls = enforcement.results
    const {fdaId} = useParams()
    const recall = recalls.find(recall => recall.event_id === fdaId)
  return (
    <>
    {!recall ? <p>Recall not found!</p> : 
    <div className="recall-list-1">
        {console.log(recall)}
    <div className='recall-title'>{recall.reason_for_recall}</div>
    <div className='company'><span>Company:</span>&nbsp;{recall.recalling_firm}</div>
    <div className='recall-group'>
      <div className='risk-level'><span>Risk:</span>&nbsp;{recall.classification}</div>
      <div className='recall-status'><span>Status:</span>
      &nbsp;{recall.status}</div>
    </div>
    <div className='recall-details'>
        <div className='recall-date'>
          <span>Date:</span>&nbsp;
          {recall.recall_initiation_date.substring(0,4)+'-'
          +recall.recall_initiation_date.substring(4,6)+'-'
          +recall.recall_initiation_date.substring(6) }</div>
        <div className='recall-states'><span>Distribution Area:</span>&nbsp; {recall.distribution_pattern}</div>
        <div><span>Recall Number:</span>&nbsp;{recall.recall_number}</div>
      </div>
      <div className="recall-extend">
              <div className="recall-header">Code Info:</div>
              <div>{recall.code_info}</div>
                <div className="recall-header">Products Description:</div>
                <div>{recall.product_description}</div>
                <div className="recall-header">Quantity:</div>
                <div>{recall.product_quantity}</div>
            </div>
            <p className="foot-note">*Data retrieved from the fda website</p>
  </div>
      }
    </>
  )
}

export default FdaRecall