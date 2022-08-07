// https://firebase.google.com/docs/firestore/manage-data/add-data

import { v4 as uuidv4 } from 'uuid'
import { useContext, useEffect, useState } from 'react'
import DiveContext from '../../context/diveContext/DiveContext'
import { MdEditNote } from 'react-icons/md'
import { toast } from 'react-toastify'

import { collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase.config'
import { getAuth } from "firebase/auth";


function DiveLogForm({ pendingFetch, setPendingFetch }) {
  const { dispatch, current, editing, dives, id, fetchedDives } = useContext(DiveContext)

  const [form, setForm] = useState({
    log: 1,
    date: '',
    diveLocation: '',
    diveTime: '',
    depth: '',
    timeIn: '',
    timeOut: '',
    startBar: '',
    endBar: '',
    visibility: '',
    airTemp: '',
    surfaceTemp: '',
    bottomTemp: '',
    conditions: '',
    notes: ''
  })

  const { log, date, diveLocation, diveTime, depth, timeIn, timeOut, startBar, endBar, visibility, airTemp, surfaceTemp, bottomTemp, conditions, notes } = form



  const resetFormStates = () => {
    setForm((prevState) => ({
      ...prevState,
      date: '',
      diveLocation: '',
      diveTime: '',
      depth: '',
      timeIn: '',
      timeOut: '',
      startBar: '',
      endBar: '',
      visibility: '',
      airTemp: '',
      surfaceTemp: '',
      bottomTemp: '',
      conditions: '',
      notes: '',
    }))

  }


  const auth = getAuth()

  const handleClick = async (e) => {
    e.preventDefault();
    // if (typeof (log) !== 'number') return toast.error('Please check the log number')
    if (date === '') return toast.error('Please check the date')
    if (diveLocation === '') return toast.error('Please check the location')
    if (diveTime === '') return toast.error('Please check the dive time')
    if (depth === '') return toast.error('Please check the max depth')

    if (editing === false) {
      if (auth.currentUser !== null) {
        const docRef = addDoc(collection(db, "logs"), {
          log, date, diveLocation, diveTime, depth, timeIn, timeOut, startBar, endBar, visibility, airTemp, surfaceTemp, bottomTemp, conditions, notes,
          userRef: auth.currentUser.uid
        })
        setPendingFetch(true)
      } else {
        dispatch({ type: 'ADD_DIVE', payload: { log, date, diveLocation, diveTime, depth, timeIn, timeOut, startBar, endBar, visibility, airTemp, surfaceTemp, bottomTemp, conditions, notes, id: uuidv4() } })
      }
      setForm((prevState) => ({
        ...prevState,
        log: +prevState.log + 1
      }))
      resetFormStates()
      toast.success('Dive log added')
    }

    if (editing === true) {
      if (auth.currentUser !== null) {
        // can either update or delete and re-add

        // await updateDoc(doc(db, 'logs', current[0].id), {
        //   log, date, diveLocation, diveTime, depth, timeIn, timeOut, startBar, endBar, visibility, airTemp, surfaceTemp, bottomTemp, conditions, notes
        // });

        const docRef = addDoc(collection(db, "logs"), {
          log, date, diveLocation, diveTime, depth, timeIn, timeOut, startBar, endBar, visibility, airTemp, surfaceTemp, bottomTemp, conditions, notes,
          userRef: auth.currentUser.uid
        })

        await deleteDoc(doc(db, "logs", current[0].id))

        dispatch({ type: 'UPDATE_FETCHED_DIVE' })
        setPendingFetch(true)
      } else {
        dispatch({
          type: 'UPDATE_DIVE', payload: { log, date, diveLocation, diveTime, depth, timeIn, timeOut, startBar, endBar, visibility, airTemp, surfaceTemp, bottomTemp, conditions, notes, id: uuidv4() }
        })
        setForm((prevState) => ({
          ...prevState,
          log: dives.length + 1
        }))
      }

      resetFormStates()
      toast.success('Current dive updated')
    }
  }



  useEffect(() => {
    if (editing === true) {
      setForm({
        log: current[0].log,
        date: current[0].date,
        diveLocation: current[0].diveLocation,
        diveTime: current[0].diveTime,
        depth: current[0].depth,
        timeIn: current[0].timeIn,
        timeOut: current[0].timeOut,
        startBar: current[0].startBar,
        endBar: current[0].endBar,
        visibility: current[0].visibility,
        airTemp: current[0].airTemp,
        surfaceTemp: current[0].surfaceTemp,
        bottomTemp: current[0].bottomTemp,
        conditions: current[0].conditions,
        notes: current[0].notes,
      })
    } else return
  }, [current])


  useEffect(() => {
    if (fetchedDives.length === 0) {
      if (log !== 1 && dives.length > 0) {
        setForm((prevState) => ({
          ...prevState,
          log: dives.sort((a, b) => b.log - a.log)[0].log + 1
        }))
      } else if (dives.length === 0) {
        setForm((prevState) => ({
          ...prevState,
          log: 1
        }))
      }
    } else {
      setForm((prevState) => ({
        ...prevState,
        log: +(fetchedDives.sort((a, b) => b.log - a.log)[0].log) + 1
      }))
    }

  }, [dives, fetchedDives])



  const handleChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }


  return (
    <div className='w-11/12 overflow-hidden flex items-center justify-center flex-col py-4 mx-auto xl:w-8/12 outline outline-offset-4 outline-4 
    outline-cyan-500 bg-indigo-200 rounded-lg'>

      <div className='py-4 italic flex flex-row'>
        Enter latest dive details here... <MdEditNote className='text-xl ml-2' />
      </div>

      <form>
        {/* if you don't include this value={diveLocation} then it won't clear out the value or show any values you display that aren't directly typed into that form input box */}

        <div className="grid grid-cols-1 lg:flex flex-row py-4 justify-around">
          <div className='flex flex-col'>
            <label className='p-1 text-center lg:text-left' htmlFor="log">Log Number: (required)</label>
            <input className='p-1 text-center lg:text-left border-4 border-cyan-500/50' type='number' id='log' value={log} onChange={handleChange} />
          </div>
          <div className='flex flex-col'>
            <label className='p-1 text-center lg:text-left' htmlFor="date">Date of dive: (required)</label>
            <input className='p-1 pl-8 text-center lg:text-left self-center border-4 border-cyan-500/50' type='date' id='date' value={date} onChange={handleChange} />
          </div>
        </div>
        <div className="flex gap-1  justify-center flex-col lg:flex-row py-4 justify-around">
          <input className='p-1 text-center lg:text-left w-full border-4 border-cyan-500/50' type='text' placeholder='Dive Location (required)' id='diveLocation' value={diveLocation} onChange={handleChange} />
          <input className='p-1 text-center lg:text-left w-full border-4 border-cyan-500/50' type='number' placeholder='Dive Time in minutes (required)' id='diveTime' value={diveTime} onChange={handleChange} />
          <input className='p-1 text-center lg:text-left w-full border-4 border-cyan-500/50' type='number' placeholder='Max depth in metres (required)' id='depth' value={depth} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-2 gap-1 py-4">
          <input className='p-1 text-center' type='text' placeholder='Time in' id='timeIn' value={timeIn} onChange={handleChange} />
          <input className='p-1 text-center' type='number' placeholder='Start bar' id='startBar' value={startBar} onChange={handleChange} />
          <input className='p-1 text-center' type='text' placeholder='Time out' id='timeOut' value={timeOut} onChange={handleChange} />
          <input className='p-1 text-center' type='number' placeholder='End bar' id='endBar' value={endBar} onChange={handleChange} />
        </div>

        <div className="gap-1 flex justify-between flex-col lg:flex-row py-4">
          <input className='p-1 text-center lg:text-left' type='text' placeholder='Visibility (m)' id='visibility' value={visibility} onChange={handleChange} />
          <input className='p-1 text-center lg:text-left' type='text' placeholder='Air temp (°C)' id='airTemp' value={airTemp} onChange={handleChange} />
          <input className='p-1 text-center lg:text-left' type='text' placeholder='Surface temp (°C)' id='surfaceTemp' value={surfaceTemp} onChange={handleChange} />
          <input className='p-1 text-center lg:text-left' type='text' placeholder='Bottom temp (°C)' id='bottomTemp' value={bottomTemp} onChange={handleChange} />
        </div>

        <div className='relative flex gap-3 flex-col lg:flex-row lg:py-4'>
          <div className="tooltip" data-tip="weight, computer/RDP, exposure protection (wetsuit/drysuit, boots/gloves) | dive conditions (fresh/salt water, shore/boat, waves/surf/surge current/drift), etc...">
            <textarea cols='30' className='px-2 py-4 text-center lg:text-left' placeholder='Dive conditions and exposure protection' id='conditions' value={conditions} onChange={handleChange} />
          </div>
          <textarea cols='30' className='px-2 py-4' placeholder='Notes' id='notes' value={notes} onChange={handleChange} />
          <button onClick={handleClick} className="lg:absolute right-0 bottom-0 lg:mr-6 lg:mb-6 text-center hover:bg-purple-500 group rounded-md bg-purple-700 text-white text-sm font-medium pl-4 pr-6 py-4 shadow-sm">Submit</button>
        </div>

      </form>
    </div>
  )
}

export default DiveLogForm

