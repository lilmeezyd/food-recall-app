import { BarChart, Bar, Rectangle, Cell, Legend, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import fsis from '../fsis/fsis.json'
import { useState, useMemo } from 'react'
function UsdaChartView() {
    
    const [yearData, setYearData] = useState({year1: "2010", year2: "2024"})

    const recalls = fsis

    const { year1, year2 } = yearData
 
const returnData = (recalls, year1, year2) => {
    const data = []
    const newArray = []
    recalls.map(x => x.field_recall_reason).forEach(x => {
        if (x.includes(',')) {
          newArray.push(...x.split(','))
        } else {
          newArray.push(x)
        }
      })
      
    Array.from(new Set(newArray.map(x => x.trim())))
    .forEach(field => {
        const subData = { name: field === "" ? 'Unnamed' : field, recalls: 0}
        recalls.filter(recall => recall.field_year >= year1 && recall.field_year <= year2)
        .forEach(recall => {
            recall.field_recall_reason.includes(field) && field !== "" && subData.recalls++
            recall.field_recall_reason === "" && field.length === 0 && subData.recalls++
        })
        data.push(subData)
    })
    return data
}

const returnYearData = () => {
    const data = []
    Array.from(new Set(recalls.map(x => x.field_year)))
    .sort((x,y) => {
        if(x>y) return 1
        if(x<y) return -1
    }
    )
    .forEach(field => {
        const subData = {name:field, recalls:0}
        recalls.forEach(recall => recall.field_year === field && subData.recalls++)
        data.push(subData)
    })
    return data
}

const returnRiskData = (recalls, year1, year2) => {
    const data = []
    Array.from(new Set(recalls.map(x => x.field_recall_classification)))
    .sort((x,y) => {
        if(x>y) return 1
        if(x<y) return -1
    }
    )
    .forEach(field => {
        const subData = {name:field, recalls:0}
        recalls
        .filter(recall => recall.field_year >= year1 && recall.field_year <= year2)
        .forEach(recall => recall.field_recall_classification === field && subData.recalls++)
        data.push(subData)
    })
    return data
}

const returnStateData = (recalls, year1, year2) => {
    const data = []
    const newArray = []
      recalls.map(x => x.field_states).filter(x => x !== "").forEach(x => {
        if (x.includes(',')) {
          newArray.push(...x.split(','))
        } else {
          newArray.push(x)
        }
      })
      Array.from(new Set(newArray.map(x => x.trim()))).sort((x, y) => {
        if (x > y) return 1
        return -1
      }).forEach(field => {
        const subData = {name:field, recalls:0}
        recalls
        .filter(recall => recall.field_year >= year1 && recall.field_year <= year2)
        .forEach(recall => recall.field_states.includes(field) && subData.recalls++)
        data.push(subData)
    })
    return data
}

const changeYear1 = (e) => {
    if(+year1 > +year2) {
        console.log('greater')
        setYearData({year2: e.target.value, year1: year2
        })
    } else {
        console.log('ok')
        setYearData(prevState => ({
            ...prevState, year1: e.target.value
        }))
    }
}
const changeYear2 = (e) => {
    if(+year2 < +year1) {
        setYearData(prevState => ({
            ...prevState, year2: year1, year1: e.target.value
        }))
    } else {
        setYearData(prevState => ({
            ...prevState, year2: e.target.value
        }))
    }
}

const data = useMemo(() => returnData(recalls, year1, year2), [recalls, year1, year2])
const data1 = returnYearData()
const data2 = useMemo(() => returnRiskData(recalls, year1, year2), [recalls, year1, year2])
const data3 = useMemo(() => returnStateData(recalls, year1, year2), [recalls, year1, year2])

  return (
    <>
    
    <div className="chart">
            <div className='chart-heading'>Number of recalls per year since 2010</div>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={400} data={data1}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="recalls" fill='black' activeBar={<Rectangle fill='gold' stroke='purple' />} />
        </BarChart>
        </ResponsiveContainer>
        </div>
    <div className='chart'>
        <div className='chart-heading'>Reasons for recalls and corresponding numbers</div>
        <div className='jump'>
        <label htmlFor="jump">Range of years:</label>
        <select onChange={changeYear1} name="jump" id="jump">{
            Array.from(new Set(recalls.map(x => x.field_year))).sort((x, y) => {
                if (x > y) return 1
                return -1
              }).map((year1, idx) => (
                <option key={idx} name="year1" value={year1}>{year1}</option>
              ))
        }</select>
        <label htmlFor="jump">to:</label>
        <select onChange={changeYear2} name="jump" id="jump">{
            Array.from(new Set(recalls.map(x => x.field_year))).sort((x, y) => {
                if (x > y) return -1
                return 1
              }).map((year2, idx) => (
                <option key={idx} name="year2" value={year2}>{year2}</option>
              ))
        }</select>
        </div>
    <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={400} data={data}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="recalls" fill='black' activeBar={<Rectangle fill='gold' stroke='purple' />} />
        </BarChart>
        </ResponsiveContainer>
        </div>
        <div className="chart">
            <div className='chart-heading'>Risk levels for recalls and corresponding numbers</div>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={400} data={data2}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="recalls" fill='black' activeBar={<Rectangle fill='gold' stroke='purple' />} />
        </BarChart>
        </ResponsiveContainer>
        </div>

        <div className="chart">
            <div className='chart-heading'>Number of recalls for each state</div>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={400} data={data3}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="recalls" fill='black' activeBar={<Rectangle fill='gold' stroke='purple' />} />
        </BarChart>
        </ResponsiveContainer>
        </div>
        </>
  )
}

export default UsdaChartView