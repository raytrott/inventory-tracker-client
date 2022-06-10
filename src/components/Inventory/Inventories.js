import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { index } from '../../api/inventory'

const Inventories = ({ user }) => {
  const [inventories, setInventories] = useState([])

  useEffect(() => {
    index(user)
      .then((res) => setInventories(res.data))
      .catch(console.error)
  }, []
  )

  if (inventories.length < 1) {
    return (
      <div className='row'>
        <div className='col-sm-10 col-md-8 mx-auto mt-5'>
          <h1>Welcome!</h1>
          <h3>Create an inventory list by clicking the button below!</h3>
          <Link to='/new-inventory'><button>Add New Inventory</button></Link>
        </div>
      </div>
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
