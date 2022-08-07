import { useContext, useState } from "react"
import EntryContext from "../../context/travelContext/EntryContext"


function NewEntryForm() {
  const { dayNumber, setDayNumber, date, setDate, location, setLocation, plan, setPlan, submitForm, tripName, setTripName } = useContext(EntryContext)

  const handleChange = (e) => {
    e.target.id === 'dayNumber' && setDayNumber(e.target.value)
    e.target.id === 'date' && setDate(e.target.value)
    e.target.id === 'location' && setLocation(e.target.value)
    e.target.id === 'plan' && setPlan(e.target.value)
  }


  return (
    <div className='w-11/12 overflow-hidden relative flex items-center justify-center flex-col py-4 mx-auto xl:w-8/12 outline outline-offset-4 outline-4 outline-cyan-500 bg-accent rounded-lg'>
      <div className='py-4 italic flex flex-row'>
        Add new plan here
      </div>

      <form className='mb-5 lg:mb-20 flex flex-col items-center lg:items-stretch'>
        <div className="lg:p-1 mt-2 text-center lg:text-left ">Trip name</div>
        <input className="lg:p-1 text-center lg:text-left" type='text' placeholder="Name of trip" value={tripName} onChange={(e) => { setTripName(e.target.value) }} />

        <div className="lg:p-1 mt-2 text-center lg:text-left lg:text-left">Day Number</div>
        <input className="lg:p-1 text-center lg:text-left" id='dayNumber' type="number" min='1' placeholder="1" value={dayNumber} onChange={handleChange} />

        <div className="lg:p-1 mt-2 text-center lg:text-left">Date</div>
        <input className="lg:p-1 text-center lg:text-left self-center lg:self-auto pl-8" id='date' type="date" value={date} onChange={handleChange} placeholder={new Date()} />

        <div className="lg:p-1 mt-2 text-center lg:text-left">Location</div>
        <input className="lg:p-1 text-center lg:text-left" id='location' type="text" placeholder="City or Area/Region" value={location} onChange={handleChange} />

        <div className="lg:p-1 mt-2 text-center lg:text-left">Plan</div>
        <textarea className="lg:p-1 text-center w-10/12 lg:text-left" rows="5" cols="60" id='plan' type="text" placeholder="Input details of plan here" value={plan} onChange={handleChange} />

        <button type='submit' onClick={submitForm} className="relative m-4 lg:absolute right-0 bottom-0 mt-8 lg:mt-0 lg:mr-6 lg:mb-6 text-center lg:text-left hover:bg-purple-700 group rounded-md bg-primary text-white text-sm font-medium pl-4 pr-6 py-4 shadow-sm">Add day</button>
      </form>
    </div>
  )
}

export default NewEntryForm