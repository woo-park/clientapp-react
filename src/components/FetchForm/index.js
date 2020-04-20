import React from 'react'


function FetchForm({stations, stations2, stations3, onHandleChange, onStationSubmit, onPlaceHolder, placeHolder, inputEl}) {

  return (
      <form className="">
        {/*<Close />*/}

        <div onClick={onPlaceHolder} className="placeHolder" >{placeHolder}</div>

        <div ref={inputEl} className="customSelectOption">
          {stations.map((each, index) =>
            <label key={index} className="hidden">
                <input className="hiddenInput" onClick={onHandleChange} type="radio" name={Object.keys(each)} value={Object.values(each)}/>
                <span className=""><i></i>{Object.keys(each)}</span>
            </label>
          )}
          <span>&nbsp;</span>
          {stations2.map((each, index) =>
            <label key={index} className="hidden">
                <input className="hiddenInput" onClick={onHandleChange} type="radio" name={Object.keys(each)} value={Object.values(each)}/>
                <span className=""><i></i>{Object.keys(each)}</span>
            </label>
          )}
          <span>&nbsp;</span>
          {stations3.map((each, index) =>
            <label key={index} className="hidden">
                <input className="hiddenInput" onClick={onHandleChange} type="radio" name={Object.keys(each)} value={Object.values(each)}/>
                <span className=""><i></i>{Object.keys(each)}</span>
            </label>
          )}
        </div>
        <button
          className="customButton"
          onClick={(e)=>{onStationSubmit(e); inputEl.current.classList.remove('add')}}
          type="button"
        >
          Request New Data
        </button>
      </form>
  )
}


export default FetchForm
