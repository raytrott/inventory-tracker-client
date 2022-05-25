import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import { index } from '../../api/inventory'

const Inventory = ({ user }) => {
  const [inventories, setInventories] = useState([])

  useEffect(() => {
    index(user)
      .then((res) => setInventories(res.data.inventory))
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error)
      })
  })

  return (
    <div>
      <ul>
        <li>Hello World</li>
        <li>{inventories}</li>
      </ul>
    </div>
  )
}

export default withRouter(Inventory)
