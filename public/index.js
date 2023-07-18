const form = document.querySelector(".form");
const main = document.querySelector(".main");
const input = document.querySelector("#array");
const sort = document.querySelector(".sort");
const create = document.querySelector(".create");
const random = document.querySelector(".random");
let id = "";
let pauseNumber = 0;
let numbers = {};

create.addEventListener("click", (e) => {
  main.innerHTML = "";
  numbers = {};
  e.preventDefault();
  let array = input.value.split(",");
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (Number(array[i]) && Number(array[i] < 100)) {
      newArray.push(Number(array[i]));
    }
  }
  createElements(newArray);

  console.log(Object.keys(numbers).length);
  sort.style.display = "block";
});

random.addEventListener("click", (e) => {
  e.preventDefault();
  let randomSize = Math.floor(Math.random() * 20);
  if (randomSize < 4) randomSize *= 4;
  main.innerHTML = "";
  let array = [];
  numbers = {};
  for (let i = 0; i < randomSize; i++) {
    array.push(Math.floor(Math.random() * 100));
  }

  createElements(array);

  console.log(Object.keys(numbers).length);
  sort.style.display = "block";
});

const createElements = (array) => {
  numbers = {};
  for (let i = 0; i < array.length; i++) {
    numbers[i] = document.createElement("div");
    numbers[i].textContent = array[i];
    numbers[i].setAttribute("class", `item item${i}`);
    numbers[i].style.height = `${array[i] * 4}px`;
    main.appendChild(numbers[i]);
  }
};

const swap = async (arr, idx1, idx2) => {
  const temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
  for (let i = 0; i < Object.keys(arr).length; i++) {
    main.appendChild(arr[i]);
  }
};

const bubbleSort = async (arr) => {
  for (let i = 0; i < Object.keys(arr).length; i++) {
    for (let j = 0; j < Object.keys(arr).length - i - 1; j++) {
      for (let k = 0; k < Object.keys(arr).length - i; k++) {
        arr[k].style.backgroundColor = "#A076F9";
      }
      arr[j].style.backgroundColor = "#98EECC";
      arr[j + 1].style.backgroundColor = "#98EECC";
      console.log(pauseNumber);
      if (pauseNumber % 2 === 1) {
        await timer(500);
      } else {
        await timer(5000);
      }
      if (Number(arr[j].textContent) > Number(arr[j + 1].textContent)) {
        await swap(arr, j, j + 1);
      }
    }
    let endNum = Object.keys(arr).length - i - 1;
    arr[endNum].style.backgroundColor = "#FF52A2";
  }
  create.disabled = false;
  random.disabled = false;
};

function timer(ms) {
  return new Promise((res) => {
    id = setTimeout(res, ms);
    return id;
  });
}

sort.addEventListener("click", async (e) => {
  pauseNumber++;
  e.preventDefault();
  if (pauseNumber === 1) {
    bubbleSort(numbers);
  }

  create.disabled = true;
  random.disabled = true;
  if (pauseNumber % 2 === 1) {
    sort.value = "Slow (5 second)";
  } else {
    sort.value = "Fast (0.5 second)";
  }
});
