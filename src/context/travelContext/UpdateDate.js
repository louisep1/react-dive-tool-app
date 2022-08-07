export const updateDate = (day, month, year) => {
  if (
    (month === '01' ||
      month === '03' ||
      month === '05' ||
      month === '07' ||
      month === '08' ||
      month === '10' ||
      month === '12') &&
    +day < 31
  ) {
    const newDay = (+day + 1).toString()
    let formattedNewDay = newDay
    if (newDay.length === 1) {
      formattedNewDay = '0' + newDay
    }
    return `${year}-${month}-${formattedNewDay}`
  } else if (
    (month === '04' || month === '06' || month === '09' || month === '11') &&
    +day < 30
  ) {
    const newDay = (+day + 1).toString()
    let formattedNewDay = newDay
    if (newDay.length === 1) {
      formattedNewDay = '0' + newDay
    }
    return `${year}-${month}-${formattedNewDay}`
  } else if (month === '02' && day === '28' && +year % 4 === 0) {
    return `${year}-02-29`
  } else if (month === '02' && day === '29' && +year % 4 === 0) {
    return `${year}-03-01`
  } else if (month === '02' && +day < 28) {
    const newDay = (+day + 1).toString()
    let formattedNewDay = newDay
    if (newDay.length === 1) {
      formattedNewDay = '0' + newDay
    }
    return `${year}-${month}-${formattedNewDay}`
  } else if (month === '11' || month === '10' || month === '09') {
    return `${year}-${(+month + 1).toString()}-01`
  } else if (
    month !== '12' &&
    month !== '11' &&
    month !== '10' &&
    month !== '09'
  ) {
    return `${year}-0${(+month + 1).toString()}-01`
  } else if (month === '12' && day === '31') {
    return `${(+year + 1).toString()}-01-01`
  }
}
