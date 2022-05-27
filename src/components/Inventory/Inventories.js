import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { index } from '../../api/inventory'

const Inventories = ({ user }) => {
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
      <h3>Loading...</h3>
    )
  } else {
    const inventoriesJSX = inventories.inventories.map((inventory) => (
      <>
        <li key={inventory._id}><Link to={'/inventories/' + inventory._id} user={user}>{inventory.name}</Link></li>
      </>
    ))

    return (
      <div className='row'>
        <div className='col-sm-10 col-md-8 mx-auto mt-5'>
          <h1>My Inventories</h1>
          <Link to='/new-inventory'><button>Add New Inventory</button></Link>
          <h5>{inventoriesJSX}</h5>
        </div>
      </div>
    )
  }
}

export default withRouter(Inventories)