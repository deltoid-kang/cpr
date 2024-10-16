import { scenarioData } from "./data.js";
import { fairyData } from "./data.js";

const chatCont = document.querySelector(".container .content .chat-cont");
const chat = document.querySelector(".container .content .chat-cont span");
const scenario_contents = document.querySelectorAll(
  ".container .content .scenario"
);
const fairyCont = document.querySelector(".container .content .guide-cont");
const fairyCont_word = document.querySelector(
  ".container .content .guide-cont .word"
);
const NPC = document.querySelectorAll(
  ".container .content .chat-cont .npc img"
);

let npc_type = 0;

let session = 0;
let progress = 0;
let session_state = true;
let progress_state = true;
chat.innerHTML = scenarioData[session][progress].word;

let fProgress = 0;
let fairyWord = fairyData[fProgress].word;
let fairy_i = 0;

// 요정이 안내하는 말
function fairyText() {
  if (fairyData[fProgress].xy >= fairy_i) fairy_i += 1;
  else {
    fairy_i = 1;
    fProgress += 1;
    fairyWord = fairyData[fProgress].word;
  }
  fairyCont_word.innerHTML = fairyWord;

  if (fairyWord === "") fairyCont.classList.remove("active");
  else fairyCont.classList.add("active");
}
fairyText();

function scenarioContent() {
  if (!progress_state) return;

  if (!session_state) {
    if (progress >= scenarioData[session].length - 1) {
      if (session == 1) cprScript0();
      if (session == 2) cprScript1();
      if (session == 3) cprScript2();
      if (session == 4) cprScript3();
      if (session == 5) cprScript4();
    }
    return;
  }
  scenario_contents[session].classList.remove("active");
  session += 1;
  progress = -1;
  scenario_contents[session].classList.add("active");

  nextchat();

  session_state = false;
}

function nextchat() {
  if (progress >= scenarioData[session].length - 1) {
    if (session >= scenarioData.length - 1) return;

    scenarioContent();
  } else {
    progress += 1;
    fairyText();
  }
  chat.innerHTML = scenarioData[session][progress].word;

  NPC[npc_type].classList.remove("active");
  npc_type = scenarioData[session][progress].npc;
  NPC[npc_type].classList.add("active");
}

// 다음 대화로 이동
chatCont.addEventListener("click", nextchat);

// **************** cpr ****************
// 현장 안전 확인
let rocks_1 = 0;
const rocks = document.querySelectorAll(
  ".container .content .cpr-cont.sc-0 .rock-list img"
);
function removeRock(event) {
  event.target.classList.add("remove");
  rocks_1 += 1;
  if (rocks_1 === 3) {
    session_state = true;
    scenarioContent();
  }
}
function cprScript0() {
  document
    .querySelector(".container .content .cpr-cont.sc-0 .rock-list")
    .classList.add("active");
}
rocks[0].addEventListener("click", function (event) {
  removeRock(event);
});
rocks[1].addEventListener("click", function (event) {
  removeRock(event);
});
rocks[2].addEventListener("click", function (event) {
  removeRock(event);
});

// 환자 의식 확인
function cprScript1() {
  document
    .querySelector(".container .content .cpr-cont.sc-1 .guide")
    .classList.add("active");
}
const guide_lines = document.querySelectorAll(
  ".container .content .scenario.cpr-cont.sc-1 .guide .guide-line"
);
let shoulder_i = 0;

function shoulder(event) {
  if (event.target.classList.length !== 2) return;

  if (shoulder_i % 2 == 0) {
    guide_lines[0].classList.remove("active");
    guide_lines[1].classList.add("active");
  } else {
    guide_lines[1].classList.remove("active");
    guide_lines[0].classList.add("active");
  }
  shoulder_i += 1;

  if (shoulder_i >= 4) {
    session_state = true;
    scenarioContent();
  }
}
guide_lines[0].addEventListener("click", function (event) {
  shoulder(event);
});
guide_lines[1].addEventListener("click", function (event) {
  shoulder(event);
});

// 도움요청
function cprScript2() {
  progress_state = false;

  document
    .querySelector(".container .content .cpr-cont.sc-2 img.npc-nurce")
    .classList.add("active");

  document
    .querySelector(".container .content .cpr-cont.sc-2 img.npc-nurce.active")
    .addEventListener("click", function (event) {
      event.target.classList.add("move");

      setTimeout(() => {
        document
          .querySelector(".container .content .cpr-cont.sc-2 .codeblue")
          .classList.add("active");
      }, 2200);

      setTimeout(() => {
        progress_state = true;
        session_state = true;
        scenarioContent();
      }, 5000);
    });
}

// 호흡과 맥박 확인
const guide_lines_breath = document.querySelectorAll(
  ".container .content .cpr-cont.sc-3 .guide .guide-line"
);
function cprScript3() {
  document
    .querySelector(".container .content .cpr-cont.sc-3 .guide")
    .classList.add("active");
}
let breath_i = 0;
function breath(event) {
  if (event.target.classList.length !== 2) return;

  if (breath_i == 0) {
    guide_lines_breath[0].classList.remove("active");
    guide_lines_breath[1].classList.add("active");
  } else {
    guide_lines_breath[1].classList.remove("active");
    guide_lines_breath[0].classList.add("active");
  }
  breath_i += 1;

  if (breath_i >= 2) {
    session_state = true;
    scenarioContent();
  }
}
guide_lines_breath[0].addEventListener("click", function (event) {
  breath(event);
});
guide_lines_breath[1].addEventListener("click", function (event) {
  breath(event);
});

// 심폐소생게임
let cpr_state = true;
let cpr_i = 0;
const audio = new Audio("110BPM_BEAT.mp3");
audio.currentTime = 0;
audio.loop = true;
audio.volume = 0.5;
function cprScript4() {
  document
    .querySelector(".container .content .cpr-cont.sc-4 .cpr")
    .classList.add("active");

  audio.play();
}
const cpr_standard = document.querySelector(
  ".container .content .cpr-cont.sc-4 .cpr .standard"
);
const cpr_line = document.querySelector(
  ".container .content .cpr-cont.sc-4 .cpr .cpr-line"
);
cpr_standard.addEventListener("click", function () {
  if (cpr_state && cpr_line.offsetWidth <= 70) {
    cpr_standard.classList.add("complate");
    setTimeout(() => {
      cpr_standard.classList.remove("complate");
    }, 500);
    cpr_i += 1;

    fairyCont.classList.add("active");
    fairyCont_word.innerHTML = `성공했어요! (${cpr_i}/30)`;

    cpr_state = false;
    setTimeout(() => {
      cpr_state = true;
    }, 500);

    if (cpr_i >= 30) {
      audio.pause();

      document
        .querySelector(".container .content .cpr-cont.sc-4 .cpr")
        .classList.remove("active");
      setTimeout(() => {
        session_state = true;
        scenarioContent();
      }, 1000);
    }
  } else {
    fairyCont.classList.add("active");
    fairyCont_word.innerHTML = "타이밍을 맞춰서 다시 해봐요.";
  }
});
document
  .querySelector(".container .content .cpr-cont.sc-4 .heap")
  .addEventListener("click", function () {
    fairyCont.classList.add("active");
    fairyCont_word.innerHTML = "중앙에서 다시 해봐요.";
  });
document
  .querySelector(".container .content .cpr-cont.sc-4 .cpr .cpr-line")
  .addEventListener("click", function () {
    fairyCont.classList.add("active");
    fairyCont_word.innerHTML = "중앙에서 다시 해봐요.";
  });

//   cpr 교육자료 팝업
const PopupBtn = document.querySelector(".popup-cont .btn img.cpr");
const PopupBtnClose = document.querySelector(
  ".popup-cont .alert .content .close-btn"
);
const PopupCont = document.querySelector(".popup-cont .alert");
PopupBtn.addEventListener("click", function () {
  PopupCont.classList.add("active");
});
PopupBtnClose.addEventListener("click", function () {
  PopupCont.classList.remove("active");
});
