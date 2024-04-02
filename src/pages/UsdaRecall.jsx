import { useContext } from "react"
import { useParams } from "react-router-dom"
import { RecallContext } from '../RecallContext'


function UsdaRecall() {
  const recalls = useContext(RecallContext).fsis
    const { usdaId } = useParams()
    const recall = recalls.find(recall => recall.field_recall_number === usdaId)
  return (
    <div  className="recall-list-1">
      {console.log(recall)}
            <div className='recall-title'>{recall.field_title}</div>
            {!!recall.field_establishment.length && <div className='company'><span>Company:</span>&nbsp;{recall.field_establishment}</div>}
            <div className='recall-group'>
              <div className='risk-level'><span>Risk:</span>&nbsp;{recall.field_recall_classification}</div>
              <div className='recall-cause'><span>Cause:</span>&nbsp;{recall.field_recall_reason}</div>
              <div className='recall-status'><span>Status:</span>&nbsp;{recall.field_recall_type}</div>
            </div>
            <div className='recall-details'>
              <div className='recall-date'><span>Recall Date:</span>&nbsp; {recall.field_recall_date}</div>
              {!!recall.field_states.length && <div className='recall-states'><span>Distribution Area:</span>&nbsp; {recall.field_states}</div>}
              <div><span>Recall Number:</span>&nbsp;{recall.field_recall_number}</div>
              {recall.field_recall_type === "Closed Recall" && 
              <div>
                <div><span>Recall Close Date:</span>&nbsp; {recall.field_closed_date}</div>
                <div><span>Quantity Recovered:</span>&nbsp; {recall.field_qty_recovered}</div>
                </div>}              
            </div>
            <div className="recall-extend">
              <div className="recall-header">Company Media Contact:</div>
              <div>{recall.field_company_media_contact}</div>
                <div className="recall-header">Products Affected:</div>
                <div>{recall.field_product_items}</div>
                <div className="recall-header">Processing Type:</div>
                <div>{recall.field_processing}</div>
            </div>

            <p className="foot-note">*Data retrieved from the fsis website</p>
          </div>
  )
}

export default UsdaRecall