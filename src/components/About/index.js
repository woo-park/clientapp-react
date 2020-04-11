import React, { Component } from 'react';

class About extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return(
        <div className="aboutComponent">
              <div className="about_sections" >
                      <h1>About Me</h1>
                      <h3>JANE PARK</h3>
                      <p>
                        A Korean artist, Jane Park, expresses her feeling and emotion through color. Each pigment represents some larger idea or truth. For instance, the color blue symbolizes continuous love for life and the color purple often stands for treatment and health.
                      </p>

                      <p>
                        Park believes there exists a higher dimension containing all the fundamental rules that regulate our universe. In this realm there exists various elements including love, natural beauty, blessings, unconscious energy and so on. And she tries to express these thought her colors.
                      </p>
              </div>
              <div className="about_sections">
                Jane Park holds a B.F.A. from Ehwa Women’s University. She has participated in several group exhibitions at
                  <ul className="bulletPoints">
                    <li>
                      New York Art Expo, NY,2015
                    </li>
                    <li>
                      Art Mora Gallery, NJ,2017
                    </li>
                    <li>
                      The Monmouth Museum, NJ ,2017
                    </li>
                    <li>
                    14C  Art fair ,NJ, 2019
                    </li>
                    <li>
                    KCC Gallery, NJ, 2019
                    </li>
                    <li>
                      Jersey City Hall, NJ, 2019
                    </li>
                    <li>
                    Gwangju 19 Art Fair,KOREA,2019
                    </li>
                    <li>Pearl River Public Library a two person exhibition,NJ ,2019
                    </li>
                    <li>14C  Art fair ,NJ, 2020
                    </li>
                  </ul>
                Also, she had a solo exhibition at Art Mora Gallery, NJ in 2016 / Fort Lee public library, NJ in 2017 / Hushed Gallery, Korea in 2017 / Bodre-Andamiro ,Korea in 2017 / Pizzart, NY in 2018.
              </div>
      </div>
    )
  }
}

export default About
