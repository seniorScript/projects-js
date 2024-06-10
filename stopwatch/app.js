const hour = document.getElementById("hour");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const miliseconds = document.getElementById("miliseconds");

const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

class Stopwatch {
  constructor() {
    this.totalTime = 0;
    this.counter = 0;
    this.time = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      miliseconds: 0,
    };
    this.running = false;
    this.intervalId = null;
  }

  // start the stopwatch
  start() {
    if (this.running) {
      return;
    } else {
      this.counter = Date.now();
      this.running = true;

      this.intervalId = setInterval(() => {
        this.totalTime += Date.now() - this.counter;
        this.counter = Date.now();
        this.updateTime(this.totalTime);
        this.updateDisplay();
      }, 50);
    }
  }

  // stop the stopwatch
  stop() {
    if (this.running) {
      clearInterval(this.intervalId);
      this.totalTime += Date.now() - this.counter;
      this.updateTime(this.totalTime);
      this.updateDisplay();
      this.running = false;
      this.intervalId = null;
    } else {
      return;
    }
  }

  // update the time based on timeElapsed
  updateTime(timeElapsed) {
    this.time.hours = Math.floor(timeElapsed / 3600000);
    let remainder = timeElapsed % 3600000;

    this.time.minutes = Math.floor(remainder / 60000);
    remainder = remainder % 60000;

    this.time.seconds = Math.floor(remainder / 1000);
    remainder = remainder % 1000;

    this.time.miliseconds = remainder;
  }

  updateDisplay() {
    hour.textContent = this.time.hours.toString().padStart(2, "0");
    minutes.textContent = this.time.minutes.toString().padStart(2, "0");
    seconds.textContent = this.time.seconds.toString().padStart(2, "0");
    miliseconds.textContent = this.time.miliseconds.toString().padStart(3, "0");
  }

  reset() {
    this.stop();
    this.totalTime = 0;
    this.time = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      miliseconds: 0,
    };
    this.updateDisplay();
  }
}

const watch = new Stopwatch();

start.addEventListener("click", () => {
  watch.start();
});

stop.addEventListener("click", () => {
  watch.stop();
});

reset.addEventListener("click", () => {
  watch.reset();
});
