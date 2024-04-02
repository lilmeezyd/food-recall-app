import { BarChart, Bar, Rectangle, Cell, Legend, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import states from '../states/states.json'
import { useState, useMemo, useContext } from 'react'
import { RecallContext } from '../RecallContext'

function FdaChartView() {
    const [yearData, setYearData] = useState({year1: "2018", year2: "2024"})

    const recalls = useContext(RecallContext).returnFda()

    const { year1, year2 } = yearData

    const returnYearData = () => {
        const data = []
        console.log(recalls)
        Array.from(new Set(recalls.map(x => x.report_date.substring(0,4))))
        .sort((x,y) => {
            if(x>y) return 1
            if(x<y) return -1
        }
        )
        .forEach(field => {
            const subData = {name:field, recalls:0}
            recalls
            .forEach(recall => recall.report_date.substring(0,4) === field && subData.recalls++)
            data.push(subData)
        })
        return data
    }
    const returnRiskData = (recalls, year1, year2) => {
        const data = []
        Array.from(new Set(recalls.map(x => x.classification)))
        .sort((x,y) => {
            if(x>y) return 1
            if(x<y) return -1
        }
        )
        .forEach(field => {
            const subData = {name:field, recalls:0}
            recalls
            .filter(recall => recall.report_date.substring(0,4) >= year1 && recall.report_date.substring(0,4) <= year2)
            .forEach(recall => recall.classification === field && subData.recalls++)
            data.push(subData)
        })
        return data
    }
    
    const returnRecallType = (recalls, year1, year2) => {
        const data = []
        Array.from(new Set(recalls.map(x => x.status)))
        .sort((x,y) => {
            if(x>y) return 1
            if(x<y) return -1
        }
        )
        .forEach(field => {
            const subData = {name:field, recalls:0}
            recalls
            .filter(recall => recall.report_date.substring(0,4) >= year1 && recall.report_date.substring(0,4) <= year2)
            .forEach(recall => recall.status === field && subData.recalls++)
            data.push(subData)
        })
        return data
    }

    const returnStateData = (recalls, year1, year2) => {
        const data = []
        Object.keys(states)
        .sort((x, y) => {
            if (x > y) return 1
            return -1
          }).forEach(field => {
            const subData = {name:field, recalls: 0}
            recalls
            .filter(recall => recall.report_date.substring(0,4) >= year1 && recall.report_date.substring(0,4) <= year2)
            .forEach(x => (x.distribution_pattern.toLowerCase().includes(field.toLowerCase()) || x.distribution_pattern.includes(states[field])) && subData.recalls++)
            data.push(subData)
        })
        return data
    }

    const changeYear1 = (e) => {
        if(+e.target.value > +year2) {
            setYearData({year2: e.target.value, year1: year2
            })
        } else {
            setYearData(prevState => ({
                ...prevState, year1: e.target.value
            }))
        }
    }
    const changeYear2 = (e) => {
        if(+e.target.value < +year1) {
            setYearData(prevState => ({
                ...prevState, year2: year1, year1: e.target.value
            }))
        } else {
            setYearData(prevState => ({
                ...prevState, year2: e.target.value
            }))
        }
    }

    const data1 = returnYearData()
    const data2 = useMemo(() => returnRiskData(recalls, year1, year2), [recalls, year1, year2])
    const data4 = useMemo(() => returnRecallType(recalls, year1, year2), [recalls, year1, year2])
    const data3 = useMemo(() => returnStateData(recalls, year1, year2), [recalls, year1, year2])
  return (
    <>
    {recalls.length === 0 ? <div>Loading...</div> : <>
    <div className="chart">
            <div className='chart-heading'>Number of recalls per year since 2018</div>
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
    <div className='jump'>
        <label htmlFor="jump">Range of years:</label>
        <select onChange={changeYear1} name="jump" id="jump">{
            Array.from(new Set(recalls.map(x => x.report_date.substring(0,4)))).sort((x, y) => {
                if (x > y) return 1
                return -1
              }).map((year1, idx) => (
                <option key={idx} name={year1} value={year1}>{year1}</option>
              ))
        }</select>
        <label htmlFor="jump">to:</label>
        <select onChange={changeYear2} name="jump" id="jump">{
            Array.from(new Set(recalls.map(x => x.report_date.substring(0,4)))).sort((x, y) => {
                if (x > y) return -1
                return 1
              }).map((year2, idx) => (
                <option key={idx} name={year2} value={year2}>{year2}</option>
              ))
        }</select>
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
            <div className='chart-heading'>Status of recalls and the corresponding numbers</div>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={400} data={data4}
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
        </>}
    <p className="foot-note">*Data retrieved from the fda website</p>
    </>
  )
}

export default FdaChartView