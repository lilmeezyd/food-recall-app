import { useMemo, useContext } from 'react'
import { Link } from 'react-router-dom'
import { RecallContext } from '../RecallContext'

function Home() {

  const recalls = useContext(RecallContext).fsis

  const filteredRecalls = useMemo(() => {
    const sortRecall = (x,y) => {
      if(x.field_year>y.field_year) return -1
      if(x.field_year<y.field_year) return 1
  }
  return recalls.sort(sortRecall).slice(0,3)
  }, [recalls])
  return (
    <>
    <div className="home-image">
      <span className='home-image-heading'>Food Recall App</span>
      <span className='home-image-sub'>Keep up todate with all food recalls</span>
    </div>
    {recalls.length === 0 ? <div>Loading...</div> : <div className="latest-recalls">
    {filteredRecalls.map((recall, idx) => (
      <Link to={`/recalls/usda/${recall.field_recall_number}`} key={idx} className="recall-list">
        <div className='home-field-title'>{recall.field_title}</div>
        <div className='recall-date'><span>Date:</span>&nbsp; {recall.field_recall_date}</div>
      </Link>
    ))}
    </div>}
    </>
  )
}

export default Home