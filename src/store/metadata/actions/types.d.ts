export type metaState = {
  someData: any;
  metadata: Meta;
};

export enum METADATA_ACTION_TYPE {
  ERROR_CLEAR = 'ERROR_CLEAR',
}

export type MetaAction = {
  type: METADATA_ACTION_TYPE;
  payload: string | null;
};

interface Meta {
  pending: boolean
  loaded: boolean
  error: boolean | object
}

interface MetaReducerType {
  [key: string]: Meta
}
