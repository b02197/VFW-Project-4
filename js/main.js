//Michael Eaton
//Project 3 js
//term1302

//Wait until DOM is loaded
window.addEventListener("DOMContentLoaded", function(){

//getElementById funtion to get the ids
    function $(x){
       var theElement = document.getElementById(x);
       return theElement;
    }
    
//Create select field element and populate with options
    function makeDrop(){
        var formtag = document.getElementsByTagName("form"),
            selLi = $('dropDown'),
            createSelect = document.createElement('select');
            createSelect.setAttribute("id", "temps");
        for(var i=0, j=meatTemp.length; i<j; i++){
            var createOption = document.createElement('option');
            var optText = meatTemp[i];
            createOption.setAttribute("value", optText);
            createOption.innerHTML = optText;
            createSelect.appendChild(createOption);
        }
        selLi.appendChild(createSelect);
    }
    
//Find the value of a selected radio button
   function getSelectedRadio(){
      var radio = document.forms[0].side;
      for(var i=0; i<radio.length; i++){
         if(radio[i].checked){
         sideValue = radio[i].value;
         }
      }
   }

//checkbox values
function getCheckValue(){
   if($('cheese').checked){
      cheeseValue = $('cheese').value
   }else{
      cheeseValue = "No"
   }
   
}
//toggles links for display page
function togCont(n){
   switch(n){
      case "on":
         $('burgerMaker').style.display = "none";
         $('clear').style.display = "inline";
         $('displayData').style.display = "none";
         $('addContent').style.display = "inline";
         break;
      case "off":
         $('burgerMaker').style.display = "block";
         $('clear').style.display = "inline";
         $('displayData').style.display = "inline";
         $('addContent').style.display = "none";
         $('item').style.display = "none";
         break;
      default:
         break;
      
   } return false;
}
//saveData function
   function saveData(key){
      if(key){
      var id = Math.floor(Math.random()*9999999)
      }else{
         id= key;
      }
//Gather all form field data in an object.
//Object properies will contain an array with the form labal and input value.
      getSelectedRadio();
      getCheckValue();
      var item = {};
         item.sName = ["Server's Name:", $('sName').value];
         item.tDate = ["Today's Date:", $('tDate').value];
         item.tNum = ["Table Number:", $('tNum').value];
         item.temps = ["Temperature:", $('temps').value];
         item.cheese = ["Cheese?:", cheeseValue];
         item.cond = ["Special Notes:", $('cond').value];
         item.side = ["Sides", sideValue];
//Save data into local storage. Use stringify to convert object to a string.
      localStorage.setItem(id, JSON.stringify(item));
      alert("Order is Placed");
}
//function to display data to browser
   function getData(){
      togCont("on");
      if(localStorage.length === 0){
         alert("There is no data found in the local storage.");
      }
      var createDiv = document.createElement('Div');
      createDiv.setAttribute("id", "item");
      var createList = document.createElement('ul');
      createDiv.appendChild(createList);
      document.body.appendChild(createDiv);
      $('item').style.display = "block";
      for(var i=0, j=localStorage.length; i<j; i++){
         var createli = document.createElement('li');
         var linkLi = document.createElement('li');
         createList.appendChild(createli);
         var key = localStorage.key(i);
         var value = localStorage.getItem(key);
//convert string back to object
         var infoObj = JSON.parse(value);
         var createSubList = document.createElement('ul');
         createli.appendChild(createSubList);
         for(var y in infoObj){
            var createSubli = document.createElement('li');
            createSubList.appendChild(createSubli);
            var optSubText = infoObj[y] [0] +" "+ infoObj[y] [1];
            createSubli.innerHTML = optSubText;
            createSubList.appendChild(linkLi);
         }
         createItemLinks(localStorage.key(i), linkLi);  //Makes the edit and delete link for the items in LS
      }
   }
   
// Function that makes the edit and delete link for items displayed 
   function createItemLinks(key, linkLi){
      var editLink = document.createElement('a');
      editLink.href = "#";
      editLink.key = key;
      var editTxt = "Edit Order";
      editLink.addEventListener("click", editItem);
      editLink.innerHTML = editTxt;
      linkLi.appendChild(editLink);
      
      var delLink = document.createElement('a');
      delLink.href = "#";
      delLink.key = key;
      var delTxt = "Delete Order";
      delLink.addEventListener("click", delItem)
      delLink.innerHTML = delTxt;
      linkLi.appendChild(delLink);
      
      
   }
 //function to make the edit link work  
   function editItem(){
      var value = localStorage.getItem(this.key);
      var item = JSON.parse(value);
      
      togCont("off");
      
      $('sName').value = item.sName[1];
      $('tDate').value = item.tDate[1];
      $('tNum').value = item.tNum[1];
      $('temps').value = item.temps[1];
      if(item.cheese[1] == "yes"){
         $('cheese').setAttribute("checked", "checked");
      }
      $('cond').value = item.cond[1];
      var radio = document.forms[0].side;
      for(var i=0; i<radio.length; i++){
         if(radio[i].value === "No Side" && item.side[1] === "No Side"){
            radio[i].setAttribute("checked", "checked");
         }else if(radio[i].value === "Fries" && item.side[1] === "Fries"){
            radio[i].setAttribute("checked", "checked");
            } else if(radio[i].value === "Onion Rings" && item.side[1] === "Onion Rings"){
                  radio[i].setAttribute("checked", "checked");
               }else if(radio[i].value === "Chips" && item.side[1] === "Chips"){
                  radio[i].setAttribute("checked", "checked");
               }
      }
      save.removeEventListener("click", saveData);
      $('submit').value = "Edit Order";
      var editSubmit = $('submit');
      editSubmit.addEventListener("click",validate);
      editSubmit.key = this.key;
   }
  //function to make the delete link work 
   function delItem(){
      var ask = confirm("Are you sure you want to delete this order?");
      if(ask){
         localStorage.removeItem(this.key);
         alert("The order was delete.")
         window.location.reload();
      }else{
         alert("Order was not deleted.")
         
      }
   }
   
   //function for clearing data
   function clearData(){
      localStorage.clear();
      alert("You have deleted the order.");
      window.location.reload();
      return false;
}
//form validation function

   function validate(e){
      var getSname = $('sName');
      var getTemps = $('temps');
      
      errMsg.innHTML = "";
      getSname.style.border = "1px solid black";
      getTemps.style.border = "1px solid black";
      
      var mesAry = [];
      
      if (getSname.value === ""){
         var snameError = "Please enter your name.";
         getSname.style.border = "1px solid red";
         mesAry.push(snameError);
      }
      
      if(getTemps.value === "--Choose A Temp--"){
         var tempsError = "Please enter a temperature";
         getTemps.style.border = "1px solid red";
         mesAry.push(tempsError);
      }
      
      if(mesAry.length >= 1){
         for(var i=0, j=mesAry.length; i<j; i++){
            var text = document.createElement('li');
            text.innerHTML = mesAry[i];
            errMsg.appendChild(text);
         }
         e.preventDefault();
      }else{
         saveData(this.key);
      }
      
   }

//Array for my temperature drop down
    var meatTemp = ["--Choose A Temp--", "Rare", "Med-Rare", "Medium", "Med-Well", "Well"],
         sideValue,
         cheeseValue = "No",
         errMsg = $('errors');
    makeDrop();
    
//links and submit button

    var displayData = $('displayData');
    displayData.addEventListener("click", getData);
   var clear = $('clear');
    clear.addEventListener("click", clearData);
    var save = $('submit');
    save.addEventListener("click", validate);
   
});