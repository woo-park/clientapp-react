import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import { useState, useEffect, useRef } from 'react';
import p5 from 'p5'

const initialNodes = [
  {
    id: 0,
    interests: ['T','I','G','E','R','D','O'],
    name:'tiger person',
  },
  {
    id: 1,
    interests: ['D','O','G'],
    name:'dog person',
  },
  {
    id: 2,
    interests: ['L','I','O','N','D','H'],
    name:'Lion person',
  },
  {
    id: 3,
    interests: ['C','A','T'],
    name:'Cat person',
  },
  {
    id: 4,
    interests: ['D','O','L','P','H','I','N'],
    name:'Dolphin person',
  }
]

const initialAnimals = [
  {
    id:100,
    name: 'Cheerful',
    interests: [ "Joyful", "Animated", "Buoyant", "Cheery", "Chipper", "Chirpy", "Effervescent", "Enthusiastic", "Good-Natured", "Jaunty", "Jolly", "Bright", "Lighthearted", "Lively", "Merry", "Optimistic", "Peppy", "Perky", "Pleasant", "Rosy", "Sanguine", "Sunny", "Upbeat" ],
    emojiSurrogates: "🥩🍖🍗🍿🍽🍊🍓🍉🐾🦋🐣🥳😜😛",
    // \uD83D\uDE00
  },
  {
    id:101,
    name:'Reflective',
    interests: [ "Reflective", "Thoughtful", "Introspective", "Contemplative", "Meditative", "Pensive", "Studious", "Deliberate", "Diligent", "Earnest", "Industrious", "Calculated", "Careful", "Meticulous", "Cautious", "Premeditated", "Prudent", "Purposeful", "Cold-Blooded", "Conscious", "Bookish", "Willful" ],
    emojiSurrogates: "🚶",
  },
  {
    id:102,
    name:'Gloomy',
    interests: [ "Dull", "Gloomy", "Murky", "Funereal", "Dismal", "Bleak", "Cloudy", "Dark", "Impenetrable", "Dim", "Opaque", "Overcast", "Foggy", "Forlorn", "Frosty", "Weighty", "Dirty", "Grim", "Hazy", "Blurred", "Impassable", "Bulletproof", "Impervious", "Melancholy", "Misty", "Mournful", "Muddy", "Dreary", "Dense", "Earnest", "Sedate", "Serious", "Sober", "Solemn", "Solid", "Somber", "Thick", "Heavy" ],
    emojiSurrogates: "🌌🌃🏙",
  },
  {
    id:103,
    name:'Humorous',
    interests: [ "Droll", "Entertaining", "Amusing", "Comical", "Engaging", "Enjoyable", "Pleasant", "Pleasing", "Fun", "Delicious", "Delightful", "Diverting", "Beautiful", "Eccentric", "Enchanting", "Campy", "Captivating", "Charming", "Fascinating", "Comic", "Funny", "Gratifying", "Hilarious", "Humorous", "Interesting", "Lively", "Lovely", "Luscious", "Mischievous", "Odd", "Playful", "Alluring", "Delectable", "Refreshing", "Satisfying", "Thrilling", "Unusual", "Weird", "Whimsical" ],
    emojiSurrogates: "🏑🏒🥍🏹🥋🥊🏂🌆🎑", //something wrong here
  },
  {
    id:104,
    name:'Melancholy',
    interests: [ "Sad", "Deplorable", "Distressing", "Dreadful", "Mournful", "Painful", "Tragic", "Lamentable", "Dire", "Appalling", "Downbeat", "Downcast", "Atrocious", "Egregious", "Excruciating", "Flagrant", "Frightening", "Glaring", "Gloomy", "Grim", "Harrowing", "Heartbreaking", "Heartrending", "Heinous", "Intolerable", "Agonizing", "Low", "Lugubrious", "Melancholy", "Monstrous", "Moody", "Blue", "Outrageous", "Calamitous", "Pensive", "Plaintive", "Poignant", "Regrettable", "Damaging", "Shameful", "Shocking", "Somber", "Sorrowful", "Sorry", "Touching", "Affecting", "Trite", "Troublesome", "Unbearable", "Wistful" ],
    emojiSurrogates: "🌗🌱🍃🍂🐚🗻🧖",
  },
  {
    id:105,
    name:'Idyllic',
    interests: [ "Pastoral", "Admire", "Beautiful", "Bloodless", "Bucolic", "Calm", "Charming", "Colorful", "Dream", "Glorify", "Harmonious", "Idealized", "Neutral", "Nonviolent", "Amicable", "Peace-Loving", "Peaceful", "Picturesque", "Placid", "Pleasant", "Quaint", "Quiet", "Rustic", "Scenic", "Smooth", "Steady", "Tranquil", "Unspoiled" ],
    emojiSurrogates: "💍👗💃🧝🧝🤱💇💇‍",
  },
  {
    id:106,
    name:'Whimsical',
    interests: [ "Funny", "Whimsical", "Eccentric", "Entertaining", "Erratic", "Humorous", "Odd", "Quirky", "Weird", "Absurd", "Arbitrary", "Bizarre", "Farcical", "Fickle", "Flighty", "Careless", "Goofy", "Helter-Skelter", "Comic", "Idiosyncratic", "Impulsive", "Ironic", "Kooky", "Amusing", "Ludicrous", "Mischievous", "Nutty", "Comical", "Offbeat", "Outlandish", "Peculiar", "Curious", "Ridiculous", "Silly", "Strange", "Temperamental", "Unconventional", "Unpredictable", "Unreasonable", "Unstable", "Unusual", "Volatile", "Wacky", "Wayward", "Droll", "Laughable" ],
    emojiSurrogates: "🧨📯⏲⏱🧭🕹🛴🏎🏍🤹",
  },
  {
    id:107,
    name:'Romantic',
    interests: [ "Fantastic", "Adventurous", "Charming", "Colorful", "Corny", "Dreamy", "Erotic", "Exciting", "Exotic", "Fanciful", "Amorous", "Fascinating", "Glamorous", "Maudlin", "Mysterious", "Nostalgic", "Passionate", "Tender", "Utopian", "Whimsical" ],
    emojiSurrogates: "🌹🌷💐🍷☕️🛫🚀🎢🎡🌋🛤",
  },
  {
    id:108,
    name:'Mysterious',
    interests: [ "Enigmatic", "Mysterious", "Strange", "Weird", "Marvelous", "Dark", "Eerie", "Enchanted", "Enchanting", "Ambiguous", "Equivocal", "Extraordinary", "Fascinating", "Incomprehensible", "Inexplicable", "Inquisitive", "Inscrutable", "Interested", "Magic", "Magical", "Arcane", "Miraculous", "Baffling", "Mystical", "Mystifying", "Mythical", "Obscure", "Otherworldly", "Perplexing", "Puzzling", "Secretive", "Spellbinding", "Spooky", "Cryptic", "Uncanny", "Unknown", "Unusual", "Vague", "Veiled", "Curious", "Wonderful" ],
    emojiSurrogates: "🛸🛰⚓️🗺🏰",
  },
  {
    id:109,
    name:'Calm',
    interests: [ "Amicable", "Mild", "Placid", "Serene", "Congenial", "Cool", "Coordinated", "Cordial", "Easygoing", "Gentle", "Harmonious", "Low-Key", "Tranquil", "Balanced", "Peaceful", "Balmy", "Restful", "Sedate", "Calm", "Slow", "Smooth", "Sober", "Soothing", "Stable", "Tame", "Temperate", "Pastoral" ],
    emojiSurrogates: "🧘🎹🧩🛶⛵️🧘🛁🛀🚿",
  },
  {
    id:110,
    name:'Lighthearted',
    interests: [ "Lively", "Joyous", "Comical", "Flirtatious", "Frisky", "Good-Natured", "Impish", "Joking", "Jolly", "Jovial", "Cheerful", "Laid-Back", "Lighthearted", "Buoyant", "Mischievous", "Playful", "Spirited", "Sprightly", "Tongue-In-Cheek", "Upbeat", "Whimsical" ],
    emojiSurrogates: "🌞🌼🌻🌟🐕🐩🐿🐒🙊🙉🐶🍷🥂🍻🍺",
  },
  {
    id:111,
    name:'Hopeful',
    interests: [ "Buoyant", "Rosy", "Sanguine", "Hopeful", "Comfortable", "Confident", "Eager", "Encouraging", "Enthusiastic", "Greedy", "Happy", "Ambitious", "Hungry", "Impatient", "Keen", "Optimistic", "Positive", "Restless", "Cheerful", "Cheery", "Thirsty", "Trusting", "Upbeat" ],
    emojiSurrogates: "👖🧶🧦🧢🏃🧚🤷",
  },
  {
    id:112,
    name:'Angry',
    interests:[ "Fiery", "Affronted", "Angry", "Annoyed", "Antagonized", "Bitter", "Bothered", "Chafed", "Choleric", "Convulsed", "Cross", "Displeased", "Disturbed", "Enraged", "Exacerbated", "Exasperated", "Ferocious", "Fierce", "Angered", "Fuming", "Furious", "Galled", "Hateful", "Heated", "Impassioned", "Indignant", "Irate", "Irked", "Irritable", "Irritated", "Offended", "Outraged", "Provoked", "Resentful", "Sullen", "Troubled", "Uptight" ],
    emojiSurrogates: "😡👿😾🦹🦹🧛🔪🗡⚔️🚬",
  },
  {
    id:113,
    name:'Fearful',
    interests: [ "Panicky", "Afraid", "Anxious", "Shy", "Aroused", "Frightened", "Hesitant", "Jittery", "Nervous", "Agitated", "Scared", "Fearful", "Skittish", "Spooked", "Startled", "Tense", "Timid", "Uneasy", "Unnerved" ],
    emojiSurrogates: "😨😰🙀🕳🦠💉🧫",
  },
  {
    id:114,
    name:'Tense',
    interests: [ "Close", "Firm", "Rigid", "Stiff", "Strained", "Taut" ],
    emojiSurrogates: "😡😠😾😖👺👿🤖💀",
  },
  {
    id:115,
    name:'Lonely',
    interests: [ "Isolated", "Desolate", "Deserted", "Empty", "Lonely", "Eremitic", "Cloistered", "Derelict", "Abandoned", "Antisocial", "Destitute", "Apart", "Alone", "Forlorn", "Hermetic", "Homeless", "Homesick", "Ascetic", "Barren", "Lonesome", "Neglected", "Reclusive", "Solitary", "Uninhabited" ],
    emojiSurrogates: "🐥🐦🐧🧴👅👩",
  },
  // \u{1F493}
]


function sketch(p) {



  // network
  let nodesLength = 100; //initial
  let nodes = [];
  let nodeCount = 0;

  // connecting with useState
  let count
  let setCount

  // global
  let animalsState
  let setAnimalsState
  let nodesState
  let setNodesState

  // animals nodes
  let animalsNodes = []

  let selectedNode;
  let setSelectedNode;

  let emojiString = "🥩🍖🍗🍿🍽🍊🍓🍉🐾🦋🐣🥳😜😛"
  let tempSlice = Math.floor((Math.random() * emojiString.length/2))*2
  let currentEmoji = emojiString.slice(tempSlice, tempSlice+2)

  let offset = 200;

  let innerRadius = 100
  let outerRadius = 270




  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);

    nodes.forEach(each => {
      each.updateWindowPosition()
      each.setRandomPosition();
    })

    animalsNodes.forEach(each => {
      each.updateWindowPosition()
      each.setAnimalsPosition();
    })
  }

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {

    if(props.selectedNode) {
      [selectedNode, setSelectedNode] = props.selectedNode
    }

    if (props.countState) {
      [count, setCount] = props.countState;
      // console.log(count,'COUNT ACCESS')
    }

    if (props.animalsState) {
      [animalsState, setAnimalsState] = props.animalsState

      if(typeof animalsState === 'undefined') {
        // console.log('animals state was undefined, assigned with props')
        setAnimalsState(initialAnimals)
      }
    }

    if(props.nodesState) {
      [nodesState, setNodesState] = props.nodesState

      if(typeof nodesState === 'undefined'){
        // console.log('nodes state was undefined, assigned with props')
        setNodesState(initialNodes)
      }


      nodeCount = nodesState.length

      if(nodeCount < nodes.length) {
        nodes[nodeCount].setRandomPosition();
        for (let i = 0; i < nodeCount; i ++) {
          nodes[i].updateInterests();
        }
      }
    }

    p.mouseClicked = () => {
      for (let i = 0; i < nodeCount; i ++) {
        if(nodes[i].onMouseClick()){    // if return true - overlap
          setSelectedNode(nodes[i].id)  // selectedNode found
        }
      }
      setCount(count + 1)
    }


    p.keyPressed = () => {
      console.log(p.frameRate())
      // boxColor = p.color(p.random(255),p.random(255),p.random(255));
      // xPos += 100;
      /*
      your todos -> log in system
      emoji changes -> everytime clicks
      github -> push -> so that you can work on bigger computer too
      */

      let randomSlicePosition = Math.floor((Math.random() * emojiString.length/2))*2
      // console.log(randomSlicePosition,'rs')
      currentEmoji = emojiString.slice(randomSlicePosition,randomSlicePosition+2)

      // sketchAction = 'ELLIPSE'

    } //end of keyPressed
  } // end of myCustomRedrawAccordingToNewPropsHandler



  p.setup = function() {
    if (typeof nodesState == 'undefined') {
      // console.log('nodesState was ', nodesState, 'so we assigned in setup')
      nodesState = initialNodes
    } else {
      // console.log('props came in first and assigned nodesState')
    }
    if (typeof animalsState == 'undefined') {
      // console.log('animalsState was ', animalsState, 'so we assigned in setup')
      animalsState = initialAnimals
    } else {
      // console.log('props came in first and assigned animalsState')
    }

    p.createCanvas(p.windowWidth, p.windowHeight);
    p.ellipseMode(p.RADIUS);


    for (let i = 0; i < nodesLength; i ++) {
      let ranRadius = p.random(5, 10)
      nodes[i] = new Node(i, nodes, ranRadius, animalsNodes);
      nodes[i].setRandomPosition();
    }

    for (let i = 0; i < animalsState.length; i ++) {
      animalsNodes[i] = new Node(100+i, nodes, 5, animalsNodes);
      animalsNodes[i].setAnimalsPosition()
      // animalsNodes[i].displayInterests(nodeCount); // but needs to be in draw
      // animalsNodes[i].displayAnimals();
    }


  } // end of setup

  class Node {
      constructor(id, otherNodes, radius, animalsNodes){
        this.x = null;
        this.y = null;
        this.radius = radius;
        this.id = id;
        this.otherNodes = otherNodes;
        this.outerRadius = radius * 4;
        this.friendsList = [1,2,3]
        this.interests = [] //empty one for now?
        this.animalsNodes = animalsNodes;
        this.name = ''
        // this.matchCounter = 0;
        this.matchedInterests = {}
        this.offsetX = p.windowWidth/2 + offset
        this.offsetY = p.windowHeight/2
        this.nodeColor = 255;
        this.angle = p.radians(p.random(360));
        this.alphaColor = 50


        // need to define angle here?
        //and change the animalsposX and this.x - not the offset
        //can't do that cause it would stop repositioning

        if(this.id >= 100) {
          this.identity = 'animals'
          this.fillColor = p.color(p.random(255),p.random(255),p.random(255),this.alphaColor);
        } else {
          this.identity = 'users'
        }

        // alert('second',nodesState)
        nodesState.forEach(each => {
          if(this.id === each.id) {
            this.interests = each.interests
            // console.log(this, 'THEY MATCHED')
            this.name = each.name   // this is used for initial setups
            this.nodeColor = p.color(p.random(255),p.random(255),p.random(255),this.alphaColor);

          }
        })

        animalsState.forEach(each => {
          if(this.id === each.id) {
            this.interests = each.interests
            this.name = each.name

            let randomSlice = Math.abs(Math.floor(((Math.random() * each.emojiSurrogates.length-2)/2))*2)

            // console.log('rannumm',randomSlice)
            this.emojiSurrogates = each.emojiSurrogates.slice(randomSlice,randomSlice+2)
          }
        })

        // if(this.id == 100) {
        //   this.interests = animalsState[0].interests
        // }

        // this.animalsPosX = p.random(500)
        // this.animalsPosY = p.random(500)

        // console.log(this, `# ${this.id} node`);

      }

      updateWindowPosition() {
        this.offsetX = p.windowWidth/2 + offset
        this.offsetY = p.windowHeight/2
      }

      static setAnimalsCircle() {

        let offsetX = p.windowWidth/2 + offset
        let offsetY = p.windowHeight/2
        let radius = innerRadius
        for(let deg = 0; deg < 360; deg += 12) {
          let angle = p.radians(deg)
          let circleX = offsetX + (p.cos(angle) * radius);
          let circleY = offsetY + (p.sin(angle) * radius);
          p.fill(0,30)
          p.ellipse(circleX, circleY, 1, 1)
        }
      }

      static setNodesCircle() {

        let offsetX = p.windowWidth/2 + offset
        let offsetY = p.windowHeight/2
        let radius = outerRadius
        for(let deg = 0; deg < 360; deg += 12) {
          let angle = p.radians(deg)
          let circleX = offsetX + (p.cos(angle) * radius);
          let circleY = offsetY + (p.sin(angle) * radius);
          p.fill(0,30)
          p.ellipse(circleX, circleY, 1, 1)
        }
      }



      updateInterests(){
        nodesState.forEach(each => {
          if(this.id === each.id) {
            this.interests = each.interests
            // console.log(this, 'THEY MATCHED')
            this.name = each.name   //also updating name - so that when new one comes, it renders the most recent updated value - derived from the props.state
          }
        })
      }


      setPosition() {
        this.x = p.mouseX;
        this.y = p.mouseY;
      }

      setAnimalsPosition() {
        // let angle = p.radians(p.random(360))
        this.animalsPosX = this.offsetX + (p.cos(this.angle)* innerRadius)
        this.animalsPosY = this.offsetY + (p.sin(this.angle)* innerRadius)
      }

      setRandomPosition() {
        // let angle = p.radians(p.random(360))
        this.x = this.offsetX + (p.cos(this.angle)*outerRadius)
        this.y = this.offsetY + (p.sin(this.angle)*outerRadius)
      }

      displayAnimals() {

        function findSurrogatePair(point) {
          // assumes point > 0xffff
          var offset = point - 0x10000,
              lead = 0xd800 + (offset >> 10),
              trail = 0xdc00 + (offset & 0x3ff);
          return [lead.toString(16), trail.toString(16)];
        }
        let foundd = findSurrogatePair(0x1f600);
        // let ansr = ''+`\${foundd[0]}`+ '\u'+`${foundd[1]}`
        // \u{1F603} THIS WORKS
        // '\u{1F493}' WORKS as well
          p.textSize(30);

          // let te = ['🥩,'🍖']
          p.text(`${this.emojiSurrogates}`,this.animalsPosX, this.animalsPosY)
          p.textSize(12);

      }

      display() {
        p.fill(this.nodeColor);
        p.ellipse(this.x,this.y,this.radius,this.radius)
        p.fill(22);
        p.strokeWeight(0.7);
        // p.text(`${currentEmoji}`,this.x,this.y)
        // p.ellipse(this.x, this.y, this.outerRadius, this.outerRadius)
        p.textAlign(p.CENTER,p.CENTER);
        p.text(`${this.name}`,this.x, this.y)
      }

      overlap(n) {
        let distanceFromCenters = p.dist(this.x, this.y, n.x, n.y);
        let diameter = this.outerRadius + n.outerRadius;
        if (distanceFromCenters < diameter) {
          return true;
        } else {
          return false;
        }
      }


      onMouseOver() {
        let mouseDistanceFromCenters = p.dist(this.x, this.y, p.mouseX, p.mouseY);
        if (mouseDistanceFromCenters < this.radius){
            this.nodeColor = p.color(p.random(255),p.random(255),p.random(255));
              //
            // this.fillColor = p.color(p.random(255),p.random(255),p.random(255));
        } else {
          this.nodeColor = p.color(255,255,255)
        }
      }

      onMouseClick() {
        let mouseDistanceFromCenters = p.dist(this.x, this.y, p.mouseX, p.mouseY);
        if (mouseDistanceFromCenters < this.radius){
          // alert('clicked lets lift state')
          return true
        } else {
          return false
        }
      }


      trueFriends(n) {
        p.stroke(20)
        if(n.id in this.friendsList === true) {
          return true
        } else {
          return false;
        }
      }

      displayNetwork(nodeCount) {
        p.stroke(5)

        // console.log(this.id, nodeCount)
        for (let i = this.id+1; i < nodeCount; i ++) {
          if(this.overlap(this.otherNodes[i])) {
            p.line(this.x, this.y, this.otherNodes[i].x, this.otherNodes[i].y)
          }
        }
      }

      overlapSoReposition(n) {
        let distanceFromCenters = p.dist(this.x, this.y, n.x, n.y);
        let diameter = this.outerRadius + n.outerRadius;
        if (distanceFromCenters - diameter < -10) {
          // this.radius = p.random(2, 7) //resize
          return true;
        } else {
          return false;
        }
      }

      overlapSoRepositionAnimals(n) {
        let distanceFromCenters = p.dist(this.animalsPosX, this.animalsPosY, n.animalsPosX, n.animalsPosY);
        let diameter = this.radius + n.radius;
        let extraDistance = 15;
        if (distanceFromCenters - (diameter + extraDistance) <= 0) {
          // console.log(distanceFromCenters, diameter, 'true',this.id)

          return true;
        } else {
          // console.log(distanceFromCenters, diameter, 'false',this.id)
          return false;
        }
      }

      reposition(nodeCount) {
        for (let i = this.id+1; i < nodeCount; i ++) {
          if(this.overlapSoReposition(this.otherNodes[i])) {
            this.angle = p.radians(p.random(360))

            this.setRandomPosition();
          }
        }
      }

      repositionAnimals(nodeCount) {
        for (let i = this.id+1; i < (100 + nodeCount); i ++) {
          if(this.overlapSoRepositionAnimals(this.animalsNodes[i - 100])) {
            this.angle = p.radians(p.random(360))
            this.setAnimalsPosition();
          }
        }
      }


      // sameInterests(n) {
      //   p.stroke(6);
      //
      //   // console.log(n.interests,'n interests')
      //   animalsState.forEach(each => {  //['c','d']
      //     // console.log(each.interests, 'each.interests')
      //     this.findCommonElements3(n.interests, each.interests)
      //   })
      //
      //   // n.interests.forEach(each => {
      //   //   if(each in animalsState.interests) {
      //   //     return true
      //   //   } else {
      //   //     return false
      //   //   }
      //   // })
      //
      //
      // }
      //
      // displayInterests(nodeCount) {
      //   for (let i = this.id+1; i < animalsNodes.length; i ++) {
      //     if(this.sameInterests(this.animalsNodes[i])) {
      //       p.line(this.x, this.y, 0,0)
      //     }
      //   }
      // }

      findCommonElements3(arr1, arr2) {
        arr2.forEach(each => {
          arr1.some(item => {
            each.interests.includes(item)
            // console.log('common found', item)
            return true
          })
          return false
          // if( arr1.some(item => each.interests.includes(item)) ) {
          //
          //   return true
          // } else {
          //   return false
          // }
        })

      }

      sameInterests(n) {
        //n is the other nodes
        // let ans = this.findCommonElements3(n.interests, this.animalsNodes)
        let matchFound = false;
        // console.log(this.interests,'THIS DOT INTERESTS')
        n.interests.forEach(each => {
          // console.log(each,'EACH')
          // if(each.includes("A")) {
          //   return true;
          // } else {
            // console.log('what')
          // }
          // console.log(this.interests,'tis inter')
          // console.log(each, 'N - EACH INTEREST')

          if(this.interests.includes(each)) {
            // console.log('HELL YA', each)
            matchFound = true;

            // if(!n.matchedInterests.includes(each)) {
            //   n.matchedInterests.push(each)
            // }
            if(this.id in n.matchedInterests) {
              if(!n.matchedInterests[this.id].includes(each)) {
                n.matchedInterests[this.id].push(each)
              }
            } else {
              n.matchedInterests[this.id] = [each]
            }
            // n.matchCounter += 1;         //LEO fix this
            // return
          }
          // if(each in this.interests === true) {
          //   // console.log(each, 'found in ',each.id)
          //   console.log(each,'found found')
          // //
          // //   matchFound = true
          // //   return true;
          // }
          // return false


          // this.animalsNodes.forEach(item => {
          //   if (item.interests.includes(each)) {
          //     matchFound = true;
          //   }
          // })
        })
        return matchFound






        //
        // let ans = this.animalsNodes.forEach(each => {
        //   if(n.interests.some(item => each.interests.includes(item))) {
        //     return true;
        //   }else{
        //     return false;
        //   }
        // })
        // console.log(ans,'ans')

        // let ans = this.animalsNodes.forEach(each => n.interests.some(item => each.interests.includes(item)))
        //
        // if (ans) {
        //   return true
        // } else {
        //   return false
        // }

      }

      displayInterests(nodeCount) {
        // from nodes view
        // need to go from many to small - right now its small to many
        for (let i = 0; i < nodeCount; i ++) {
          if(this.sameInterests(this.otherNodes[i])) {


            if(this.otherNodes[i].onMouseClick()) {
              p.stroke(p.color(p.random(255),p.random(255),p.random(255),150))
            } else {
              p.stroke(this.fillColor)
            }

            // p.strokeWeight(this.otherNodes[i].matchedInterests.length * 5)
            let sweight = this.otherNodes[i].matchedInterests[this.id].length
            p.strokeWeight(sweight * 5)
            p.line(this.animalsPosX, this.animalsPosY, this.otherNodes[i].x, this.otherNodes[i].y)
            p.stroke(0)
            p.strokeWeight(1)
            // alert('wait')
          }

        }
      }

      //need a counter that counts how significant is the interest - among two

      displayFriends(nodeCount) {
        for (let i = this.id+1; i < nodeCount; i ++) {
          if(this.trueFriends(this.otherNodes[i])) {
            p.line(this.x, this.y, this.otherNodes[i].x, this.otherNodes[i].y)
          }
        }
      }

    } // end of class




  p.draw = function() {
    p.clear()
    Node.setAnimalsCircle();
    Node.setNodesCircle();

    for (let i = 0; i < nodeCount; i ++) {
      nodes[i].display();
      nodes[i].displayNetwork(nodeCount);
      nodes[i].reposition(nodeCount);
      nodes[i].onMouseOver();
    }

    for (let i = 0; i < animalsState.length; i ++) {
      animalsNodes[i].displayAnimals();
      animalsNodes[i].displayInterests(nodeCount);
      animalsNodes[i].repositionAnimals(animalsNodes.length)
    }


    p.textSize(50)
    p.text(`${currentEmoji}`, p.width/2 - 200, 150)
    p.textSize(12)

  } //end of draw
}

function Sketch(props, action) {
  // const initialNodes = [
  //   {
  //     id: 0,
  //     interests: ['T','I','G','E','R','D','O'],
  //     name:'tiger person',
  //   },
  //   {
  //     id: 1,
  //     interests: ['D','O','G'],
  //     name:'dog person',
  //   },
  //   {
  //     id: 2,
  //     interests: ['L','I','O','N','D','H'],
  //     name:'Lion person',
  //   },
  //   {
  //     id: 3,
  //     interests: ['C','A','T'],
  //     name:'Cat person',
  //   },
  //   {
  //     id: 4,
  //     interests: ['D','O','L','P','H','I','N'],
  //     name:'Dolphin person',
  //   }
  // ]
  //
  // const initialAnimals = [
  //   {
  //     id:100,
  //     name: 'Cheerful',
  //     interests: [ "Joyful", "Animated", "Buoyant", "Cheery", "Chipper", "Chirpy", "Effervescent", "Enthusiastic", "Good-Natured", "Jaunty", "Jolly", "Bright", "Lighthearted", "Lively", "Merry", "Optimistic", "Peppy", "Perky", "Pleasant", "Rosy", "Sanguine", "Sunny", "Upbeat" ],
  //     emojiSurrogates: "🥩🍖🍗🍿🍽🍊🍓🍉🐾🦋🐣🥳😜😛",
  //     // \uD83D\uDE00
  //   },
  //   {
  //     id:101,
  //     name:'Reflective',
  //     interests: [ "Reflective", "Thoughtful", "Introspective", "Contemplative", "Meditative", "Pensive", "Studious", "Deliberate", "Diligent", "Earnest", "Industrious", "Calculated", "Careful", "Meticulous", "Cautious", "Premeditated", "Prudent", "Purposeful", "Cold-Blooded", "Conscious", "Bookish", "Willful" ],
  //     emojiSurrogates: "🚶",
  //   },
  //   {
  //     id:102,
  //     name:'Gloomy',
  //     interests: [ "Dull", "Gloomy", "Murky", "Funereal", "Dismal", "Bleak", "Cloudy", "Dark", "Impenetrable", "Dim", "Opaque", "Overcast", "Foggy", "Forlorn", "Frosty", "Weighty", "Dirty", "Grim", "Hazy", "Blurred", "Impassable", "Bulletproof", "Impervious", "Melancholy", "Misty", "Mournful", "Muddy", "Dreary", "Dense", "Earnest", "Sedate", "Serious", "Sober", "Solemn", "Solid", "Somber", "Thick", "Heavy" ],
  //     emojiSurrogates: "🌌🌃🏙",
  //   },
  //   {
  //     id:103,
  //     name:'Humorous',
  //     interests: [ "Droll", "Entertaining", "Amusing", "Comical", "Engaging", "Enjoyable", "Pleasant", "Pleasing", "Fun", "Delicious", "Delightful", "Diverting", "Beautiful", "Eccentric", "Enchanting", "Campy", "Captivating", "Charming", "Fascinating", "Comic", "Funny", "Gratifying", "Hilarious", "Humorous", "Interesting", "Lively", "Lovely", "Luscious", "Mischievous", "Odd", "Playful", "Alluring", "Delectable", "Refreshing", "Satisfying", "Thrilling", "Unusual", "Weird", "Whimsical" ],
  //     emojiSurrogates: "🏑🏒🥍🏹🥋🥊🏂🌆🎑", //something wrong here
  //   },
  //   {
  //     id:104,
  //     name:'Melancholy',
  //     interests: [ "Sad", "Deplorable", "Distressing", "Dreadful", "Mournful", "Painful", "Tragic", "Lamentable", "Dire", "Appalling", "Downbeat", "Downcast", "Atrocious", "Egregious", "Excruciating", "Flagrant", "Frightening", "Glaring", "Gloomy", "Grim", "Harrowing", "Heartbreaking", "Heartrending", "Heinous", "Intolerable", "Agonizing", "Low", "Lugubrious", "Melancholy", "Monstrous", "Moody", "Blue", "Outrageous", "Calamitous", "Pensive", "Plaintive", "Poignant", "Regrettable", "Damaging", "Shameful", "Shocking", "Somber", "Sorrowful", "Sorry", "Touching", "Affecting", "Trite", "Troublesome", "Unbearable", "Wistful" ],
  //     emojiSurrogates: "🌗🌱🍃🍂🐚🗻🧖",
  //   },
  //   {
  //     id:105,
  //     name:'Idyllic',
  //     interests: [ "Pastoral", "Admire", "Beautiful", "Bloodless", "Bucolic", "Calm", "Charming", "Colorful", "Dream", "Glorify", "Harmonious", "Idealized", "Neutral", "Nonviolent", "Amicable", "Peace-Loving", "Peaceful", "Picturesque", "Placid", "Pleasant", "Quaint", "Quiet", "Rustic", "Scenic", "Smooth", "Steady", "Tranquil", "Unspoiled" ],
  //     emojiSurrogates: "💍👗💃🧝🧝🤱💇💇‍",
  //   },
  //   {
  //     id:106,
  //     name:'Whimsical',
  //     interests: [ "Funny", "Whimsical", "Eccentric", "Entertaining", "Erratic", "Humorous", "Odd", "Quirky", "Weird", "Absurd", "Arbitrary", "Bizarre", "Farcical", "Fickle", "Flighty", "Careless", "Goofy", "Helter-Skelter", "Comic", "Idiosyncratic", "Impulsive", "Ironic", "Kooky", "Amusing", "Ludicrous", "Mischievous", "Nutty", "Comical", "Offbeat", "Outlandish", "Peculiar", "Curious", "Ridiculous", "Silly", "Strange", "Temperamental", "Unconventional", "Unpredictable", "Unreasonable", "Unstable", "Unusual", "Volatile", "Wacky", "Wayward", "Droll", "Laughable" ],
  //     emojiSurrogates: "🧨📯⏲⏱🧭🕹🛴🏎🏍🤹",
  //   },
  //   {
  //     id:107,
  //     name:'Romantic',
  //     interests: [ "Fantastic", "Adventurous", "Charming", "Colorful", "Corny", "Dreamy", "Erotic", "Exciting", "Exotic", "Fanciful", "Amorous", "Fascinating", "Glamorous", "Maudlin", "Mysterious", "Nostalgic", "Passionate", "Tender", "Utopian", "Whimsical" ],
  //     emojiSurrogates: "🌹🌷💐🍷☕️🛫🚀🎢🎡🌋🛤",
  //   },
  //   {
  //     id:108,
  //     name:'Mysterious',
  //     interests: [ "Enigmatic", "Mysterious", "Strange", "Weird", "Marvelous", "Dark", "Eerie", "Enchanted", "Enchanting", "Ambiguous", "Equivocal", "Extraordinary", "Fascinating", "Incomprehensible", "Inexplicable", "Inquisitive", "Inscrutable", "Interested", "Magic", "Magical", "Arcane", "Miraculous", "Baffling", "Mystical", "Mystifying", "Mythical", "Obscure", "Otherworldly", "Perplexing", "Puzzling", "Secretive", "Spellbinding", "Spooky", "Cryptic", "Uncanny", "Unknown", "Unusual", "Vague", "Veiled", "Curious", "Wonderful" ],
  //     emojiSurrogates: "🛸🛰⚓️🗺🏰",
  //   },
  //   {
  //     id:109,
  //     name:'Calm',
  //     interests: [ "Amicable", "Mild", "Placid", "Serene", "Congenial", "Cool", "Coordinated", "Cordial", "Easygoing", "Gentle", "Harmonious", "Low-Key", "Tranquil", "Balanced", "Peaceful", "Balmy", "Restful", "Sedate", "Calm", "Slow", "Smooth", "Sober", "Soothing", "Stable", "Tame", "Temperate", "Pastoral" ],
  //     emojiSurrogates: "🧘🎹🧩🛶⛵️🧘🛁🛀🚿",
  //   },
  //   {
  //     id:110,
  //     name:'Lighthearted',
  //     interests: [ "Lively", "Joyous", "Comical", "Flirtatious", "Frisky", "Good-Natured", "Impish", "Joking", "Jolly", "Jovial", "Cheerful", "Laid-Back", "Lighthearted", "Buoyant", "Mischievous", "Playful", "Spirited", "Sprightly", "Tongue-In-Cheek", "Upbeat", "Whimsical" ],
  //     emojiSurrogates: "🌞🌼🌻🌟🐕🐩🐿🐒🙊🙉🐶🍷🥂🍻🍺",
  //   },
  //   {
  //     id:111,
  //     name:'Hopeful',
  //     interests: [ "Buoyant", "Rosy", "Sanguine", "Hopeful", "Comfortable", "Confident", "Eager", "Encouraging", "Enthusiastic", "Greedy", "Happy", "Ambitious", "Hungry", "Impatient", "Keen", "Optimistic", "Positive", "Restless", "Cheerful", "Cheery", "Thirsty", "Trusting", "Upbeat" ],
  //     emojiSurrogates: "👖🧶🧦🧢🏃🧚🤷",
  //   },
  //   {
  //     id:112,
  //     name:'Angry',
  //     interests:[ "Fiery", "Affronted", "Angry", "Annoyed", "Antagonized", "Bitter", "Bothered", "Chafed", "Choleric", "Convulsed", "Cross", "Displeased", "Disturbed", "Enraged", "Exacerbated", "Exasperated", "Ferocious", "Fierce", "Angered", "Fuming", "Furious", "Galled", "Hateful", "Heated", "Impassioned", "Indignant", "Irate", "Irked", "Irritable", "Irritated", "Offended", "Outraged", "Provoked", "Resentful", "Sullen", "Troubled", "Uptight" ],
  //     emojiSurrogates: "😡👿😾🦹🦹🧛🔪🗡⚔️🚬",
  //   },
  //   {
  //     id:113,
  //     name:'Fearful',
  //     interests: [ "Panicky", "Afraid", "Anxious", "Shy", "Aroused", "Frightened", "Hesitant", "Jittery", "Nervous", "Agitated", "Scared", "Fearful", "Skittish", "Spooked", "Startled", "Tense", "Timid", "Uneasy", "Unnerved" ],
  //     emojiSurrogates: "😨😰🙀🕳🦠💉🧫",
  //   },
  //   {
  //     id:114,
  //     name:'Tense',
  //     interests: [ "Close", "Firm", "Rigid", "Stiff", "Strained", "Taut" ],
  //     emojiSurrogates: "😡😠😾😖👺👿🤖💀",
  //   },
  //   {
  //     id:115,
  //     name:'Lonely',
  //     interests: [ "Isolated", "Desolate", "Deserted", "Empty", "Lonely", "Eremitic", "Cloistered", "Derelict", "Abandoned", "Antisocial", "Destitute", "Apart", "Alone", "Forlorn", "Hermetic", "Homeless", "Homesick", "Ascetic", "Barren", "Lonesome", "Neglected", "Reclusive", "Solitary", "Uninhabited" ],
  //     emojiSurrogates: "🐥🐦🐧🧴👅👩",
  //   },
  //   // \u{1F493}
  // ]




  const [count, setCount] = useState(0);
  let [nodesState, setNodesState] = useState(initialNodes);
  let [animalsState, setAnimalsState] = useState(initialAnimals)
  const [nodeName, setNodeName] = useState('');
  const [nodeInterest, setNodeInterest] = useState('');
  const [nodeInterest2, setNodeInterest2] = useState('');
  const [nodeInterest3, setNodeInterest3] = useState('');
  const [nodeInterest4, setNodeInterest4] = useState('');
  const [selectedNode, setSelectedNode] = useState(-1);
  const [selectedNodeObject, setSelectedNodeObject] = useState('');

  const inputEl = useRef(null)
  const [inputBtnColor, setInputBtnColor] = useState('');

  const [wordBank, setWordBank] = useState([])

  useEffect(()=>{
    inputEl.current.focus();
  },[])

  //need to curry here
  let wordCounts = 4
  function randomItem(wordCounts){
    return (...arrArg) => {
      let copy = [...arrArg];
      // console.log(copy,'cp')
      let randomNumber = 0;
      let returnArray = []
      for (let i = 0; i < wordCounts; i++) {
        randomNumber = Math.floor(Math.random() * copy.length)
        returnArray.push(copy[randomNumber])
        copy.splice(randomNumber,1)

        // console.log(copy)
      }
      return returnArray
    }
  }
  let chooseWords = randomItem(4) // currying
  // let answer = chooseWords(...animalsState[0].interests, ...animalsState[1].interests, ...animalsState[2].interests);
  // console.log(answer,'chosen')

  function sentenceCase (str) {
    if (str){
      str = str.toString();
       return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
  }

  const [selectedInput, setSelectedInput] = useState([]);
  const [question1, setQuestion1] = useState(()=>{
    return chooseWords(...animalsState[0].interests, ...animalsState[1].interests, ...animalsState[2].interests)}
  )
  const [question2, setQuestion2] = useState(()=>{
    return chooseWords(...animalsState[0].interests, ...animalsState[1].interests, ...animalsState[2].interests)}
  )

  const onUpdateNode = (e) => {
    e.preventDefault();

    //need to loop nodesState - find matching one - map - have id number - if each id and selected id match - replace - return new arr object, use setnodesstate to update? this will change the position tho...

    if(selectedNode > -1) {
      const nextState = nodesState.map(each => {
        if(each.id === selectedNode) {

          if(selectedInput.length < 1) {
            return each                     //ensures interests are selected
          } else {
            each.interests = selectedInput
          }

          return each
        }
        return each
      })

      setNodesState(nextState)

      nodesState.forEach(each => {
        if(each.id === selectedNode) {
          setSelectedNodeObject(each)
        }
      })

      // setSelectedNode(selectedNode)
      setSelectedInput([])
      //need to make buttons unclicked - white

    }
    setInputBtnColor('')
  }

  const onClickInputButton = (e) => {
    e.preventDefault();
    // console.log(e.target);

    // if(inputBtnColor === 'grey'){
    //    e.target.style.backgroundColor = 'null'
    //   setInputBtnColor('')
    //   if (!selectedInput.includes(e.target.value)){
    //     setSelectedInput([...selectedInput, e.target.value])
    //   }
    // } else {
    //   // setInputBtnColor('grey')
    //   e.target.style.backgroundColor = 'grey'
    //   if (selectedInput.includes(e.target.value)){
    //     let copy = [...selectedInput]   //filter returns new arr so this is actually no needed
    //     let filteredCopy = copy.filter((item)=> item !== e.target.value )
    //     setSelectedInput(filteredCopy)
    //   }
    // }

    if(e.target.style.backgroundColor !== 'grey') {
      e.target.style.backgroundColor = 'grey'
      if (!selectedInput.includes(e.target.value)){
        setSelectedInput([...selectedInput, e.target.value])
      }
    } else {
      e.target.style.backgroundColor = null
      if (selectedInput.includes(e.target.value)){
        let copy = [...selectedInput]   //filter returns new arr so this is actually no needed
        let filteredCopy = copy.filter((item)=> item !== e.target.value )
        setSelectedInput(filteredCopy)
      }
    }
  }

  const resetForm = () => {
    setNodeName('')
    setNodeInterest('')
    setNodeInterest2('')
    setNodeInterest3('')
    setNodeInterest4('')
  }

  const onCreateNode = (e) => {
    e.preventDefault();
    let newNode = {
      id:nodesState.length,
      interests: [nodeInterest, nodeInterest2, nodeInterest3, nodeInterest4],
      name: nodeName,
    }
    // console.log(newNode, 'newNode')
    setNodesState([...nodesState, newNode])
    // console.log(nodesState,'NO STATE')

    resetForm();
  }

  const onChangeNodeName = (e) => {
    setNodeName(e.target.value)
  }

  const onChangeInterest = (e) => {
    setNodeInterest(sentenceCase(e.target.value))
  }

  const onChangeInterest2 = (e) => {
    setNodeInterest2(sentenceCase(e.target.value))
  }

  const onChangeInterest3 = (e) => {
    setNodeInterest3(sentenceCase(e.target.value))
  }

  const onChangeInterest4 = (e) => {
    setNodeInterest4(sentenceCase(e.target.value))
  }

  useEffect(()=>{
    let chooseManyWords = randomItem(20);

    setWordBank(chooseManyWords(...animalsState[0].interests, ...animalsState[1].interests, ...animalsState[2].interests))



  },[nodesState])

  useEffect(()=>{
    let choose4Words = randomItem(4);
    setQuestion1(chooseWords(...animalsState[0].interests, ...animalsState[1].interests, ...animalsState[2].interests))
  },[selectedNode])

  useEffect(()=>{
    // console.log(nodesState,'NO STATE from useeffect')
    // let foundNode = nodesState.find((each)=>{console.log(each,'heheeh')})
    // console.log(foundNode,'FOUND NODE')

    if(selectedNode > -1) {
        const found = nodesState.find(element => element.id === selectedNode);
        // console.log(found,'found')

        let selectedNodeIndex = nodesState.findIndex((element)=>{
          return element.id === selectedNode
        })



        const nextNodesState = nodesState.map((obj, index) => {
          let updatedNode;
          if(index === selectedNodeIndex) {
            setSelectedNodeObject(obj);

            updatedNode = {
              id: selectedNode,
              interests: obj.interests,
              name:obj.name,
            }
          }



          return index === selectedNodeIndex ? updatedNode : obj;
        })

        // console.log(nextNodesState,'next nodes state')
        setNodesState(nextNodesState)
    }

        /*

    const updatedHeaders = typeElements.headers.map((obj, index) => {
       return index === props.index ? props : obj;
     });

        */


  }, [selectedNode])



  const divStyle = {
    display: 'flex'
  };
  const columnStyle ={
    display:'flex',
    flexDirection:'column',
    width:'400px'
  }
  const flexWrap = {
    display:'flex',
    backgroundColor:'gainsboro',
    flexWrap:'wrap',
    width:'400px'
  }
  const spaceAround = {
    padding: '1rem'
  }

  // let grey = {
  //   backgroundColor: inputBtnColor
  // }

  // const mySketchFixed = {
  //   position: 'fixed',
  //   top: '0px',
  //   left: '0px',
  //   zIndex:'1',
  //   pointerEvents: 'none'
  // }

  const mySketchAbsolute = {
    pointerEvents: 'none',
    position: 'absolute',
    top: '0px',
    left: '0px'
  }

  const inputContainer = {
    width: '400px',
    display:'column',
    position: 'relative'
  }
  // P5Wrapper.prototype.componentDidMount = function () {
  //       var canvas = new p5(this.state.sketch, this.wrapper);
  //       if (canvas.myCustomRedrawAccordingToNewPropsHandler) {
  //           canvas.myCustomRedrawAccordingToNewPropsHandler(this.props);
  //       }
  //       console.log('testing 1')
  //         console.log(this.props)
  //         nodesState = this.props.nodesState[0]
  //         console.log(nodesState,'setting done?')
  //       console.log('testing 2')
  //       this.setState({
  //           canvas: canvas,
  //           wrapper: this.wrapper
  //       });
  //
  // };



  return (
    <div style={inputContainer }>
        <h1>FIND YOUR EMOJI</h1>
        {/*<p>You clicked {count} times</p>*/}
        <p>So far, {nodesState.length} have participated!</p>
        <hr/>
        <br/>
        <p>Word Bank</p>
        <div style={flexWrap}>{wordBank.map((each, index) => <div key={index} style={spaceAround}>{each}</div>)}</div>
        <form
          onSubmit={onCreateNode}
          className="formSize"
          style={columnStyle}
        >
          <label>How would you describe your day?
            <input
              className="full-width-input"
              onChange={onChangeNodeName}
              value={nodeName}
              type="text"
              placeholder="node name..."
              ref={inputEl}
            />
          </label>
          <label>Which word defines you?
            <input
              className="full-width-input"
              onChange={onChangeInterest}
              value={nodeInterest}
              type="text"
              placeholder="Pick a word..."
            />

          </label>
          <label>Which word has been your resoluton?
            <input
              className="full-width-input"
              onChange={onChangeInterest2}
              value={nodeInterest2}
              type="text"
              placeholder="Pick a word..."
            />
          </label>
          <label>Which word would you use to describe your best friend?
            <input
              className="full-width-input"
              onChange={onChangeInterest3}
              value={nodeInterest3}
              type="text"
              placeholder="Pick a word..."
            />
          </label>
          <label>What is the last word that you can think of?
            <input
              className="full-width-input"
              onChange={onChangeInterest4}
              value={nodeInterest4}
              type="text"
              placeholder="Pick a word..."
            />
          </label>
          <button
            className="button"
            type="submit"
          >
            Create
          </button>

        </form>

        {/*<p>Current Node: {selectedNode} </p>*/}

        <div >
          <div style={flexWrap}>Select the names to checkout & modify word descriptions.
            <hr />
            <br />
            <p>This time, for your convenience, you can easily update by clicking words.</p>
          </div>
          <hr />
          {selectedNodeObject !== '' ? <p>Node Name: {selectedNodeObject.name} </p>: <br/>}
          <hr />
          {selectedNodeObject !== '' ? selectedNodeObject.interests.map((item, index)=> <div key={index}>{item}</div> ) : 'Click the node-names to see what others wrote'}
        </div>

        <form
          onSubmit={onUpdateNode}
          className="formSize"
        >
          <div style={divStyle}>
          {question1.map((item,index)=>
            <input

              key={index}
              className="full-width-input inputButton"
              onClick={onClickInputButton}
              type="button"
              value={item}

            />)}
          </div>
          <div style={divStyle}>
          {question2.map((item, index)=>
            <input
              key={index}
              className="full-width-input inputButton"
              onClick={onClickInputButton}
              type="button"
              value={item}
            />)}
          </div>
          <button
            className="button"
            type="submit"
          >
            Update
          </button>

        </form>


        <div style={mySketchAbsolute} >
          <P5Wrapper

            countState={[count, setCount]}
            nodesState={[nodesState, setNodesState]}
            animalsState={[animalsState, setAnimalsState]}
            selectedNode={[selectedNode, setSelectedNode]}
            sketch={sketch}
             />
        </div>

      </div>
  )
}

export default Sketch;
