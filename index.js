let dateText;
let dayOfWeek = ["(月)","(火)","(水)","(木)","(金)"];

document.getElementById('dateButton').addEventListener('click',() => {
    dateText = document.getElementById('dateData').value.split('-');
    dateText[1] = Number(dateText[1]);
    dateText[2] = Number(dateText[2]);
    for (let i=0; i<5; i++) {
        let tex = "date"+(i+1);
        document.getElementById(tex).innerText = dateText[1]+"月"+(dateText[2]+i)+"日"+dayOfWeek[i];
    }
});

document.getElementById('createButton').addEventListener('click',() => {
    addTime();
    let output = "";
    output = "週報("+dateText[0]+"年"+dateText[1] +"月"+(dateText[2]+7)+"日)\n";
    output += "（先生の名前）先生\n\n";
    output += "お世話になっております。\n（研究室名）研究室（学年）の（名前）です。\n";
    output += dateText[1] +"月"+dateText[2]+"日から"+ dateText[1]+"月"+(dateText[2]+4)+"日までの週報です。\n\n";
    output += "【活動内容】\n";
    for (let i=0; i<5; i++){
        let rest = "rest"+(i+1);
        if(!document.getElementById(rest).checked){
            let sHT = "startHour"+(i+1);
            let eHT = "endHour"+(i+1);
            let sMT = "startMinute"+(i+1);
            let eMT = "endMinute"+(i+1);
            output += dateText[1]+"月"+(dateText[2]+i)+"日"+dayOfWeek[i]+" "
                +document.getElementById(sHT).value+":"+zeroJudge(document.getElementById(sMT).value)+"~"
                +document.getElementById(eHT).value+":"+zeroJudge(document.getElementById(eMT).value)+"\n";
            let went = "went"+(i+1);
            if(document.getElementById(went).checked) output += "登校\n";
            let task = "task"+(i+1);
            output += document.getElementById(task).value+"\n\n";
        }
    }
    output += "【研究時間】\n";
    output += "先週の研究時間："+hour+"時間"+minute+"分\n";
    output += "総研究時間："+tHour+"時間"+tMinute+"分\n\n";
    output += "【読んだ論文】\n";
    output += document.getElementById('study').value+"\n\n";
    output += "【予定】\n";
    output += document.getElementById('schedule').value+"\n\n";
    output += "今週もよろしくお願いいたします。";

    document.getElementById('output').value = output;
    // console.log(output);
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
        let eHT = "endHour"+(i+1);
        let sHT = "startHour"+(i+1);
        let eMT = "endMinute"+(i+1);
        let sMT = "startMinute"+(i+1);

        let startTime = Number(document.getElementById(sHT).value)*60+Number(document.getElementById(sMT).value);
        let endTime = Number(document.getElementById(eHT).value)*60+Number(document.getElementById(eMT).value);
        
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