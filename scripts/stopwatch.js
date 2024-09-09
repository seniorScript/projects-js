const { hour, minutes, seconds, start, stop, reset } = {
  hour: document.getElementById("hour"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  start: document.getElementById("start"),
  stop: document.getElementById("stop"),
  reset: document.getElementById("reset"),
};

class Stopwatch {
  constructor() {
    this.totalTime = 0;
    this.running = false;
    this.lastTimestamp = null;
  }

  start() {
    if (this.running) return;

    this.running = true;
    this.lastTimestamp = Date.now();
    this.update();
  }

  stop() {
    if (!this.running) return;

    this.running = false;
    this.totalTime += Date.now() - this.lastTimestamp;
  }

  update() {
    if (!this.running) return;

    const now = Date.now();
    this.totalTime += now - this.lastTimestamp;
    this.lastTimestamp = now;

    this.updateDisplay();
    requestAnimationFrame(() => this.update());
  }

  updateDisplay() {
    const time = this.getTimeComponents(this.totalTime);
    hour.textContent = time.hours.toString().padStart(2, "0");
    minutes.textContent = time.minutes.toString().padStart(2, "0");
    seconds.textContent = time.seconds.toString().padStart(2, "0");
  }

  getTimeComponents(timeElapsed) {
    const hours = Math.floor(timeElapsed / 3600000);
    const minutes = Math.floor((timeElapsed % 3600000) / 60000);
    const seconds = Math.floor((timeElapsed % 60000) / 1000);
    return { hours, minutes, seconds };
  }

  reset() {
    this.stop();
    this.totalTime = 0;
    this.updateDisplay();
  }
}

const watch = new Stopwatch();

start.addEventListener("click", () => watch.start());
stop.addEventListener("click", () => watch.stop());
reset.addEventListener("click", () => watch.reset());
