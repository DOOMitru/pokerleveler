class ContinuousButtonTimer {
    constructor(cb, delay = 200) {
        this.callback = cb
        this.interval = null
        this.delay = delay
    }

    start() {
        this.interval = setInterval(this.callback, this.delay)
    }

    stop() {
        clearInterval(this.interval)
    }
}

export default ContinuousButtonTimer
