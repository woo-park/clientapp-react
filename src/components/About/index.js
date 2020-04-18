import React, { Component } from 'react';

class About extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return(
        <div className="aboutComponent">
              <div className="about_sections" >
                      <h1>About Wave Generator</h1>
                      <h3>WOO PARK</h3>
                      <p>
                        The bar graphs are accurate and easy to read; however, they represent nothing near our excitements.
                        Even the bar graphs can be wrong because the bars are static representation of waves.
                        The numbers on the data chart are what get translated over to the bar graph, and once that process it done, what you see is what it is, and the rest is up to your imagination.
                      </p>
                      <p>
                        Sometimes, that unknown factor is what excites us before hopping on car and strapping our boards on top of our cars.
                        Yet, these bar graphs merely match up to our excitments when in fact our excitment goes off the roof. After being tired of looking at meaningless inaccurate numbers,
                        I've decided to make a replica of the real-world wave.
                      </p>
                      <p>
                        This visualization lies in between 2-dimensional and 3-dimensional spaces.
                        A set of wave is created using 2-dimensional lines.
                        It mimicks the waves rolling out onto the shore.
                        The wave generator is powered by the Korea's The National Oceanic and Atmospheric Administration <a href="https://www.weather.go.kr/w/ocean/today.do">(기상청)</a>.
                      </p>
                      <p>
                        What Wave Generator differs a little but greatly from the static bar graphs is that the eace wave set is truly different from one another.
                        Like the wave you would embrace in the ocean, the wave is truly random using <a href="https://en.wikipedia.org/wiki/Perlin_noise">Ken Perlin's noise</a> algorithm.
                        This noise variable integrated into the visualization allows us to experience the margin of error from our given data set.
                      </p>
              </div>
              <div className="about_sections">
                <p>
                  The project began with using Processing under the supervision of Catherine Schmitz. With Processing's unique easy setup, I was able to focus primarily on developing 3-dimensional dynamic wave.
                  After witnessing its potential, the project shifted from Processing to P5.js and vanilla Javascript. With the right guidance with Craig Kapp, the project focused on making AJAX calls to a small custom server that provided with datasets.
                </p>
                <p>

                </p>
                <ul className="bulletPoints">
                    <li>
                      Jersey City Hall, NJ, 2019
                    </li>
                    <li>
                      Gwangju 19 Art Fair,KOREA,2019
                    </li>
                    <li>
                      Pearl River Public Library a two person exhibition,NJ ,2019
                    </li>
                    <li>
                      14C  Art fair ,NJ, 2020
                    </li>
                  </ul>
              </div>
      </div>
    )
  }
}

export default About
