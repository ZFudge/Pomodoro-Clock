const pomo = {
	active: false,
	ms: 1000,
	session: {
		text: document.getElementById('session-text'),
		time: 25,
		set sessionTime(t) {
			if ((this.time > 1 || t === 1) && !pomo.active) {
				this.time += t;
				const st = this.time;
				this.text.innerHTML = st;
				if (pomo.clock.status.innerHTML === "Session") {
					pomo.clock.setSeconds = st;
					pomo.clock.maxSecs = st;
					pomo.clock.secondsToDigitalDisplay();
				}
			}
		},
		audio: new Audio("session.mp3")
	},
	break: {
		text: document.getElementById('break-text'),
		time: 5,
		set breakTime(t) {
			if ((this.time > 1 || t === 1) && !pomo.active) {
				this.time += t;
				const st = this.time;
				this.text.innerHTML = st;
				if (pomo.clock.status.innerHTML === "Break") {
					pomo.clock.setSeconds = st;
					pomo.clock.maxSecs = st;
					pomo.clock.secondsToDigitalDisplay();
				}
			}
		},
		audio: new Audio("break.mp3")
	},
	clock: {
		status: document.getElementById("status"),
		time: document.getElementById("time"),
		canvas: document.getElementById("pomodoro-canvas"),
		mouse: {
			down: new Audio("mousedown.mp3"),
			up: new Audio("mouseup.mp3")
		},
		paused: false,
		seconds: 1500,
		maxSecs: 1500,
		set setSeconds(t) {
			this.seconds = t * 60;
		},
		reduceSeconds() {
			if (this.seconds > 0) {
				this.seconds--;
			} else {
				this.flipStatus();
			}
		},
		flipStatus() {
			const newStatus = (this.status.innerHTML === "Session") ? "Break" : "Session";
			this.status.innerHTML = newStatus;
			this.setSeconds = pomo[newStatus.toLowerCase()].time;
			this.maxSecs = this.seconds;
			pomo[newStatus.toLowerCase()].audio.play();
		},
		secondsToDigitalDisplay() {
			const t = this.seconds;
			let hrs = 0, mins = 0, secs = 0;
			if (t >= 3600) hrs = (t - t % 3600) / 3600;
			secs = t % 60;
			if (secs < 10) secs = `0${secs}`; 
			if (hrs > 0) {
				mins = ((t-3600) - (t % 60)) / 60; 
				this.time.innerHTML = `${hrs}:${mins}:${secs}`;
			} else {
				mins = (t - (t % 60)) / 60;
				this.time.innerHTML = `${mins}:${secs}`;
			}
		},
		pause() {
			this.paused = true;
			clearInterval(this.loop);
		},
		loop: null
	},
	push() {
		this.active = !this.active;
		(this.active) ? this.start() : this.clock.pause();	
	},
	start() {
		this.clock.loop = setInterval(this.count,this.ms);
	},
	draw(t) {
        this.clock.context.beginPath();
        this.clock.context.arc(this.clock.canvas.width/2,this.clock.canvas.height/2,145,0,Math.PI * t);
        this.clock.context.stroke();
	},
	count() {
		pomo.clock.reduceSeconds();
		pomo.clock.secondsToDigitalDisplay();
	}

};

pomo.clock.context = pomo.clock.canvas.getContext("2d");
pomo.clock.context.lineWidth = 10;


