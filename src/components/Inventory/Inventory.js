import axios from 'axios'
import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

import apiUrl from '../../apiConfig'
import { deleteSuccess, deleteFailure } from '../AutoDismissAlert/messages'

class Inventory extends Component {
  constructor (props) {
    super(props)

    this.state = {
      inventory: [],
      deleted: false,
      user: props.user,
      loading: true
    }
  }

  // When the component is called/shows up, run this code
  componentDidMount () {
    const id = this.props.match.params.id

    axios({
      url: apiUrl + '/inventories/' + id,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.user.token}`
      }
    })
      .then((res) => this.setState({ loading: false, inventory: res.data.inventory }))
      .catch(console.error)
  }

  handleClick = () => {
    const id = this.props.match.params.id
    const { msgAlert } = this.props

    axios({
      url: apiUrl + '/inventories/' + id,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.state.user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .then(() =>
        msgAlert({
          heading: 'Delete Inventory Success',
          message: deleteSuccess,
          variant: 'success'
        })
      )
      .catch((error) => {
        msgAlert({
          heading: 'Delete Inventory failed with error: ' + error.message,
          message: deleteFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    if (this.state.deleted) {
      return <Redirect to='/' />
    }
    if (this.state.loading) {
      return <h3>Loading...</h3>
    }

    const itemNameJSX = this.state.inventory.items.map((item) => (
      <span key={item._id}>{item.name}</span>
    ))

    const itemQuantJSX = this.state.inventory.items.map((item) => (
      <span key={item._id}>{item.quantity}</span>
    ))

    return (
      <div className='row'>
        <div className='col-sm-10 col-md-8 mx-auto mt-5'>
          <h2>{this.state.inventory.name}</h2>
          <h5>{itemNameJSX}: {itemQuantJSX}</h5>
          <Link to={'/inventories/' + this.props.match.params.id + '/edit'}><button>Edit</button></Link>
          <button onClick={this.handleClick}>Delete</button>
          <Link to="/"><button>Back</button></Link>
        </div>
      </div>
    )
  }
}

export default Inventory
