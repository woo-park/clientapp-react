import React, { Component } from 'react';
import {useEffect, useState} from 'react';
import Work from './Work';

import initData from '../../initData.js';


// hardcode
const initProjects = initData;


const Main = () => {
  const [myProjects, setMyProjects] = useState(initProjects);


  return(
    <div className="component">


      <div className="works">{myProjects.map(project =><div key={project.id}
      className="workBlock"
        >
          <Work project={project} />
        </div>)}
      </div>
    </div>
  )
}

export default Main
