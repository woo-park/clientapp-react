/*
 1. need to make lines seperate
 2. instance mode
 3. go back to sketch.js -> instance mode -> start fresh here
*/


// data
let sampleData = []
let tide = [];
let swellSize = [];
let swellPeriods = [];

//timer
let hourly_counter = 0
let mySec = 0
let myMin = 0
let webGameTime = 6
let am_or_pm

//sound
let mySound

function myClock(p) {
  if (p.frameCount % 60 == 0) {
    mySec += 1
  }

  myMin = Math.floor(mySec / webGameTime) //!important - defines 1hr
  hourly_counter = myMin % 24
  am_or_pm = hourly_counter == 23 || hourly_counter < 12? 'am' : 'pm';

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
    lines_y1.push(null)
    lines_y2.push(null)
    lines_x1.push(null)
    lines_x2.push(null)
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

for(let k = 0; k < window.innerWidth - 300; k ++) {
    linesY1.push(null)
    linesY2.push(null)
}

function shiftRight() {
  for(let i = linesY1.length - 1; i > 0; i -= 1) {
      linesY1[i] = linesY1[i-1];
      linesY2[i] = linesY2[i-1];
  }
}


let counter = 1
let myFrameCount = 2

function parseData(p, arr) {
  // looping 2-dimensional arr -> normalize, rows bc loadTable
  return arr.rows.map((each, index) => {
    if (index != 0) {
      return each.arr.map((item, i) => {
        if (i == 0) {
          return p.map(item, 0, 1.7, -0.4, 0.4).toFixed(2)
        } else if (i == 1) {
          return p.map(item, 0, 12, 10, 400).toFixed(0)
        } else if (i == 2) {
          return p.map(item, 3, 15, 1, 1000 ).toFixed(0)
        }
      })
    }
    return each.arr
  })
}

let sketch = function(p) {
    p.preload = function() {
      p.soundFormats('mp3', 'ogg')
      p.loadSound('wave_sound.mp3',(sound) => {
        mySound = sound
        mySound.setVolume(0.1)
      })

      // sampleData
      p.loadTable('sample.csv', (sampleTable) => {
        console.log(sampleTable.rows)

        // sampleData = [...sampleTable.rows]
        sampleData = parseData(p, sampleTable)
        console.table(sampleData,'sample Data')

        function plotOutColumn(arr) {
          arr.forEach((each, index) => {
            if(index !== 0) {
              tide[index - 1] = each[0]
              swellSize[index -1] = each[1]
              swellPeriods[index -1] = each[2]
            }
          })

          console.log(tide)
          console.log(swellSize)
          console.log(swellPeriods)
        }
        plotOutColumn(sampleData)

      })  //end of callback
    }



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
        this.x1;
        this.x2;
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
          p.strokeCap(p.ROUND);
          p.strokeWeight(2);
          p.beginShape(p.LINES);
          wave2Angle += (this.newAngle * this.easing)

          this.amplitude = this.newAmplitude

          if(linesY1[1]){ this.offset = linesY1[1]}

          linesY1[0] = this.offset + this.sineCurve(wave2Angle) * (this.amplitude * this.adding_noise)     //top x,y
          linesY2[0] = this.offset + this.sineCurve(wave2Angle) * (this.amplitude * this.adding_noise) + this.between

          if(p.frameCount % myFrameCount == 0) {
            for(let i = 1; i < linesY1.length; i += 4) {  // 1, 2, 3, 4, 5, till window.innerWidth - 500
                let add_color = () => {
                    let r_normalize = p.map(i, 1, linesY1.length, 37, 11);
                    let g_normalize = p.map(i, 1, linesY1.length, 61, 50);
                    let b_normalize = p.map(i, 1, linesY1.length, 62,100);
                    this.opacity_percentile = p.map(i, 1, linesY1.length, 1, 0); //normalizing based on how many lines
                     p.stroke(`rgba(${r_normalize}%,${g_normalize}%,${b_normalize}%,${this.opacity_percentile})`);
                }
                add_color();

                let xPerspective = 500

                this.x1 = i
                this.x2 = p.pow(i, this.exponential)

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
        this.opacity_percentile
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

        console.log(this.amplitude * this.adding_noise)
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
      let cnv = p.createCanvas(window.innerWidth, window.innerHeight, p.P2D);
      cnv.parent('container');
      p.noiseDetail(24);

      // blending canvas
      const canvas = document.getElementById('defaultCanvas0');
      const ctx = canvas.getContext('2d');
      ctx.globalCompositeOperation = 'xor';

      wave = new WaveGenerator(window.innerWidth/2, swellSize, swellPeriods)

      wave2 = new WaveLeft(p.height/2, swellSize, swellPeriods, p.map(p.mouseY, 0, p.height, 1.3, 1.45));
    }

    p.draw = function() {
      if(p.frameCount % myFrameCount == 0) {
        p.clear()
      }

      // wave2 = new WaveLeft(p.height/2, swellSize[7], swellPeriods[7], p.map(p.mouseY, 0, p.height, 1.3, 1.45));
      myClock(p)

      wave.amplitude_change()
      wave.displayLines()
      wave.addNoise()
      // wave.setAmplitude()    // for now, we are calling in addNoise
      shiftUp()
      wave.setCurrentHour(hourly_counter)


      shiftRight()
      wave2.addNoise();
      wave2.displayLines()
      wave2.setCurrentHour(hourly_counter)
      wave2.setPerspective()
      wave2.amplitude_change()  //for wave2 -> its prolly better to do with framecount % 2 == 0
    }

    p.keyPressed = function() {
      console.log(p.frameRate(),': framerate')
      // linesY1.forEach((each)=>{console.log(each)})
      // linesY2.forEach((each)=>{console.log(each)})

      console.log(`Time: ${hourly_counter + 1}:00` + am_or_pm)
    }
    p.mousePressed = function() {
      if(mySound.isLoaded()) {
          // mySound.play()
      }
    }
}

new p5(sketch, 'container')
