import { wordList } from "./data/db.js";

const inputs = document.querySelector('.content .inputs');
const resetButton = document.querySelector('.reset-button');
const hint = document.querySelector('.details .hint span');
const typingInputs = document.querySelector('.typing-input');
const worngLetter = document.querySelector('.details .worng-letter span');
const guesleft = document.querySelector('.gues-left span');

let word,
    maxGues,
    incorrect = [],
    correct = [];

const randonWords = () => {
    // getting random object forn WordList
    const ranObject = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObject.word;

    maxGues = 8; incorrect = []; correct = [];

    hint.innerHTML = ranObject.hint;
    guesleft.innerText = maxGues;
    worngLetter.innerText = incorrect

    let html = '';

    for (let i = 0; i < word.length; i++) {
        html += ` <input type="text" disabled value="">`;
    };

    inputs.innerHTML = html;
};

randonWords();

const initGame = e => {
    let key = e.target.value;

    if (key.match(/^[A-Za-z]+$/) && !incorrect.includes(` ${key} `) && !correct.includes(key)) {

        if (word.includes(key)) {

            for (let i = 0; i < word.length; i++) {

                if (word[i] === key) {
                    correct.push(key)
                    inputs.querySelectorAll('input')[i].value = key;
                };
            };
        } else {
            maxGues--;
            incorrect.push(` ${key} `)
        };
        guesleft.innerText = maxGues;
        worngLetter.innerText = incorrect;
    };
    typingInputs.value = '';
    if (correct.length === word.length) {

        alert(`Congrats! Yout Found the Word ${word.toUpperCase()} `);
        randonWords();
    } else if (maxGues < 1) {
        alert('Game Over !!');

        for (let i = 0; i < word.length; i++) {

            inputs.querySelectorAll('input')[i].value = word[i];
        };
    }
};

resetButton.addEventListener('click', randonWords);
typingInputs.addEventListener('input', initGame)
document.addEventListener('keydown', () => typingInputs.focus())