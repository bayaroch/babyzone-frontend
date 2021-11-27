/* start of the js gender chart */

/* facebook stuff */

/* start of the js gender chart */

function resetForm() {
  $('td').removeClass('selected')
  $('.hMove, .vMove').css({ width: '', height: '' })
  $('.hMove, .vMove, .popGirl, .popBoy, #modalName1, #modalName2').css(
    'display',
    'none'
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function formSubmit() {
  var av = genderChart.age.value /* age value*/
  var mv = genderChart.month.value /* month value */

  var cv =
    mv +
    '_' +
    av /*  putting together age & month complete value to form ID co */

  /* to clear previous selections */

  resetForm()

  $('.hMove, .vMove').css('display', 'inline') /* turning on the divs		*/

  $('#' + cv).addClass('selected') /* adding class to the selected box*/

  var p = $('.selected')
  var position = p.position()
  var dt
  var dtime1 = 300
  var dtime2 = 1000
  var defaultMV = '01'
  var defaultAV = '18'

  if (mv == defaultMV && av == defaultAV) {
    dt = dtime1
  } else {
    dt = dtime2
  }

  $('.vMove').css('left', +position.left + 'px')
  $('.hMove').css('top', +position.top + 'px')

  var newPLeft = position.left - 5 /* position the selected image from left */
  var newPTop = position.top - 44 /* position the selected image from top */

  $('.popGirl').css({ left: +newPLeft + 'px', top: +newPTop + 'px' })
  $('.popBoy').css({ left: +newPLeft + 'px', top: +newPTop + 'px' })

  /* horizontal block animation */
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

  /* create a function to determin if it's a girl or boy image */
  function determinSexPop() {
    if ($('#' + cv).hasClass('boy')) {
      x = 'boy'
      $('.popBoy').css('display', 'block')
      isFemale = false
      cmCreateManualPageviewTag(
        'Boy Result',
        'Sitelet: Tools: Chinese Gender Chart'
      )
    } else {
      x = 'girl'
      $('.popGirl').css('display', 'block')
      isFemale = true
      cmCreateManualPageviewTag(
        'Girl Result',
        'Sitelet: Tools: Chinese Gender Chart'
      )
    }

    setTimeout(popModalWindow, 1500) /* delays opening of the popup window*/
  }

  function popModalWindow() {
    var modelName
    var contentModel

    if (x == 'boy') {
      modelName = 'modalName1'
      contentModel = '.boyGender'
    } else {
      modelName = 'modalName2'
      contentModel = '.girlGender'
    }

    XO.standardModal.makeModal(modelName, {
      title: 'Modal Title',
      text: 'This is text that will be displayed in the modal',
      width: '340px',
      height: '180px',
      content: $(contentModel),
      showOverlay: false,
    })
  }
} /* end of form function */
var contentHeight = $('#seoCollapsible div p').height()
$('#seoCollapsible a').toggle(
  function () {
    $('#seoCollapsible div').animate({ height: contentHeight }, 500)
    $(this).addClass('collapse')
  },
  function () {
    $('#seoCollapsible div').animate({ height: '5.5em' }, 500)
    $(this).removeClass('collapse')
  }
)
