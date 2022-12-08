//Создаем массив для хранения данных
let boarDate = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

//Создание переменных для игры
let player = 1;
let gameOver = false;

//Извлечь ячейки из ДОМа
const cellElements = document.querySelectorAll(".cell");
//Извлеку текст результата из ДОМа
const resultElement = document.getElementById("result");

//Добавляем "прослушиватель" событий
cellElements.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        placeMarker(index);
    }) 
})

//Создаем функцию для установки маркеров
function placeMarker(index) {
//Разбиваем строки и столбцы на индексы
   let col = index % 3;
   let row = (index - col) / 3;
   //проверяем что ячейка пустая
   if (boarDate[row][col] == 0 && gameOver == false) {
   boarDate[row][col] = player;
   // Меняем игрока
   player *= -1;
      drawMarker();
      //Проверка результата
      checkResult();
   }
}


//функция рисования маркеров маркеров игроков
function drawMarker() {
    //Перебираем строки
    for(let row = 0; row < 3; row++) {
        //Перебираем столбцы
        for(let col = 0; col < 3; col++)
        //Проверяем есть ли маркер игрока
        if(boarDate[row][col] == 1) {
            //Обнови класс ечеек чтобы добавить крестик
            cellElements[(row * 3) + col].classList.add("cross");
            } else if(boarDate[row][col] == -1){
                //Обнови класс ечеек чтобы добавить нолик
                cellElements[(row * 3) + col].classList.add("circle");

            }
    }
}

//создадим функцию для проверки результатов игры
function checkResult() {
    //Проверяем строки и столбцы
    for(let i = 0; i < 3; i++) {
        let rowSum = boarDate[i][0] + boarDate[i][1] + boarDate[i][2];
        let colSum = boarDate[0][i] + boarDate[1][i] + boarDate[2][i];
        if(rowSum == 3 || colSum == 3) {
            //Игрок 1 выиграл
            endGame(1);
            return
        } else if(rowSum == -3 || colSum == -3) {
            //Игрок 2 выиграл
            endGame(2);
            return
        }
    }
//Проверка диагоналей
    let giagonalSum1 = boarDate[0][0] + boarDate[1][1] + boarDate[2][2];
    let giagonalSum2 = boarDate[0][2] + boarDate[1][1] + boarDate[2][0];
    if(giagonalSum1 == 3 || giagonalSum2 == 3) {
    //Игрок 1 выиграл
    endGame(1);
    return
} else if(giagonalSum1 == -3 || giagonalSum2 == -3) {
    //Игрок 2 выиграл
    endGame(2);
    return
    }
//Проверка на ничью
 if(boarDate[0].indexOf(0) == -1 &&
 boarDate[1].indexOf(0) == -1 &&
 boarDate[2].indexOf(0) == -1) {
    endGame(0);
    return
 }
}

//Функция для завершения игры и вывода результата
function endGame(winner) {
    //Trigger game over
    gameOver = true;
    
    //Проверка на ничью
    if(winner == 0) {
        resultElement.innerText = "Это ничья!";
    } else {
        resultElement.innerText = `Игрок ${winner} победил!`
    }
}

//Рестар игры
const restartButton = document.getElementById("restart");
//Добавляем прослушиватель событий кнопки рестарта
restartButton.addEventListener("click", () => {
    //Сбросить игровые переменные
    boarDate = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]
    player = 1;
    gameOver = false;
    //Ресет поля
    cellElements.forEach(cell => {
        cell.classList.remove("cross", "circle")
    })

    resultElement.innerText = "";
});

