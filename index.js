let dateText;
let prevWeek;
let dayOfWeek = ["(月)","(火)","(水)","(木)","(金)"];
let brackets = [["(",")"],["[","]"],["【","】"]];

document.getElementById('dateBtn').addEventListener('click',() => {
    dateText = document.getElementById('dateData').value.split('-');
    if(dateText[0] == "") return;
    dateText[0] = Number(dateText[0]);
    dateText[1] = Number(dateText[1]);
    dateText[2] = Number(dateText[2]);

    prevWeek = new Date(dateText[0],dateText[1]-1,dateText[2]);//var prevWeek = new Date(2022,5,24);

    for (let i=0; i<5; i++) {
        let displayField = "date"+(i+1);
        document.getElementById(displayField).innerText = (prevWeek.getMonth()+1)+"月"+prevWeek.getDate()+"日"+dayOfWeek[i];
        prevWeek.setDate(prevWeek.getDate() + 1);
    }
    prevWeek.setDate(prevWeek.getDate() -5);
});

document.getElementById('nextWeekBtn').addEventListener('click',() => {
    if(window.confirm("次週の週報にしますか？(ローカルストレージも更新されます)")){
        addTime();
        prevWeek.setDate(prevWeek.getDate() +7);
        document.getElementById("dateData").value = prevWeek.getFullYear()+"-"+("0"+(prevWeek.getMonth()+1)).slice(-2)+"-"+("0"+prevWeek.getDate()).slice(-2);

        for (let i=0; i<5; i++){
            let date = "date"+(i+1);
            document.getElementById(date).textContent = (prevWeek.getMonth()+1)+"月"+prevWeek.getDate()+"日"+dayOfWeek[i];
            prevWeek.setDate(prevWeek.getDate() + 1);
        }
        prevWeek.setDate(prevWeek.getDate() -5);

        for (let i=0; i<5; i++){
            let sH = "startHour"+(i+1);
            let eH = "endHour"+(i+1);
            let sM = "startMinute"+(i+1);
            let eM = "endMinute"+(i+1);
            document.getElementById(sH).value = "";
            document.getElementById(sM).value = "";
            document.getElementById(eH).value = "";
            document.getElementById(eM).value = "";
            let task = "task"+(i+1);
            document.getElementById(task).value = "";
            let went = "went"+(i+1);
            document.getElementById(went).checked = false;
            let rest = "rest"+(i+1);
            if(document.getElementById(rest).checked){
                document.getElementById(task).readOnly = false;
                document.getElementById(task).style.backgroundColor = 'white';
            }
            document.getElementById(rest).checked = false;
        }

        document.getElementById("totalHour").value = tHour;
        document.getElementById("totalMinute").value = tMinute;
        document.getElementById("study").value = "";
        document.getElementById("schedule").value = "";
        nextReport();
    }
});

document.getElementById('resetButton').addEventListener('click',() => {
    if(window.confirm("リセットしますか？(ローカルストレージは消えて、初期設定は残ります)")){
        document.getElementById("dateData").value = "";
        for (let i=0; i<5; i++){
            let date = "date"+(i+1);
            document.getElementById(date).textContent = "　月　日(　)";

            let sH = "startHour"+(i+1);
            let eH = "endHour"+(i+1);
            let sM = "startMinute"+(i+1);
            let eM = "endMinute"+(i+1);
            document.getElementById(sH).value = "";
            document.getElementById(sM).value = "";
            document.getElementById(eH).value = "";
            document.getElementById(eM).value = "";
            let task = "task"+(i+1);
            document.getElementById(task).value = "";
            let went = "went"+(i+1);
            document.getElementById(went).checked = false;
            let rest = "rest"+(i+1);
            if(document.getElementById(rest).checked){
                document.getElementById(task).readOnly = false;
                document.getElementById(task).style.backgroundColor = 'white';
            }
            document.getElementById(rest).checked = false;
        }
        
        document.getElementById("totalHour").value = "";
        document.getElementById("totalMinute").value = "";
        document.getElementById("study").value = "";
        document.getElementById("schedule").value = "";

        resetReport();
    }
});

let errorMessages = [];

function initCheck(){
    errorMessages = [];
    if(document.getElementById("yourYear").value == "" || document.getElementById("yourName").value == "" ||
        document.getElementById("teacherName").value == "" || document.getElementById("belonging").value == "")
            errorMessages.push("初期設定を入力してください。")

    if(prevWeek == null) errorMessages.push("日付を反映してください。");

    if(errorMessages.length==0) return true;
    else return false;
}

document.getElementById('createButton').addEventListener('click',() => {
    if(initCheck()){
        let bracket = document.getElementById("brackets").selectedIndex;

        addTime();

        let output = "";
        prevWeek.setDate(prevWeek.getDate() + 7);
        output = "週報("+prevWeek.getFullYear()+"年"+(prevWeek.getMonth()+1) +"月"+prevWeek.getDate()+"日)"+document.getElementById("yourName").value+"\n";
        output += document.getElementById("teacherName").value+"先生\n\n";
        output += "お世話になっております。\n"+document.getElementById("belonging").value+document.getElementById("yourYear").value+"の"+document.getElementById("yourName").value+"です。\n";
        prevWeek.setDate(prevWeek.getDate() - 7);
        output += (prevWeek.getMonth()+1) +"月" +prevWeek.getDate() +"日から";
        prevWeek.setDate(prevWeek.getDate() + 4);
        output += (prevWeek.getMonth()+1) +"月" +prevWeek.getDate() +"日までの週報です。\n\n";
        prevWeek.setDate(prevWeek.getDate() - 4);
        output += brackets[bracket][0]+"活動内容"+brackets[bracket][1]+"\n";
        for (let i=0; i<5; i++){
            let rest = "rest"+(i+1);
            if(!document.getElementById(rest).checked){
                let sH = "startHour"+(i+1);
                let eH = "endHour"+(i+1);
                let sM = "startMinute"+(i+1);
                let eM = "endMinute"+(i+1);

                output += (prevWeek.getMonth()+1)+"月"+prevWeek.getDate()+"日"+dayOfWeek[i]+" "
                    +document.getElementById(sH).value+":"+zeroJudge(document.getElementById(sM).value)+"~"
                    +document.getElementById(eH).value+":"+zeroJudge(document.getElementById(eM).value);
                let went = "went"+(i+1);
                if(document.getElementById(went).checked) output += " 登校\n";
                else output += "\n";
                let task = "task"+(i+1);
                output += document.getElementById(task).value+"\n\n";
            }
            prevWeek.setDate(prevWeek.getDate() + 1);
        }
        output += brackets[bracket][0]+"研究時間"+brackets[bracket][1]+"\n";
        output += "先週の研究時間："+hour+"時間"+minute+"分\n";
        output += "総研究時間："+tHour+"時間"+tMinute+"分\n\n";
        output += brackets[bracket][0]+"読んだ論文"+brackets[bracket][1]+"\n";
        output += document.getElementById('study').value+"\n\n";
        output += brackets[bracket][0]+"予定"+brackets[bracket][1]+"\n";
        output += document.getElementById('schedule').value+"\n\n";
        output += "今週もよろしくお願いいたします。";

        document.getElementById('output').value = output;
        prevWeek.setDate(prevWeek.getDate() - 5);
        // console.log(output);
        // saveReport();
    }else{
        alert(errorMessages.join('\n'));
    }

});

let hour =0;
let minute = 0;
let tHour =0;
let tMinute =0;
let tMinuteEmp = 0;

function addTime() {
    hour = 0;
    minute = 0;
    tHour = 0;
    tMinute = Number(document.getElementById('totalHour').value)*60+Number(document.getElementById('totalMinute').value);
    for (let i=0; i<5; i++) {
        let eH = "endHour"+(i+1);
        let sH = "startHour"+(i+1);
        let eM = "endMinute"+(i+1);
        let sM = "startMinute"+(i+1);

        let startTime = Number(document.getElementById(sH).value)*60+Number(document.getElementById(sM).value);
        let endTime = Number(document.getElementById(eH).value)*60+Number(document.getElementById(eM).value);

        minute += endTime - startTime;
    }
    hour = Math.floor(minute / 60);
    minute = Math.floor(minute % 60);

    tMinuteEmp = tMinute;
    tMinute = Math.floor((tMinute + minute) % 60);
    tHour = hour + Math.floor((tMinuteEmp+ minute) / 60);
};

function zeroJudge(num) {
    if(num == "0") return "00";
    else return num;
}

function setRest(value){
    if(document.getElementById(value.id).checked){
        let task = "task" + value.id.substr(-1);
        document.getElementById(task).readOnly = true;
        document.getElementById(task).style.backgroundColor = '#eee';
    }else{
        let task = "task" + value.id.substr(-1);
        document.getElementById(task).readOnly = false;
        document.getElementById(task).style.backgroundColor = 'white';
    }
}

