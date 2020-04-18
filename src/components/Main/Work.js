import React, {useState} from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import SmallImage from './SmallImage'

const Work = (props) => {
  // const onNavClick = () => {
  // }
  const [mainImage, setMainImage]  = useState(props.project.pictureURL)
  const [mainImageLink, setMainImageLink] = useState(props.project.link)

  const onChangeMainImage = (e) => {

    console.log(e.target.src)
    console.log(e.target)
    setMainImage(e.target.src)
    setMainImageLink(e.target.src)

  }

  return(
    <>
      <div className="work">
        <a href={mainImage}>
          <img className="workImage" src={mainImage} alt="mainimg"></img>
        </a>
        <div className="workDescription">
          <p>{props.project.title}</p>
          <p>{props.project.date}</p>
          <p>{props.project.description}</p>
        </div>
      </div>

        {props.project.sideImage.map(each => <SmallImage
              key={Object.keys(each)[0]}
              onChangeMainImage = {onChangeMainImage}
              imgurl = {each}
          />)}

    </>
  )
};


// export default connect()(Navigation);
export default Work
// <SmallImage
// onChangeMainImage={onChangeMainImage} project={props.project}/>
