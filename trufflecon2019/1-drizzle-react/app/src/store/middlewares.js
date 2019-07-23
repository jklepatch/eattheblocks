import { toast } from 'react-toastify'
import { EventActions } from 'drizzle'

const contractEventNotifier = store => next => action => {
  if (action.type === EventActions.EVENT_FIRED) {
    const contract = action.name
    const contractEvent = action.event.event
    const { from, to, value } = action.event.returnValues
    const display = `${contract}(${contractEvent}): ${from} ${to} ${value}`

    toast.success(display, { position: toast.POSITION.TOP_RIGHT })
  }
  return next(action)
}

export default [contractEventNotifier]

