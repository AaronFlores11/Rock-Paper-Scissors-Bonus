const d = document,
  $controlsEasy = d.querySelector(".section-controls"),
  $controlsHard = d.querySelector(".section-controls-hard"),
  $containerResult = d.querySelector(".section-result"),
  $sectionMsg = d.querySelector(".result-container"),
  $optionPlayer = d.getElementById("player"),
  $imgUser = d.getElementById("user"),
  $optionComputer = d.getElementById("computer-container"),
  $imgComputer = d.getElementById("machine"),
  $selectOptions = d.querySelector(".dashboard-options "),
  $modal = d.querySelector(".modal-container "),
  $imgModal = d.getElementById("img-modal"),
  $header = d.querySelector("header"),
  $buttonSelect = d.querySelectorAll(".btn"),
  $spanComputer = d.querySelector(".game-2"),
  $countScore = d.getElementById("count-score"),
  $titleResult = d.getElementById("title-result"),
  $footer = d.querySelector("footer");

let typeSelect;

$buttonSelect.forEach((el) => {
  el.addEventListener("click", (e) => {
    let idItem = el.id,
      idComputer = getOptionRandom();
    getTypeGame() === "Hard"
      ? $controlsHard.classList.add("hidden")
      : $controlsEasy.classList.add("hidden");
    $sectionMsg.style.opacity = 0;
    cleanComputer();
    changeOption(idItem);
    selectComputer(idComputer);
    verifyWinner(idItem, idComputer);
  });
});

const getTypeGame = () => {
  let value = localStorage.getItem("type");
  return value;
};
const cleanComputer = () => {
  $optionComputer.id = "computer-container";
  $spanComputer.classList.add("hidden");
  $imgComputer.src = "";
};
const changeOption = (item) => {
  $containerResult.classList.remove("hidden");
  $optionPlayer.id = item;
  $imgUser.src = `../assets/icon-${item}.svg`;
};

const getOptionRandom = () => {
  let options = ["paper", "rock", "scissors"];
  let number = Math.floor(Math.random() * 2);

  return options[number];
};

const verifyWinner = (user, home) => {
  if (user === home) {
    setDataWinner("TIE", 0);
  } else if (user === "rock" && home === "scissors") {
    setDataWinner("YOU WINNER", 1);
  } else if (user === "scissors" && home === "paper") {
    setDataWinner("YOU WINNER", 1);
  } else if (user === "paper" && home === "rock") {
    setDataWinner("YOU WINNER", 1);
  } else if (user === "rock" && home === "lizard") {
    setDataWinner("YOU WINNER", 1);
  } else if (user === "lizard" && home === "spock") {
    setDataWinner("YOU WINNER", 1);
  } else if (user === "spock" && home === "scissors") {
    setDataWinner("YOU WINNER", 1);
  } else if (user === "scissors" && home === "lizard") {
    setDataWinner("YOU WINNER", 1);
  } else if (user === "lizard" && home === "paper") {
    setDataWinner("YOU WINNER", 1);
  } else if (user === "paper" && home === "spock") {
    setDataWinner("YOU WINNER", 1);
  } else if (user === "spock" && home === "rock") {
    setDataWinner("YOU WINNER", 1);
  } else {
    setDataWinner("YOU LOSE", 0);
  }
};

const setDataWinner = (msg, quantity) => {
  setTimeout(() => {
    let number = Number($countScore.textContent);
    $titleResult.textContent = msg;
    $countScore.textContent = number + quantity;
    $sectionMsg.style.opacity = 1;
  }, 1500);
};

const selectComputer = (item) => {
  changeDataComponents(item);
};

const changeDataComponents = (data) => {
  setTimeout(() => {
    $spanComputer.classList.remove("hidden");
    $optionComputer.id = data;
    $optionComputer.classList.add("animated-computer");
    $imgComputer.src = `../assets/icon-${data}.svg`;
  }, 1000);
};

const showAll = (option) => {
  $selectOptions.classList.add("hidden");
  $header.classList.remove("hidden");
  $footer.classList.remove("hidden");
  option.classList.remove("hidden");
};

const hiddenAll = () => {
  $selectOptions.classList.remove("hidden");
  $containerResult.classList.add("hidden");
  $optionComputer.classList.remove("animated-computer");
  $sectionMsg.style.opacity = 0;
  $header.classList.add("hidden");
  $footer.classList.add("hidden");
  getTypeGame() === "Hard"
    ? $controlsHard.classList.add("hidden")
    : $controlsEasy.classList.add("hidden");
};

d.addEventListener("click", (e) => {
  if (e.target.matches("#btn-easy")) {
    localStorage.setItem("type", "Easy");
    showAll($controlsEasy);
    $imgModal.src = "./assets/image-rules.svg";
  } else if (e.target.matches("#btn-hard")) {
    localStorage.setItem("type", "Hard");
    showAll($controlsHard);
    $imgModal.src = "../assets/image-rules-bonus.svg";
  } else if (e.target.matches("#btn-rules")) {
    $modal.classList.remove("hidden");
  } else if (e.target.matches("#img-close")) {
    $modal.classList.add("hidden");
  } else if (e.target.matches("#btn-home")) {
    hiddenAll();
  } else if (e.target.matches("#new-game")) {
    $containerResult.classList.add("hidden");
    $optionComputer.classList.remove("animated-computer");
    $sectionMsg.style.opacity = 0;
    getTypeGame() === "Hard"
      ? $controlsHard.classList.remove("hidden")
      : $controlsEasy.classList.remove("hidden");
  }
});
