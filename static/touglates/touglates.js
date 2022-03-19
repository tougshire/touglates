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
                let textforfilter=''
                if( option.getAttribute('data-textforfilter') > '') {
                    textforfilter = option.getAttribute('data-textforfilter')
                }
                if(
                    ( val.length == 0 ) ||
                    ( ( ' ' + option.innerText.toLowerCase() ).indexOf(val) > 0 ) ||
                    ( ( ' ' + textforfilter.toLowerCase() ).indexOf(val) > 0 )
                )
                {
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
    let controlIds = getControlIdsForPopups(modelName)
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

function addRelatedPopupButton( selectId, modelName, addUrl, editUrl='' ) {
    var select = document.getElementById(selectId)
    if( select != null ) {
      button_add = document.createElement('button')
      button_add.type = 'button'
      button_add.id = 'btn_related_add_' + selectId
      button_add.appendChild(document.createTextNode('add'))
      button_add.addEventListener('click', function() {
        window.open( addUrl )
        select.setAttribute('updateFrom' + modelName, 'True')
      });
      select.parentNode.insertBefore(button_add, select.nextSibling)
      if( editUrl > '') {
        button_edit = document.createElement('button')
        button_edit.type = 'button'
        button_edit.id = 'btn_related_edit_' + selectId
        button_edit.appendChild(document.createTextNode('edit'))
        button_edit.addEventListener('click', function() {
          if(select.value > 0) {
              editUrl = editUrl.replace('\/0\/', '/' + select.value + '/')
             window.open( editUrl )
              select.setAttribute('updateFrom' + modelName, 'True')
          }
        });
        select.parentNode.insertBefore(button_edit, button_add.nextSibling)
      }
    }
  }

function toggleVisibility(targetElId, switcherElId="", forceTo=2, showText="", hideText="", dataName='style_display', visibleStyle="") {

    var targetEl = document.getElementById(targetElId)
    var switcherEl = undefined
    if(switcherElId > "") {
        switcherEl = document.getElementById(switcherElId)
    }

    if(!(visibleStyle > "" ) ) {
        if(targetEl.style.display > '' && targetEl.style.display != "none") {
            visibleStyle = targetEl.style.display
        } else {
            if( targetEl.dataset[dataName] > '' ) {
                visibleStyle = targetEl.dataset[dataName]
            }
        }
    }
    if(!(showText > "") && switcherEl) {
        if(switcherEl.dataset['showtext'] > '') {
            showText = switcherEl.dataset['showtext']
        }
    }
    if(!(hideText > "") && switcherEl) {
        if(switcherEl.dataset['hidetext'] > '') {
            hideText = switcherEl.dataset['hidetext']
        }
    }
    if(forceTo==2) { /* toggle */
        if( targetEl.style.display != "none" ) {
            targetEl.dataset[dataName] = visibleStyle
            targetEl.style.display = "none"
            if(switcherEl) {
                switcherEl.textContent = showText
            }
        } else {
            targetEl.style.display = visibleStyle
            if(switcherEl) {
                switcherEl.textContent = hideText
            }
        }
    } else if(forceTo==1) { /* show */
        targetEl.dataset[dataName] = visibleStyle
        switcherEl.textContent = hideText
    } else if(forceTo==0) { /* hide */
        targetEl.dataset[dataName] = visibleStyle
        targetEl.style.display = "none"
        switcherEl.textContent = showText
    }
  }
