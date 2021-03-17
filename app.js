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
      if (item !== "daynum" && item !== "today" && item !== currentClr) {
        e.target.classList.remove(item);
      }
    });
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
  const firstDayIndex = date.getDay();
  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();
  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = date.getMonth();

  document.querySelector(".cal-header-month").innerHTML =
    months[date.getMonth()];
  document.querySelector(".cal-header-day").innerHTML = date.toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<p class="pastdaynum">${prevLastDay - x + 1}</p>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<p class="daynum today">${i}</p>`;
    } else {
      days += `<p class="daynum">${i}</p>`;
    }
    monthDays.innerHTML = days;
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="futuredaynum">${j}</div>`;
    monthDays.innerHTML = days;
  }
};

// Initial Calendar Output
outputCal();
