import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import { useState, useEffect, useRef } from 'react';
import p5 from 'p5'
import axios from 'axios'
import Sketch from './Sketch'
import Table from './../../Table'

const MemoizedP5Wrapper = React.memo(P5Wrapper)
const MemoizedTable = React.memo(Table)

// new p5(sketch, 'container')



function SketchWrapper(props, action) {
    const initialStationIndex = 2
    const [waveDataState, setWaveDataState] = useState('');
    const [stationState, setStationState] = useState(Object.values(stations[initialStationIndex])[0]);
    const [pauseState, setPauseState] = useState(false);
    const [placeHolder, setPlaceHolder] = useState('Pick Your Spot');
    // const [spots, setSpots] = useState(false);
    const inputEl = useRef(null);

    // const [liveWaveDataState, setLiveWaveDataState] = useState('')
    const mySketchAbsolute = {
      pointerEvents: 'none',
      position: 'absolute',
      top: '0px',
      left: '0px'
    }

    const inputContainer = {
      width: '400px',
      display:'column',
      position: 'relative'
    }

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

    const onFetchData = (e) => {
      e.preventDefault()
      axios.get('http://localhost:3002/api/waveDB/sample')
       .then(response => {
        setWaveDataState(convertCsv(response.data))
       })
       .catch(err => console.log(err))
    }

    const onPostData = (e) => {
      e.preventDefault()
      axios.post('http://localhost:3002/api/waveDB/data', { areacode: 51212 })
       .then(response => {
        setWaveDataState(convertCsv(response.data))
       })
       .catch(err => console.log(err))
    }

    useEffect(()=>{
      axios.get('http://localhost:3002/api/waveDB/sample')
       .then(response => {
        setWaveDataState(convertCsv(response.data))
       })
       .catch(err => console.log(err))
    }, [])

    useEffect(()=>{
      console.log('changed!')
      console.log(waveDataState, 'waveDataState')
    },[waveDataState])

    const onHandleChange = (e) => {
      var getSiblings = function (elem) {
      	return Array.prototype.filter.call(elem.parentNode.children, function (sibling) {
      		return sibling !== elem;
      	});
      };
      let siblings = getSiblings(e.target.parentElement)
      siblings.forEach(each => each.setAttribute("class", "hidden"))


      // setInputChecked(!inputChecked)
      if(e.target.checked) {
          e.target.parentElement.setAttribute("class", "show");
      }


      e.preventDefault()
      setPlaceHolder(e.target.name)
      setStationState(e.target.value)
    }

    const onStationSubmit = (e) => {
      e.preventDefault()
      console.log(stationState)
      let stationCode = stationState

      axios.post('http://localhost:3002/api/waveDB/official', {areacode: stationCode})
       .then(response => {
        setWaveDataState(convertCsv(response.data))
       })
       .catch(err => console.log(err))
    }

    const onPause = (e) => {
      e.preventDefault()
      setPauseState(!pauseState)
      console.log(pauseState)
    }

    const focus = {
      backgroundColor:'olive'
    }
    const nothing = {}
    // style={inputChecked === true ? focus : {}}
    const onPlaceHolder = (e) => {
      // setSpots(!spots)
      e.preventDefault()
      e.stopPropagation()
      // e.target.classList.toggle('add')
      // console.log(e.target.classList)
      console.log(inputEl.current)
      inputEl.current.classList.toggle('add')
      console.log(inputEl.current.classList,'reference element classList')
    }

    return (
        <div onClick={()=>{inputEl.current.classList.remove('add')}}>
            <h1>Seek Your Wave</h1>

            {/*
              <form className="customForm">
                <div className="custom-select-box">
                    <div className="custom-select">
                        <select className="select-box" onChange={onHandleChange}>

                              {stations.map((each, index) =>
                                <option className="select-box-option" selected={index == initialStationIndex ? true: false} key={index} value={Object.values(each)}>
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


            <form className="customForm">
              <div onClick={onPlaceHolder} className="placeHolder" >{placeHolder}</div>

              <div ref={inputEl} className="customSelectOption">
                {stations.map((each, index) =>
                  <label key={index} className="hidden">
                      <input className="hiddenInput" onChange={onHandleChange} type="radio" name={Object.keys(each)} value={Object.values(each)}/>
                      <span className=""><i></i>{Object.keys(each)}</span>
                  </label>
                )}
                <span>&nbsp;</span>
                {stations2.map((each, index) =>
                  <label key={index} className="hidden">
                      <input className="hiddenInput" onChange={onHandleChange} type="radio" name={Object.keys(each)} value={Object.values(each)}/>
                      <span className=""><i></i>{Object.keys(each)}</span>
                  </label>
                )}
                <span>&nbsp;</span>
                {stations3.map((each, index) =>
                  <label key={index} className="hidden">
                      <input className="hiddenInput" onChange={onHandleChange} type="radio" name={Object.keys(each)} value={Object.values(each)}/>
                      <span className=""><i></i>{Object.keys(each)}</span>
                  </label>
                )}
              </div>
              <button
                className="customButton"
                onClick={onStationSubmit}
                type="button"
              >
                Request New Data
              </button>
            </form>


            <form className="customForm" onSubmit={onFetchData}>

              <div className="customInteract">
                <button className="customButton" onClick={onPause} >
                  Pause
                </button>
                <button className="customButton" type="submit">
                  Sample Swell
                </button>
              </div>

              {/*
                sample and america data
                <button onClick={onPostData} type="button">Post to US</button>
                */}
            </form>
            <MemoizedTable
              waveDataState={waveDataState}
            />
            <div style={mySketchAbsolute} >
              <MemoizedP5Wrapper
                pauseState={pauseState}
                waveData={waveDataState}
                sketch={Sketch}
               />
            </div>
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


export default SketchWrapper;
