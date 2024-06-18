let level =1;
let sec = 0;
let min = 0;
let timeInterval = null;
let operators = ['+','-','*','%','/'];
let fNumber;
let lNumber;
let selectedOperater;
let maxNumber = 10;
let answerData = [];
let correctAnswer;
let insertedAnswer;
let qNumber = 0;
//-----------------------
const selectElement = document.getElementById('level-select');

const secElement = document.getElementById('sec');
const minElement = document.getElementById('min');

const fNumElement = document.getElementById('f-number');
const lNumElement = document.getElementById('l-number');
const opElement = document.getElementById('opperator');

const answrElement = document.getElementById('answer');

const qNumberElement = document.getElementById('qNumber');

const correctElement = document.getElementById('c');
const wrongElement = document.getElementById('w');
const skippedElement = document.getElementById('s');

const btnStartdElement = document.getElementById('btnStart');

const tBodydElement = document.getElementById('answer-body');

//-----------------------
selectElement.addEventListener("change",function(){
    level = parseInt(selectElement.value);

});
//-----------------------
const start=() =>{
    manageTime();
    btnStartdElement.disabled = true;

}
const manageTime=() =>{

    qNumber++;
    if(qNumber>10){
        finalize();
        return;

    }

    else{

        qNumberElement.textContent = qNumber;

        min = 0;
        sec = 0;
        secElement.textContent = '00';
        minElement.textContent = '00';
    
        generateQustion(level);
    
        clearInterval(timeInterval);  
        timeInterval  = setInterval(() =>{
            sec++;
            if(sec < 10){
                //set time with 0
                secElement.textContent = '0'+sec;
            }
            else{
                secElement.textContent = sec + '';
            }
            if (sec == 60){
                sec = 0;
                min++;
                //set min
                minElement.textContent = '0' + min;
            }
            if (min == 3){
                min = 0;
                skipQuizz();
            }
        },1000);

    }


}

const generateQustion = (selectedLevel) =>{

    
    if(selectedLevel = 1){
        maxNumber = 10;
    }

    else if(selectedLevel == 2){
        maxNumber = 50;
    }

    else if (selectedLevel = 3){
        maxNumber = 100;
    }

    fNumber = Math.floor(Math.random() * maxNumber) +1;
    lNumber = Math.floor(Math.random() * maxNumber) +1; 

    fNumElement.textContent = fNumber;
    lNumElement.textContent = lNumber;

    selectedOperater = operators[
        Math.floor(Math.random() * 5)
    ];
    
    opElement.textContent = selectedOperater;
}

const submitData =()=>{

    insertedAnswer = parseInt(answrElement.value);
    

    if (fNumber && lNumber && selectedOperater && insertedAnswer){

        switch(selectedOperater){
            case '+' : correctAnswer = fNumber + lNumber;break;
            case '-' : correctAnswer = fNumber - lNumber;break;
            case '*' : correctAnswer = fNumber * lNumber;break;
            case '/' : correctAnswer = fNumber / lNumber;break;
            case '%' : correctAnswer = fNumber % lNumber;break;
            default : alert('something went wrong');return;
        }

        if(insertedAnswer == correctAnswer){
            let obj={
                'q NUmber' : 1,
                'Time' : min +':'+ sec,
                'userAnswr' : insertedAnswer,
                'correctAnswer' : correctAnswer,
                'operator' : selectedOperater,
                'firstNumber' : fNumber,
                'lastNumber' : lNumber,
                'iscorrect' : true,
                'isskiped' : false
            }
            answerData.push(obj);
        }
        else{
            let obj={
                'q NUmber' : 1,
                'Time' : min +':'+ sec,
                'userAnswr' : insertedAnswer,
                'correctAnswer' : correctAnswer,
                'operator' : selectedOperater,
                'firstNumber' : fNumber,
                'lastNumber' : lNumber,
                'iscorrect' : false,
                'isskiped' : false
            }
            answerData.push(obj); 
        }
        answrElement.value = '';
        manageTime();
        setStaticForLables();
        console.log(answerData);
    }
    else{
        alert('try again');
    }
}
const skipQuizz=()=>{
    if (qNumber>10){
        finalize();
        return;
    }
    else{

        let obj={
            'q NUmber' : 1,
            'Time' : min +':'+ sec,
            'userAnswr' : null,
            'correctAnswer' : correctAnswer,
            'operator' : selectedOperater,
            'firstNumber' : fNumber,
            'lastNumber' : lNumber,
            'iscorrect' : false,
            'isskiped' : true
        }
        answerData.push(obj);
        manageTime();
        setStaticForLables();

    }

}
const setStaticForLables=()=>{
    let c=0;
    let w=0;
    let s=0;

    for(let x = 0;x<answerData.length;x++){
        let temp = answerData[x];

        if(temp.iscorrect){
            c++;
        }
        else{
            w++;
        }
        if(temp.isskiped){
            s++;
        }

    }
    correctElement.textContent = c;
    wrongElement.textContent = w;
    skippedElement.textContent = s;
}

const reset=()=>{
    btnStartdElement.disabled = false;
    qNumber = 0;
    qNumberElement.textContent = qNumber;
    answerData = [];
    setStaticForLables();
    selectedOperater = undefined;
    clearInterval(timeInterval);
    minElement.textContent = '00';
    secElement.textContent = '00';
    opElement.textContent = '?'
    fNumElement.textContent = '?';
    lNumElement.textContent = '?';

    while(tBodydElement.firstChild){
        tBodydElement.removeChild(tBodydElement.firstChild);
    }
}

const finalize=()=>{
    answerData.forEach(data =>{
        const row =  document.createElement("tr");

        const cell1 = document.createElement("td");
        cell1.textContent = data.firstNumber;
        row.appendChild(cell1);

        const cell2 = document.createElement("td");
        cell2.textContent = data.lastNumber;
        row.appendChild(cell2);

        const cell3 = document.createElement("td");
        cell3.textContent = data.operator;
        row.appendChild(cell3);

        const cell4 = document.createElement("td");
        cell4.textContent = data.correctAnswer;
        row.appendChild(cell4);

        const cell5 = document.createElement("td");
        cell5.textContent = data.userAnswr;
        row.appendChild(cell5);

        const cell6 = document.createElement("td");
        cell6.textContent = data.iscorrect;
        row.appendChild(cell6);

        const cell7 = document.createElement("td");
        cell7.textContent = data.isskiped;
        row.appendChild(cell7);

        const cell8 = document.createElement("td");
        cell8.textContent = data.Time;
        row.appendChild(cell8);

        tBodydElement.appendChild(row);

    });
}

//-----------------------