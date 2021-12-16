if(window.opener) {
var ctrl_opener = document.getElementById('input_opener')
    if( ctrl_opener != null ) {
        ctrl_opener.value = window.opener.location.href
    }
}


function addRelatedPopupButton( selectId, modelName, popupUrl ) {
  var select = document.getElementById(selectId)
  if( select != null ) {
    button = document.createElement('button')
    button.type = 'button'
    button.id = 'btn_related_' + selectId
    button.appendChild(document.createTextNode('add'))
    button.addEventListener('click', function() {
      window.open( popupUrl )
      select.setAttribute('updateFrom' + modelName, 'True')
    });
    select.parentNode.insertBefore(button, select.nextSibling)

  }
}

function refreshFrom(optionValue, optionLabel, modelName) {
    let controlIds = getControlIds(modelName)
    for( controlId of controlIds ) {
      let control = document.getElementById(controlId)
      let newOption = document.createElement('option')
      newOption.value = optionValue
      newOption.appendChild(document.createTextNode(optionLabel))
      if( control.getAttribute('updateFrom' + modelName) > "" ) {
        newOption.setAttribute('selected', 'SELECTED')
        control.removeAttribute('updateFrom' + modelName)
      }
      control.appendChild(newOption)
    }
}

function addFormsetListener(buttonId, formsetPrefix, emptyDivId, insertPointId ) {
    document.getElementById(buttonId).addEventListener('click', function(e){
        e.preventDefault();
        var totalForms = document.getElementById(formsetPrefix + 'TOTAL_FORMS')
        if( totalForms != null ) {
            var originalFormCount = parseInt(totalForms.value)
            if( !( isNaN( originalFormCount ) ) ) {
                var newFormCount = originalFormCount + 1
                totalForms.value = newFormCount
                var emptyDiv = document.getElementById(emptyDivId)
                var newDiv = emptyDiv.cloneNode(true)
                newDiv.removeAttribute('id')
                var newDivChildren = newDiv.getElementsByTagName('*')
                var newFormNum = originalFormCount
                for(let i = 0; i < newDivChildren.length; i++) {
                child = newDivChildren[i]
                if(child.id) {
                    child.setAttribute('id', child.id.replaceAll('__prefix__', newFormNum) )
                }
                if(child.name) {
                    child.setAttribute('name', child.name.replaceAll('__prefix__', newFormNum) )
                }
                }
                newDiv.classList.add("formset")
                newDiv.style.display="block"
                var insertPoint = document.getElementById( insertPointId )
                insertPoint.parentNode.insertBefore( newDiv, insertPoint.nextSibling )
            }
        }
    });
}
