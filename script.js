document.getElementById('leadership-test').addEventListener('submit', function(event) {
    event.preventDefault();

    let score = {
        A: 0,
        B: 0,
        C: 0,
        D: 0
    };

    const formData = new FormData(event.target);
    for (let [name, value] of formData.entries()) {
        score[value]++;
    }

    let resultType = Object.keys(score).reduce((a, b) => score[a] > score[b] ? a : b);

    let resultText = '';
    switch (resultType) {
        case 'A':
            resultText = '당신은 소통을 중시하는 리더입니다.';
            break;
        case 'B':
            resultText = '당신은 팀원들의 의견을 반영하는 리더입니다.';
            break;
        case 'C':
            resultText = '당신은 균형 잡힌 리더입니다.';
            break;
        case 'D':
            resultText = '당신은 독단적인 리더입니다.';
            break;
    }

    document.getElementById('result-text').innerText = resultText;
    document.getElementById('result').classList.remove('hidden');
});