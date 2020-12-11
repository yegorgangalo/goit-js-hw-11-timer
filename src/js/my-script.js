const refs = {
    spanDays: document.querySelector('[data-value="days"]'),
    spanHours: document.querySelector('[data-value="hours"]'),
    spanMinutes: document.querySelector('[data-value="mins"]'),
    spanSeconds: document.querySelector('[data-value="secs"]'),
}

const CountdownTimer = {
    targetDate: new Date('Jan 01, 2021'),
    // targetDate: new Date(2020, 11, 11, 18, 18, 5),
    isActive: false,
    timerId: null,
    start() {
        if (this.isActive) {
            return;
        };
        this.timerId = setInterval(this.timer.bind(CountdownTimer), 1000);
        this.isActive = true;
    },
    stop(diff) {
        if (diff <= 0) {
            clearInterval(this.timerId);
            this.isActive = false;
            return true;
        };
    },
    timer() {
        const currentDate = Date.now();
        const deltaTime = this.targetDate - currentDate;
        if (this.stop(deltaTime)) {
            const time = this.getTimeComponents(0);
            this.insertTimeinRefs(time);
            return;
        };
        const time = this.getTimeComponents(deltaTime);
        this.insertTimeinRefs(time);
    },
    insertTimeinRefs(timeObj) {
        refs.spanDays.innerHTML = timeObj.days;
        refs.spanHours.innerHTML = timeObj.hours;
        refs.spanMinutes.innerHTML = timeObj.mins;
        refs.spanSeconds.innerHTML = timeObj.secs;
    },
    /* ---------------------------- */
    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return { days, hours, mins, secs };
      },

    pad(value) {
        if (String(value).length <= 2) {
            return String(value).padStart(2, '0');
        } else {
            return String(value).padStart(String(value).length, '0');
        }
      }
    /* ---------------------------- */
}


CountdownTimer.timer();
CountdownTimer.start();