
import { Link } from 'react-router-dom'
import Avatar from './Avatar'

//styles
import './ProjectList.css'

import React from 'react'

export default function ProjectList({ projects }) {
  return (
    <div className='project-list'>
      {projects.length === 0 && <p>No Projects Yet</p>}

      {projects.map(project => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>
          <h4>Created By:  {project.createdByList.displayName.toUpperCase()}</h4>
          <div className="assigned-to">
            <ul>
            {project.assignedUsersList.map(user => (
              <li key={user.photoURL}>
                <Avatar src={user.photoURL} />
                <p className='userDisplayName'>{user.displayName}</p>
              </li>
            ))}
            </ul>
          </div>
          
          </Link>
      ))}
    </div>
  )
}
