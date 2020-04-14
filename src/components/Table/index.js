import React from 'react';


function Table(props) {
  const dataSheet = props.waveDataState
  console.log(dataSheet,'dsheet')
  if(dataSheet.length > 0) {dataSheet.shift()}  //pops the first descriptions line
  return (
    <div id = "chart">
          <legend>Wave Chart</legend>
          <table className="dataTable">
            <caption><strong><i id="currentBeach">Location:</i></strong></caption>
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
              <tbody id= 'table_body'>
                {dataSheet.length > 0 ? props.waveDataState.map((each, index) =>
                <tr key={index} className="dataBlock">
                  <th className="dataCell">{each[3]}</th>
                  <th className="dataCell">{each[4]}:00{ each[4] < 12? 'am':'pm'}</th>
                  <th className="dataCell">{each[0]}</th>
                  <th className="dataCell">{each[1]}</th>
                  <th className="dataCell">{each[2]}</th>
                  <th className="dataCell">{each[5]}</th>
                </tr>) : 'well'}

                <tr>
                  {/*<th scope="row">01:00AM</th>*/}
                </tr>
              </tbody>
          </table>
    </div>
  )
}


export default Table
