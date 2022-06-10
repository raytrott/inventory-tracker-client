import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import InvForm from './InvForm'

class InventoryEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      itemName: '',
      itemQuant: '',
      updated: null,
      user: props.user
    }
  }

  handleChangeName = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleChangeItems = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()

    const id = this.props.match.params.id

    axios({
      url: apiUrl + '/inventories/' + id,
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${this.state.user.token}`
      },
      data: {
        inventory: {
          name: this.state.name,
          items: [{
            name: this.state.itemName,
            quantity: this.state.itemQuant,
            owner: this.state.user._id
          }]
        }
      }
    })
      .then(this.setState({ updated: true }))
      .catch(console.error)
  }

  render () {
    const { handleChangeName, handleChangeItems, handleSubmit } = this
    const { updated, inventory } = this.state

    if (updated) {
      return <Redirect to={'/'} />
    }

    return (
      <div className='row'>
        <div className='col-sm-10 col-md-8 mx-auto mt-5'>
          <h3>Update Inventory List</h3>
          <InvForm
            inventory={inventory}
            handleChangeName={handleChangeName}
            handleChangeItems={handleChangeItems}
            handleSubmit={handleSubmit}
            cancelPath="/"
          />
        </div>
      </div>
    )
  }
}

export default InventoryEdit
