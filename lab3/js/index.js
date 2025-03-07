const choices = {
    камень: { beats: ["ножницы", "спичка"], losesTo: ["бумага", "кирка", "какашка", "харизма", "фак"], image: "img/stone.jpg" },
    ножницы: { beats: ["бумага", "спичка"], losesTo: ["камень", "кирка", "какашка", "харизма", "фак"], image: "img/scissors.jpg" },
    бумага: { beats: ["камень", "спичка"], losesTo: ["ножницы", "кирка", "какашка", "харизма", "фак"], image: "img/paper.jpg" },
    спичка: { beats: ["бумага"], losesTo: ["камень", "ножницы", "кирка", "какашка", "харизма", "фак"], image: "img/match.png" },
    кирка: { beats: ["камень", "ножницы"], losesTo: ["бумага", "спичка", "какашка", "харизма", "фак"], image: "img/pickaxe.webp" },
    какашка: { beats: [], losesTo: ["камень", "ножницы", "бумага", "спичка", "кирка", "харизма", "фак"], image: "img/poop.jpg" },
    харизма: { beats: ["камень", "ножницы", "бумага", "спичка", "кирка", "какашка"], losesTo: ["фак"], image: "img/charizma.jpg" },
    фак: { beats: ["камень", "ножницы", "бумага", "спичка", "кирка", "какашка", "харизма"], losesTo: [], image: "img/fak.jpg" }
};

function playGame(playerChoice) {
    const computerChoices = Object.keys(choices);
    const computerChoice = computerChoices[Math.floor(Math.random() * computerChoices.length)];

    const computerChoiceImage = document.getElementById("computer-choice-img");
    computerChoiceImage.src = choices[computerChoice].image;
    computerChoiceImage.style.display = "block";

    let resultText = `Вы выбрали: ${playerChoice}. Компьютер выбрал: ${computerChoice}. `;

    if (choices[playerChoice].beats.includes(computerChoice)) {
        resultText += "Вы победили!";
    } else if (choices[playerChoice].losesTo.includes(computerChoice)) {
        resultText += "Вы проиграли!";
    } else {
        resultText += "Ничья!";
    }

    document.getElementById("game-result").innerText = resultText;
}

// Данные персонажей
const characters = [
    {
        name: "Дата-Инженер",
        image: "img/misha.jpg",
        description: "Брутальный мужчина! Шарит за питончик, доту и футбольчик",
        phrase: "Опиши тремя буквами функции GRANT и REVOKE (капсом)",
        correctAnswer: "DCL"
    },
    {
        name: "Фронтендер)",
        image: "img/sidr.jpg",
        description: "Маленький фронтендер, он любит аниме и эШтЭмАйЛ.",
        phrase: "Какой атрибут определяет, что инпут должен быть скрыт от пользователя? :3",
        correctAnswer: "hidden"
    },
    {
        name: "Питонист",
        image: "img/charizma.jpg",
        description: "Обожает СССР и войну!! Украинцам выйти с чата!!.",
        phrase: "Угадай мою любимую букву!! (капсом)",
        correctAnswer: "Z"
    },
    {
        name: "куфельд",
        image: "img/kufeld.jpg",
        description: "idk, это просто куфельд. Прикольный, да?",
        phrase: "сосал?",
        correctAnswer: "да"
    }
];

// Начало игры
document.getElementById("play-button").addEventListener("click", () => {
    startGame();
});

function startGame() {
    // Запрос имени
    let userName = prompt("Введите ваше имя:");
    while (!userName || userName.trim() === "") {
        alert("Имя не может быть пустым! Пожалуйста, введите ваше имя.");
        userName = prompt("Введите ваше имя:");
    }

    // Очистка контейнера
    const container = document.querySelector(".container");
    container.innerHTML = "";

    // Выбор персонажа
    const characterSelection = document.createElement("div");
    characterSelection.className = "character-selection";
    characters.forEach((character, index) => {
        const characterDiv = document.createElement("div");
        characterDiv.className = "character";
        characterDiv.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <p>${character.name}</p>
        `;
        characterDiv.addEventListener("click", () => selectCharacter(index));
        characterSelection.appendChild(characterDiv);
    });

    container.appendChild(characterSelection);
}

function selectCharacter(index) {
    const character = characters[index];

    // Очистка контейнера
    const container = document.querySelector(".container");
    container.innerHTML = "";

    // Отображение описания персонажа
    const descriptionDiv = document.createElement("div");
    descriptionDiv.className = "character-description";
    descriptionDiv.innerHTML = `
        <p>${character.description}</p>
        <button id="next-button">Далее</button>
    `;
    container.appendChild(descriptionDiv);

    // Переход к реплике персонажа
    document.getElementById("next-button").addEventListener("click", () => {
        const userAnswer = prompt(character.phrase);
        if (userAnswer === character.correctAnswer) {
            alert("Молодец, правильно. Теперь иди играй в камень ножницы бумагу и.. узнаешь");
        } else {
            alert("Плохо, пробуй еще");
        }
        // Добавление кнопки "Начать заново"
        let restartButton = document.getElementById("restart-button");
        if (!restartButton) {
            restartButton = document.createElement("button");
            restartButton.id = "restart-button";
            restartButton.innerText = "Начать заново";
            restartButton.addEventListener("click", () => {
                resetGame();
            });
            container.appendChild(restartButton);
        }
    });
}

// Функция для сброса игры
function resetGame() {
    const container = document.querySelector(".container");
    container.innerHTML = `
        <button id="play-button">Играть</button>
    `;
    document.getElementById("play-button").addEventListener("click", () => {
        startGame();
    });
}
