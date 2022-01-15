if(window.opener) {
    var ctrl_opener = document.getElementById('input_opener')
    if( ctrl_opener != null ) {
        ctrl_opener.value = window.opener.location.href
    }
}

function addFilterInput( selectId ) {
    var select = document.getElementById(selectId)
    if( select != null ) {
        input = document.createElement('input')
        input.placeholder='filter'
        input.classList.add("touglates", "filterbox")
        input.addEventListener('keyup', function() {
            var options = select.options
            var val = input.value.toLowerCase()
            var visibleOptions=[]
            for (option of options) {
                if( ( val.length == 0 ) || ( ( ' ' + option.innerText.toLowerCase() ).indexOf(val) > 0 ) ) {
                option.style.removeProperty('display')
                visibleOptions.push(option)
                } else {
                option.style.display='None'
                }
            }
            var selectedOptions = select.selectedOptions
            var selectedOptionVisible=false
            if(visibleOptions.length>0) {
                for(selectedOption of selectedOptions){
                    if(visibleOptions.includes(selectedOption)) {
                        selectedOptionVisible=true
                        break
                    }
                }
                if(!selectedOptionVisible) {
                    visibleOptions[0].selected="SELECTED"
                }
            }
            select.dispatchEvent(new Event('change'))
        });
        select.parentNode.insertBefore(input, select.nextSibling)
    }
}

function addOptionFromPopup(optionValue, optionLabel, modelName, attrs=[]) {
    let controlIds = getControlIds(modelName)
    for( controlId of controlIds ) {
      let control = document.getElementById(controlId)
      let newOption = document.createElement('option')
      newOption.value = optionValue
      newOption.appendChild(document.createTextNode(optionLabel))
      for(attr of attrs){
          newOption.setAttribute(attr.name, attr.value)
      }
      if( control.getAttribute('updateFrom' + modelName) > "" ) {
        newOption.setAttribute('selected', 'SELECTED')
        control.removeAttribute('updateFrom' + modelName)
      }
      control.appendChild(newOption)
      control.dispatchEvent(new Event('change'))
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

/**
 * Adds to an element an event listener which opens a popup to edit model related to the object.
 *
 * This function expects an element such as a
 * This function expects the calling window has a list of related object divs each of which has a class name 'related-' followed by the model name
 * This function expects an empty div which this function will use as a template.  That div's id is 'div_' followed by the model name followed by '-empty'
 * The empty div will contain a data element for each field to be copied into the div.  Those elements have attributes named 'data-field-' followed by the field name
 *
 * ex: <div id='div_model-empty'><span data-field-key1></span></div>
 *
 * @param {object} fields              Key value pairs for fields
 * @param {string} model               Name of related model
 * @param {string} [insertBeforeId=''] The ID of the element before which the new div is to be inserted.
 *                                     if blank, the function will use the empty div
 * @param {bool}   [delinbefore=false] If the element before which the new div is to be inserted is to be deleted
 *
 */
function addAddRelatedPopupEvent(buttonId) {
    addButton = document.getElementById('buttonId') /*doesn't have to be a button */
    if(typeof(addButton) != 'undefined' && addButton != null){
        addButton.addEventListener('click', function(e) {
        e.preventDefault()
        window.open(e.target.href)
        });
    }
}
