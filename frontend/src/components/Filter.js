import React from 'react'

export default function Filter() {
  return (
    <div className='filter_section'>
      <select name="filter" id="filter" className='filter_box'>
        <option value="best_match">Filters:</option>
        <option value="best_match">TBD</option>
        <option value="best_match">TBD</option>
        <option value="best_match">TBD</option>
        <option value="best_match">TBD</option>
        <option value="best_match">TBD</option>
      </select>
      <select name="sort" id="sort" className='filter_box'>
        <option value="best_match">Sort By: Best Match</option>
        <option value="best_match">Sort By: Price Low To High</option>
        <option value="best_match">Sort By: Price High To Low</option>
        <option value="best_match">Sort By: Customer Rating</option>
        <option value="best_match">Sort By: Brand A - Z</option>
        <option value="best_match">Sort By: Brand Z - A</option>
      </select>
    </div>
  )
}
