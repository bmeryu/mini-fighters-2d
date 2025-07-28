// Obtención de elementos del DOM
const splashScreen = document.getElementById('splash-screen');
const continueButton = document.getElementById('continue-button');
const gameWrapper = document.getElementById('game-wrapper');
const mainHeader = document.getElementById('main-header');
const gameHeader = document.getElementById('game-header');
const mainTitle = document.getElementById('main-title');
const gameUiTop = document.getElementById('game-ui-top');

const canvas = document.getElementById('gameCanvas');
…    backgroundMusic = new Audio('audio/playbackbattle.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
});
