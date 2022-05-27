import React from 'react'
import { Link } from 'react-router-dom'

const InvForm = ({ name, itemName, itemQuant, handleSubmit, handleChangeName, handleChangeItems, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Name</label>
    <input
      placeholder="Household Goods"
      value={name}
      name="name"
      onChange={handleChangeName}
    /><br></br>

    <label>Item Name</label>
    <input
      placeholder="Bedframe"
      value={itemName}
      name="itemName"
      onChange={handleChangeItems}
    />

    <label>Item Quantity</label>
    <input
      placeholder="0"
      value={itemQuant}
      name="itemQuant"
      onChange={handleChangeItems}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default InvForm
