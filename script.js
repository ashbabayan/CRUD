var mainHeader=document.getElementById("main_header")
var addAction = document.getElementById('open_popup')
var popUp = document.getElementById("addRecordPopup")
var mainContainer = document.getElementById("container")
var closePopup = document.querySelector(".close_popup")
var firstNameInput = document.getElementById("first_name")
var lastNameInput = document.getElementById("last_name")
var cityInput = document.getElementById("city")
var mainList = document.getElementById("main_list")
var errorMsg = document.getElementById("error_msg")
var editedErrorMsg = document.getElementById("edited_error_msg")
var editPopup = document.getElementById("edit_record")
var editableFirstNameInput = document.getElementById("editable_first_name")
var editableLastNameInput = document.getElementById("editable_last_name")
var editableCityInput = document.getElementById("editable_city")
var searchInput = document.getElementById("searchbox")
var noData = document.querySelector(".no_data_msg")
var pagination = document.querySelector(".pagination")
var pageCount = document.getElementById("page_number")
var sel = document.getElementById("page_rows_count")
//create object for the selected record
var selectedName = {
    element: null,
    data: null,
}

var table =[]

//Add page qty
function addPageNumber(){
    if(mainList.rows.length%sel.value ===2 && mainList.rows.length/sel.value >1){
        var newBtn = document.createElement("button")
        newBtn.innerHTML = Math.ceil(mainList.rows.length/sel.value )
        pageCount.insertBefore(newBtn, pageCount.children[pageCount.children.length-1])
        document.getElementById("page_count").innerHTML = "Page 1 out of " + Math.ceil(mainList.rows.length/sel.value )
        console.log(sel.value)
    }
}
//No data function
function noDataMsg(){
    if(mainList.rows.length>1){
        noData.classList.add("hidden")
    }else if(mainList.rows.length==1 && noData.classList.contains("hidden")){
        noData.classList.remove("hidden")
    }
}
//an array for collecting id
var recordId = []
var idNumber = 0 
var numbers = /\d/
// Validation Functions
function checkValidation(){
    return(!(firstNameInput.value && lastNameInput.value && cityInput.value))
}
function checkNumberValidation(){
    return ((numbers.test(firstNameInput.value) || numbers.test(lastNameInput.value) || numbers.test(cityInput.value)))
}
function checkEditedNumberValidation(){
    return ((numbers.test(editableFirstNameInput.value) || numbers.test(editableLastNameInput.value) || numbers.test(editableCityInput.value)))
}
function checkEditedValidation(){
    return(!(editableFirstNameInput.value && editableLastNameInput.value && editableCityInput.value))
}
//id generator
function idGenerator(){
    var lineId = idNumber +"line"
    idNumber++
    return lineId
}
//open the popup
function openPopup(){
    popUp.classList.remove("hidden")
    popUp.classList.add("flex")
    mainContainer.style.opacity = "0.1"
}
//close popup after adding a new record
function closePopUp(){
    if(popUp.classList.contains("flex")){
        popUp.classList.add("hidden")
        popUp.classList.remove("flex")
    }
    mainContainer.style.opacity= "1"
    clearInputValues()
    if(errorMsg.classList.contains("hidden")){
        return true
    }else {
    errorMsg.classList.add("hidden")
    }
}
//close popup after editing record
function closeEditPopup(){
    if(editPopup.classList.contains("flex")){
        editPopup.classList.add("hidden")
        editPopup.classList.remove("flex")
    }
    mainContainer.style.opacity= "1"
    clearInputValues()
    if(editedErrorMsg.classList.contains("hidden")){
        return true
    }else {
    editedErrorMsg.classList.add("hidden")
    }
}
//vaariable for date.
const d = new Date();
//clear inputs after adding/editing
function clearInputValues(){
    firstNameInput.value = ""
    lastNameInput.value = ""
    cityInput.value = ""
}
//create delete record button
function createDeleteButton(){
    var deleteButton = document.createElement("button")
    deleteButton.innerHTML = '<i class="fa fa-trash">'
    deleteButton.classList.add("actions_style")
    deleteButton.setAttribute("id",'delete_action')
    deleteButton.addEventListener("click", function deleteRecord(){
        event.target.parentElement.parentElement.remove()
        noDataMsg()
    })
    return deleteButton 
}
//create edit record button
function createEditButton(){
    var editButton = document.createElement("button")
    editButton.innerHTML = '<i class="fa fa-edit"></i>'
    editButton.classList.add("actions_style")
    editButton.setAttribute("id", 'edit_action');
    //function for clicking on edit button
    editButton.addEventListener("click", function(){
        //open edit popup
        editPopup.classList.remove("hidden");
        editPopup.classList.add("flex");
        mainContainer.style.opacity = "0.1"
        //collect the record information for editing
        selectedName.element = event.target.parentElement.parentElement.childNodes[0].innerHTML + " " + event.target.parentElement.parentElement.childNodes[1].innerHTML
        //assign appropriate values to the inputs
        selectedName.data = selectedName.element.split(" ")
        editableFirstNameInput.value = selectedName.data[0]
        editableLastNameInput.value = selectedName.data[1]
        editableCityInput.value = selectedName.data[2]
        //save the selected record's id
        recordId.push(event.target.parentElement.parentElement.id)
    })
    return editButton
}

//function for adding the record
function addRecord(){
    event.preventDefault()
    //chekc validation
    if(checkValidation() || checkNumberValidation()){
        errorMsg.classList.remove("hidden")
    return
    }
    //adjust values for each column
    var fullName = firstNameInput.value  + " "+ lastNameInput.value
    var newRaw = document.createElement("tr")
    newRaw.classList.add("font")
    var newDataName = document.createElement("th")
    var cityName = document.createElement("th")
    var date = document.createElement("th")
    var time = document.createElement("th")
    var deleteButton = createDeleteButton()
    var editButton = createEditButton()
    var actions = document.createElement("th")
    actions.classList.add("actions")
    actions.appendChild(editButton)
    actions.appendChild(deleteButton)
    time.innerHTML = d.getHours() + ":" + d.getMinutes()
    date.innerHTML = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay()
    cityName.innerHTML= cityInput.value
    newDataName.innerHTML = fullName
    //adjust id to the new record
    var ID = idGenerator()
    newRaw.setAttribute("id", ID)
    //make raw coloring
    if(parseInt(ID)/2 % 1){
        newRaw.classList.add("white")
    }else{
        newRaw.classList.add("grey")
    }
    newRaw.appendChild(newDataName)
    newRaw.appendChild(cityName)
    newRaw.appendChild(date)
    mainList.appendChild(newRaw)
    newRaw.appendChild(time)
    newRaw.appendChild(actions)
    table.push(newRaw)
    addPageNumber()
    noDataMsg()
    clearInputValues()
    closePopUp()
}
//edit the created record
function editRecord(){
    event.preventDefault()
    if(checkEditedValidation() || checkEditedNumberValidation()){
        editedErrorMsg.classList.remove("hidden")
    return
    }
    var editedRecord = document.getElementById(recordId[recordId.length-1])
    editedRecord.firstChild.innerHTML = editableFirstNameInput.value + " " + editableLastNameInput.value
    editedRecord.childNodes[1].innerHTML = editableCityInput.value
    noDataMsg()
    closeEditPopup()
}
//create search function
function search(){
    event.preventDefault()
    for(i = 0; i<mainList.rows.length-1;i++){
        if(document.getElementById(i + "line").firstChild.innerHTML.toUpperCase().indexOf(searchInput.value.toUpperCase())>-1){
            document.getElementById(i + "line").style.display=""
        }else{
            document.getElementById(i + "line").style.display="none"
        }
        if(document.getElementById(i + "line").firstChild.innerHTML.toUpperCase().indexOf(searchInput.value.toUpperCase())<0){
            noData.classList.remove("hidden")
        }else{
            noData.classList.add("hidden")
        }
    
    }
}

