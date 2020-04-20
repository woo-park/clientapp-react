import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as api from '../../api'

class MyApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      username: '',
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

    axios.get('/api/userDB')
      .then(res => {
        console.log(res.data,'userDB res.data')
        this.setState({ books: res.data });
        console.log(this.state.books);
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.props.history.push("/login");
        }
      });

    /*
    axios.get('/api/auth')
      .then(res => {
        console.log(res.data, 'auth res.data')
        console.log(res.data.username)
        this.setState({ username: res.data.username });
        console.log(this.username)
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
    */

    api.getUserAuthorized().then(res => {
      this.setState({username: res.username})
    }).catch((error) => {
      //need to double check this but how?
      console.warn(error)
      if(error.response.status === 401) {
        this.props.history.push("/login");
      }
    })


    axios.get('/api/animalsDB')
      .then(res => {
        console.log(res.data,'animalsDB res.data')
        this.setState({ books: res.data });
        console.log(this.state.books);
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.props.history.push("/login");
        }
      });



//be moved later
    axios.post('/api/userDB',
      [
        {
          id: 0,
          interests: ['I','G','E','R','D','O'],
          name:'tiger person',
        }
      ]
    )

    axios.post('/api/animalsDB',
      [
        {
          id:100,
          name: 'TIGER',
          interests: ['T','I','G','E','R']
        }
      ]
    )
  }


  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }



  render() {
    return (
      <div className="home">

        <div className="panel panel-default">


          <div className="panel-heading">
          <h1>Welcome {this.state.username}</h1>
            <h3 className="panel-title">
              BOOK CATALOG &nbsp;
              {localStorage.getItem('jwtToken') &&
                <button className="btn btn-primary" onClick={this.logout}>Logout</button>
              }
            </h3>
          </div>
          <div className="panel-body">
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>ISBN</th>
                  <th>Title</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.map(book =>
                  <tr>
                    <td><Link to={`/show/${book._id}`}>{book.isbn}</Link></td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default MyApp;
