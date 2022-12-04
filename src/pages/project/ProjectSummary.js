import Avatar from '../../components/Avatar.js';
import { useFirestore } from '../../hooks/useFirestore.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import { useHistory } from 'react-router-dom';

import React from 'react';

export default function ProjectSummary({ project }) {
  const { deleteDocument } = useFirestore('projects');
  const { user } = useAuthContext(); //get current user from context
  const history = useHistory();//used to redirect user
  

  const handleComplete = (e) => {
    e.preventDefault();
    deleteDocument(project.id);
    history.push('/')//redirect to home page

  };

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p>Project Created By: {project.createdByList.displayName.toUpperCase()}</p>
        <p className="due-date">Project due by {project.dueDate.toDate().toDateString()}</p>
        <p className="details">{project.details}</p>

        <h4>Project is assisgned to :</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {/* show only if createdBy user is logged in */}
      {user.uid === project.createdByList.id && (
        <button className="btn" onClick={handleComplete}>
          Mark as Complete
        </button>
      )}
    </div>
  );
}
