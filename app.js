// PWA Service Worker

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.register("./sw.js");
// }

// Data storage
let markedDates = {};
let commentedDates = {};

const saveDate = () => {
  document.querySelectorAll(".daynum").forEach((item) => {
    if (item.classList.length > 1) {
      markedDates[item.dataset.date] =
        [item.classList[1]] +
        " " +
        [item.classList[2]] +
        " " +
        [item.classList[3]];
    } else if (markedDates[item.dataset.date]) {
      delete markedDates[item.dataset.date];
    }
  });
  localStorage.setItem("markedDates", JSON.stringify(markedDates));
};

// Erase data from Local Storage
const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  markedDates = {};
  commentedDates = {};
  localStorage.clear();
});
//

let currentClr = null;

const clrOptions = document.querySelectorAll(".clrOption");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

btnPrev.addEventListener("click", (e) => {
  date.setMonth(date.getMonth() - 1);
  outputCal();

  btnPrev.classList.add("anim-prev");
  setTimeout(() => {
    btnPrev.classList.remove("anim-prev");
  }, 300);
});

btnNext.addEventListener("click", (e) => {
  date.setMonth(date.getMonth() + 1);
  outputCal();

  btnNext.classList.add("anim-next");
  setTimeout(() => {
    btnNext.classList.remove("anim-next");
  }, 300);
});

window.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowLeft') {
    date.setMonth(date.getMonth() - 1);
  outputCal();

  btnPrev.classList.add("anim-prev");
  setTimeout(() => {
    btnPrev.classList.remove("anim-prev");
  }, 300);
  }
});

window.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowRight') {
    date.setMonth(date.getMonth() + 1);
  outputCal();

  btnNext.classList.add("anim-next");
  setTimeout(() => {
    btnNext.classList.remove("anim-next");
  }, 300);
  }
});

document.addEventListener("click", (e) => {
  const d = e.target;

  if (d.classList.contains("daynum")) {
    if (addingNewText && newTextForm.newtext.value.length > 0) {
      console.log(newTextForm.newtext.value);
      d.dataset.comment = newTextForm.newtext.value;
      commentedDates[d.dataset.date] = d.dataset.comment;
      localStorage.setItem("commentedDates", JSON.stringify(commentedDates));
      addingNewText = false;
      btnAddText.classList.remove("active");
      movingRow.classList.remove("textInputMode");
      newTextForm.reset();
      return;
    }

    if (
      currentClr &&
      d.classList.length <= 2 &&
      !document.querySelector(".textInputMode")
    ) {
      d.classList.toggle(currentClr);
      d.style.background = `linear-gradient(-45deg, ${
        colors[d.classList[1]]
      } 49%, ${colors[d.classList[2]]} 51%)`;
    } else if (!currentClr && !document.querySelector(".textInputMode")) {
      d.classList.value = "daynum";
      d.style.background = "";
    }

    saveDate();
  }

  if (d.classList.contains("clrOption")) {
    clrOptions.forEach((item) => item.classList.remove("clrOption--current"));
    if (currentClr === d.dataset.clr) {
      currentClr = null;
    } else {
      currentClr = d.dataset.clr;
      d.classList.add("clrOption--current");
    }
  }
});

// Colors
const colors = {
  clrGray: "#6b7280",
  clrRed: "#ef4444",
  clrYellow: "#f59e0b",
  clrGreen: "#10b981",
  clrBlue: "#3b82f6",
  clrPurple: "#7c3aed",
  clrPink: "#ec4899",
};

//
// Date management
const date = new Date();

const outputCal = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".cal-body-daynums");
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
  // Modify next line to set week's first day //
  const firstDayIndex = date.getDay() - 1;

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  let nextDays;
  if (date.getDay() === 0) {
    nextDays = 7 - lastDayIndex - 1;
  } else {
    nextDays = 7 - lastDayIndex;
  }

  // Months in english
  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const daynames = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  const month = date.getMonth();

  document.querySelector(".cal-header-month").innerHTML =
    months[date.getMonth()];
  document.querySelector(".cal-header-year").innerHTML = date.getFullYear();

  let days = [];

  for (let x = firstDayIndex; x > 0; x--) {
    const pPast = document.createElement("P");
    pPast.classList.add("pastdaynum");
    pPast.innerHTML = prevLastDay - x + 1;
    days.push(pPast);
  }

  for (let i = 1; i <= lastDay; i++) {
    const pCurrent = document.createElement("P");

    pCurrent.dataset.date = `${date.getFullYear()}-${date.getMonth()}-${i}`;

    console.log(commentedDates[pCurrent.dataset.date]);

    if (commentedDates[pCurrent.dataset.date]) {
      pCurrent.dataset.comment = commentedDates[pCurrent.dataset.date];
    }

    if (markedDates[pCurrent.dataset.date]) {
      pCurrent.classList.value =
        "daynum" + " " + markedDates[pCurrent.dataset.date];
    } else {
      pCurrent.classList.add("daynum");
    }

    if (pCurrent.classList.length === 3) {
      pCurrent.style.background = `linear-gradient(-45deg, ${
        colors[pCurrent.classList[1]]
      } 49%, ${colors[pCurrent.classList[2]]} 51%)`;
    } else if (pCurrent.classList.length === 4) {
      pCurrent.style.background = `linear-gradient(-45deg, ${
        colors[pCurrent.classList[1]]
      } 32%, ${colors[pCurrent.classList[2]]} 34% 65%, ${
        colors[pCurrent.classList[3]]
      } 67%)`;
    }

    pCurrent.innerHTML = i;
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      pCurrent.id = "today";
    }

    days.push(pCurrent);
  }

  for (let j = 1; j <= nextDays; j++) {
    if (nextDays !== 7) {
      const pNext = document.createElement("P");
      pNext.classList.add("futuredaynum");
      pNext.innerHTML = j;
      days.push(pNext);
    }
  }

  monthDays.innerHTML = "";
  days.forEach((day) => monthDays.append(day));
};

// Initial Calendar Output
if (localStorage.getItem("markedDates")) {
  markedDates = JSON.parse(
    localStorage.getItem("markedDates", JSON.stringify(markedDates))
  );
}
if (localStorage.getItem("commentedDates")) {
  commentedDates = JSON.parse(
    localStorage.getItem("commentedDates", JSON.stringify(commentedDates))
  );
}

outputCal();

// Tim
const thisIsANewDay = (item) => {
  const date = new Date(item);
  let dateToMark =
    markedDates[`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`];

  if (!dateToMark) {
    markedDates[`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`] =
      "clrRed";
  } else if (!dateToMark.includes("clrRed")) {
    markedDates[`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`] =
      "clrRed" + " " + dateToMark;
    console.log("weshweshsshssh");
  }
};

// const fileSelector = document.getElementById("file-selector");
// fileSelector.addEventListener("change", (event) => {
//   const fileList = event.target.files;
//   readFile(fileList[0]);
// });

function readFile(file) {
  const reader = new FileReader();
  reader.readAsText(file);

  reader.onload = function () {
    JSON.parse(reader.result).forEach((item) => {
      thisIsANewDay(item);
    });
    localStorage.setItem("markedDates", JSON.stringify(markedDates));
    outputCal();
  };

  reader.onerror = function () {
    console.log(reader.error);
  };
}

const inputFromTim = document.getElementById("inputFromTim");

inputFromTim.addEventListener("submit", (e) => {
  e.preventDefault();

  let userStr = e.target.dataFromTim.value;

  if (userStr[0] === "[" && userStr.charAt(userStr.length - 1) === "]") {
    const importedData = JSON.parse(userStr);

    e.target.reset();

    importedData.forEach((date) => {
      thisIsANewDay(date);
    });

    localStorage.setItem("markedDates", JSON.stringify(markedDates));
    outputCal();

    console.log("Données correctement importées !");
  } else {
    console.log("Ces données ne sont pas valides...");
  }
});

// Text actions

const btnAddText = document.querySelector("button.addText");
const movingRow = document.querySelector(".moving-row");
const newTextForm = document.querySelector(".newTextForm");

btnAddText.addEventListener("click", (e) => {
  btnAddText.classList.toggle("active");
  movingRow.classList.toggle("textInputMode");
});

let addingNewText = false;

newTextForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (newTextForm.newtext.value.length > 0) {
    addingNewText = true;
    console.log(e.target.newtext.value);
  }
});

// Timeo Scraper Module
const timeoScraper = () => {
  let arrayOfWorkdays = [];
  document.querySelectorAll(".mat-card").forEach((day) => {
    if (day.style.backgroundColor === "white") {
      arrayOfWorkdays.push(day.id);
    }
  });

  console.log("Les dates ci-dessous sont prêtes à être copiées : ");
  return arrayOfWorkdays;
};
