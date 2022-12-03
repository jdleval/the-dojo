import { useState, useEffect } from 'react';

import { useCollection } from '../../hooks/useCollection';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import Select from 'react-select';

// styles
import './Create.css';
import { useHistory } from 'react-router-dom';

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];

export default function Create() {
  const history = useHistory();
  //!used to add new document
  const { addDocument, response } = useFirestore('projects');
  const { documents } = useCollection('users');
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();

  // form field values
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  //select states
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, SetFormError] = useState(null);

  //grab users from documents
  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    SetFormError(null);

    //check category is selected
    if (!category) {
      SetFormError('Please select a project category');
      return;
    }
    //check that users are assigned to project
    if (assignedUsers.length < 1) {
      SetFormError('Please assign project to at least on user');
      return;
    }

    const createdByList = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignedUsers.map((userAssigned) => {
      return {
        displayName: userAssigned.value.displayName,
        photoURL: userAssigned.value.photoURL,
        id: userAssigned.value.id,
      };
    });

    const project = {
      name,
      details,
      category: category.value,
      //timestamp from firebase.config
      dueDate: timestamp.fromDate(new Date(dueDate)),
      //for later
      comments: [],
      createdByList,
      assignedUsersList,
    };
    //!adds new document
    await addDocument(project);
    if (!response.error) {
      history.push('/');
    }
  };

  return (
    <div className="create-form">
      <h2 className="page-title">Create A New Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name:</span>
          <input required type="text" onChange={(e) => setName(e.target.value)} value={name} />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea required type="text" onChange={(e) => setDetails(e.target.value)} value={details}></textarea>
        </label>
        <label>
          <span>Set Due Date:</span>
          <input required type="date" onChange={(e) => setDueDate(e.target.value)} value={dueDate} />
        </label>
        <label>
          <span>Project Category</span>
          <Select onChange={(option) => setCategory(option)} options={categories} />
        </label>
        <label>
          <span>Assign To:</span>
          <Select onChange={(option) => setAssignedUsers(option)} options={users} isMulti />
        </label>

        <button className="btn">Add Project</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
