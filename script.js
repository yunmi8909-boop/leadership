const questions = [
{
category:"새로운 프로젝트가 시작될 때 나는",
options:[
{text:"A. 큰 그림과 방향을 먼저 그린다",type:"vision"},
{text:"B. 구체적인 실행 계획부터 세운다",type:"execution"}
]},
{
category:"팀이 어려움에 부딪히면",
options:[
{text:"A. 새로운 접근법을 제안한다",type:"innovation"},
{text:"B. 팀원들의 감정을 먼저 살핀다",type:"coordination"}
]},
{
category:"업무 중 가장 보람을 느낄 때는",
options:[
{text:"A. 내가 성장하고 있음을 느낄 때",type:"growth"},
{text:"B. 팀이 목표를 달성했을 때",type:"execution"}
]},
{
category:"회의 중 의견이 갈릴 때 나는",
options:[
{text:"A. 모두의 의견을 조율해 합의점을 찾는다",type:"coordination"},
{text:"B. 새로운 아이디어로 방향을 전환한다",type:"innovation"}
]},
{
category:"새로운 기술이나 트렌드를 접하면",
options:[
{text:"A. 바로 시도해본다",type:"innovation"},
{text:"B. 내 성장에 어떻게 도움이 될지 고민한다",type:"growth"}
]},
{
category:"리더로서 가장 중요한 것은",
options:[
{text:"A. 명확한 비전 제시",type:"vision"},
{text:"B. 실행력과 추진력",type:"execution"}
]},
{
category:"팀원에게 피드백을 줄 때",
options:[
{text:"A. 구체적인 개선 방향을 제시한다",type:"growth"},
{text:"B. 감정과 상황을 고려해 조심스럽게 전달한다",type:"coordination"}
]},
{
category:"새로운 시도를 할 때 나는",
options:[
{text:"A. 실패를 두려워하지 않는다",type:"innovation"},
{text:"B. 팀이 함께할 수 있도록 설득한다",type:"vision"}
]}
];

let currentQuestion = 0;
let scores = {vision:0,execution:0,innovation:0,coordination:0,growth:0};

function showQuestion(){
const q=questions[currentQuestion];
document.getElementById("questionCategory").textContent=q.category;
document.getElementById("questionText").textContent="";
const container=document.getElementById("optionsContainer");
container.innerHTML="";

q.options.forEach((opt,i)=>{
const div=document.createElement("div");
div.className="option";
div.innerHTML=`
<input type="radio" name="q${currentQuestion}" value="${opt.type}" id="opt${i}">
<label for="opt${i}">${opt.text}</label>
`;
container.appendChild(div);
});

document.getElementById("nextBtn").disabled=true;

document.querySelectorAll(`input[name="q${currentQuestion}"]`)
.forEach(input=>{
input.addEventListener("change",()=>{
document.getElementById("nextBtn").disabled=false;
});
});

updateProgressBar();
updateNavigation();
}

function nextQuestion(){
const selected=document.querySelector(`input[name="q${currentQuestion}"]:checked`);
if(!selected)return;
scores[selected.value]++;
currentQuestion++;
if(currentQuestion<questions.length){showQuestion();}else{showResults();}
}

function previousQuestion(){
if(currentQuestion>0){currentQuestion--;showQuestion();}
}

function updateNavigation(){
document.getElementById("prevBtn").style.display=
currentQuestion>0?"inline-block":"none";
document.getElementById("nextBtn").textContent=
currentQuestion<questions.length-1?"다음":"결과 보기";
}

function updateProgressBar(){
const percent=((currentQuestion+1)/questions.length)*100;
document.getElementById("progressBar").style.width=percent+"%";
document.getElementById("currentQ").textContent=currentQuestion+1;
}

function showResults(){
document.getElementById('quiz-container').style.display='none';
document.getElementById('result-container').style.display='block';

let highestScore=0;
let leadershipType='';

for(let type in scores){
if(scores[type]>highestScore){
highestScore=scores[type];
leadershipType=type;
}
}

const typeMap={
vision:"비전형 리더십",
execution:"실행형 리더십",
innovation:"혁신형 리더십",
coordination:"조율형 리더십",
growth:"성장형 리더십"
};

const descriptionMap={
vision:"전략적 사고와 방향 제시에 강합니다.",
execution:"강한 추진력과 실행력을 갖춘 리더입니다.",
innovation:"새로운 시도와 변화를 이끄는 창의적 리더입니다.",
coordination:"팀워크와 관계 조율에 강한 리더입니다.",
growth:"지속적인 성장과 발전을 추구하는 리더입니다."
};

document.getElementById('result').innerHTML=
`<h2>당신의 리더십 유형은: ${typeMap[leadershipType]}</h2>`;

let total=Object.values(scores).reduce((a,b)=>a+b,0);
//let detailHTML=`<div class="result-detail-box"><h3>점수 분석</h3>`;

/*for(let key in scores){
let percent=Math.round((scores[key]/total)*100);
detailHTML+=`
<div class="percent-item">
<strong>${typeMap[key]}</strong> (${percent}%)
<div class="percent-bar">
<div class="percent-fill" style="width:${percent}%"></div>
</div>
</div>`;
}*/

let detailHTML=`
<hr style="margin:20px 0;">
<h3>상세 설명</h3>
<p>${descriptionMap[leadershipType]}</p>
</div>`;

document.getElementById('resultDetail').innerHTML=detailHTML;

const imageMap = {
    vision: "1.jpg",
    execution: "2.jpg",
    innovation: "3.jpg",
    coordination: "4.jpg",
    growth: "5.jpg"
};

document.getElementById('resultImage').src = `images/${imageMap[leadershipType]}`;
}

function restartQuiz(){
currentQuestion=0;
scores={vision:0,execution:0,innovation:0,coordination:0,growth:0};
document.getElementById('result-container').style.display='none';
document.getElementById('quiz-container').style.display='block';
showQuestion();
}

function goToChatGPT() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let selectedOptions = [];
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            selectedOptions.push(checkbox.nextElementSibling.textContent);
        }
    });

    const prompt = `내 리더십 유형은 ${document.querySelector('#result h2').textContent}입니다. 선택한 항목: ${selectedOptions.join(', ')}`;
    navigator.clipboard.writeText(prompt).then(() => {
        window.open('https://chat.openai.com/', '_blank');
    });
}

document.addEventListener("DOMContentLoaded",showQuestion);