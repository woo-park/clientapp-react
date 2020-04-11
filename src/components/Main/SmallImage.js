import React from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';


const SmallImage = (props) => {
  const onImageClick = props.onChangeMainImage

  return(
    <>
        <img
        onClick={onImageClick}
        className="smallImage"
        id="sample1"
        src={props.imgurl.sample1}></img>
        <img
        onClick={onImageClick}
        className="smallImage"
        id="sample2" src={props.imgurl.sample2}></img>
        <img
        onClick={onImageClick}
        className="smallImage"
        id="sample3"
        src={props.imgurl.sample3}></img>
        <img
        onClick={onImageClick}
        id="sample4"
        className="smallImage" src={props.imgurl.sample4}></img>
    </>
  )
};


// export default connect()(Navigation);
export default SmallImage
