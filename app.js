// PWA Service Worker

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.register("./sw.js");
// }

// Data storage
let markedDates = {};

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

document.addEventListener("click", (e) => {
  const d = e.target;

  if (d.classList.contains("daynum")) {
    if (currentClr && d.classList.length <= 2) {
      d.classList.toggle(currentClr);
      d.style.background = `linear-gradient(-45deg, ${
        colors[d.classList[1]]
      } 49%, ${colors[d.classList[2]]} 51%)`;
    } else if (!currentClr) {
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

outputCal();

// Tim
const thisIsANewDay = (day) => {
  const date = new Date(item);
  let dateToMark =
    markedDates[`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`];

  if (!dateToMark) {
    markedDates[`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`] =
      "clrRed";
  } else {
    markedDates[`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`] =
      "clrRed" + " " + dateToMark;
  }
};

const fileSelector = document.getElementById("file-selector");
fileSelector.addEventListener("change", (event) => {
  const fileList = event.target.files;
  readFile(fileList[0]);
});

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

const timeoScraper = () => {
  let todayFound = false;
  document.querySelectorAll(".mat-card").forEach((day) => {
    if (day.querySelector(".is-today")) {
      todayFound = true;
    }

    if (day.style.backgroundColor === "white" && todayFound) {
      console.log(day.id);
      console.log(new Date(day.id));
    }
  });
};



// Text actions

const btnAddText = document.querySelector('button.addText');
const newTextForm = document.querySelector('form.newTextForm');

btnAddText.addEventListener('click', e => {
  btnAddText.classList.toggle('active');
  newTextForm.classList.toggle('text-form-visible');
  
})