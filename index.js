const path = require('path'); 
window.$ = window.jQuery = require('jquery');  
const notifier = require('node-notifier');

var addToDo = document.getElementById("addToDo");
var inputTimeAlert = document.getElementById("inputTimeAlert");
var greenCirkle = document.getElementById("greenCirkle");
var orangeredCirkle = document.getElementById("orangeredCirkle");
var redCirkle = document.getElementById("redCirkle");
var trashAll = document.getElementById("trashAll");


//Клик по кнопке с галочкой
addToDo.onclick=()=>{
    var inputToDo = document.getElementById("inputToDo").value;
    var inputTime = document.getElementById("inputTime").value;
    
    //Проверка,  все ли поля заполнены
    if(inputToDo!=="" && inputTime!=="" && (radioCirkleGreen!==false || radioCirkleOrangered!==false || radioCirkleRed!==false)){
        newToDo();
        document.getElementById("inputToDo").style.boxShadow="none";
        document.getElementById("inputTime").style.boxShadow="none";
        greenCirkle.style.boxShadow="none";
        orangeredCirkle.style.boxShadow="none";
        redCirkle.style.boxShadow="none";

    }
//фокус на инпут если он не заполнен
    else if(inputToDo==""){  
        document.getElementById("inputToDo").style.boxShadow="0 0 4px red";
        document.getElementById("inputToDo").focus();}

//фокус на инпут времени если он не заполнен
    else if(inputTime==""){
        document.getElementById("inputTime").style.boxShadow="0 0 4px red";
        document.getElementById("inputTime").focus();}

//Красная обводка у кружечков если не один не выбран
    else if(radioCirkleGreen==false && radioCirkleOrangered==false && radioCirkleRed==false){
        greenCirkle.style.boxShadow="0 0 8px red";
        orangeredCirkle.style.boxShadow="0 0 8px red";
        redCirkle.style.boxShadow="0 0 8px red";  
    }        
}


var radioCirkleGreen=false;
var radioCirkleOrangered=false;
var radioCirkleRed=false;
var icn;

//Обводка у выбраного кружечка(Зеленый)
greenCirkle.onclick=()=>{
    if(radioCirkleGreen==false ){
    greenCirkle.style.border="2px solid #005500";
    radioCirkleGreen = true; icn=1;
    radioCirkleOrangered=false;
    radioCirkleRed=false;
    orangeredCirkle.style.border="none";
    redCirkle.style.border="none";
    }

}     
//Обводка у выбраного кружечка(Оранж)
 orangeredCirkle.onclick=()=>{
    if(radioCirkleOrangered==false){
    greenCirkle.style.border="none";
    radioCirkleGreen = false;
    radioCirkleOrangered=true;icn=2;
    radioCirkleRed=false;
    orangeredCirkle.style.border="2px solid #711111";
    redCirkle.style.border="none";
    }
 }
//Обводка у выбраного кружечка(Красный)
 redCirkle.onclick=()=>{
    if(radioCirkleRed==false){
    greenCirkle.style.border="none";
    radioCirkleGreen = false;
    radioCirkleOrangered=false;
    radioCirkleRed=true; icn=3;
    orangeredCirkle.style.border="none";
    redCirkle.style.border="2px solid #830000";
    }
 }
 
//В соотвествии с выбраной важностью задачи отображать в списке записей разный цвет кружечков
function hTodo(icon1){
    if(radioCirkleGreen == true && radioCirkleOrangered==false && radioCirkleRed==false){
    icon1.addClass("imgToDoGreen");  icn=1}
    else if(radioCirkleGreen == false && radioCirkleOrangered==true && radioCirkleRed==false){
        icon1.addClass("imgToDoOrangered"); icn=2}
            else if(radioCirkleGreen == false && radioCirkleOrangered==false && radioCirkleRed==true){
            icon1.addClass("imgToDoRed"); icn=3}
}
var tdList = $('#tdlUl');
var tdMask = 'tdl_';

//создание новой записи
function newToDo(){
    
    var inputToDo = $('#inputToDo').val();
    var inputTime = $('#inputTime').val();
    var inputTimeAlert = $('#inputTimeAlert').val();
       
    var obj={
        todo: inputToDo,
        valueTime: inputTime,
        timeAlert:inputTimeAlert,
        icon:icn
    }
    
    if(inputToDo.length > 0){
        var nId = 0;

        tdList.children().each(function(index,el){
            var jelId = $(el).attr('data-itemid');
            if(jelId > nId)
            nId = jelId;
            nId++;
        })
        var serialObj = JSON.stringify(obj);


        localStorage.setItem(tdMask+nId, serialObj);
        var notfArr = JSON.parse(localStorage.getItem(tdMask+nId));

        var icon1 = $('<i></i>');
        hTodo(icon1); 

        var spanElem1=$('<span></span>');
        icon1.appendTo(spanElem1);


        var li = $('<li></li>').addClass('tdItem');

        li.attr('data-itemid',tdMask+nId)
        .text(notfArr.todo).appendTo(tdList);

        spanElem1.prependTo(li);
        
        $('<sup></sup>').addClass('supClass')
        .text(notfArr.valueTime).appendTo(li);
                    
    }

//очистка всех полей
    greenCirkle.style.border="none";
    orangeredCirkle.style.border="none";
    redCirkle.style.border="none";
    radioCirkleGreen=false;
    radioCirkleOrangered=false;
    radioCirkleRed=false;
    document.getElementById("inputToDo").value = "";
    document.getElementById("inputTime").value = "";
    document.getElementById("inputTimeAlert").value = "";
   
}

//отображение сохраненных записей
function showTask(){
   
 var lsLen = localStorage.length;
    if(lsLen > 0){
        for(var i=0; i<lsLen;i++){
            var key = localStorage.key(i);
            if(key.indexOf(tdMask)==0){

                var li = $('<li></li>').addClass('tdItem');
                var sup = $('<sup></sup>').addClass('supClass');

                var icon1 = $('<i></i>');
                var spanElem1=$('<span></span>');


                var re = JSON.parse(localStorage.getItem(key)).icon;

            if(re==1) icon1.addClass('imgToDoGreen');
                else if(re==2) icon1.addClass('imgToDoOrangered');
                    else if(re==3) icon1.addClass('imgToDoRed');

                icon1.appendTo(spanElem1);
                
                li.attr('data-itemid',key)
                .text(JSON.parse(localStorage.getItem(key)).todo)
                .appendTo(tdList);

                spanElem1.prependTo(li);

                sup.text(JSON.parse(localStorage.getItem(key)).valueTime).appendTo(li);

                

            }
        }
    }
}
showTask();


//удаление при дабл клике
$(document).on('dblclick','.tdItem',function(e){
    var jet = $(e.target);
    localStorage.removeItem(jet.attr('data-itemid'));
    jet.remove();
})

//зачеркивание
$(document).on('click','.tdItem',function(e){
    $(e.target).css('text-decoration','line-through');
    line=true;
})

//удалить все
trashAll.onclick=()=>{
    localStorage.clear();
    document.getElementById("tdlUl").innerHTML='';
}

//уведомления
function notifi(){
    var data = new Date();
    var hours = String(data.getHours());
    var minutes = String(data.getMinutes());
    var strTime = hours+":"+minutes;
    
    var lsLen = localStorage.length;
    if(lsLen > 0){
        for(var i=0; i<lsLen;i++){
            var key = localStorage.key(i);
            if(key.indexOf(tdMask)==0){
                
                var timeAlert = JSON.parse(localStorage.getItem(key)).timeAlert;

                if(strTime  == timeAlert)  notification();
                 
            }
        }
    }
}

setInterval(notifi, 70000); 


//вид уведомления
function notification(){
    var myNotificaton = new Notification('ToDo List',{
        'body': 'Пора делать дело!!!',
        'icon': __dirname + "/img/pensil5.png"
    })
}


//проход по формам нажатием Enter
inputToDo.onkeyup=()=>{
    if(event.keyCode==13) 
         document.getElementById("inputTime").focus();
}
inputTime.onkeyup=()=>{
    if(event.keyCode==13) 
         document.getElementById("inputTimeAlert").focus();
}

inputTimeAlert.onkeyup=()=>{
    if(event.keyCode==13) 
         if(radioCirkleGreen!==false || radioCirkleOrangered!==false || radioCirkleRed!==false) 
                document.getElementById("addToDo").click();
        else {
            greenCirkle.style.boxShadow="0 0 8px red";
            orangeredCirkle.style.boxShadow="0 0 8px red";
            redCirkle.style.boxShadow="0 0 8px red"; 
        }        
}
    



