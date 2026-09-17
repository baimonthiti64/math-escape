const rooms = [
  {
    title: "Digital Lock",
    story: "ประตูแรกถูกล็อกด้วยระบบคณิตศาสตร์",
    question: "18 + 24 ÷ 6 × 2 = ?",
    answer: 26,
    hint: "ทำ ÷ และ × ก่อน แล้วจึงบวก"
  },
  {
    title: "Secret Code",
    story: "ตัวเลขกำลังเพิ่มขึ้นตามรูปแบบบางอย่าง",
    question: "2, 4, 8, 16, ?",
    answer: 32,
    hint: "ลองดูว่าตัวเลขแต่ละตัวเพิ่มขึ้นกี่เท่า"
  },
  {
    title: "Laboratory",
    story: "ระบบทดลองต้องการค่าของ X",
    question: "3x + 6 = 21 → x = ?",
    answer: 5,
    hint: "ย้าย 6 ออกก่อน แล้วค่อยหารด้วย 3"
  },
  {
    title: "Final Lock",
    story: "ประตูสุดท้ายกำลังรอรหัสจากคุณ",
    question: "6² + 4² = ?",
    answer: 52,
    hint: "6² = 36 และ 4² = 16"
  }
];

let currentRoom = 0;
let score = 0;
let lives = 3;
let timeLeft = 120;
let timer = null;
let hintUsed = false;


// ===============================
// ELEMENTS
// ===============================

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const victoryScreen = document.getElementById("victoryScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submitBtn");
const hintBtn = document.getElementById("hintBtn");
const restartBtn = document.getElementById("restartBtn");
const retryBtn = document.getElementById("retryBtn");

const timerText = document.getElementById("timer");
const livesText = document.getElementById("lives");
const scoreText = document.getElementById("score");

const roomNumber = document.getElementById("roomNumber");
const roomTitle = document.getElementById("roomTitle");
const story = document.getElementById("story");
const question = document.getElementById("question");
const answerInput = document.getElementById("answer");
const message = document.getElementById("message");

const finalScore = document.getElementById("finalScore");


// ===============================
// SHOW SCREEN
// ===============================

function showScreen(screen) {
  startScreen.classList.remove("active");
  gameScreen.classList.remove("active");
  victoryScreen.classList.remove("active");
  gameOverScreen.classList.remove("active");

  screen.classList.add("active");
}


// ===============================
// START GAME
// ===============================

function startGame() {

  currentRoom = 0;
  score = 0;
  lives = 3;
  timeLeft = 120;

  clearInterval(timer);

  updateStats();
  loadRoom();

  showScreen(gameScreen);

  timer = setInterval(function () {

    timeLeft--;

    updateStats();

    if (timeLeft <= 0) {
      gameOver();
    }

  }, 1000);
}


// ===============================
// LOAD ROOM
// ===============================

function loadRoom() {

  const room = rooms[currentRoom];

  roomNumber.textContent = currentRoom + 1;
  roomTitle.textContent = room.title;
  story.textContent = room.story;
  question.textContent = room.question;

  answerInput.value = "";
  message.textContent = "";

  hintUsed = false;

  answerInput.focus();
}


// ===============================
// UPDATE STATS
// ===============================

function updateStats() {

  timerText.textContent = timeLeft;
  livesText.textContent = lives;
  scoreText.textContent = score;

}


// ===============================
// CHECK ANSWER
// ===============================

function checkAnswer() {

  const userAnswer = Number(answerInput.value);
  const correctAnswer = rooms[currentRoom].answer;

  if (answerInput.value.trim() === "") {

    message.textContent = "⚠️ กรุณาใส่คำตอบก่อน";
    return;

  }


  if (userAnswer === correctAnswer) {

    score += 100;

    message.textContent = "✅ ถูกต้อง! ประตูเปิดแล้ว";

    updateStats();

    setTimeout(function () {

      currentRoom++;

      if (currentRoom >= rooms.length) {

        victory();

      } else {

        loadRoom();

      }

    }, 700);


  } else {

    lives--;

    score = Math.max(0, score - 20);

    message.textContent = "❌ ยังไม่ถูก ลองใหม่อีกครั้ง";

    updateStats();

    answerInput.value = "";
    answerInput.focus();


    if (lives <= 0) {

      setTimeout(function () {
        gameOver();
      }, 500);

    }

  }

}


// ===============================
// HINT
// ===============================

function useHint() {

  if (hintUsed) {

    message.textContent = "💡 คุณใช้คำใบ้ไปแล้วในห้องนี้";
    return;

  }

  hintUsed = true;

  score = Math.max(0, score - 30);

  message.textContent = "💡 " + rooms[currentRoom].hint;

  updateStats();

}


// ===============================
// VICTORY
// ===============================

function victory() {

  clearInterval(timer);

  const bonus = timeLeft * 5;

  score += bonus;

  finalScore.textContent = score;

  showScreen(victoryScreen);

}


// ===============================
// GAME OVER
// ===============================

function gameOver() {

  clearInterval(timer);

  showScreen(gameOverScreen);

}


// ===============================
// BUTTON EVENTS
// ===============================

startBtn.addEventListener("click", startGame);

submitBtn.addEventListener("click", checkAnswer);

hintBtn.addEventListener("click", useHint);

restartBtn.addEventListener("click", startGame);

retryBtn.addEventListener("click", startGame);


// ===============================
// PRESS ENTER TO ANSWER
// ===============================

answerInput.addEventListener("keydown", function (event) {

  if (event.key === "Enter") {

    checkAnswer();

  }

});
