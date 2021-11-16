import { METADATA_ACTION_TYPE } from './types.d'

export const metaActions = {
  clearGlobalMeta: (field?: string | null) => {
    return (dispatch: Function) => {
      dispatch(clearGlobalMetaCreator(field))
    }
  },
}

export const clearGlobalMetaCreator = (field?: string | null) => {
  return {
    type: METADATA_ACTION_TYPE.ERROR_CLEAR,
    payload: field,
  }
}
