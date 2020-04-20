import React from 'react'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import * as api from '../../api'
import FetchForm from '../FetchForm'
import Close from '../Close'


function Table(props) {
  const current = new Date()
  const [currentHour, setCurrentHour] = useState(current.getHours())
  const [currentDate, setCurrentDate] = useState(current.getDate())
  const [time, setTime] = useState(current.toLocaleTimeString());
  // const secondsPassed = useRef(0);



  const initialStationIndex = 2
  const convertCsv = (res) => {
    let csv = res
    let splitCsv = csv.split('\n')
    let nestedArrCsv = []

    // splitCsv.forEach(each => each.split(','))
    for(let i = 0; i < 25; i ++) {
      nestedArrCsv[i]  = splitCsv[i].split(',')
    }
    // console.log(nestedArrCsv)
    return nestedArrCsv
  }

  const [waveState, setWaveState] = useState(convertCsv(props.waveData))
  const [stationState, setStationState] = useState(Object.values(stations[initialStationIndex])[0]);


  useEffect(() => {
    const timeout = setTimeout(() => {
      const date = new Date()
      // secondsPassed.current = secondsPassed.current + 1;
      setTime(date.toLocaleTimeString());
      // setCurrentDate(date.getDate())   //unneccesary prolly
      setCurrentHour(date.getHours())
    }, 1000);

    return () => {
      clearTimeout(timeout);
    }
  }, [time]);


  useEffect(()=>{   // update waveDataState after store is updated
    console.log(props.waveData,'posted and new data?-check')
    setWaveState(convertCsv(props.waveData))
  },[props.waveData])

  useEffect(()=>{
    api.getWaveDataAuthorized().then(res => {
      console.log(res,'huh')
    })
  },[])

  //
  // useEffect(()=>{
  //   if(props.waveDataState) {
  //       let dataSheet = props.waveDataState
  //       if(dataSheet.length > 0) {dataSheet.shift()}
  //       setWaveState(dataSheet)
  //   }
  //   // console.log(waveState)
  // },[props.waveDataState, waveState])
  //
  // useEffect(()=>{
  //   axios.get('http://localhost:3002/api/waveDB/sample')
  //    .then(response => {
  //     setWaveState(convertCsv(response.data))
  //    })
  //    .catch(err => console.log(err))
  // },[])
  //
  //
  //
  // const onHandleChange = (e) => {
  //   e.preventDefault()
  //   setStationState(e.target.value)
  // }
  //
  // const onStationSubmit = (e) => {
  //   e.preventDefault()
  //   // console.log(stationState)
  //   let stationCode = stationState
  //
  //   axios.post('http://localhost:3002/api/waveDB/official', {areacode: stationCode})
  //    .then(response => {
  //     setWaveState(convertCsv(response.data))
  //    })
  //    .catch(err => console.log(err))
  // }
  const onAddTime = (e) => {
    e.preventDefault()
    // setTime(time + 1)
    setCurrentHour(10)

    // console.log(time)
  }




  return (
    <div className="chart">
        {/*
          <form className="customForm">
            <div className="custom-select-box">
                <div className="custom-select">
                    <select className="select-box" onChange={onHandleChange}>

                          {stations.map((each, index) =>
                            <option className="select-box-option" defaultValue={index == initialStationIndex ? true: false} key={index} value={Object.values(each)}>
                              {Object.keys(each)}
                            </option>
                          )}
                           <option disabled>&nbsp;</option>
                          {stations2.map((each, index) =>
                            <option className="select-box-option" key={index} value={Object.values(each)}>
                              {Object.keys(each)}
                            </option>
                          )}
                           <option disabled>&nbsp;</option>
                          {stations3.map((each, index) =>
                            <option className="select-box-option" key={index} value={Object.values(each)}>
                              {Object.keys(each)}
                            </option>
                          )}

                    </select>
                </div>
                <button
                  className="customButton"
                  onClick={onStationSubmit}
                  type="button"
                >
                  Post Areacode
                </button>
            </div>
          </form>

          */}
          <Close />
          <h3 onClick={onAddTime}>{time}</h3>
          <table className="dataTable">
              <thead>
                <tr>
                  <th scope="col">Date&nbsp;</th>
                  <th scope="col">Time&nbsp;</th>
                  <th scope="col">Tide (meter)&nbsp;</th>
                  <th scope="col">Swell (ft)&nbsp;</th>
                  <th scope="col">Periods&nbsp;</th>
                  <th scope="col">Temperature&nbsp;</th>
                </tr>
              </thead>
              <tbody className="">
                {waveState.length > 0 ? waveState.slice(1,25).map((each, index) =>
                <tr key={index} className="dataBlock" className={currentHour == each[4] && each[3] == currentDate ? "dataBlock confirm" : "dataBlock"}>
                  <th className="dataCell">{each[3]}</th>
                  <th className="dataCell">{each[4]}:00{ each[4] < 12? 'am':'pm'}</th>
                  <th className="dataCell">{each[0]}</th>
                  <th className="dataCell">{each[1]}</th>
                  <th className="dataCell">{each[2]}</th>
                  <th className="dataCell">{each[5]}</th>
                </tr>) : <tr></tr>}

                <tr>
                  {/*<th scope="row">01:00AM</th>*/}
                </tr>
              </tbody>
          </table>

    </div>
  )
}



let stations = [
  {"제주항":22457},
  {"협재":22486},
  {"영락":22505},
  {"가파도":22476},
  {"중문":22458},
  {"신산":22495},
  {"우도":22469},
  {"김녕":22491}
]

// 남해동부
let stations2 = [
  {"남해":22498},
  {"사량도":22501},
  {"두미도":22450},
  {"연화도":22499},
  {"한산도":22467},
  {"소매물도":22485},
  {"잠도":22484},
  {"해금강":22455},
  {"다대포":22460},
  {"오륙도":22459},
  {"장안":22454},
]

// 동해중부
let stations3 = [
  {"삼척":22479},
  {"연곡":22451},
  {"토성":22471},
  {"울릉서부":22506},
  {"구암":22443},
  {"울릉읍":22464},
  {"혈암":22442},
  {"독도":22441},
]


function mapStateToProps(state) {
  // console.log(state, 'from reducer')
  const { waveData } = state.waveData;

  return {
    waveData: waveData
  };
}

export default connect(mapStateToProps)(Table);
