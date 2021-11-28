/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useForm, Controller } from 'react-hook-form'

export const initValues = {
  av: '18',
  mv: '01',
}

export type GenderFormParams = {
  av: string
  mv: string
}

const useCreateForm = () => {
  const methods = useForm<GenderFormParams>({
    defaultValues: initValues,
  })

  return {
    Controller,
    methods,
    initValues,
  }
}

export default useCreateForm
