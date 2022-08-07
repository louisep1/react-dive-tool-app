import { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { updateDate } from './UpdateDate'
import { toast } from 'react-toastify'

const EntryContext = createContext()

export const EntryProvider = ({ children }) => {
  const [dailyPlan, setDailyPlan] = useState([])

  const [tripName, setTripName] = useState('')

  const [id, setId] = useState('')
  const [dayNumber, setDayNumber] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [plan, setPlan] = useState('')

  const [isEditing, setIsEditing] = useState(false)

  const editPlan = dayEntry => {
    setId(dayEntry.id)
    setDayNumber(dayEntry.dayNumber)
    setDate(dayEntry.date)
    setLocation(dayEntry.location)
    setPlan(dayEntry.plan)

    setIsEditing(true)
  }

  const submitForm = e => {
    e.preventDefault()

    if (isEditing === false) {
      setDailyPlan([
        ...dailyPlan,
        {
          dayNumber,
          date,
          location,
          plan,
          id: uuidv4(),
        },
      ])
    } else {
      const editedDay = dailyPlan.find(day => day.id === id)
      setDailyPlan(
        dailyPlan.map(day =>
          day !== editedDay
            ? day
            : {
                dayNumber,
                date,
                location,
                plan,
                id,
              }
        )
      )
    }

    setId('')
    setLocation('')
    setPlan('')

    if (dayNumber >= dailyPlan.length) {
      setDayNumber(+dayNumber + 1)

      const year = date.toString().substring(0, 4)
      const month = date.toString().substring(5, 7)
      const day = date.toString().substring(8, 10)

      setDate(updateDate(day, month, year))
    } else {
      setDayNumber(+dailyPlan[dailyPlan.length - 1].dayNumber + 1)

      const year = dailyPlan[dailyPlan.length - 1].date
        .toString()
        .substring(0, 4)
      const month = dailyPlan[dailyPlan.length - 1].date
        .toString()
        .substring(5, 7)
      const day = dailyPlan[dailyPlan.length - 1].date
        .toString()
        .substring(8, 10)

      setDate(updateDate(day, month, year))
    }

    setIsEditing(false)
    toast.success('Plan updated')
  }

  const deletePlan = id => {
    setDailyPlan(dailyPlan.filter(item => item.id !== id))
    const newLastDay = dailyPlan.sort((a, b) => a.dayNumber - b.dayNumber)
    setDayNumber(newLastDay[newLastDay.length - 1].dayNumber)
    setDate(newLastDay[newLastDay.length - 1].date)
  }

  return (
    <EntryContext.Provider
      value={{
        dailyPlan,
        setDailyPlan,
        tripName,
        setTripName,
        id,
        setId,
        dayNumber,
        setDayNumber,
        date,
        setDate,
        location,
        setLocation,
        plan,
        setPlan,
        editPlan,
        submitForm,
        deletePlan,
      }}
    >
      {children}
    </EntryContext.Provider>
  )
}

export default EntryContext
