const questions = [
    {
        category: "새로운 프로젝트가 시작될 때 나는",
        text: "",
        options: [
            { text: "A. 큰 그림과 방향을 먼저 그린다", type: "vision" },
            { text: "B. 구체적인 실행 계획부터 세운다", type: "execution" }
        ]
    },
    {
        category: "팀이 어려움에 부딪히면",
        text: "",
        options: [
            { text: "A. 새로운 접근법을 제안한다", type: "innovation" },
            { text: "B. 팀원들의 감정을 먼저 살핀다", type: "coordination" }
        ]
    },
    {
        category: "업무 중 가장 보람을 느낄 때는",
        text: "",
        options: [
            { text: "A. 내가 성장하고 있음을 느낄 때", type: "growth" },
            { text: "B. 팀이 목표를 달성했을 때", type: "execution" }
        ]
    },
    {
        category: "회의 중 의견이 갈릴 때 나는",
        text: "",
        options: [
            { text: "A. 모두의 의견을 조율해 합의점을 찾는다", type: "coordination" },
            { text: "B. 새로운 아이디어로 방향을 전환한다", type: "innovation" }
        ]
    },
    {
        category: "새로운 기술이나 트렌드를 접하면",
        text: "",
        options: [
            { text: "A. 바로 시도해본다", type: "innovation" },
            { text: "B. 내 성장에 어떻게 도움이 될지 고민한다", type: "growth" }
        ]
    },
    {
        category: "리더로서 가장 중요한 것은",
        text: "",
        options: [
            { text: "A. 명확한 비전 제시", type: "vision" },
            { text: "B. 실행력과 추진력", type: "execution" }
        ]
    },
    {
        category: "팀원에게 피드백을 줄 때",
        text: "",
        options: [
            { text: "A. 구체적인 개선 방향을 제시한다", type: "growth" },
            { text: "B. 감정과 상황을 고려해 조심스럽게 전달한다", type: "coordination" }
        ]
    },
    {
        category: "새로운 시도를 할 때 나는",
        text: "",
        options: [
            { text: "A. 실패를 두려워하지 않는다", type: "innovation" },
            { text: "B. 팀이 함께할 수 있도록 설득한다", type: "vision" }
        ]
    }
];

let currentQuestion = 0;
let scores = {
    vision: 0,
    execution: 0,
    innovation: 0,
    coordination: 0,
    growth: 0
};

function startQuiz() {
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('result-container').style.display = 'none';
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('questionCategory').textContent = question.category;
    document.getElementById('questionText').textContent = question.text;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.innerHTML = `<label><input type="radio" name="q${currentQuestion}" value="${option.type}"> ${option.text}</label>`;
        optionsContainer.appendChild(optionDiv);
    });
    
    document.getElementById('nextBtn').disabled = true;
    document.querySelectorAll('input[name="q' + currentQuestion + '"]').forEach(input => {
        input.addEventListener('change', () => {
            document.getElementById('nextBtn').disabled = false;
        });
    });
    
    updateNavigation();
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="q' + currentQuestion + '"]:checked');
    if (selectedOption) {
        scores[selectedOption.value]++;
        currentQuestion++;
        
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.style.display = currentQuestion > 0 ? 'inline-block' : 'none';
    nextBtn.textContent = currentQuestion < questions.length - 1 ? '다음' : '결과 보기';
}

function showResults() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    
    let highestScore = 0;
    let leadershipType = '';
    
    for (let type in scores) {
        if (scores[type] > highestScore) {
            highestScore = scores[type];
            leadershipType = type;
        }
    }
    
    const resultDiv = document.getElementById('result');
    let resultText = '';
    
    switch (leadershipType) {
        case 'vision':
            resultText = '비전형 리더십';
            break;
        case 'execution':
            resultText = '실행형 리더십';
            break;
        case 'innovation':
            resultText = '혁신형 리더십';
            break;
        case 'coordination':
            resultText = '조율형 리더십';
            break;
        case 'growth':
            resultText = '성장형 리더십';
            break;
        default:
            resultText = '결과를 도출할 수 없습니다.';
    }
    
    resultDiv.textContent = `당신의 리더십 유형은: ${resultText}`;
}

function restartQuiz() {
    currentQuestion = 0;
    scores = {
        vision: 0,
        execution: 0,
        innovation: 0,
        coordination: 0,
        growth: 0
    };
    startQuiz();
}

document.addEventListener('DOMContentLoaded', startQuiz);