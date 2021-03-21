// Data storage
let markedDates = {};

const saveDate = () => {
  document.querySelectorAll(".daynum").forEach((item) => {
    if (item.classList[1]) {
      markedDates[item.dataset.date] = item.classList[1];
    } else if (markedDates[item.dataset.date]) {
      delete markedDates[item.dataset.date];
    }
  });
  localStorage.setItem("markedDates", JSON.stringify(markedDates));
};

// Erase data from Local Storage
const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  localStorage.clear();
});
//

let currentClr = "clrGray";

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
  if (e.target.classList.contains("daynum")) {
    e.target.classList.toggle(currentClr);

    e.target.classList.forEach((item) => {
      if (item !== "daynum" && item !== currentClr) {
        e.target.classList.remove(item);
      }
    });
    saveDate();
  }

  if (e.target.classList.contains("clrOption")) {
    currentClr = e.target.dataset.clr;
    clrOptions.forEach((item) => item.classList.remove("clrOption--current"));
    e.target.classList.add("clrOption--current");
  }
});

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
    pCurrent.classList.add("daynum");
    pCurrent.dataset.date = `${date.getFullYear()}-${date.getMonth()}-${i}`;

    if (markedDates[pCurrent.dataset.date]) {
      pCurrent.classList.add(markedDates[pCurrent.dataset.date]);
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
    const pNext = document.createElement("P");
    pNext.classList.add("futuredaynum");
    pNext.innerHTML = j;
    days.push(pNext);
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
