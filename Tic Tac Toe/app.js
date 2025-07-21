let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector('#reset');
let newBtn = document.querySelector('#new-game');
let message = document.querySelector('.msg-container');

let turnO = true;
let count = 0;

let winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = 'O';
            box.classList.add('o-color');
            turnO = false;
        } else {
            box.innerText = 'X';
            box.classList.remove('o-color');
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    message.innerText = 'Game Draw';
    message.classList.remove('hide');
    resetBtn.replaceWith(newBtn);
    newBtn.classList.remove('hide');
    disableboxes();
}

const disableboxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
}



const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if (pos1 != '' && pos2 != '' && pos3 != '') {
            if (pos1 === pos2 && pos2 === pos3) {
                let player = pos1 === 'O' ? 'Player 1' : 'Player 2';
                resetBtn.replaceWith(newBtn);
                newBtn.classList.remove('hide');
                message.classList.remove('hide');
                message.innerText = (`Congratulations! ${player} won the game`);
                disableboxes();
            }
        }
    }
}

newBtn.addEventListener('click', () => {
    boxes.forEach((box) => {
        box.innerText = '';
        box.disabled = false;
        turnO = true;
        count = 0;
    });
    message.classList.add('hide');
    newBtn.classList.add('hide');
    newBtn.replaceWith(resetBtn);
});

resetBtn.addEventListener('click', () => {
    boxes.forEach((box) => {
        turnO = true;
        count = 0;
        box.innerText = '';
        box.disabled = false;
    });
});