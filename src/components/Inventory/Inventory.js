import axios from 'axios'
import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

import apiUrl from '../../apiConfig'

class Inventory extends Component {
  constructor (props) {
    super(props)
    console.log(props.match.params.id)

    this.state = {
      inventory: {},
      deleted: false,
      user: props.user,
      loading: true
    }
  }

  // When the component is called/shows up, run this code
  componentDidMount () {
    const id = this.props.match.params.id
    console.log('hi')

    axios({
      url: apiUrl + '/inventories/' + id,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.user.token}`
      }
    })
      .then((res) => (res))
      .then((res) => console.log(res.data))
      .then((res) => this.setState({ inventory: res.data.inventory }))
      .then(this.setState({ loading: false }))
      .catch(console.error)
  }

  // When any props or state change
  componentDidUpdate () {
    console.log('Updated!')
  }

  // When the component will leave the page/disappear
  componentWillUnmount () {
    console.log('Unmounting!')
  }

  handleClick = () => {
    const id = this.props.match.params.id
    console.log(id)

    axios({
      url: apiUrl + '/inventories/' + id,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.state.user.token}`
      }
    })
      // update based on API call result
      .then(() => this.setState({ deleted: true }))
      .catch(console.error)
  }

  render () {
    if (this.state.deleted) {
      return <Redirect to='/' />
    }
    if (this.state.loading) {
      return <h3>Loading...</h3>
    }

    return (
      <>
        <h1>Inventory</h1>
        <h3>Inventory Name: {this.state.inventory.name}</h3>
        <h5>Items: {this.state.inventory.items}</h5>
        <button onClick={this.handleClick}>Delete</button>
        <Link to={'/inventories/' + this.props.match.params.id + '/edit'}><button>Edit</button></Link>
      </>
    )
  }
}

export default Inventory
