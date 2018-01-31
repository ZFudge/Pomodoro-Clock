const pomo = {
	active: false,
	ms: 1000,
	time: {
		paused: false,
		seconds: 1500
	},
	session: {
		text: document.getElementById('session-text'),
		time: 25
	},
	break: {
		text: document.getElementById('break-text'),
		time: 5
	},
	clock: {
		status: document.getElementById("status"),
		time: document.getElementById("time"),
		canvas: document.getElementById("pomodoro-canvas")
	},
	push() {
		this.active = !this.active;
		(this.active) ? this.start() : this.pause();
	},
	start() {
		if (this.time.paused) {
			this.loop = setInterval(this.main,ms);
		} else {
			this.time.seconds = session.time * 60;
			this.loop = setInterval(this.main,ms);
		}
	},
	pause() {
		this.time.paused = true;
		clearInterval(this.loop);
	},
	draw(t) {
        this.clock.context.beginPath();
        this.clock.context.arc(this.clock.canvas.width/2,this.clock.canvas.height/2,145,0,Math.PI * t);
        this.clock.context.stroke();
	},
	set updateStatus(n) {

	},
	set timeText(t) {
		this.clock.time.innerHTML = t;
	},
	set statusText(txt) {
		this.clock.status.innerHTML = txt;
	},
	set breakTime(t) {
		if (this.break.time > 1 || t === 1) {
			this.break.time += t;
			this.break.text.innerHTML = this.break.time;
			if (this.clock.status.innerHTML === "Break") this.clock.statusText = this.break.time;
		}
	},
	set seconds(t) {
		this.time.seconds = t * 60;
	},
	set sessionTime(t) {
		if (this.session.time > 1 || t === 1) {
			this.session.time += t;
			const st = this.session.time;
			this.session.text.innerHTML = st;
			this.seconds = st;
			if (this.clock.status.innerHTML === "Session") this.secondsToDigitalDisplay();
		}
	},
	secondsToDigitalDisplay() {
		const t = this.time.seconds;
		let hrs = 0, mins = 0, scs = 0;
		if (t >= 3600) hrs = (t - t % 3600) / 3600;
		scs = t % 60;
		if (scs < 10) scs = `0${scs}`;
		if (hrs > 0) {
			mins = ((t-3600) - (t % 60)) / 60; 
			this.clock.time.innerHTML = `${hrs}:${mins}:${scs}`;
		} else {
			mins = (t - (t % 60)) / 60;
			this.clock.time.innerHTML = `${mins}:${scs}`;
		}
	},
	main() {
	},

};

pomo.clock.context = pomo.clock.canvas.getContext("2d");
pomo.clock.context.lineWidth = 10;


