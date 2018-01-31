const pomo = {
	active: false,
	ms: 1000,
	time: {
		text: document.getElementById("time"),
		paused: false,
		current: 25,
		duration: null
	},
	clock: {
		status: document.getElementById("status"),
		canvas: document.getElementById("pomodoro-canvas")
	},
	break: {
		time: 5,
		text: document.getElementById('break-text')
	},
	session: {
		time: 25,
		text: document.getElementById('session-text')
	},
	push() {
		this.active = !this.active;
		(this.active) ? this.start() : this.pause();
	},
	start() {
		if (this.time.paused) {
			this.loop = setInterval(this.main,ms);
		} else {
			this.time.duration = session.time * 60;
			
		}
	},
	pause() {
		this.time.paused = true;
		clearInterval(this.loop);
	},
	draw(t) {
        this.context.beginPath();
        this.context.arc(this.clock.canvas.width/2,this.clock.canvas.height/2,145,0,Math.PI * t);
        this.context.stroke();
	},
	set updateStatus(n) {

	},
	set timeText(t) {
		this.time.text.innerHTML = t;
	},
	set statusText(txt) {
		this.clock.status.innerHTML = txt;
	},
	set breakTime(t) {
		this.break.time += t;
		this.break.text.innerHTML = this.break.time;
		if (this.clock.status.innerHTML === "Break") this.clock.statusText = this.break.time;
	},
	set sessionTime(t) {
		this.session.time += t;
		const st = this.session.time;
		this.session.text.innerHTML = st;
		if (this.clock.status.innerHTML === "Session") {
			if (st < 60) {
				this.time.text.innerHTML = st + ":00"
			} else {
				(st%60<10) ? this.time.text.innerHTML = `${(st-(st%60))/60}:0${st%60}:00` : this.time.text.innerHTML = `${(st-(st%60))/60}:${st%60}:00`;
			}
		}
	},
	main() {

	}

};

pomo.context = pomo.canvas.getContext("2d");
pomo.context.lineWidth = 10;


