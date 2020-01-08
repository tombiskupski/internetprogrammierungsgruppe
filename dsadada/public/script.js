$( document ).ready((() => {
  // DOMContent is laoded, now we can start checking HTML Elements
  // If we dont "wait" for document to be ready, we cannot access HTML elements
  // for testing purposes, you can use a "debugger;" statement or also "console.log(element)"
  console.log('DOM is ready!')
  
  
  
  const input = $('#form-input-name').get(0)
  const textarea = $('#form-textarea').get(0)

  $('#form').on('keyup', (event) => {
    if (formElementIsValid(input, 3) && formElementIsValid(textarea, 10)) {
      toggleAlertBox(false)
      toggleSubmit(false)
    } else {
      toggleAlertBox(true)
      toggleSubmit(true)
    }
  })
})

const input2 = $('#form-input-loginname').get(0)
  const textarea2 = $('#form-password').get(0)

  $('#form').on('keyup', (event) => {
    if (formElementIsValid(input, 3) && formElementIsValid(textarea, 10)) {
      toggleAlertBox(false)
      toggleSubmit(false)
    } else {
      toggleAlertBox(true)
      toggleSubmit(true)
    }
  })
}))

function formElementIsValid(element, minLength) {
  return element.value.length >= minLength
}



function toggleAlertBox(show) {
  const alertEl = $('#alert')

  if (show) {
    alertEl.removeClass('d-none')
  } else {
    alertEl.addClass('d-none')
  }
}

function toggleSubmit(disable) {
  const submitButton = $('#form-submit')
  submitButton.prop('disabled', disable)
}
