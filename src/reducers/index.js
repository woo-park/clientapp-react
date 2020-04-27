const initialState = {
  waveData: `offset, height, periods, date, time, temp
  1.4, 8, 5, 13, 1, 15.2
  1.2, 7, 6, 13, 2, 15.3
  1.0, 9, 7, 13, 3, 15.1
  0.8, 10, 8, 13, 4, 15.2
  0.6, 11, 9, 13, 5, 15.3
  0.4, 12, 10, 13, 6, 15.4
  0.2, 11, 11, 13, 7, 15.1
  0.4, 12, 11, 13, 8, 15.3
  0.6, 10, 11, 13, 9, 15.2
  0.8, 10, 10, 13, 10, 15.2
  1.0, 9, 10, 13, 11, 15.2
  1.2, 7, 10, 13, 12, 15.2
  1.4, 6, 9, 13, 13, 15.4
  1.2, 5, 9, 13, 14, 15.2
  1.0, 5, 9, 13, 15, 15.2
  0.8, 5, 9, 13, 16, 15.2
  0.6, 6, 9, 13, 17, 15.2
  0.4, 6, 9, 13, 18, 15.2
  0.2, 7, 10, 13, 19, 15.2
  0.4, 8, 10, 13, 20, 15.2
  0.6, 10, 10, 13, 21, 15.2
  0.8, 9, 10, 13, 22, 15.2
  1.2, 8, 10, 13, 23, 15.2
  1.4, 7, 9, 13, 24, 15.2
`,
  userName: 'Anon',
  areaCode: ''
}

const initialPosts = {
  posts: []
}

// {
//   commentsID: [
//   ],
//   _id: 'temp123',
//   like: 0,
//   description: 'Entire fresh, delicious vegan cakes are available to order!  Wholewheat, organic bread can also be bought in our cafe.',
//   placeName: 'And 유 (Yu) Café',
//   address: '518 Hallim-ro 한림읍 Jeju-si Jeju-do KR',
//   placeType: 'Cafe',
//   placeID: 'temp_place_id',
//
// },

export function userNameData(state=initialState.userName, action) {
  switch (action.type) {
	  case 'RECEIVE_USERNAME': {
      const { userName, userID } = action.payload

      return {
        userName: userName,
        userID: userID
      }
    }
    default: {
	    return state;
	  }
  }
}

export function postsData(state = initialPosts, action) {
  switch (action.type) {
	  case 'RECEIVE_POSTS': {
      const { posts } = action.payload
      console.log(state.posts,'REEEE')
      return {
        ...state,
        posts: posts
      }
    }
    default: {
	    return state;
	  }
  }
}

const initialComments = {
  comments: {}
}

export function commentsData(state = initialComments, action) {
  switch (action.type) {
    case 'RECEIVE_COMMENTS': {
      const { comments } = action.payload
      return {
        ...state,
        comments: comments
      }
    }
    default: {
	    return state;
	  }
  }
}

const initialThreads = {
  threads: {}
}

export function threadsData(state = initialThreads, action) {
  switch (action.type) {
    case 'RECEIVE_THREADS': {
      const { threads } = action.payload
      return {
        ...state,
        threads: threads
      }
    }
    default: {
	    return state;
	  }
  }
}

export function waveData(state = initialState, action) {
  switch (action.type) {
	  case 'RECEIVE_ENTITIES': {
      // const { projects } = action.payload;
      console.log(action.payload,' action.payload')
      const { waveData } = action.payload;
      // const { areaCode } = action.payload

	    return {
        ...state,
        // areaCode: areaCode,
        waveData: waveData
	    }
	  }
    // // case 'CHANGE_PAGE':
    // //   return {
    // //     ...state,
    // //     myAction: 'CHANGE_PAGE'
    // //   }
    // case 'CREATE_COMMENT':
    //   const { projectIdComment } = action.payload;
    //   const { comment } = action.payload;
    //
    //   console.log(projectIdComment + 'aa ' + comment + 'create comment');
    //   let myProjects = state.projects;
    //   // myProjects.forEach((each) => {if (each.id == projectIdComment) {
    //   //   each.comment = {
    //   //     [each.comment != undefined ? each.comment.length : 0]: comment}
    //   // }})
    //   myProjects.forEach((each) => {    //figure out arr or whateve
    //     if (each.id === projectIdComment) {
    //        // if (!each.comment) {
    //        //   each.comment = [];
    //        //   each.comment.push(comment);
    //        // } else {
    //        //   each.comment.push(comment);
    //        // }
    //        let newArr = [];
    //        comment.forEach(each => {
    //          newArr.push(each)
    //        })
    //        // each.comment = [...comment];
    //        each.comment = newArr
    //   }})   //changes inplace
    //
    //   console.log(myProjects, 'MA PROJ')
    //
    //   return {
    //     ...state,
    //     projects: [...myProjects]
    //   }
    //
    // case 'COUNT_UP':
    //   console.log(state.projects)
    //   const { projects } = state;
    //   const { projectId } = action.payload;
    //   if (projects.length > 0) {
    //
    //     const pushedProject = getProjectByProjectId(projects, projectId);   //dont even need this
    //     console.log(pushedProject)
    //     // projects = projects.filter(each => each.id != projectId);
    //     projects.forEach((each) => {if (each.id === projectId) { each.counts += 1}})   //changes inplace
    //
    //     return {
    //       ...state,
    //       projectsLength: projects.length,
    //       projects: [...projects]
    //     }
    //   }
	  default: {
	    return state;
	  }
  }
}



function getProjectByProjectId(projects, projectId) {

  let matchingProject = projects.filter(each => each.id === projectId);
  console.log(matchingProject,'matchingProject')

  return matchingProject[0];
}
