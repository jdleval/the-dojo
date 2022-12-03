import { useParams } from 'react-router-dom'
import { useDocument} from '../../hooks/useDocument'

// styles
import './Project.css'
import ProjectComments from './ProjectComments'
import ProjectSummary from './ProjectSummary'

export default function Project() {
  //extract the id we need to display the document
  const {id} = useParams()
  //extract from the useDocument hook passing in 
  //the name of the collection and the id from useParams
  const {error, document} =useDocument('projects', id)

  //error check
  if (error) {
    return <div className='error'>{error}</div>
  }
  //if no document
  if(!document) {
    return <div className='loading'>Loading...</div>
  }

  return (
    //display the document
    <div className='project-details'>
      <ProjectSummary project={document}/>
      <ProjectComments project={document} />
    </div>
  )
}
