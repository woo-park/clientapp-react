import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import { useState, useEffect, useRef } from 'react';
import p5 from 'p5'
import axios from 'axios'
import Sketch from './Sketch'


// new p5(sketch, 'container')

function SketchWrapper(props, action) {
    const [waveDataState, setWaveDataState] = useState('');

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
      axios.get('http://localhost:3002/api/waveDB/data')
       .then(response => {

        setWaveDataState(convertCsv(response.data))
        console.log(waveDataState)
       })
       .catch(err => console.log(err))
    }

    const onPostData = (e) => {
      e.preventDefault()
      axios.post('http://localhost:3002/api/waveDB/data', { areacode: 51212 })
       .then(response => {
        setWaveDataState(convertCsv(response.data))
        console.log(waveDataState)
       })
       .catch(err => console.log(err))
    }



    return (
        <div style={inputContainer }>
            <h1>Seek Your Wave</h1>
            <form onSubmit={onFetchData}>
              <button onClick={onPostData} type="button">post</button>
              <button type="submit">
                Sample Data
              </button>
            </form>

            <div style={mySketchAbsolute} >
              <P5Wrapper
                waveData={waveDataState}
                sketch={Sketch}
               />
            </div>
        </div>
    )
}

export default SketchWrapper;
