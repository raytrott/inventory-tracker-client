import React from 'react'
import { Link } from 'react-router-dom'

const InvForm = ({ name, items, handleSubmit, handleChangeName, handleChangeItems, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Name</label>
    <input
      placeholder="Household Goods"
      value={name}
      name="name"
      onChange={handleChangeName}
    />

    <label>Items</label>
    <input
      placeholder="Bedframe"
      value={items}
      name="Items"
      onChange={handleChangeItems}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default InvForm
