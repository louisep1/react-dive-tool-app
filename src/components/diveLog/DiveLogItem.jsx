import { useContext } from 'react'
import DiveContext from '../../context/diveContext/DiveContext'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase.config'
import { toast } from 'react-toastify'

function DiveLogItem({ item, pendingFetch, setPendingFetch }) {
  const { dispatch, state } = useContext(DiveContext)

  const auth = getAuth();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete?')) {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          await deleteDoc(doc(db, "logs", item.id))
          setPendingFetch(true)
        } else {
          dispatch({ type: 'DELETE_DIVE', payload: item.id })
        }
      });
      toast.success('Dive deleted')
    }
  }

  const handleEdit = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(item)
        dispatch({ type: 'EDIT_FETCHED_DIVE', payload: item })
      } else {
        dispatch({ type: 'EDIT_DIVE', payload: item.id })
      }
    });
  }

  return (
    <div className="card sm:w-96 bg-primary text-primary-content m-4">
      <div className="card-body">
        <div className="card-actions justify-end">
          <button onClick={handleEdit} className="btn btn-xs btn-outline rounded-full">Edit</button>
          <button onClick={handleDelete} className="btn btn-xs btn-outline rounded-full">Delete</button>
        </div>
        <div className="card-title">Dive No. {item.log}: {item.date}</div>
        <div>Location: <div className='badge badge-accent'>{item.diveLocation}</div></div>
        <div>Bottom time: <div className="badge badge-ghost">{item.diveTime} mins</div></div>
        <div>Depth: <div className="badge badge-ghost">{item.depth}m</div></div>

        <div><div>Time in: {item.timeIn}</div><div>Time out: {item.timeOut}</div></div>
        <div><div>Start bar: {item.startBar}</div><div>End bar: {item.endBar}</div></div>
        <div>Visibility: {item.visibility}m</div>
        <div><div>Air temp: {item.airTemp}°C</div><div>Surface Temp: {item.surfaceTemp}°C</div><div>Bottom temp: {item.bottomTemp}°C</div></div>


        <div style={{ whiteSpace: "pre-wrap" }}>Dive conditions and exposure protection: {item.conditions}</div>
        <div style={{ whiteSpace: "pre-wrap" }}>Notes: {item.notes}</div>
      </div>
    </div>
  )
}

export default DiveLogItem