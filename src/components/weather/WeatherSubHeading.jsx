function Heading() {
  return (
    <div className="text-center m-4">
      <div className="text-3xl pb-4">
        {new Date().getDay() === 1 && 'Monday'}
        {new Date().getDay() === 2 && 'Tuesday'}
        {new Date().getDay() === 3 && 'Wednesday'}
        {new Date().getDay() === 4 && 'Thursday'}
        {new Date().getDay() === 5 && 'Friday'}
        {new Date().getDay() === 6 && 'Saturday'}
        {new Date().getDay() === 0 && 'Sunday'}
        -
        {new Date().getDate()}
        -
        {new Date().getMonth() === 0 && 'Jan'}
        {new Date().getMonth() === 1 && 'Feb'}
        {new Date().getMonth() === 2 && 'Mar'}
        {new Date().getMonth() === 3 && 'Apr'}
        {new Date().getMonth() === 4 && 'May'}
        {new Date().getMonth() === 5 && 'Jun'}
        {new Date().getMonth() === 6 && 'Jul'}
        {new Date().getMonth() === 7 && 'Aug'}
        {new Date().getMonth() === 8 && 'Sept'}
        {new Date().getMonth() === 9 && 'Oct'}
        {new Date().getMonth() === 10 && 'Nov'}
        {new Date().getMonth() === 11 && 'Dec'}
        -
        {new Date().getFullYear()}
      </div>
      <div className="text-2xl">Today's Forecast:</div>
    </div>
  )
}

export default Heading