/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useForm, Controller } from 'react-hook-form'
import { useMemo } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const initValues = {
  av: '18',
  mv: '01',
}

export type GenderFormParams = {
  av: string
  mv: string
}

const useCreateForm = () => {
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        av: yup.string().required('Насаа сонго'),
        mv: yup.string().required('Сараа сонго'),
      }),
    []
  )

  const methods = useForm<GenderFormParams>({
    resolver: yupResolver(validationSchema),
    defaultValues: initValues,
  })

  return {
    Controller,
    methods,
    initValues,
  }
}

export default useCreateForm
