import { useEffect, useState } from 'react'
import { projectFirestore} from '../firebase/config'

///
export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  //grabbing realtime data for document
  useEffect(() => {
    
    //real time listener

      //reference to the document
      const ref = projectFirestore.collection(collection).doc(id)
      //get a snapshot of the data whenever the data changes
       const unsubscribe = ref.onSnapshot((snapshot) => {
        //check to see if there is data in the requested document 
        if(snapshot.data()){       
        //update the document state to reflect what we recieve
        setDocument({...snapshot.data(), id: snapshot.id})
        //reset any errors
        setError(null)
        } else {
          //if there is no document attached to the document reference
          setError('No such document exists')
        }
      },
        //function to handle error
        (err) => {
          console.log(err.message)
          setError('failed to get document')
        })
        //cleanup function
        return () => unsubscribe()


  }, [collection, id])

  return {document, error}
}