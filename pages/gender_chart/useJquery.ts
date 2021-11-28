import { useEffect, useState } from 'react'
import { GenderFormParams } from './useGenderForm'
import $ from 'jquery'

const useJquery = (): {
  setData: (params: GenderFormParams) => void
  open: boolean
  isFemale: boolean
  setOpen: (state: boolean) => void
} => {
  // eslint-disable-next-line no-console
  const [data, setData] = useState<GenderFormParams | null>(null)
  const [isFemale, setFemale] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    let cv: string
    const resetForm = () => {
      $('td').removeClass('selected')
      $('.hMove, .vMove').css({ width: '', height: '' })
      $('.hMove, .vMove, .popGirl, .popBoy, #modalName1, #modalName2').css(
        'display',
        'none'
      )
    }

    function determinSexPop() {
      if ($('#' + cv).hasClass('boy')) {
        setFemale(false)
        $('.popBoy').css('display', 'block')
      } else {
        setFemale(true)
        $('.popGirl').css('display', 'block')
      }
      setTimeout(() => {
        setOpen(true)
      }, 1200)
    }

    const animate = (av: string, mv: string): void => {
      cv = mv + '_' + av
      resetForm()
      $('.hMove, .vMove').css('display', 'inline') /* turning on the divs		*/
      $('#' + cv).addClass('selected') /* adding class to the selected box*/
      const p = $('.selected')
      const position = p.position()
      let dt
      const dtime1 = 300
      const dtime2 = 1000

      const defaultMV = '01'
      const defaultAV = '18'

      if (mv == defaultMV && av == defaultAV) {
        dt = dtime1
      } else {
        dt = dtime2
      }

      $('.vMove').css('left', +position.left + 'px')
      $('.hMove').css('top', +position.top + 'px')

      const newPLeft =
        position.left - 5 /* position the selected image from left */
      const newPTop =
        position.top - 44 /* position the selected image from top */

      $('.popGirl').css({ left: +newPLeft + 'px', top: +newPTop + 'px' })
      $('.popBoy').css({ left: +newPLeft + 'px', top: +newPTop + 'px' })

      $('.vMove').animate(
        {
          height: position.top + 'px',
        },
        dt
      )

      /* vertical block animation with complete */

      $('.hMove').animate(
        {
          width: position.left + 'px',
        },
        {
          duration: dt,
          specialEasing: {
            width: 'linear',
            height: 'easeOutBounce',
          },
          complete: function () {
            determinSexPop()
          },
        }
      )
    }

    if (data) animate(data.av, data.mv)
  }, [data])

  return {
    setData,
    open,
    isFemale,
    setOpen,
  }
}

export default useJquery
