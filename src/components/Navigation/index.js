import React, {useState, useEffect}from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';



const Show = (props) => {
  return (
    <div
    className="navigation-list"
      onClick={props.onMenuClick}
    >
      <section>Menu</section>
    </div>
  )
}

const Navigation = (props) => {
  const onNavClick = () => {
    // props.dispatch({
    //   type:'CHANGE_PAGE'
    // })
  }
  const [showMenu, setShowMenu] = useState(false)

  const onMenuClick = () => {
    setShowMenu(!showMenu)
  }

  return(


    <div className="navigation">
    {showMenu == true ? <div className="">
      <Show

        onMenuClick={onMenuClick}
      />
      <Link className="navigation-list" to="/">
        <section className="mymain">
          <span className="mymainLoc"
                onClick={onNavClick}
          >Home</span>
        </section>
      </Link>

      <Link className="navigation-list" to="/works">
        <section className="mymain">
          <span className="mymainLoc"
                onClick={onNavClick}
          >Artworks</span>
        </section>

      </Link>
      <Link className="navigation-list" to="/about">
        <section className="myabout">
          <span className="myaboutLoc"
                onClick={onNavClick}
          >About</span>
        </section>
      </Link>
      <Link className="navigation-list" to="/contact">
        <section className="myfeedback">
          <span className="myfeedbackLoc"
                onClick={onNavClick}
          >Contact</span>
        </section>
      </Link>
      <Link className="navigation-list" to="/motive">
        <section className="">
          <span className=""
                onClick={onNavClick}
          >Motive</span>
        </section>
      </Link>
      <Link className="navigation-list" to="/exhibitions">
        <section className="">
          <span className=""
                onClick={onNavClick}
          >Exhibitions</span>
        </section>
      </Link>

    </div> :
        <Show
          onMenuClick={onMenuClick}
        />
    }



      <div className="bubble"></div>
    </div>
  )
};


// export default connect()(Navigation);
export default Navigation
