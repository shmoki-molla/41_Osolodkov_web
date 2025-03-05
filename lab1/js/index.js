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