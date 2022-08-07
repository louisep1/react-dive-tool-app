import { EntryProvider } from '../context/travelContext/EntryContext'
import Header from '../components/shared/Header'
import NewEntryForm from "../components/travelPlanner/NewEntryForm"
import EntryLog from '../components/travelPlanner/EntryLog'

function TravelPlannerPage() {
  return (
    <EntryProvider>
      <div className="mb-10">
        <Header title='Trip Planner' />
        <NewEntryForm />
        <EntryLog />
      </div>
    </EntryProvider>
  )
}

export default TravelPlannerPage