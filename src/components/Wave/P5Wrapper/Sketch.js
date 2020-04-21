function Sketch(p) {
  // data
  let sampleData = []
  let tide = [];
  let swellSize = [];
  let swellPeriods = [];
  let swellDates = []   // dont really need this but wtv
  let swellTime = []    // might be handy later on
  let swellTemp = []

  //timer
  let hourly_counter = new Date().getHours()
  let mySec = 0
  let myMin = 0
  let webGameTime = 1
  let am_or_pm

  let myMinute = 0
  let myHour = 0
  let myymin = 0
  //sound
  // let mySound
  let wavePlayState = 1 // by default

  var start = new Date().getTime(),
  startMin = new Date().getMinutes(),
    time = 0,
    elapsed = '0.0'
  function instance() {
      time += 100;

      elapsed = Math.floor(time / 100) / 10;
      if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }

      var diff = (new Date().getTime() - start) - time;
      // if(time >= 60000) {
      //   time = 0
      //   elapsed = '0.0'
      //   myymin += 1
      // }

      if(elapsed % 60 == 0) {
        startMin += 1
        // console.log('hourly_counter', hourly_counter, startMin)
      }
      if(startMin > 59){
        hourly_counter = new Date().getHours()
        startMin = new Date().getMinutes()
        // console.log('hourly_counter', hourly_counter, startMin)
      }

      window.setTimeout(instance, (100 - diff));
  }
  window.setTimeout(instance, 100);



  function myClock(p) {
    if (p.frameCount % 60 === 0) {
      mySec += 1
    }

    myMin = Math.floor(mySec / webGameTime)      //!important => customize time

    hourly_counter = myMin % 24;
    //
    //
    // myMin = Math.floor(mySec / webGameTime) //!important - defines 1hr
    //
    // console.log(myMin)
    // hourly_counter = myMin % 24
    // am_or_pm = hourly_counter === 23 || hourly_counter < 12? 'am' : 'pm';

  }



  // wave1
  let lines_y1 = []  // Mimicking float[] y = new float[1400];
  let lines_y2 = []  // Need to shift y1 & y2
  let lines_x1 = []
  let lines_x2 = []

  let wave
  let firstMark
  let secondMark
  let spreadOut = 0
  let spread = 0
  let lineDifference = 0
  let previousLineLength = 0
  let line_length = 0
  let moveDown = 0.8
  let wave1Angle = 0

  for(let j = 0; j < 500; j ++) {
      lines_y1.push(0)
      lines_y2.push(0)
      lines_x1.push(0)
      lines_x2.push(0)
  }

  function shiftUp() {
      for(let i = lines_y1.length - 1; i > 0; i -= 1) {
        lines_y1[i] = lines_y1[i-1] + moveDown
        lines_y2[i] = lines_y2[i-1] + moveDown
        lines_x1[i] = lines_x1[i-1]
        lines_x2[i] = lines_x2[i-1]
      }
  }
  //next step -> figure out why diff is around 1.4 ish bug


  // wave2
  let linesY1 = []
  let linesY2 = []
  let wave2
  let angleIncre = 0
  let temp_noise = 0.005
  let wave2Angle = 0

  let lineCount = 6


  for(let k = 0; k < window.innerWidth - 300; k ++) {
      linesY1.push(0)
      linesY2.push(0)
  }

  function shiftRight() {
    for(let i = linesY1.length - 1; i > 0; i -= 1) {
        linesY1[i] = linesY1[i-1];
        linesY2[i] = linesY2[i-1];
    }
  }


  let counter = 1
  let myFrameCount = 2

  let pauseState = false
  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {

    if(props.pauseState !== '') {
      // console.log(props.pauseState)
      pauseState = props.pauseState
    }

    if(props.lineCount > 0) {
      lineCount += 1
    } else if (props.lineCount < 0){
      lineCount -= 1
    }
    if(props.wavePlayState) {
      wavePlayState = props.wavePlayState
    }
    if(props.waveData) {
      // console.log(props.waveData)


      let waveDataState = props.waveData
      if(waveDataState !== '' || typeof waveDataState !== 'undefined') {

        waveDataState = parseData(waveDataState)
        if(typeof waveDataState !== 'undefined') {    //guard

          plotOutColumn(waveDataState)
          // console.log(waveDataState,'waveDataState')
          console.log('new data plotted')
        } else {
          console.log('props.waveData -> in sketch is undefined, should be getting matrix arr')
        }

      }
    }
  } // end of myCustomRedrawAccordingToNewPropsHandler

  function parseData(arr) {
    // looping 2-dimensional arr -> normalize, rows bc loadTable
    return arr.map((each, index) => {
      if(each.arr) {    // this is for loadTable -> initial sampleData request
        if (index != 0) {
          return each.arr.map((item, i) => {
            if (i == 0) {
              return p.map(item, 0, 1.7, -0.4, 0.4).toFixed(2)
            } else if (i == 1) {
              return p.map(item, 0, 12, 10, 400).toFixed(0)
            } else if (i == 2) {
              return p.map(item, 3, 15, 1, 1000 ).toFixed(0)
            } else if (i == 3) {  // date
              return item
            } else if (i == 4) {  // time
              return item
            } else if (i == 5) {  // time
              return item
            }
          })
        }
        return each.arr
      } else {            // requests through axios
        if (index != 0) {
          return each.map((item, i) => {
            if (i == 0) {
              return p.map(item, 0, 1.7, -0.4, 0.4).toFixed(2)
            } else if (i == 1) {
              return p.map(item, 0, 12, 10, 400).toFixed(0)
            } else if (i == 2) {
              return p.map(item, 3, 15, 1, 1000 ).toFixed(0)
            } else if (i == 3) {  // date
              return item
            } else if (i == 4) {  // time
              return item
            } else if (i == 5) {  // time
              return item
            }
          })
        } else {
          return each
        }
      }
    })
  }

  function plotOutColumn(arr) {
    arr.forEach((each, index) => {
      if(index !== 0) {
        tide[index - 1] = each[0]
        swellSize[index -1] = each[1]
        swellPeriods[index -1] = each[2]
        swellDates[index -1] = each[3]
        swellTime[index - 1] = each[4]
        swellTemp[index - 1] = each[5]
      }
    })
    // console.log(tide)
    // console.log(swellSize)
    // console.log(swellPeriods)
    // console.log('tide, swellSize, swellPeriods have been changed')
  }
  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

  p.preload = function() {
    // p.soundFormats('mp3', 'ogg')
    // p.loadSound('wave_sound.mp3',(sound) => {
    //   mySound = sound
    //   mySound.setVolume(0.1)
    // })

    // sampleData

    p.loadTable('/api/waveDB/sample', (sampleTable) => {
      // console.log(sampleTable.rows)
      // sampleData = [...sampleTable.rows]
      // console.log('preload initial sample request')
      sampleData = parseData(sampleTable.rows)
      // console.table(sampleData,'initial sample Data')
      plotOutColumn(sampleData)

    })  //end of callback
  }


  function bgLight (hourly_counter) {


    let hr = hourly_counter
    if (hr >= 0 && hr < 6) {              //midnight
      bgLight.bg_r += bgLight.inc_night
      bgLight.bg_g += bgLight.inc_night
      bgLight.bg_b += bgLight.inc_night
    } else if (hr >= 6 && hr < 12) {      //morning
      bgLight.bg_r += bgLight.inc_day
      bgLight.bg_g += bgLight.inc_day
      bgLight.bg_b += bgLight.inc_day

      bgLight.temp_a += 1;

      bgLight.temp_a = p.constrain(bgLight.temp_a, 0, 80);
      if(bgLight.temp_a < 79) {
          bgLight.bg_a = 90;           //turns the opacity to .9 so that another light source comes thru
      }


      bgLight.sun_r += 1
      bgLight.sun_g += 1
      bgLight.sun_b += 1

      bgLight.sun_r = p.constrain(bgLight.sun_r, 0, 255)
      bgLight.sun_g = p.constrain(bgLight.sun_g, 22, 254)
      bgLight.sun_b = p.constrain(bgLight.sun_b, 23, 107)

      p.fill(bgLight.sun_r, bgLight.sun_g, bgLight.sun_b, bgLight.temp_a)
      p.rect(0,0, p.width, p.height)
    } else if (hr >= 12 && hr < 18) { // afternoon
      bgLight.bg_r -= 0.3
      bgLight.bg_g -= 0.3
      bgLight.bg_b -= 0.3

      if (hr >= 13) {
        bgLight.temp_a -= 0.5;
        bgLight.sun_r -= 0.1
        bgLight.sun_g -= 0.1
        bgLight.sun_b -= 0.1

        bgLight.sun_r = p.constrain(bgLight.sun_r, 0, 255)
        bgLight.sun_g = p.constrain(bgLight.sun_g, 22, 254)
        bgLight.sun_b = p.constrain(bgLight.sun_b, 23, 107)
        bgLight.temp_a = p.constrain(bgLight.temp_a, 0, 80)
      }

      if(bgLight.temp_a < 79) {
        bgLight.bg_a = 100;
      }

      p.fill(bgLight.sun_r, bgLight.sun_g, bgLight.sun_b, bgLight.temp_a)
      p.rect(0,0, p.width, p.height)
    } else if (hr >= 18 && hr < 24) {
      bgLight.bg_r -= bgLight.inc_day;
      bgLight.bg_g -= bgLight.inc_day;
      bgLight.bg_b -= bgLight.inc_day;
    } else if (hr >= 24) {

    }

    bgLight.bg_r = p.constrain(bgLight.bg_r, 0, 255)
    bgLight.bg_g = p.constrain(bgLight.bg_g, 0, 255)
    bgLight.bg_b = p.constrain(bgLight.bg_b, 0, 255)

    p.fill(bgLight.bg_r, bgLight.bg_g, bgLight.bg_b, bgLight.bg_a)
    p.rect(0,0, p.width, p.height)
  }

  bgLight.bg_r = 0;
  bgLight.bg_g = 0;
  bgLight.bg_b = 0;
  bgLight.bg_a = 100;

  bgLight.inc_night = 0.05;        //inc smaller bc its during night
  bgLight.inc_day = 0.5;

  bgLight.temp_a = 0;

  bgLight.sun_r = 254;
  bgLight.sun_g = 84;
  bgLight.sun_b = 23;



    class WaveLeft {
      constructor(offset, waveHeightArr, wavePeriodsArr, exponential = 1.4) {

        //common
        this.noiseOffset = p.random(1000,2000);
        this.currentHour = hourly_counter //global
        this.sineCurve = (theta) => {
          return p.sin(theta)
        }
        this.waveHeightArr = waveHeightArr
        this.wavePeriodsArr = wavePeriodsArr
        this.waveHeight = this.waveHeightArr[this.currentHour]
        this.wavePeriods = this.wavePeriodsArr[this.currentHour]
        this.easing = 1

        //common different value
        this.between = p.windowHeight/2 + 200;     //from y1-top to y2-bot
        this.offset = offset;
        this.amplitude = 1 // * replaced with newAmplitude
        this.newAngle = 0.07
        this.newAmplitude = p.random(5, 100)
        this.adding_noise = 1
        this.temp_noise = 0.005

        //custom
        this.exponential = exponential
        this.x1 = 1;
        this.x2 = 1;
      }

      setCurrentHour(hourly_counter) {
        this.currentHour = hourly_counter
        // console.log(this.waveHeightArr)
        this.setCurrentWaveHeightPeriods()
      }

      setCurrentWaveHeightPeriods() {
        this.waveHeight = this.waveHeightArr[this.currentHour]
        this.wavePeriods = this.wavePeriodsArr[this.currentHour]
        // console.log(this.waveHeight, this.wavePeriods, this.currentHour)
      }

      addNoise() {
          let currentSinAngle = this.sineCurve(wave2Angle)

          if (currentSinAngle > -1 && currentSinAngle < -0.99995) { //very bottom

              this.temp_noise = p.map( p.noise(this.noiseOffset), 0, 1, 0, 0.15);
              this.easing = p.map(p.random(0,100), 0, 100, 0.5, 1.5);
              // this.setAmplitude()  // used for testing purposes
              // console.log(this.temp_noise)
          }
          else if (currentSinAngle > 0.9999 && currentSinAngle < 1) {           //very top point
          }

          if ( -1 < currentSinAngle && currentSinAngle < 1) {            //in between
              this.adding_noise = this.temp_noise

          }
      }

      // setAmplitude() {
      //   this.newAmplitude = p.random(400)
      //   this.newAngle = p.random(0.05, 0.005)
      // }

      setPerspective() {
        this.exponential = p.map(p.mouseY, 0, p.height, 1.3, 1.45)
      }

      amplitude_change(){
          this.newAmplitude = p.map(this.waveHeight, 0, p.width, 5, 100)     //hardcoding to see it doesn't fluctuates too much
          this.newAngle = p.map(this.wavePeriods, 0, p.width, 0.05, 0.005 )
          // increase += 0.4;        // or you can increment like this   //pass in the increase as arg
      }



      displayLines() {
          lineCount = p.constrain(lineCount, 2, 20)
          p.strokeCap(p.ROUND);
          p.strokeWeight(2);
          p.beginShape(p.LINES);
          wave2Angle += (this.newAngle * this.easing)

          this.amplitude = this.newAmplitude

          if(linesY1[1]){ this.offset = linesY1[1]}

          linesY1[0] = this.offset + this.sineCurve(wave2Angle) * (this.amplitude * this.adding_noise)     //top x,y
          linesY2[0] = this.offset + this.sineCurve(wave2Angle) * (this.amplitude * this.adding_noise) + this.between

          if(p.frameCount % myFrameCount == 0) {
            for(let i = 0; i < linesY1.length; i += lineCount) {  // 1, 2, 3, 4, 5, till window.innerWidth - 500
                let add_color = () => {
                    let r_normalize = p.map(i, 1, linesY1.length, 37, 11);
                    let g_normalize = p.map(i, 1, linesY1.length, 61, 50);
                    let b_normalize = p.map(i, 1, linesY1.length, 62,100);
                    this.opacity_percentile = p.map(i, 1, linesY1.length, 1, 0); //normalizing based on how many lines
                     p.stroke(`rgba(${r_normalize}%,${g_normalize}%,${b_normalize}%,${this.opacity_percentile})`);
                }
                add_color();

                let xPerspective = 500

                this.x1 = i + p.map(p.mouseX, 0, p.width, xPerspective, 0) - xPerspective -30
                this.x2 = p.pow(i, this.exponential) + p.map(p.mouseX, 0, p.width, 0, xPerspective)  - xPerspective

                p.vertex( this.x1, linesY1[i])
                p.vertex( this.x2, linesY2[i])
            }

            p.endShape();
          }

          this.noiseOffset += 0.001;
        }

    } // end of WaveLeft

    class WaveGenerator{
      constructor(offset, waveHeightArr, wavePeriodsArr) {

        //common
        this.noiseOffset = p.random(1000,2000)
        this.currentHour = hourly_counter //global
        this.sineCurve = (theta) => {
          return p.sin(theta)
        }
        this.waveHeightArr = waveHeightArr
        this.wavePeriodsArr = wavePeriodsArr
        this.waveHeight = this.waveHeightArr[this.currentHour]
        this.wavePeriods = this.wavePeriodsArr[this.currentHour]
        this.easing = 1


        //common different value
        this.between = window.innerWidth - 100
        this.offset = window.innerWidth/2 - this.between/2
        this.amplitude = 400
        this.newAngle = 290    //starting point
        this.newAmplitude = p.random(0, 50) //
        this.adding_noise = 0.1 // being the max
        this.temp_noise = 0.005

        //custom
        this.opacity_percentile = 1
        this.offsetY = 0
      }

      setCurrentHour(hourly_counter) {
        this.currentHour = hourly_counter
        // console.log(this.waveHeightArr)
        this.setCurrentWaveHeightPeriods()
      }

      setCurrentWaveHeightPeriods() {
        if (this.waveHeightArr[this.currentHour] > this.waveHeight || this.waveHeightArr[this.currentHour] < this.waveHeight) {
          p.fill(255,255,0)
          p.rect(lines_x1[0] + 500,lines_y1[0],50,50)
          //this means height has been updated
        }

        this.waveHeight = this.waveHeightArr[this.currentHour]
        this.wavePeriods = this.wavePeriodsArr[this.currentHour]
        // console.log(this.waveHeight, this.wavePeriods, this.currentHour)


      }

      addNoise() {
        let currentSinAngle = this.sineCurve(wave1Angle)

        if (currentSinAngle > -1 && currentSinAngle < -0.99995) {
          this.temp_noise = p.map(p.noise(this.noiseOffset), 0, 1, 0, 0.08);
          this.easing = p.map(p.random(0,100), 0, 100, 0.5, 1.5);
          // this.setAmplitude()

          p.fill(0)
          p.rect(lines_x1[0],lines_y1[0],50,50) // means noise value has been updated

        } else if (currentSinAngle > 0.99995 && currentSinAngle < 1) {
          // pass
        }

        if (-1 < currentSinAngle && currentSinAngle < 1) {  //in between
          this.adding_noise = this.temp_noise
        }
      }

      setAmplitude() {
        this.newAmplitude = p.random(400, 800)
        this.newAngle = p.random(0.05, 0.003)
      }

      amplitude_change(){
          this.newAmplitude = p.map(this.waveHeight, 0, p.width, 0, 50)     //hardcoding to see it doesn't fluctuates too much
          this.newAngle = p.map(this.wavePeriods, 0, p.width, 0.05, 0.003)
          // increase += 0.4;        // or you can increment like this   //pass in the increase as arg
      }


      patchUp() {
        if (firstMark) {
          secondMark = this.offsetY + lines_y1[0]
          let diff = secondMark - firstMark
          if (diff > moveDown) {
              // console.log(diff, 'diff')
              this.offsetY -= diff
          } else if (diff < -moveDown) {
              this.offsetY -= diff
              // console.log(diff, 'diff')
          }
          // this.offsetY diff
          firstMark = null
        }
        firstMark = this.offsetY + lines_y1[0]
      }

      displayLines() {
        // frameRate(30)
        p.stroke(200, 40)
        this.amplitude = this.newAmplitude
        wave1Angle += (this.newAngle * this.easing)

        lines_y1[0] = this.sineCurve(wave1Angle) * this.amplitude + (this.amplitude * this.adding_noise) + moveDown
        lines_y2[0] = this.sineCurve(wave1Angle) * this.amplitude + (this.amplitude * this.adding_noise) + moveDown

        // console.log(this.sineCurve(wave1Angle) * this.amplitude * this.adding_noise)

        // console.log(this.amplitude * this.adding_noise)
        //need to sync

        // this.patchUp()//looks like i don't need a patch up

        lines_y1[0] += this.offsetY
        lines_y2[0] += this.offsetY


        // spreadOut -= 0.3 //0.3 //opposed to
        // spreadOut = p.constrain(spreadOut, -200, 0)
        // spreadOut = p.constrain(spreadOut, -p.windowWidth/2 + 200, 0)

        // if(spreadOut <= -200) {
          // spread += 0.9   // was 0.3 before   // spread adding is reversal of spreadout
          // if(spread >= 200) {
          //
          //   // spread -= 3
          //
          // } else {
            spread += 2
          // }

          spread = p.constrain(spread, 0, 200)


          lines_x1[0] = this.offset - spread
          lines_x2[0] = this.offset + this.between + spread
        // } else {
        //   lines_x1[0] = this.offset - spreadOut
        //   lines_x2[0] = this.offset + this.between + spreadOut
        // }

        // this.patchUp()  //looks like i don't need a patch up
        if(p.frameCount % myFrameCount == 0) {
          for(let i = 1; i < lines_y1.length; i += 15) {


            let xPos1 = lines_x1[i]
            let xPos2 = lines_x2[i]

            let xPosMidDistance = lines_x2[i] - lines_x1[i]
            let xPosPartial = xPosMidDistance/10

            // let xPos1 = lines_x1[i] - p.pow(i, 1.01) //pretty cool
            // let xPos2 = lines_x2[i] + p.pow(i, 1.01)


            p.noFill()
            p.beginShape()


            let add_color = () => {   //basically layering strokes with low opacity
                let r_normalize = p.map(i, 1, lines_y1.length, 37, 11);
                let g_normalize = p.map(i, 1, lines_y1.length, 61, 50);
                let b_normalize = p.map(i, 1, lines_y1.length, 62,100);
                this.opacity_percentile = p.map(i, 1, lines_y1.length, 255, 0); //normalizing based on how many lines
                 p.stroke(`rgba(${r_normalize}%,${g_normalize}%,${b_normalize}%,${this.opacity_percentile})`);
            }

            add_color()

            p.curveVertex( xPos1, lines_y1[i]) //first
            p.curveVertex( xPos1, lines_y1[i])

            p.curveVertex( xPos1 + xPosPartial*1,  lines_y1[i] - 30)
            p.curveVertex( xPos1 + xPosPartial*2, lines_y1[i] + 20)
            p.curveVertex( xPos1 + xPosPartial*3, lines_y1[i] - 20)
            p.curveVertex( xPos1 + xPosPartial*4, lines_y1[i] +30)
            p.curveVertex( xPos1 + xPosPartial*5, lines_y1[i] -25)
            p.curveVertex( xPos1 + xPosPartial*6, lines_y1[i] +22)
            p.curveVertex( xPos1 + xPosPartial*7, lines_y1[i] -10)
            p.curveVertex( xPos1 + xPosPartial*8, lines_y1[i] +20)
            p.curveVertex( xPos1 + xPosPartial*9, lines_y1[i] -20)


            p.curveVertex( xPos2, lines_y2[i])
            p.curveVertex( xPos2, lines_y2[i]) //end

            p.endShape()
          }
        }

        this.noiseOffset += 0.0001
      }
    }

    p.setup = function(){
      p.strokeCap(p.SQUARE);
      const canvas = document.getElementById('defaultCanvas0');
      console.log(canvas,'canvas')
      p.createCanvas(1000, 1000, p.P2D);
      // p.createCanvas(window.innerWidth, window.innerHeight, p.P2D);  //was like this, but it works with whats above
      // cnv.parent('container');
      p.noiseDetail(24);

      // blending canvas

      // const ctx = canvas.getContext('2d');
      // ctx.globalCompositeOperation = 'xor';

      wave = new WaveGenerator(window.innerWidth/2, swellSize, swellPeriods)

      wave2 = new WaveLeft(p.height/2, swellSize, swellPeriods, p.map(p.mouseY, 0, p.height, 1.3, 1.45));
    }

    p.draw = function() {
      if(p.frameCount % 13 == 0) {

        // console.log(hourly_counter, startMin)
        // console.log(elapsed, myymin, time)
      }
      if(p.frameCount % myFrameCount == 0) {

        // p.background(22,100,80)
        p.clear()
        // p.fill(22,100,80, 50)
        //     p.rect(0,0, p.width, p.height);
        bgLight(hourly_counter)
      }
      // myClock(p)

      // wave2 = new WaveLeft(p.height/2, swellSize[7], swellPeriods[7], p.map(p.mouseY, 0, p.height, 1.3, 1.45));


      // wave.amplitude_change()
      // wave.displayLines()
      // wave.addNoise()
      // // wave.setAmplitude()    // for now, we are calling in addNoise
      // shiftUp()
      // wave.setCurrentHour(hourly_counter)

      if(pauseState) {
        if(wavePlayState == 1){
          shiftRight()
          wave2.addNoise();
          wave2.setCurrentHour(hourly_counter)
          wave2.setPerspective()
          wave2.amplitude_change()
        } else if (wavePlayState == 2) {
          shiftUp()
          wave.addNoise()
          wave.setCurrentHour(hourly_counter)
          wave.amplitude_change()
        }
      }
      if(wavePlayState == 1) {
        wave2.displayLines()
      } else if(wavePlayState == 2) {
        wave.displayLines()
      }

      // console.log(wave2.currentHour, 'wave2 current hour', wave2.waveHeightArr, wave2.waveHeight)
        //for wave2 -> its prolly better to do with framecount % 2 == 0
    }

    p.keyPressed = function() {
      console.log(p.frameRate(),': framerate')
      // linesY1.forEach((each)=>{console.log(each)})
      // linesY2.forEach((each)=>{console.log(each)})

      console.log(`Time: ${hourly_counter + 1}:00` + am_or_pm)
    }
    p.mousePressed = function() {
      // if(mySound.isLoaded()) {
      //     // mySound.play()
      // }
    }
}

export default Sketch
