window.onload = loadReport;

// window.addEventListener('beforeunload', function(e){
//     saveReport();
// });

// ページ読み込み時にlocalStorageを読み込むメソッド
function loadReport(){
    if(localStorage.length == 1){
        let json = JSON.parse(localStorage.getItem("date"));
        prevWeek = new Date(json.date);

        document.getElementById("dateData").value = json.date[0]+"-"+("0"+json.date[1]).slice(-2)+"-"+("0"+json.date[2]).slice(-2);
        document.getElementById("date1").textContent = json.date[1] +"月"+json.date[2]+"日(月)";
        document.getElementById("startHour1").value = json.date1.time[0];
        document.getElementById("startMinute1").value = json.date1.time[1];
        document.getElementById("endHour1").value = json.date1.time[2];
        document.getElementById("endMinute1").value = json.date1.time[3];
        document.getElementById("task1").value = json.date1.task;
        document.getElementById("went1").checked = json.date1.went;
        document.getElementById("rest1").checked = json.date1.rest;
        if(json.date1.rest){
            document.getElementById("task1").readOnly = true;
            document.getElementById("task1").style.backgroundColor = '#eee';
        }

        document.getElementById("date2").textContent = json.date[1] +"月"+(json.date[2]+1)+"日(火)";
        document.getElementById("startHour2").value = json.date2.time[0];
        document.getElementById("startMinute2").value = json.date2.time[1];
        document.getElementById("endHour2").value = json.date2.time[2];
        document.getElementById("endMinute2").value = json.date2.time[3];
        document.getElementById("task2").value = json.date2.task;
        document.getElementById("went2").checked = json.date2.went;
        document.getElementById("rest2").checked = json.date2.rest;
        if(json.date2.rest){
            document.getElementById("task2").readOnly = true;
            document.getElementById("task2").style.backgroundColor = '#eee';
        }

        document.getElementById("date3").textContent = json.date[1] +"月"+(json.date[2]+2)+"日(水)";
        document.getElementById("startHour3").value = json.date3.time[0];
        document.getElementById("startMinute3").value = json.date3.time[1];
        document.getElementById("endHour3").value = json.date3.time[2];
        document.getElementById("endMinute3").value = json.date3.time[3];
        document.getElementById("task3").value = json.date3.task;
        document.getElementById("went3").checked = json.date3.went;
        document.getElementById("rest3").checked = json.date3.rest;
        if(json.date3.rest){
            document.getElementById("task3").readOnly = true;
            document.getElementById("task3").style.backgroundColor = '#eee';
        }

        document.getElementById("date4").textContent = json.date[1] +"月"+(json.date[2]+3)+"日(木)";
        document.getElementById("startHour4").value = json.date4.time[0];
        document.getElementById("startMinute4").value = json.date4.time[1];
        document.getElementById("endHour4").value = json.date4.time[2];
        document.getElementById("endMinute4").value = json.date4.time[3];
        document.getElementById("task4").value = json.date4.task;
        document.getElementById("went4").checked = json.date4.went;
        document.getElementById("rest4").checked = json.date4.rest;
        if(json.date4.rest){
            document.getElementById("task4").readOnly = true;
            document.getElementById("task4").style.backgroundColor = '#eee';
        }

        document.getElementById("date5").textContent = json.date[1] +"月"+(json.date[2]+4)+"日(金)";
        document.getElementById("startHour5").value = json.date5.time[0];
        document.getElementById("startMinute5").value = json.date5.time[1];
        document.getElementById("endHour5").value = json.date5.time[2];
        document.getElementById("endMinute5").value = json.date5.time[3];
        document.getElementById("task5").value = json.date5.task;
        document.getElementById("went5").checked = json.date5.went;
        document.getElementById("rest5").checked = json.date5.rest;
        if(json.date5.rest){
            document.getElementById("task5").readOnly = true;
            document.getElementById("task5").style.backgroundColor = '#eee';
        }

        document.getElementById("totalHour").value = json.total[0];
        document.getElementById("totalMinute").value = json.total[1];
        document.getElementById("study").value = json.study;
        document.getElementById("schedule").value = json.schedule;
    }
}

//localStorage用登録メソッド
function saveReport(){
    window.alert("保存しました");
    let input = {date:[],date1:{time:[],task:"",went:false,rest:false},date2:{time:[],task:"",went:false,rest:false},date3:{time:[],task:"",went:false,rest:false},date4:{time:[],task:"",went:false,rest:false},date5:{time:[],task:"",went:false,rest:false},total:[],study:"",schedule:""};

    dateText = document.getElementById('dateData').value.split('-');
    input.date = [Number(dateText[0]),Number(dateText[1]),Number(dateText[2])];

    input.date1.time = [Number(document.getElementById("startHour1").value),Number(document.getElementById("startMinute1").value),Number(document.getElementById("endHour1").value),Number(document.getElementById("endMinute1").value)];
    input.date1.task = document.getElementById("task1").value;
    input.date1.went = document.getElementById("went1").checked;
    input.date1.rest = document.getElementById("rest1").checked;

    input.date2.time = [Number(document.getElementById("startHour2").value),Number(document.getElementById("startMinute2").value),Number(document.getElementById("endHour2").value),Number(document.getElementById("endMinute2").value)];
    input.date2.task = document.getElementById("task2").value;
    input.date2.went = document.getElementById("went2").checked;
    input.date2.rest = document.getElementById("rest2").checked;

    input.date3.time = [Number(document.getElementById("startHour3").value),Number(document.getElementById("startMinute3").value),Number(document.getElementById("endHour3").value),Number(document.getElementById("endMinute3").value)];
    input.date3.task = document.getElementById("task3").value;
    input.date3.went = document.getElementById("went3").checked;
    input.date3.rest = document.getElementById("rest3").checked;

    input.date4.time = [Number(document.getElementById("startHour4").value),Number(document.getElementById("startMinute4").value),Number(document.getElementById("endHour4").value),Number(document.getElementById("endMinute4").value)];
    input.date4.task = document.getElementById("task4").value;
    input.date4.went = document.getElementById("went4").checked;
    input.date4.rest = document.getElementById("rest4").checked;

    input.date5.time = [Number(document.getElementById("startHour5").value),Number(document.getElementById("startMinute5").value),Number(document.getElementById("endHour5").value),Number(document.getElementById("endMinute5").value)];
    input.date5.task = document.getElementById("task5").value;
    input.date5.went = document.getElementById("went5").checked;
    input.date5.rest = document.getElementById("rest5").checked;

    input.total = [Number(document.getElementById("totalHour").value),Number(document.getElementById("totalMinute").value)];
    input.study = document.getElementById("study").value;
    input.schedule = document.getElementById("schedule").value;

    let json = JSON.stringify(input, undefined, 1);
    localStorage.setItem("date", json);
}

function resetReport(){
    localStorage.removeItem("date");

    // let input = {date:[],date1:{time:[],task:"",went:false,rest:false},date2:{time:[],task:"",went:false,rest:false},date3:{time:[],task:"",went:false,rest:false},date4:{time:[],task:"",went:false,rest:false},date5:{time:[],task:"",went:false,rest:false},total:[],study:"",schedule:""};
    // let json = JSON.stringify(input, undefined, 1);
    // localStorage.setItem("date", json);
}