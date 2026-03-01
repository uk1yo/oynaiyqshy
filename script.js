let scores = [0, 0, 0, 0];
let currentPoints = 0;
let currentAnswer = "";
let currentCell = null; // Запоминаем, на какую карточку кликнули
let bsModal = null; // Переменная для управления модальным окном Bootstrap

const questions = [
  // 10 баллов (4 вопроса)
  {q:"Қазақстанда қандай шама бірліктерді қолдануға болады?",a:"Қазақстанда Халықаралық бірлік жүйесінің (SI) шама бірліктерін қолдануға рұқсат бар...",pts:10},
  {q:"Өлшеу құралдары қандай талаптарға сәйкес болуы тиіс?",a:"Өлшеу құралдары Қазақстанда қолданылатын шама бірліктеріне сәйкес келуі тиіс...",pts:10},
  {q:"Жүйелік қателік дегеніміз не?",a:"Өлшеу нәтижесіне бір бағытта тұрақты немесе заңды түрде әсер ететін қателік.",pts:10},
  {q:"Эталон дегеніміз не?",a:"Өлшем бірлігін сақтау, жаңғырту және беру үшін қолданылатын жоғары дәлдіктегі өлшеу құралы.",pts:10},
  
  // 15 баллов (4 вопроса)
  {q:"Мемлекеттік метрологиялық бақылау деген не?",a:"Мемлекеттік метрологиялық бақылау – уәкілетті органның заң талаптарының орындалуын бақылау қызметі.",pts:15},
  {q:"Өлшеу құралдарын салыстырып тексеру дегеніміз не?",a:"Өлшеу құралының метрологиялық талаптарға сәйкестігін ресми түрде растау процедурасы.",pts:15},
  {q:"Өлшем бірліктері Қазақстанда қандай жүйеге сәйкес қолданылуы тиіс?",a:"Қазақстанда Халықаралық өлшем бірліктері жүйесі (SI) қолдануға рұқсат етіледі...",pts:15},
  {q:"Өлшеу құралдары тексеріліп, көрсеткіштеріне сенімді болу үшін қандай процесс жүргізіледі?",a:"Өлшеу құралдары калибрлеуге және қажетті жағдайда верификацияға жатады.",pts:15},
  
  // 20 баллов (4 вопроса)
  {q:"Мемлекеттік метрологиялық бақылау қандай мақсатта жүргізіледі?",a:"Ол өлшеулердің заң талаптарына сәйкестігін бақылау үшін жүргізіледі.",pts:20},
  {q:"Өлшеу диапазоны дегеніміз не?",a:"Құрал рұқсат етілген қателік шегінде өлшей алатын шамалардың аралығы.",pts:20},
  {q:"Өлшеу эталоны дегеніміз не?",a:"Бұл өлшем бірлігінің өзекті, жоғары дәлдікті үлгісі.",pts:20},
  {q:"счастливый",a:"Счастливый билет!",pts:20},
  
  // 25 баллов (4 вопроса)
  {q:"Мемлекеттік эталондар не үшін қажет?",a:"Басқа өлшеу құралдарының сенімділігін қамтамасыз ету үшін.",pts:25},
  {q:"Мемлекеттік метрологиялық бақылау өнім сапасына қалай әсер етеді?",a:"Өлшеулердің дұрыстығын қамтамасыз етіп, сапасыз өнімнің шығуына жол бермейді.",pts:25},
  {q:"Метрологиялық сараптама деген не?",a:"Метрологиялық сараптама – метрологиялық талаптарды... талдау және бағалау.",pts:25},
  {q:"Өлшем бiрлiгiн қамтамасыз ету мемлекеттік жүйесiнің құрылымы қандай?",a:"1) Үкімет; 2) уәкілетті орган; 3) мемлекеттік органдар; 4) орталық; 5) тұлғалар кіреді.",pts:25},
  
  // 30 баллов (4 вопроса)
  {q:"стандартты үлгі анықтамасы",a:"Стандартты үлгі – өлшем дәлдігінің... тұрақты материал.",pts:30},
  {q:"Өлшеу әдістемесінің аттестатталуы не үшін қажет?",a:"Әдістеменің дәлдігі, қайталанғыштығы және сенімділігі нормативтік талаптарға сәйкес екенін растау үшін.",pts:30},
  {q:"Заңдық метрология деп нені атайды?",a:"Заңдық метрология - метрологияның уәкiлеттi мемлекеттiк орган атқаратын қызметке жататын... бөлiгi.",pts:30},
  {q:"счастливый",a:"Счастливый билет!",pts:30}
];

// Функция перемешивания массива
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Группируем вопросы по баллам для логичной расстановки
const pointsCategories = [10, 15, 20, 25, 30];
let structuredQuestions = [];

pointsCategories.forEach(point => {
    // Находим все вопросы с текущим баллом
    let questionsForPoint = questions.filter(q => q.pts === point);
    // Перемешиваем их между собой
    questionsForPoint = shuffleArray(questionsForPoint);
    // Добавляем в итоговый массив
    structuredQuestions = structuredQuestions.concat(questionsForPoint);
});

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    // Инициализируем модальное окно Bootstrap
    bsModal = new bootstrap.Modal(document.getElementById('questionModal'));
    
    // Отрисовываем сетку
    const grid = document.getElementById("grid");
    structuredQuestions.forEach((question, index) => {
        let div = document.createElement("div");
        div.className = "question-cell";
        div.textContent = question.pts; // Используем textContent для безопасности
        div.dataset.index = index;
        div.onclick = function() { openCell(div, index) };
        grid.appendChild(div);
    });

    // Генерируем кнопки команд один раз
    const teamButtonsContainer = document.getElementById("teamButtons");
    for(let i = 1; i <= 4; i++) {
        let btn = document.createElement("button");
        btn.className = "btn btn-primary";
        btn.textContent = "Команда " + i + " дұрыс";
        btn.onclick = function() { addPoints(i) };
        teamButtonsContainer.appendChild(btn);
    }
});

function openCell(cell, index) {
    if (cell.classList.contains("used")) return;
    
    currentCell = cell; // Запоминаем карточку
    let questionData = structuredQuestions[index];
    currentPoints = questionData.pts;
    currentAnswer = questionData.a;
    
    // Заполняем модальное окно (используем textContent от XSS атак)
    document.getElementById("pointsTitle").textContent = `Сұрақ ${currentPoints} ұпайға`;
    document.getElementById("questionArea").textContent = questionData.q;
    document.getElementById("answerArea").textContent = "";
    document.getElementById("answerArea").classList.add("d-none");
    
    // Показываем кнопку "Жауапты көру", скрываем кнопки команд
    document.getElementById("showAnswerBtn").classList.remove("d-none");
    document.getElementById("teamButtons").classList.add("d-none");
    document.getElementById("teamButtons").classList.remove("d-flex");

    // Открываем модальное окно
    bsModal.show();
}

function showAnswer() {
    let answerArea = document.getElementById("answerArea");
    answerArea.innerHTML = "<strong>Жауабы:</strong> " + currentAnswer; // Здесь можно innerHTML, так как данные контролируем мы
    answerArea.classList.remove("d-none");
    
    // Прячем кнопку показа ответа, показываем кнопки команд
    document.getElementById("showAnswerBtn").classList.add("d-none");
    document.getElementById("teamButtons").classList.remove("d-none");
    document.getElementById("teamButtons").classList.add("d-flex");
}

function addPoints(team) {
    scores[team - 1] += currentPoints;
    document.getElementById("t" + team).textContent = scores[team - 1];
    markCellAsUsed();
    bsModal.hide();
}

// Если никто не ответил, просто закрываем и сжигаем вопрос
function closeWithoutPoints() {
    markCellAsUsed();
    bsModal.hide();
}

// Функция для пометки вопроса как сыгранного
function markCellAsUsed() {
    if (currentCell) {
        currentCell.classList.add("used");
        currentCell = null;
    }
}