import React, {  useEffect, useState } from 'react';

const Individual = (props) => {
  const [imagePath, setImagePath] = useState('')

  useEffect(()=>{
    let individualPath = '/assets/images' + props.location.pathname + '.jpeg'

    setImagePath(individualPath)
    console.log(props.location.pathname,'from indi')
  },[])
  // this.state = {
  //   imagePath:`/assets/images${this.props.location.pathname}.jpeg`
  // }
  // this.props.location.pathname

  // componentDidMount() {
  //   this.setState({
  //     imagePath: this.props.location.pathname
  //   })
  //
  //   // console.log(this.state.imagePath)
  // }
console.log(imagePath,'imgpath')
  return(
    <div className="component">
      <img className="individualImage" src={imagePath}>

      </img>
    </div>
  )

}

export default Individual;
