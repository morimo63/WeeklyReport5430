window.onload = loadReport;

// window.addEventListener('beforeunload', function(e){
//     saveReport();
// });

// ページ読み込み時にlocalStorageを読み込むメソッド
function loadReport(){
    if(localStorage.length == 1){
        let json = JSON.parse(localStorage.getItem("date"));
        prevWeek = new Date(json.date);

        document.getElementById("yourYear").value = json.account.yourYear;
        document.getElementById("yourName").value = json.account.yourName;
        document.getElementById("teacherName").value = json.account.teacherName;
        document.getElementById("belonging").value = json.account.belonging;
        document.getElementById("brackets").selectedIndex = json.account.brackets;

        document.getElementById("dateData").value = json.date[0]+"-"+("0"+json.date[1]).slice(-2)+"-"+("0"+json.date[2]).slice(-2);

        for(let i=0;i<5;i++){
            let day = "date"+(i+1);
            let sH = "startHour"+(i+1);
            let sM = "startMinute"+(i+1);
            let eH = "endHour"+(i+1);
            let eM = "endMinute"+(i+1);
            let task = "task"+(i+1);
            let went = "went"+(i+1);
            let rest = "rest"+(i+1);
            document.getElementById(day).textContent = (prevWeek.getMonth()+1)+"月"+prevWeek.getDate()+"日"+dayOfWeek[i];
            document.getElementById(sH).value = json[day].time[0];
            document.getElementById(sM).value = json[day].time[1];
            document.getElementById(eH).value = json[day].time[2];
            document.getElementById(eM).value = json[day].time[3];
            document.getElementById(task).value = json[day].task;
            document.getElementById(went).checked = json[day].went;
            document.getElementById(rest).checked = json[day].rest;
            if(json[day].rest){
                document.getElementById(task).readOnly = true;
                document.getElementById(task).style.backgroundColor = '#eee';
            }
            prevWeek.setDate(prevWeek.getDate() +1);
        }

        prevWeek.setDate(prevWeek.getDate() -5);
        // console.log((prevWeek.getMonth()+1)+"月"+prevWeek.getDate()+"日");

        document.getElementById("totalHour").value = json.total[0];
        document.getElementById("totalMinute").value = json.total[1];
        document.getElementById("study").value = json.study;
        document.getElementById("schedule").value = json.schedule;
    }
}

//localStorage用登録メソッド
function saveReport(){
    let input = {account:{yourYear:"",yourName:"",teacherName:"",belonging:"",brackets:0},date:[],date1:{time:[],task:"",went:false,rest:false},date2:{time:[],task:"",went:false,rest:false},date3:{time:[],task:"",went:false,rest:false},date4:{time:[],task:"",went:false,rest:false},date5:{time:[],task:"",went:false,rest:false},total:[],study:"",schedule:""};

    input.account.yourYear = document.getElementById("yourYear").value;
    input.account.yourName = document.getElementById("yourName").value;
    input.account.teacherName = document.getElementById("teacherName").value;
    input.account.belonging = document.getElementById("belonging").value;
    input.account.brackets = document.getElementById("brackets").selectedIndex;

    dateText = document.getElementById('dateData').value.split('-');
    input.date = [Number(dateText[0]),Number(dateText[1]),Number(dateText[2])];

    for(let i=0;i<5;i++){
        let day = "date"+(i+1);
        let sH = "startHour"+(i+1);
        let sM = "startMinute"+(i+1);
        let eH = "endHour"+(i+1);
        let eM = "endMinute"+(i+1);
        let task = "task"+(i+1);
        let went = "went"+(i+1);
        let rest = "rest"+(i+1);
        if(document.getElementById(sH).value==0 && document.getElementById(sM).value==0 && document.getElementById(eH).value==0 && document.getElementById(sM).value==0)
            input[day].time =[];
        else input[day].time = [Number(document.getElementById(sH).value),Number(document.getElementById(sM).value),Number(document.getElementById(eH).value),Number(document.getElementById(eM).value)];
        input[day].task = document.getElementById(task).value;
        input[day].went = document.getElementById(went).checked;
        input[day].rest = document.getElementById(rest).checked;
    }

    input.total = [Number(document.getElementById("totalHour").value),Number(document.getElementById("totalMinute").value)];
    input.study = document.getElementById("study").value;
    input.schedule = document.getElementById("schedule").value;

    let json = JSON.stringify(input, undefined, 1);
    localStorage.setItem("date", json);
    window.alert("保存しました");
}

function resetReport(){
    localStorage.removeItem("date");

    // let input = {date:[],date1:{time:[],task:"",went:false,rest:false},date2:{time:[],task:"",went:false,rest:false},date3:{time:[],task:"",went:false,rest:false},date4:{time:[],task:"",went:false,rest:false},date5:{time:[],task:"",went:false,rest:false},total:[],study:"",schedule:""};
    // let json = JSON.stringify(input, undefined, 1);
    // localStorage.setItem("date", json);
}

function nextReport(){
    if(localStorage.length == 1){
        let input = {account:{yourYear:"",yourName:"",teacherName:"",belonging:"",brackets:0},date:[],date1:{time:[],task:"",went:false,rest:false},date2:{time:[],task:"",went:false,rest:false},date3:{time:[],task:"",went:false,rest:false},date4:{time:[],task:"",went:false,rest:false},date5:{time:[],task:"",went:false,rest:false},total:[],study:"",schedule:""};

        input.account.yourYear = document.getElementById("yourYear").value;
        input.account.yourName = document.getElementById("yourName").value;
        input.account.teacherName = document.getElementById("teacherName").value;
        input.account.belonging = document.getElementById("belonging").value;
        input.account.brackets = document.getElementById("brackets").selectedIndex;

        dateText = document.getElementById('dateData').value.split('-');
        input.date = [Number(dateText[0]),Number(dateText[1]),Number(dateText[2])];

        input.total = [Number(document.getElementById("totalHour").value),Number(document.getElementById("totalMinute").value)];

        let json = JSON.stringify(input, undefined, 1);
        localStorage.setItem("date", json);
    }
}