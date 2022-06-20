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
      for(let attr of attrs){
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

function addRelatedPopupButton( selectId, modelName, addUrl, editUrl='', addLabel='add', editLabel='edit' ) {
    var select = document.getElementById(selectId)
    if( select != null ) {
        button_add = document.createElement('button')
        button_add.type = 'button'
        button_add.id = 'btn_related_add_' + selectId
        button_add.appendChild(document.createTextNode(addLabel))
        button_add.addEventListener('click', function() {
            window.open( addUrl )
            select.setAttribute('updateFrom' + modelName, 'True')
        });
        select.parentNode.insertBefore(button_add, select.nextSibling)
        if( editUrl > '') {
            button_edit = document.createElement('button')
            button_edit.type = 'button'
            button_edit.id = 'btn_related_edit_' + selectId
            button_edit.appendChild(document.createTextNode(editLabel))
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

function showFilterField(select) {
    let ctlNum = select.id.substring(19)
    let val_control
    for(opt of select.options) {
      if(opt.value){
        document.getElementById('div_filter__' + opt.value + '__' + ctlNum ).style.display="none"
        document.getElementById('ctl_filter__op__' + opt.value + '__' + ctlNum ).removeAttribute('name')
        val_control = document.getElementById('ctl_filter__value__' + opt.value + '__' + ctlNum )
        val_control.removeAttribute('name')
        if( val_control.dataset.siblings ) {
          for(i=0; i < (val_control.dataset.siblings); i++) {
            document.getElementById('ctl_filter__value__' + opt.value + '__' + ctlNum + '__' + i ).removeAttribute('name')
          }
        }
      }
    }
    if(select.value) {
      select.classList.remove('grayedout')
      select.name="filter__fieldname__" + ctlNum
      document.getElementById('div_filter__' + select.value  + '__' + ctlNum ).style.display="block"
      document.getElementById('ctl_filter__op__' + select.value + '__' + ctlNum ).name="filter__op__" + ctlNum
      val_control = document.getElementById('ctl_filter__value__' + select.value + '__' + ctlNum )
      val_control.name="filter__value__" + ctlNum
      if( val_control.dataset.siblings ) {
        for(i=0; i < (val_control.dataset.siblings); i++) {
          document.getElementById('ctl_filter__value__' + select.value + '__' + ctlNum + '__' + i ).name="filter__value__" + ctlNum
        }
      }
    } else {
      select.removeAttribute("name")
    }
  }
  function addFilterFieldEventListeners(qty_searches) {
    for( ctlNum = 0; ctlNum < qty_searches; ctlNum++ ) {

        document.getElementById('ctl_filter__field__' + ctlNum).addEventListener('change', function(e) {
            showFilterField(e.target)
        })
        showFilterField(document.getElementById('ctl_filter__field__' + ctlNum))
        if( ctlNum < qty_searches - 1) {
            let localCtlNum = ctlNum
        document.getElementById('div_fieldsearch__' + ctlNum).addEventListener('click', function() {
            document.getElementById('div_fieldsearch__' + ( localCtlNum + 1 )).style.removeProperty('display')
        })
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

function hide_multiselect(multiSelect) {
	let textBox = document.createElement("input")
	textBox.dataset.multiselect=multiSelect.id
	textBox.addEventListener("click", function(e){
		e.preventDefault()
		show_multiselect(textBox)
	})
	let selected_qty = 0
	let selected_text = ''
	for(op=0; op < multiSelect.options.length; op++) {
		if(multiSelect.options[op].selected){
			selected_qty++
			if(selected_qty == 1 ) {
				selected_text = multiSelect.options[op].innerText
			} else if (selected_qty == 2 ) {
				selected_text = selected_text + ', ' + multiSelect.options[op].innerText
			} else if (selected_qty > 2 ) {
				selected_text = selected_text + ", ..."
				break
			}
		}
	}
	textBox.value = selected_text
	multiSelect.parentNode.insertBefore(textBox, multiSelect)
	multiSelect.dataset.displaystyle=multiSelect.style.display
	multiSelect.style.display = "none"
}

function show_multiselect(textBox) {
	let multiSelect = document.getElementById(textBox.dataset.multiselect)
	multiSelect.parentNode.insertBefore(textBox, multiSelect)
	multiSelect.style.display = multiSelect.dataset.displaystyle
	textBox.remove()
}

function hide_multiselects(container, target){
    multiSelects = container.querySelectorAll('select[multiple="MULTIPLE"]')
    for(multiSelect of multiSelects) {
        if(multiSelect.id != target.dataset.multiselect){
            if(multiSelect.id != target.id ) {
                if(multiSelect.id != target.parentNode.id) {
                    if(multiSelect.style.display != 'none'){
                        hide_multiselect(multiSelect)
                    }
                }
            }
        }
    }
}

function init_multiselect_container(container) {

	container.addEventListener("click", function(e) {
        hide_multiselects(container, e.target)
	})

    // container.addEventListener("focusout", function(e) {
    //     if(e.target.tagName == 'SELECT' && e.target.getAttribute("multiple")>"") {
    //         hide_multiselect(e.target)
    //     }
	// })
	// container.addEventListener("mouseout", function(e) {
    //     if(e.target.tagName == 'SELECT' && e.target.getAttribute("multiple")>"") {
    //         hide_multiselect(e.target)
    //     }
	// })

    hide_multiselects(container, container)

}
