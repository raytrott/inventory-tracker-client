import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import InvForm from './InvForm'

class NewInventory extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      itemName: '',
      itemQuant: '',
      createdInvId: null,
      user: props.user,
      created: false
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
    console.log(event)
    console.log(this.state.name)
    console.log(this.state.itemQuant)
    console.log(this.state.user)
    axios({
      url: `${apiUrl}/inventories`,
      method: 'POST',
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
      .then(res => console.log(res.data))
      .then(res => this.setState({ createdInvId: res.data.inventory._id }))
      .then(this.setState({ created: true }))
      .catch(console.error)
  }

  render () {
    const { handleChangeName, handleChangeItems, handleSubmit } = this
    const { createdInvId, inventory } = this.state

    if (createdInvId) {
      return <Redirect to={'/'} />
    }
    if (this.state.created) {
      return <Redirect to={'/'} />
    }

    return (
      <div className='row'>
        <div className='col-sm-10 col-md-8 mx-auto mt-5'>
          <h3>Add New Inventory List</h3>
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

export default NewInventory
