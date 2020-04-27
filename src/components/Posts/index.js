import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
// import Sketch from './Sketch'
import { connect } from 'react-redux';
// import Close from './../../Close'
import * as api from '../../api'
import {
  fetchPostsData,
  fetchCommentsData,
  fetchThreadsData,
} from '../../actions';

// const MemoizedP5Wrapper = React.memo(P5Wrapper)
// const MemoizedTable = React.memo(Table)

// clean up a bit
// comment section is only allowed for those who logged - on
// install that barrier
// maybe its time to upload new posts - maybe with imgs

//thread
// name next to the text - and time -

function ThreadsMatch(props) {
  // let threadsFound
  if(props.comment.threadsID.length > 0) {
    if(props.threads !== undefined && props.threads.length > 0) {
      let newArr = []
      props.comment.threadsID.forEach(each => {
        props.threads.forEach(item => {
          if (each == item.threadID) {
            newArr.push(item)
          }
        })
      })
      console.log(newArr)

      // let threadsFound = props.threads.filter(item => {
      //  let tempArr = []
      //  props.comment.threadsID.forEach(each => {
      //    if (each.threadID == item.threadID) {
      //      tempArr.push(item)
      //
      //      console.log(tempArr)
      //    }
      //  }
      //  return tempArr
      return(<div>
          {newArr !== undefined ? newArr.map(thread => (<div className="threadWrapper">{thread.text}</div>)) : ''}
            </div>)
     } else {
       return null
     }

     // return (<div>
     //     {threadsFound !== undefined ? threadsFound.map(each => (<div className="threadWrapper">{each.text}</div>)) : ''}
     // </div>)
   } else {
     return null
   }
    // console.log(props.threads,'props threads')
  // } else  {
  //   return null
  // }
  // return (
  //   <div>
  //       {threadsFound !== undefined ? threadsFound.map(each => (<div className="threadWrapper">{each.text}</div>)) : ''}
  //   </div>
  // )
}

function CommentsMatch(props) {
  let matching = props.comments.filter(item => {
    return item.commentID === props.matchID
  })

  let currentCommentID = props.commentID


  return (<>
            {matching.map(each =>
              <div

                className={each.commentID === currentCommentID ? "commentSelected commentWrapper" : "commentWrapper" }
                onClick={props.onCommentClick}
                data-comment-id={each.commentID}
                >
                {/*each.commentID === currentCommentID ? 'current' : '' */}
                {each.text}
                <ThreadsMatch
                  threads={props.threads}
                  comment={each}
                />
              </div>)}
          </>)
}


class ThreadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCommentForm: true,
      comment: '',
      // author: '',
    }
  }


  onCreateComment = (e) => {
    e.preventDefault();
    // if(this.state.author === ''){
    //   this.setState({author: 'Anonymous'})
    // }
    let { userID, placeID, commentID } = this.props

    //need text, userID, placeID
    api.createThread(userID, placeID, this.state.comment, commentID).then(res => {
      console.log(res,'response after api post create comment')
      // this.props.dispatch(fetchPostsData())
      this.props.dispatch(fetchCommentsData())
      this.props.dispatch(fetchThreadsData())
    })

    this.resetForm();
    // this.setState({author: ''}) //back to ''
  }

  resetForm() {
    this.setState({
      showCommentForm: true,
      comment: '',
      // author: '',
    })
  }

  onCommentChange = (e) => {
    this.setState({
      comment: e.target.value
    })
  }

  // onAuthorChange = (e) => {
  //   this.setState({
  //     author: e.target.value
  //   })
  // }

  toggleCommentForm = () => {
    this.setState({ showCommentForm: !this.state.showCommentForm });
  }


  render() {
    return (
      <div className="commentSection">
        {this.state.showCommentForm && (
          <form
            className="task-list-form"
            onSubmit={this.onCreateComment}
          >
            {/*<input
              className="full-width-input"
              onChange={this.onAuthorChange}
              value={this.state.author}
              type="text"
              placeholder="author..."
            />*/}
            <textarea rows="2" cols="20" wrap="hard"
              className="full-width-input full-height-input"
              onChange={this.onCommentChange}
              value={this.state.comment}
              type="text"
              placeholder="comment..."
            >
            </textarea>

            <button
              className="customButton"
              type="submit"
            >
              Post
            </button>
          </form>
        )}

      </div>
    )
  }
}

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCommentForm: true,
      comment: '',
      author: '',
      error: '',
    }
  }


  onCreateComment = (e) => {
    e.preventDefault();
    if(this.state.author === ''){
      this.setState({author: 'Anonymous'})
    }
    let { userID, placeID } = this.props
    console.warn(userID,': userID')
    if( userID === undefined ) {
      this.setState({error: 'Please Log-In to make comments'})
    }

    //need text, userID, placeID
    api.createComment(userID, placeID, this.state.comment).then(res => {
      console.log(res,'response after api post create comment')
      this.props.dispatch(fetchPostsData())
      this.props.dispatch(fetchCommentsData())
    })

    this.resetForm();
    this.setState({author: ''}) //back to ''
  }

  resetForm() {
    this.setState({
      showCommentForm: true,
      comment: '',
      author: '',
    })
  }

  onCommentChange = (e) => {
    this.setState({
      comment: e.target.value
    })
  }

  onAuthorChange = (e) => {
    this.setState({
      author: e.target.value
    })
  }

  toggleCommentForm = () => {
    this.setState({ showCommentForm: !this.state.showCommentForm });
  }


  render() {
    return (
      <div className="commentSection">
        {this.state.error !== '' ? <div className="errorBar">{this.state.error}</div> : ''}
        {this.state.showCommentForm && (
          <form
            className="task-list-form"
            onSubmit={this.onCreateComment}
          >

            {/*<input
              className="full-width-input"
              onChange={this.onAuthorChange}
              value={this.state.author}
              type="text"
              placeholder="author..."
            />*/}
            <textarea rows="2" cols="20" wrap="hard"
              className="full-width-input full-height-input"
              onChange={this.onCommentChange}
              value={this.state.comment}
              type="text"
              placeholder="comment..."
            >
            </textarea>

            <button
              className="customButton"
              type="submit"
            >
              Post
            </button>
          </form>
        )}

      </div>
    );
  }
}

function PostsWrapper(props) {
  // props.post.commentsID.forEach(each => console.log(each))
  const [commentID, setCommentID] = useState('')

  const onCommentClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    let selectedCommentID = e.target.getAttribute("data-comment-id")
    if(commentID !== selectedCommentID) {
      setCommentID(selectedCommentID)
    } else {
      setCommentID('')
    }
    // setCommentID(e.target.getAttribute("data-comment-id"))
    // post to commentDB -> if ids match,
  }


  return(
    <div className="PostsWrapper">
      <div className="leftHand">
        <img className="postImage" src={"./assets/images/sample4.jpeg"} alt="postImage"></img>
        <div className="absoluteCenterContainer">
          {props.post.placeName}
          <br />
          {props.post.placeType}
        </div>
      </div>
      <div className="rightHand">
        <h1>{props.post.placeName}</h1>
        <button className="absoluteCornerContainer">{props.post.like}</button>
        <h4>{props.post.address}</h4>
        <p>{props.post.description}</p>


        {props.post.commentsID.length > 0 ? (<div className="commentsBlock">
            {props.post.commentsID.map(each => <div>
              {<CommentsMatch
                  onCommentClick={onCommentClick}
                  comments={props.comments}
                  matchID={each}
                  threads={props.threads}
                  commentID={commentID}
                />}
            </div>)}
          </div>)  : <p>No comments</p>}
          {commentID === '' ? <Comments
            placeID={props.post.placeID}
            userID={props.userID}
            dispatch={props.dispatch}
          /> : <ThreadForm
            placeID={props.post.placeID}
            userID={props.userID}
            dispatch={props.dispatch}
            commentID={commentID}
          />}



      </div>


      {/*
        comments -> cross match -> loop thru props.post.commentsID -> if matching is found in props.comments.commentID -> return filter -> render
        */}
      {/*
        form    // make sure after posting, feed is updated - best to reload based on the api response? or just update it based on local state?

        -> post request to /comment
        -> get response -> of the updated comments -> pushes to existing arr state automatically
        */}
    </div>
  )
}

function Posts(props, action) {
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])

    useEffect(() => { // initial sample data fetch
      props.dispatch(fetchPostsData())
      props.dispatch(fetchCommentsData())
      props.dispatch(fetchThreadsData())
    },[])

    const postsReady = () => {
      if (typeof props.posts !== 'undefined' && props.posts.length > 0) {
        console.log(props.posts, 'props are retreived from store')
        return true
      }
      console.log('props retreiving has failed')
      return false
    }

    const commentsReady = () => {
      if (typeof props.comments !== 'undefined' && props.comments.length > 0) {
        return true
      }
      console.log('props retreiving has failed')
      return false
    }

    useEffect(()=>{
      console.log('we listen to props.posts')
      if(postsReady() == true) {
        setPosts(props.posts)
        setComments(props.comments)
        console.log(posts,'posts have been set')
      }
      // else {
      //   props.dispatch(fetchPostsData())
      //   props.dispatch(fetchCommentsData())
      // }
    },[props.posts, props.comments])



    return (
        <div>
          {/*{posts.length > 0 ? posts.map(item => <div>item ready</div>) : 'not ready'}*/}

          {/*{postsReady() ? (props.posts.map(each => <div>{each.description}</div>)) : 'Loading' }
          */}

          {postsReady() && commentsReady() ? (props.posts.map(each => <PostsWrapper
            post={each}
            comments={props.comments}
            dispatch={props.dispatch}
            userID={props.userID}
            userName={props.userName}
            threads={props.threads}
            />)) : 'Loading' }
        </div>
    )
}

function mapStateToProps(state) {
  const { posts } = state.postsData
  const { comments } = state.commentsData
  const { userName, userID } = state.userNameData
  const { threads } = state.threadsData
  return {
    posts: posts,
    comments: comments,
    userName: userName,
    userID: userID,
    threads: threads,
  }
}

export default connect(mapStateToProps)(Posts);
