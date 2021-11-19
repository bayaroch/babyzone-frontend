import { camelCase } from 'change-case'
import { MetaReducerType } from '../actions/types'

export default function metadataReducer(
  state: MetaReducerType = {},
  action: any
) {
  const actionName = camelCase(
    action.type.substring(0, action.type.lastIndexOf('_'))
  )
  const actionType = action.type.substring(action.type.lastIndexOf('_') + 1)
  let updated = {}

  switch (actionType) {
    case 'REQUEST':
      updated = {
        pending: true,
        loaded: false,
        error: false,
      }
      break
    case 'SUCCESS':
      updated = {
        pending: false,
        loaded: true,
        error: false,
      }
      break
    case 'FAILURE':
      updated = {
        pending: false,
        loaded: false,
        error: action.error,
      }
      break
    case 'CLEAR':
      return {}
    default:
      return state
  }
  return {
    ...state,
    [actionName]: updated,
  }
}
