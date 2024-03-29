import React from 'react';
import './App.css';

import { useState, useEffect } from 'react';
import {BrowserRouter , Switch, Route} from 'react-router-dom';
import About from './components/About';
// // import Menu from './components/Menu';
import Main from './components/Main';
import Navigation from './components/Navigation';
import Motive from './components/Motive';
import Wave from './components/Wave';
import Contact from './components/Contact';
import Individual from './components/Individual';
import FindEmoji from './components/FindEmoji';
import Posts from './components/Posts';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import initData from './initData.js';


import MyApp from './components/MyApp';
import Login from './components/Login';
import Register from './components/Register';
import Table from './components/Table'


function App(props) {
  const [mobile, setMobile] = useState(false);
  const currentYear = new Date().getFullYear();

  // console.log(props.waveData,'IMPORTANT')
  // console.log(props)
  useEffect(()=>{
    document.title = 'Wave Seeker';

    const checkDevice = () => {
      if (window.screen.width < 660) {
        setMobile(true)
        return
      } else {
        setMobile(false)
      }
      console.log('mobile', mobile)
    }
    checkDevice();

    window.addEventListener("resize", function(){
      checkDevice();
        // bubble.style.top = '-200px';
        // bubble.style.left = '-200px';
        // sections.forEach(section => {section.style.color = '#222222'}); //change all to black
        // // console.log('RESIZED')
    });
  })

  const onVideo = (e) => {
    e.target.play()
  }

  return (
    <BrowserRouter>
    {/* <Switch> doesn't work */}
        <div className="container">

          <div className="item-a header one-edge-shadow">
            <div className="portfolioLogo">
              <h1>Wave Generator</h1>
                {/*<div className="headerLogo">Head logo2</div>*/}
            </div>
            <Link className="headerMenu navigation-list" to="/login">
              Login
            </Link>
            <Link className="headerMenu navigation-list" to="/register">
              Register
            </Link>
            <Link className="headerMenu navigation-list" to="/findEmoji">
              Find Emoji
            </Link>
            <Link className="headerMenu navigation-list" to="/posts">
              Blog Posts
            </Link>
            <Navigation className=""/>
          </div>

          <div className="item-c side middle">
            {mobile == true ? <div className="message">mobile!</div> : ''}
            <video onClick={onVideo} muted autoPlay loop className="myVideo">
              {/*<source src="assets/videos/waveShore720.mov" ></source>*/}
              <source src="assets/videos/waveBlackOut.mp4" ></source>

            </video>
          </div>

          <div className="item-b main middle">
            <Route exact path='/' component={MyApp} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />

            <Route exact path="/works" component={Main} />
            <Route exact path="/about" component={About} />
            <Route exact path="/motive" component={Motive} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/wave" component={Wave} />
            <Route exact path="/findEmoji" component={FindEmoji} />
            <Route exact path="/table" component={Table} />

            <Route exact path="/posts" component={Posts} />
            {/*  {initData.map(each =>
                each.sideImage.map(item => {
                    let pathh = Object.keys(item)[0]

                    return <Route
                    key={pathh}
                    exact
                    path={pathh} component={Individual} />
                  }
                )
              )}*/}




          </div>

          <div className="item-d footer">
            &copy; Copyright {currentYear}, W2O.Inc
          </div>

        </div>
    </BrowserRouter>
  );
}

function mapStateToProps(state) {
  // console.log(state, 'from reducer')
  const { waveData } = state.waveData;

  return {
    waveData: waveData
  };
}


export default connect(mapStateToProps)(App);


// <img src="./assets/images/flower1.jpeg">
// </img>

// <Route exact path="/flower1" component={Individual} />
// <Route exact path="/flower2" component={Individual} />
// <Route exact path="/flower3" component={Individual} />

//
// {initData.map(each => <Route exact path={each.link} component={Individual}
//   key={each.id} />
// )}
