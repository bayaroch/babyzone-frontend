/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMemo } from 'react'
import { css } from '@emotion/css'
import { useTheme } from '@emotion/react'

const useClasses = (stylesElement: any): any => {
  const theme = useTheme()
  return useMemo(() => {
    const rawClasses =
      typeof stylesElement === 'function' ? stylesElement(theme) : stylesElement
    const prepared: any = {}

    Object.entries(rawClasses).forEach(([key, value = {}]: any) => {
      prepared[key] = css(value)
    })

    return prepared
  }, [stylesElement, theme])
}

export default useClasses
