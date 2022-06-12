import React, { Component } from 'react'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import InvForm from './InvForm'
import { updateSuccess, updateFailure } from '../AutoDismissAlert/messages'

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

    const { msgAlert } = this.props

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
      .then(() =>
        msgAlert({
          heading: 'Update Inventory Success',
          message: updateSuccess,
          variant: 'success'
        })
      )
      .catch((error) => {
        msgAlert({
          heading: 'Update Inventory failed with error: ' + error.message,
          message: updateFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { handleChangeName, handleChangeItems, handleSubmit } = this
    const { inventory } = this.state

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
