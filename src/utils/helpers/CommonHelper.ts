import moment from 'moment'

const staticSmartTime = (time: string | number): string => {
  const timestamp = time
  const currentDate = moment().startOf('day')
  const given = moment(timestamp).format('YYYY-MM-DD')
  const diff = currentDate.diff(given, 'days', false)
  if (diff > 30) {
    return moment(timestamp).format('L')
  } else {
    return moment(timestamp).fromNow()
  }
}

export const CommonHelper = {
  staticSmartTime,
}
