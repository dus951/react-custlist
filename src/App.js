import { render } from '@testing-library/react';
import React, { Component } from 'react'
import "./App.css";
import TodoList from './TodoList';
import axios from "axios";


class App extends Component {
  //<TodoList />

  state = { todos: []};
  async componentDidMount(){
    let results = await axios.get("https://jsonplaceholder.typicode.com/users");
    this.setState({todos: results.data});
  }

  renderTableHeader = () => {
     return Object.keys(this.state.todos[0]).map(attr => <th key={attr}>
       {attr.toUpperCase()}
     </th>)
  }

  renderTableRows = () => {
    return  this.state.todos.map(todo => {
      return(
        <tr key={todo.id}>
          <td>{todo.id}</td>
          <td>{todo.name}</td>
          <td>{todo.username}</td>
          <td>{todo.email}</td>
          <td>
            {`${todo.address.street}, ${todo.address.suite}, ${todo.address.city}, ${todo.address.zipcode}. `}
             <small class="text-muted">LAT/LONG:{todo.address.geo.lat}, ${todo.address.geo.lng}</small>
          </td>
          <td>{todo.phone}</td>
          <td>{todo.website}</td>
          <td>
            {`${todo.company.name}`}
            <p class="fw-light">"{todo.company.catchPhrase}"</p>
            <small class="text-muted">{todo.company.bs}</small>
          </td>
        </tr>

      )
    })
 }

  render (){
    return(
      <div className="container-sm"  >
        
        {this.state.todos.length > 0 ? (
        <div>
          <h1>Contacts Listing</h1>
          <table class="table table-striped table-hover">
            <thead class="table-dark">
              <tr>
                {this.renderTableHeader()}
              </tr>
            </thead>
            <tbody>
                {this.renderTableRows()}
            </tbody>
          </table>
        </div>) : (
          <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
          </div>
          )}
        </div>
    );
  }
}

export default App;
