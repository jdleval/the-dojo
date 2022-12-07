import React from 'react'

// list of filters  
const filterList = ['all', 'mine', 'development', 'design', 'sales', 'marketing'];


export default function ProjectFilter({currentFilter, changeFilter}) {
// pass in new filter
const handleClick = (newFilter) => {
  //pass in changeFilter from dashboard
  changeFilter(newFilter);  
}

  return (
    <div className='project-filter'>
      <nav>
        <p>Filter by: </p>
        {filterList.map((filter) => (
          <button key={filter} 
          onClick={() => handleClick(filter)}
          // if current filter is equal to filter then add active class          
          className={currentFilter === filter ? 'active' : ''}
              >
            {filter}
          </button>
        ))}

      </nav>
      
    </div>
  )
}
