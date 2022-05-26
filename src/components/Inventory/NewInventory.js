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
      items: '',
      createdInvId: null,
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
    console.log(event)
    console.log(this.state.name)
    console.log(this.state.items)
    axios({
      url: `${apiUrl}/inventories`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.state.user.token}`
      },
      data: {
        inventory: {
          name: this.state.name,
          items: this.state.items
        }
      }
    })
      .then(res => console.log(res.data))
      .then(res => this.setState({ createdInvId: res.data.inventory._id }))
      .catch(console.error)
  }

  render () {
    const { handleChangeName, handleChangeItems, handleSubmit } = this
    const { createdInvId, inventory } = this.state

    if (createdInvId) {
      return <Redirect to={'/'} />
    }

    return (
      <div>
        <InvForm
          inventory={inventory}
          handleChangeName={handleChangeName}
          handleChangeItems={handleChangeItems}
          handleSubmit={handleSubmit}
          cancelPath="/"
        />
      </div>
    )
  }
}

export default NewInventory
