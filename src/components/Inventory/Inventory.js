import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { index } from '../../api/inventory'

const Inventory = ({ user }) => {
  const [inventories, setInventories] = useState([])

  useEffect(() => {
    index(user)
      .then((res) => {
        return res
      })
      .then((res) => setInventories(res.data))
      .catch((error) => {
        console.log(error)
      })
  }, []
  )

  if (inventories.length < 1) {
    return (
      <h1>Loading...</h1>
    )
  } else {
    const inventoryJSX = inventories.inventories.map((inventory) => (
      <div key={inventory._id}>
        <li>{inventory.name}</li>
      </div>
    ))

    return (
      <div>
        <h3>My Inventories</h3>
        <h4>{inventoryJSX}</h4>
        <Link to='/new-inventory'><button>Add New Inventory</button></Link>
      </div>
    )
  }
}

export default withRouter(Inventory)
