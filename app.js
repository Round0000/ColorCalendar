// PWA Service Worker

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.register("./sw.js");
// }

// UI
const clrOptions = document.querySelectorAll(".clrOption");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const detailsDisplay = document.querySelector(".detailsDisplay");
const btnViewDetails = document.querySelector(".viewDetails");
const btnOpenSettings = document.querySelector(".openSettings");
const btnAddText = document.querySelector("button.addText");
const movingRow = document.querySelector(".moving-row");
const newTextForm = document.querySelector(".newTextForm");
const detailsTitle = document.querySelector(".detailsDisplay h2");
const detailsText = document.querySelector(".detailsDisplay p");

// Data storage
let userData = {
  marks: {},
  comments: {},
  timColor: "clrYellow",
};

const saveDate = () => {
  document.querySelectorAll(".daynum").forEach((item) => {
    if (item.classList.length > 1) {
      userData.marks[item.dataset.date] =
        [item.classList[1]] +
        " " +
        [item.classList[2]] +
        " " +
        [item.classList[3]];
    } else if (userData.marks[item.dataset.date]) {
      delete userData.marks[item.dataset.date];
    }
  });
  localStorage.setItem("userData", JSON.stringify(userData));
};

// Erase data from Local Storage
const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  if (
    confirm(
      "Êtes-vous sûr de vouloir effacer toutes les données du calendrier?"
    )
  ) {
    userData.marks = {};
    userData.comments = {};
    userData.timColor = "clrRed";
    document.querySelector(".admin").classList.add("d-none");
    btnOpenSettings.classList.remove("active");

    localStorage.setItem("userData", JSON.stringify(userData));
    outputCal();
  }
});
//

let currentClr = null;

btnPrev.addEventListener("click", (e) => {
  date.setMonth(date.getMonth() - 1);
  outputCal();

  btnPrev.classList.add("anim-prev");
  setTimeout(() => {
    btnPrev.classList.remove("anim-prev");
  }, 300);

  btnViewDetails.classList.remove("active");
  detailsViewMode = false;
  if (!detailsViewMode) {
    detailsDisplay.classList.add("d-none");
  }
});

btnNext.addEventListener("click", (e) => {
  date.setMonth(date.getMonth() + 1);
  outputCal();

  btnNext.classList.add("anim-next");
  setTimeout(() => {
    btnNext.classList.remove("anim-next");
  }, 300);

  btnViewDetails.classList.remove("active");
  detailsViewMode = false;
  if (!detailsViewMode) {
    detailsDisplay.classList.add("d-none");
  }
});

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    date.setMonth(date.getMonth() - 1);
    outputCal();

    btnPrev.classList.add("anim-prev");
    setTimeout(() => {
      btnPrev.classList.remove("anim-prev");
    }, 300);

    btnViewDetails.classList.remove("active");
    detailsViewMode = false;
    if (!detailsViewMode) {
      detailsDisplay.classList.add("d-none");
    }
  }
});

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") {
    date.setMonth(date.getMonth() + 1);
    outputCal();

    btnNext.classList.add("anim-next");
    setTimeout(() => {
      btnNext.classList.remove("anim-next");
    }, 300);

    btnViewDetails.classList.remove("active");
    detailsViewMode = false;
    if (!detailsViewMode) {
      detailsDisplay.classList.add("d-none");
    }
  }
});

document.addEventListener("click", (e) => {
  if (e.target.querySelector(".container")) {
    detailsDisplay.classList.add("d-none");
  }
});

document.addEventListener("click", (e) => {
  const d = e.target;

  if (d.classList.contains("daynum")) {
    if (addingNewText && newTextForm.newtext.value.length > 0) {
      d.dataset.comment = newTextForm.newtext.value.trim();
      userData.comments[d.dataset.date] = d.dataset.comment;
      localStorage.setItem("userData", JSON.stringify(userData));
      addingNewText = false;
      btnAddText.classList.remove("active");
      movingRow.classList.remove("textInputMode");
      newTextForm_instruction.style.opacity = "0";
      newTextForm_instruction.style.height = "0";
      newTextForm.reset();
      return;
    }

    if (detailsViewMode) {
      if (d.dataset.comment) {
        currentDateDisplay = d.dataset.date;
        detailsDisplay.classList.remove("d-none");
        detailsTitle.innerText = `${
          document.querySelector(`.daynum[data-date="${currentDateDisplay}"]`)
            .textContent
        } ${document.querySelector(".cal-header-month").textContent} ${
          document.querySelector(".cal-header-year").textContent
        }`;
        detailsText.innerText = d.dataset.comment;
      }
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
    btnViewDetails.classList.remove("active");
    detailsViewMode = false;
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

// Months and days names
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

const monthsShort = [
  "Janv.",
  "Févr.",
  "Mars",
  "Avr.",
  "Mai",
  "Juin",
  "Juil.",
  "Août",
  "Sept.",
  "Oct.",
  "Nov.",
  "Déc.",
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
  const firstDayIndex = date.getDay() - 1 < 0 ? 6 : date.getDay() - 1;

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

  const month = date.getMonth();

  document.querySelector(".cal-header-month").innerHTML = months[month];
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

    if (userData.comments[pCurrent.dataset.date]) {
      pCurrent.dataset.comment = userData.comments[pCurrent.dataset.date];
    }

    if (userData.marks[pCurrent.dataset.date]) {
      pCurrent.classList.value =
        "daynum" + " " + userData.marks[pCurrent.dataset.date];
    } else {
      pCurrent.classList.add("daynum");
    }

    if (pCurrent.classList.contains("clrTim")) {
      pCurrent.classList.replace("clrTim", userData.timColor);
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
if (localStorage.getItem("userData")) {
  userData = JSON.parse(
    localStorage.getItem("userData", JSON.stringify(userData))
  );
}

// Next lines to be deleted, old data structure
if (localStorage.getItem("markedDates")) {
  userData.marks = JSON.parse(
    localStorage.getItem("markedDates", JSON.stringify(userData.marks))
  );
}

outputCal();

// Tim
const thisIsANewDay = (item) => {
  const date = new Date(item);
  let dateToMark =
    userData.marks[
      `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    ];

  if (!dateToMark) {
    userData.marks[
      `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    ] = "clrTim";
  } else if (!dateToMark.includes("clrTim")) {
    userData.marks[
      `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    ] = "clrTim" + " " + dateToMark;
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
    if (JSON.parse(reader.result)) {
      console.log("Importation réussie !");

      localStorage.setItem("userData", reader.result);
      userData = JSON.parse(
        localStorage.getItem("userData", JSON.stringify(userData))
      );
    }

    outputCal();
  };

  reader.onerror = function () {
    console.log(reader.error);
  };
}

const inputFromTim = document.getElementById("inputFromTim");

inputFromTim.addEventListener("submit", (e) => {
  e.preventDefault();

  let userStr = e.target.dataFromTim.value.replace(/\s/g, "");

  if (userStr[0] === "[" && userStr.charAt(userStr.length - 1) === "]") {
    const importedData = JSON.parse(userStr);

    let yearOfImport = userStr.slice(2, 6);

    for (const key in userData.marks) {
      if (
        userData.marks[key].includes("clrTim") &&
        key.includes(yearOfImport)
      ) {
        let currData = userData.marks[key].split("clrTim");
        let newData = currData[1].trim();
        userData.marks[key] = newData;
      }
    }

    e.target.reset();

    importedData.forEach((date) => {
      thisIsANewDay(date);
    });

    localStorage.setItem("userData", JSON.stringify(userData));
    outputCal();

    console.log("Données correctement importées !");
  } else {
    console.log("Ces données ne sont pas valides...");
  }
});

// Text actions

btnAddText.addEventListener("click", (e) => {
  clrOptions.forEach((item) => item.classList.remove("clrOption--current"));
  btnViewDetails.classList.remove("active");
  detailsViewMode = false;
  btnAddText.classList.toggle("active");
  movingRow.classList.toggle("textInputMode");
  newTextForm_instruction.style.opacity = "1";
  newTextForm_instruction.style.height = "auto";
});

let addingNewText = false;

newTextForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (newTextForm.newtext.value.length > 0) {
    addingNewText = true;
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

// View Details
let detailsViewMode = false;
let currentDateDisplay;

btnViewDetails.addEventListener("click", (e) => {
  clrOptions.forEach((item) => item.classList.remove("clrOption--current"));
  btnAddText.classList.remove("active");
  movingRow.classList.remove("textInputMode");
  btnViewDetails.classList.toggle("active");
  detailsViewMode = !detailsViewMode;
  if (!detailsViewMode) {
    detailsDisplay.classList.add("d-none");
  }
});

const detailsDelete = document.getElementById("removeDetails");
const detailsSavequit = document.getElementById("savequitDetails");

detailsDelete.addEventListener("click", (e) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer cette note?")) {
    delete userData.comments[currentDateDisplay];
    detailsDisplay.classList.add("d-none");
    localStorage.setItem("userData", JSON.stringify(userData));
    outputCal();
  }
});

detailsSavequit.addEventListener("click", (e) => {
  userData.comments[currentDateDisplay] = detailsText.innerText;
  document.querySelector(
    `.daynum[data-date="${currentDateDisplay}"]`
  ).dataset.comment = detailsText.innerText;
  localStorage.setItem("userData", JSON.stringify(userData));
  detailsDisplay.classList.add("d-none");
});

btnOpenSettings.addEventListener("click", (e) => {
  document.querySelector(".admin").classList.toggle("d-none");
  btnOpenSettings.classList.toggle("active");
  document.querySelectorAll(".timClrOpt--current").forEach((item) => {
    item.classList.remove("timClrOpt--current");
  });
  document
    .querySelector(`.timClrOpt[data-clr="${userData.timColor}"]`)
    .classList.add("timClrOpt--current");
});

document.addEventListener('keyup', e => {
  if (e.key === "Escape") {
    document.querySelector(".admin").classList.add("d-none");
  }
})

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("timClrOpt")) {
    userData.timColor = e.target.dataset.clr;
    localStorage.setItem("userData", JSON.stringify(userData));
    document.querySelectorAll(".timClrOpt--current").forEach((item) => {
      item.classList.remove("timClrOpt--current");
    });

    document
      .querySelector(`.timClrOpt[data-clr="${userData.timColor}"]`)
      .classList.add("timClrOpt--current");
  }
});

const btnCloseAdmin = document.getElementById("closeAdmin");
btnCloseAdmin.addEventListener("click", (e) => {
  document.querySelector(".admin").classList.add("d-none");
  btnOpenSettings.classList.remove("active");
  outputCal();
});

// Export User Data

function exportData() {
  let data = JSON.stringify(userData);
  let hiddenElement = document.createElement("a");

  hiddenElement.href = "data:attachment/text," + encodeURI(data);
  hiddenElement.target = "_blank";
  hiddenElement.download = `export-ColorCalendar.json`;
  hiddenElement.click();
}

const exportBtn = document.getElementById("export");

exportBtn.addEventListener("click", (e) => {
  exportData();
});
