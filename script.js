const questions = [
    {
        category: "새로운 프로젝트가 시작될 때 나는",
        options: [
            { text: "A. 큰 그림과 방향을 먼저 그린다", type: "vision" },
            { text: "B. 구체적인 실행 계획부터 세운다", type: "execution" }
        ]
    },
    {
        category: "팀이 어려움에 부딪히면",
        options: [
            { text: "A. 새로운 접근법을 제안한다", type: "innovation" },
            { text: "B. 팀원들의 감정을 먼저 살핀다", type: "coordination" }
        ]
    },
    {
        category: "업무 중 가장 보람을 느낄 때는",
        options: [
            { text: "A. 내가 성장하고 있음을 느낄 때", type: "growth" },
            { text: "B. 팀이 목표를 달성했을 때", type: "execution" }
        ]
    },
    {
        category: "회의 중 의견이 갈릴 때 나는",
        options: [
            { text: "A. 모두의 의견을 조율해 합의점을 찾는다", type: "coordination" },
            { text: "B. 새로운 아이디어로 방향을 전환한다", type: "innovation" }
        ]
    },
    {
        category: "새로운 기술이나 트렌드를 접하면",
        options: [
            { text: "A. 바로 시도해본다", type: "innovation" },
            { text: "B. 내 성장에 어떻게 도움이 될지 고민한다", type: "growth" }
        ]
    },
    {
        category: "리더로서 가장 중요한 것은",
        options: [
            { text: "A. 명확한 비전 제시", type: "vision" },
            { text: "B. 실행력과 추진력", type: "execution" }
        ]
    },
    {
        category: "팀원에게 피드백을 줄 때",
        options: [
            { text: "A. 구체적인 개선 방향을 제시한다", type: "growth" },
            { text: "B. 감정과 상황을 고려해 조심스럽게 전달한다", type: "coordination" }
        ]
    },
    {
        category: "새로운 시도를 할 때 나는",
        options: [
            { text: "A. 실패를 두려워하지 않는다", type: "innovation" },
            { text: "B. 팀이 함께할 수 있도록 설득한다", type: "vision" }
        ]
    },
    {
        category: "상사와 방향성이 맞지 않는다고 느낄 때 나는",
        options: [
            { text: "A. 조직의 큰 방향과 연결 지어 설득해본다", type: "vision" },
            { text: "B. 갈등이 커지지 않도록 대화를 통해 입장 차이를 좁힌다", type: "coordination" }
        ]
    },
    {
        category: "팀원이 반복적으로 실수를 할 때 나는",
        options: [
            { text: "A. 왜 그런지 원인을 분석하고 새로운 방식으로 바꿔본다", type: "innovation" },
            { text: "B. 그 사람이 성장할 수 있도록 코칭 계획을 세운다", type: "growth" }
        ]
    },
    {
        category: "업무가 과도하게 몰려 우선순위가 혼란스러울 때 나는",
        options: [
            { text: "A. 우리가 왜 이 일을 하는지 목적부터 점검한다", type: "vision" },
            { text: "B. 업무 프로세스를 재설계해 구조적으로 정리한다", type: "innovation" }
        ]
    },
    {
        category: "성과가 기대에 못 미쳤을 때 나는",
        options: [
            { text: "A. 무엇을 배우고 성장할 수 있는지 돌아본다", type: "growth" },
            { text: "B. 원인을 분석하고 실행 방식을 점검한다", type: "execution" }
        ]
    },
    {
        category: "팀 분위기가 침체되어 있을 때 나는",
        options: [
            { text: "A. 구성원 개개인의 동기 요인을 파악한다", type: "coordination" },
            { text: "B. 팀의 역량 개발 기회를 설계한다", type: "growth" }
        ]
    },
    {
        category: "업무를 팀원에게 지시하고 완료할 때까지",
        options: [
            { text: "A. 자율성을 주고 기다린다", type: "vision" },
            { text: "B. 매일 매일 물어본다", type: "execution" }
        ]
    },
    {
        category: "Ideation 회의를 할 때",
        options: [
            { text: "A. 내가 idea를 많이 낸다", type: "innovation" },
            { text: "B. 팀원들이 idea를 많이 말할 수 있도록 한다", type: "coordination" }
        ]
    }
];

let currentQuestion = 0;
let scores = {vision:0,execution:0,innovation:0,coordination:0,growth:0};

function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("questionCategory").textContent = q.category;
    document.getElementById("questionText").textContent = "";
    const container = document.getElementById("optionsContainer");
    container.innerHTML = "";

    q.options.forEach((opt,i)=>{
        const div = document.createElement("div");
        div.className = "option";
        div.innerHTML = `
            <input type="radio" name="q${currentQuestion}" value="${opt.type}" id="opt${i}">
            <label for="opt${i}">${opt.text}</label>
        `;

        div.addEventListener("click", () => {
            const radioButton = div.querySelector("input[type='radio']");
            radioButton.checked = true;
            document.getElementById("nextBtn").disabled = false;
        });

        container.appendChild(div);
    });

    document.getElementById("nextBtn").disabled = true;

    document.querySelectorAll(`input[name="q${currentQuestion}"]`)
        .forEach(input => {
            input.addEventListener("change", () => {
                document.getElementById("nextBtn").disabled = false;
            });
        });

    updateProgressBar();
    updateNavigation();
}

function nextQuestion() {
    const selected = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
    if(!selected) return;

    scores[selected.value]++;
    currentQuestion++;
    if(currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function previousQuestion() {
    if(currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

function updateNavigation() {
    document.getElementById("prevBtn").style.display =
        currentQuestion > 0 ? "inline-block" : "none";
    document.getElementById("nextBtn").textContent =
        currentQuestion < questions.length-1 ? "다음" : "결과 보기";
}

function updateProgressBar() {
    const percent = ((currentQuestion+1)/questions.length)*100;
    document.getElementById("progressBar").style.width = percent+"%";
    document.getElementById("currentQ").textContent = currentQuestion+1;
}

function showResults() {
    window.scrollTo(0, 0);
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('title').style.display = 'none';

    let highestScore = 0;
    let leadershipType = '';
    for(let type in scores){
        if(scores[type] >= highestScore){
            highestScore = scores[type];
            leadershipType = type;
        }
    }

    const typeMap = {
        vision: "비전형 리더십",
        execution: "실행형 리더십",
        innovation: "혁신형 리더십",
        coordination: "조율형 리더십",
        growth: "성장형 리더십"
    };

    const descriptionMap = {
        vision: "조직의 미래를 제시하고 영감을 주는 리더",
        execution: "명확한 목표를 설정하고 실행을 중시하는 리더",
        innovation: "새로운 아이디어와 변화를 주도하는 리더",
        coordination: "구성원 간의 협력을 촉진하고 조율하는 리더",
        growth: "구성원의 성장을 돕고 지원하는 리더"
    };

    const descriptionMapSub = {
        vision: `불확실한 상황에서도 조직이 나아갈 방향을 제시하고, 구성원이 따라올 수 있도록 영감을 주는 리더십입니다.<br>
이 유형의 컬러는 <span style="color:#1E3ABA">딥 블루</span>입니다. <span style="color:#1E3ABA">우드향</span>처럼 안정적이고 신뢰를 줍니다.`,
        execution: `말보다는 행동으로 신뢰를 쌓고, 정해진 목표를 끝까지 실행하여 성과로 조직을 움직이게 하는 리더십입니다.<br>
이 유형의 컬러는 <span style="color:#991B1B">버건디 레드</span>입니다. <span style="color:#991B1B">블랙체리향</span>처럼 강렬하고 확신을 줍니다.</span>`,
        innovation: `익숙한 방식을 넘어 새로운 시도와 조합을 통해 변화를 만들어 내고, 도전을 조직의 문화로 확산시키는 리더십입니다.<br>
이 유형의 컬러는 <span style="color:#FACC15">브라이트 옐로우</span>입니다. <span style="color:#FACC15">시트로벨라향</span>처럼 신선하고 활력을 줍니다.</span>`,
        coordination: `구성원의 목소리에 귀 기울여 관계의 균형을 맞추고, 협력 속에서 조직이 자연스럽게 움직이도록 만드는 리더십입니다.<br>
이 유형의 컬러는 <span style="color:#86EFAC">소프트 그린</span>입니다. <span style="color:#86EFAC">가든파티향</span>처럼 조화롭고 생동감을 줍니다.</span>`,
        growth: `구성원의 가능성을 믿고 학습과 피드백을 통해 함께 성장하며, 지속적으로 성장할 수 있도록 지원하는 리더십입니다.<br>
이 유형의 컬러는 <span style="color:#A788BF">라벤더 퍼플</span>입니다. <span style="color:#A788BF">겐조플라워향</span>처럼 부드럽고 지속적인 성장을 촉진합니다.</span>`
    };

    document.getElementById('result').innerHTML =
        '<h2 style="text-align: center;">당신의 리더십 유형은?</h2>' +
        '<h2 style="text-align: center;">' + typeMap[leadershipType] + '</h2>';

    let detailHTML = `
        <hr style="margin:20px 0;">
        <h3>${descriptionMap[leadershipType]}</h3>
        <p>${descriptionMapSub[leadershipType]}</p>
    `;

    document.getElementById('resultDetail').innerHTML = detailHTML;

    const imageMap = {
        vision: "1.jpg",
        execution: "2.jpg",
        innovation: "3.jpg",
        coordination: "4.jpg",
        growth: "5.jpg"
    };

    document.getElementById('resultImage').src = `images/${imageMap[leadershipType]}`;
}

function restartQuiz() {
    currentQuestion = 0;
    scores = {vision:0,execution:0,innovation:0,coordination:0,growth:0};
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('title').style.display = 'block';
    showQuestion();
}

function goToChatGPT() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let selectedOptions = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) selectedOptions.push(checkbox.nextElementSibling.textContent);
    });

    const prompt = `${document.querySelectorAll('#result h2')[0].textContent} ${document.querySelectorAll('#result h2')[1].textContent}. 나의 유형 좀 더 알아보기 : ${selectedOptions.join(', ')}`;

    navigator.clipboard.writeText(prompt).then(() => {
        window.open('https://chat.openai.com/', '_blank');
    });
}

// 페이지 로드 시 안내문 기본 표시
document.addEventListener("DOMContentLoaded", () => {
    showQuestion();
});