/*
addFilterInput
Adds a text box next to a select that can be used to filter the choices in the select
*/
function addFilterInput( selectId ) {
    var select = document.getElementById(selectId)
    if( select != null ) {
        var input = document.createElement('input')
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
                // Display the blank value along with any options that match the filter
                // Find matches by testing the inner text or the attribute 'data-textforfilter' if it exists
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

function addOptionFromRelatedPopup(optionValue, optionLabel, modelName, appName, attrs="") {
    let controls = document.querySelectorAll("[data-app_name='" + appName + "'][data-model_name='" + modelName + "']")
    for( let control of controls ) {
      let newOption = document.createElement('option')
      newOption.value = optionValue
      newOption.appendChild(document.createTextNode(optionLabel))
      if(attrs>"") {
        attrobj = attrs.split(",")

        for(let attr of attrobj){
            let splitattr = attr.split("=")
            try {
                newOption.setAttribute(splitattr[0], splitattr[1])
            } catch(e) {
                console.log("error setting attribute in addOptionfromRelatedPopup: " + e)
            }
        }
      }
      if( control.getAttribute('selectAfterUpdate') !== null ) {
        newOption.setAttribute('selected', 'SELECTED')
        control.removeAttribute('selectAfterUpdate')
      }
      if(control.options.length > 0) {
        control.insertBefore(newOption, control.firstChild)
        if(control.options.length > 1) {
            if("" == control.options[1].value) {
                nullOption = control.removeChild(control.options[1])
                control.insertBefore(nullOption, control.firstChild)
            }
        }
      } else {
        control.appendChild(newOption)
      }
      control.dispatchEvent(new Event('change'))
    }

}


function addRelatedPopupButton( selectId, modelName, addUrl, addLabel='new', addIcon='', to_field_name='' ) {
    var select = document.getElementById(selectId)
    if( select != null ) {
        select.dataset.model_name=modelName
        var button_add = document.createElement('button')
        button_add.type = 'button'
        button_add.id = 'btn_related_add_' + selectId
        if(addIcon>"") {
            var img_add = document.createElement("img")
            img_add.src=addIcon
            button_add.appendChild(img_add)
        }
        button_add.appendChild(document.createTextNode(addLabel))
        button_add.addEventListener('click', function() {
            select.setAttribute('selectAfterUpdate', 'True')
            var popup=window.open( addUrl )
        });
        select.parentNode.insertBefore(button_add, select.nextSibling)

    }
}


function addRelatedPopupLink( selectId, appName, modelName, addUrl, addLabel='new', addIcon='' ) {
    var select = document.getElementById(selectId)
    if( select != null ) {
        select.dataset.model_name=modelName
        select.dataset.app_name=appName
        var aAdd = document.createElement('a')
        aAdd.href = '#'
        aAdd.id = 'a_related_add_' + selectId
        if(addIcon > "") {
            var imgAdd = document.createElement("img")
            imgAdd.src=addIcon
            aAdd.appendChild(imgAdd)
        }
        aAdd.appendChild(document.createTextNode(addLabel))
        aAdd.addEventListener('click', function() {
            select.setAttribute('selectAfterUpdate', 'True')
            var popup=window.open( addUrl )
        });
        select.parentNode.insertBefore(aAdd, select.nextSibling)
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
        if(switcherEl) {
            switcherEl.textContent = hideText
        }
    } else if(forceTo==0) { /* hide */
        targetEl.dataset[dataName] = visibleStyle
        targetEl.style.display = "none"
        if(switcherEl) {
            switcherEl.textContent = showText
        }
    }
  }


function showNewFormsetForm(findClass, removeClass='_findClass', addClass='', addDisplayStyle='block', message='Please save before adding') {
    let newForms = document.getElementsByClassName(findClass)
    if (newForms.length > 0) {
      let newForm = newForms[0]
      removeClasses = removeClass.split(',')
      for (removeClass of removeClasses) {
        if(removeClass == "_findClass") {
          removeClass = findClass;
        }
        newForm.classList.remove(removeClass)
      }
      if(addClass > "") {
        addClasses = addClass.split(',')
        for (addClass of addClasses) {
          newForm.classList.add(addClass)
        }
      }
      if(addDisplayStyle > "") {
        newForm.style.display = addDisplayStyle
      }
    } else {
      alert(message)
    }
  }

/*
  Used in a form where inline formsets are hidden and the related
  objects are displayed with non-form elements
  When the user wants to edit one of the related objects, the user clicks on a button which
  hides the non-form elements and displays the formset form
*/

function enableFormsetForm(formid, displayid) {
    document.getElementById(formid).style.display="block"
    document.getElementById(displayid).style.display="none"
}

/*
  Used in a form where the extra formset forms are hidden.
  When the user wants to add a related object, the user clicks on a button which
  displays a formset form
*/
function enableAddFormsetForm(formclass, to_form="") {
    let newforms = document.getElementsByClassName(formclass)
    if( newforms.length > 0) {
      let newform = newforms[0]
      newform.style.display="block"
      newform.classList.remove(formclass)
      if( to_form > "") {
        let form = document.getElementById(to_form)
        for(let element of form.children) {
            element.setAttribute("form", to_form)
        }
      return newform
    } else {
      alert('please save before adding more')
    }
  }
}


function set_index_name(element,index,form="") {
    let elechildren = element.children
    if(elechildren.length > 0) {
        for(let i = 0; i < elechildren.length; i++) {
            if(form>"") {
                elechildren[i].setAttribute("form",form)
            }
            for(attr of elechildren[i].getAttributeNames()) {
                console.log('looking at ' + attr)
                if(elechildren[i].getAttribute(attr)) {
                    console.log('changing ' + attr + ' to ' + elechildren[i].getAttribute(attr).replace("__prefix__",index))
                    elechildren[i].setAttribute(attr, elechildren[i].getAttribute(attr).replace("__prefix__",index))
                }
            }
            set_index_name(elechildren[i],index,form)
        }
    }
}

function createAddFormsetForm(formsetname, templateID, formID) {
    let totalforms = document.getElementById("id_" + formsetname + "_set-TOTAL_FORMS")
    let template = document.getElementById(templateID)
    let form = document.getElementById(formID)
    if( totalforms && template && form ) {
        let newformdiv = template.cloneNode(true)
        newformdiv.style.display="block"
        form.appendChild(newformdiv)
        totalforms.value++
        set_index_name(newformdiv, totalforms.value-1, formID)
        return newformdiv
    } else {
        if(!( totalforms ) ) { throw new Error("total forms value not found"); }
        if(!( template ) ) { throw new Error("template not found"); }
        if(!( form ) ) { throw new Error("form not found"); }
    }
}


function adjustDate(target_id,days=0,today=false) {
    date_input = document.getElementById(target_id)
    if(today){
        newdate = new Date()
    } else {
        newdate = new Date(date_input.value)
    }
    newdate.setDate(newdate.getDate() + Number(days))
    date_input.valueAsDate = newdate
}

function activateFormsetButtons(relatedModelList) {
    for(relatedModel of relatedModelList) {
      let relatedModelEditButtons = document.getElementsByClassName(relatedModel + '_edit_button')
      for( relatedModelEditButton of relatedModelEditButtons){
        relatedModelEditButton.addEventListener('click', function(e){
          e.preventDefault()
          enableFormsetForm(e.target.dataset.formid, e.target.dataset.displayid)
        })
      }

      document.getElementById('button_add' + relatedModel).addEventListener('click', function(e){
        e.preventDefault()
        enableAddFormsetForm(e.target.dataset["newform"])
      })
      let relatedModelforms = document.getElementsByClassName(relatedModel + 'formsetform')
      for( relatedModelform of relatedModelforms ){
        relatedModelform.style.display="none"
      }
    }
  }

function initSlugField( slugFieldId, slugIdFrag, inputIdFrag ) {
    let slugField=document.getElementById(slugFieldId)
    let inputField=document.getElementById(slugFieldId.replace(slugIdFrag, inputIdFrag))
    if (slugField !== null && inputField !== null ) {
        inputField.addEventListener("change", function() {
        if(slugField.value == "" ) {
            slugField.value=inputField.value.replace(/[ _]+/g, '-').toLowerCase().replace(/[^a-z0-9\-]+/g, '');
        }
        })
    }
}

function honeypotHelpPopup() {
    alert("If any value is entered, the form will be rejected.  This is here to check for automated submissions. ")
}

function intiateDropdown( widgetAttrsId ) {
    var select = document.getElementById( widgetAttrsId )
    var br = document.getElementById("br_" + widgetAttrsId)
    var display = document.getElementById("display_" + widgetAttrsId)
    var clear = document.getElementById("clear_" + widgetAttrsId)

    select.dataset['initial_display'] = select.style.display
    br.dataset['initial_display'] = br.style.display

    display.addEventListener("click", function(){
        showHide( widgetAttrsId )
      })
      display.addEventListener("keydown", function(){
        showdropdown( widgetAttrsId )
      })
      display.addEventListener("focusin", function(){
        updateDisplay( widgetAttrsId )
      })
      select.addEventListener("change", function(){
        updateDisplay( widgetAttrsId )
      })
      select.addEventListener("click", function(){
        updateDisplay( widgetAttrsId )
      })
      clear.addEventListener("click", function(e){
        e.preventDefault()
        clearselections( widgetAttrsId )
      })

}

function showHide( widgetAttrsId, forceaction="") {
    var select = document.getElementById( widgetAttrsId )
    var br = document.getElementById("br_" + widgetAttrsId )
    var display = document.getElementById("display_" + widgetAttrsId )
    var clear = document.getElementById("clear_" + widgetAttrsId )

    if( forceaction == "hide") {
        select.style.display = "none"
        br.style.display = "none"

    } else if ( forceaction=="show"){
        select.style.display = select.dataset['initial_display']
        br.style.display = br.dataset['initial_display']

    } else {
        if(select.style.display == "none") {
        select.style.display = select.dataset['initial_display']
        br.style.display = br.dataset['initial_display']

        } else {

        select.style.display = "none"
        br.style.display = "none"
        updateDisplay( widgetAttrsId )
        }
    }
}

function updateDisplay( widgetAttrsId ) {
    var select = document.getElementById( widgetAttrsId )
    var br = document.getElementById("br_" + widgetAttrsId )
    var display = document.getElementById("display_" + widgetAttrsId )
    var clear = document.getElementById("clear_" + widgetAttrsId )

    display.value = ""
    for(p=0; p < select.options.length; p++ ) {
        if(select.options[p].selected ) {
        display.value = display.value + select.options[p].innerText + ","
        }
    }
}

var filtertimer = {}
var hidedropdowntimer = {}

function showdropdown( widgetAttrsId ) {
    var select = document.getElementById( widgetAttrsId )
    var br = document.getElementById("br_" + widgetAttrsId )
    var display = document.getElementById("display_" + widgetAttrsId )
    var clear = document.getElementById("clear_" + widgetAttrsId )

    if (typeof( filtertimer[ widgetAttrsId ]) !== undefined ) {
        clearTimeout(filtertimer[ widgetAttrsId ])
    }
    filtertimer["widgetAttrsId"] = setTimeout(function() {
        showHide( widgetAttrsId, "show")
    val = display.value.toLowerCase()
    for(p=0; p < select.options.length; p++ ) {
    var op = select.options[p]
    if( op.innerText.toLowerCase().indexOf(val) > -1 ) {
        op.style.display="block"
            } else {
                op.style.display="none"
            }
        }
    }, 10);
}

function hidedropdown( widgetAttrsId ) {
    var select = document.getElementById( widgetAttrsId )
    var br = document.getElementById("br_" + widgetAttrsId )
    var display = document.getElementById("display_" + widgetAttrsId )
    var clear = document.getElementById("clear_" + widgetAttrsId )


    hidedropdowntimer[ widgetAttrsId ] = setTimeout(function() {
        showHide(widgetAttrsId, "hide")
        for(p=0; p < select.options.length; p++ ) {
            select.options[p].style.display="block"
        }
        updateDisplay(widgetAttrsId)
    }, 100);
}

function clearselections( widgetAttrsId ) {
    var select = document.getElementById( widgetAttrsId )
    var br = document.getElementById("br_" + widgetAttrsId )
    var display = document.getElementById("display_" + widgetAttrsId )
    var clear = document.getElementById("clear_" + widgetAttrsId )

    for(p=0; p < select.options.length; p++ ) {
        select.options[p].selected=false
    }
    updateDisplay( widgetAttrsId)
}

function applyStyles(sourceSelector, targetSelector, styleList ) {

    let sourceEl, targetEls, sourceStyle

    try {

	    sourceEl = document.querySelector(sourceSelector)

        if(typeof styleList != 'object') {
			styleList = [styleList]
		}

        if(sourceEl && styleList) {

			sourceStyle = window.getComputedStyle(sourceEl)
            targetEls = document.querySelectorAll(targetSelector)

			for(let targetEl of targetEls) {
				for( let s=0; s < styleList.length; s++ ) {
					targetEl.style[ styleList[s] ] = sourceStyle[ styleList[s] ]
				}
			}
		}
    }
	catch (err) {
			console.log("error applying styles: " + err)
			return
	}

}


// function applyVerticalMargins() {
//     var vapplyables = document.getElementsByClassName("js_vmargins")
//     for (let vapplyable of vapplyables) {
//         let sourceEl = document.getElementById(vapplyable.dataset.vmarginsource)
//         let sourceStyle = document.defaultView.getComputedStyle(sourceEl)
//         vapplyable.style.marginTop = sourceStyle.marginTop
//         vapplyable.style.marginBottom = sourceStyle.marginBottom
//     }
// }


