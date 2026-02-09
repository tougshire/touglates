function activateFormsetControls() {
  let formsetforms = document.getElementsByClassName("formsetform")
  for (formsetform of formsetforms) {
    formsetform.style.display="none"
  }
  let show_formsetform_buttons = document.getElementsByClassName("show_formsetform")
  for (show_formsetform_button of show_formsetform_buttons) {
    show_formsetform_button.addEventListener("click", function(e) {
      e.preventDefault()
      document.getElementById(e.target.dataset["formsetform"]).style.display="block"
    })
  }
  let show_newformsetform_buttons = document.getElementsByClassName("show_newformsetform")
  for (show_newformsetform_button of show_newformsetform_buttons) {
    show_newformsetform_button.display="none"
    let formsetnewforms = document.getElementsByClassName(show_newformsetform_button.dataset["formsetform"])
    for ( formsetnewform of formsetnewforms ) {
      if (formsetnewform.style.display == "none") {
        show_newformsetform_button.display="block"
      }
    }
    show_newformsetform_button.addEventListener("click", function(e) {
      e.preventDefault()
      let formsetnewforms = document.getElementsByClassName(e.target.dataset["formsetform"])
      let first_hidden = 1 
      let forms_available = 0
      for ( formsetnewform of formsetnewforms ) {
        if (formsetnewform.style.display == "none") {
          if( first_hidden) {
            formsetnewform.style.display="block"
            first_hidden=0
          } else {
            forms_available++
          }
        }
      }
      if( forms_available < 1 ) {
        console.log("forms available < 1" )
        e.target.disabled=true
      }
    })
  }

}
