const pomo = {
	active: false,
	session: {
		text: document.getElementById('session-text'),
		audio: new Audio("session.mp3"),
		time: 25,
		set sessionTime(t) {
			if ((this.time > 1 || t === 1) && (!pomo.active || pomo.clock.status.innerHTML === "Break")) {
				this.time += t;
				const st = this.time;
				this.text.innerHTML = st;
				if (pomo.clock.status.innerHTML === "Session") {
					pomo.clock.setSeconds = st;
					pomo.clock.setMaxSeconds = st;
					pomo.clock.secondsToDigitalDisplay();
				}
			}
		}
	},
	break: {
		text: document.getElementById('break-text'),
		audio: new Audio("break.mp3"),
		time: 5,
		set breakTime(t) {
			if ((this.time > 1 || t === 1) && (!pomo.active || pomo.clock.status.innerHTML === "Session")) {
				this.time += t;
				const st = this.time;
				this.text.innerHTML = st;
				if (pomo.clock.status.innerHTML === "Break") {
					pomo.clock.setSeconds = st;
					pomo.clock.setMaxSeconds = st;
					pomo.clock.secondsToDigitalDisplay();
				}
			}
		}
	},
	clock: {
		ms: 1000,
		status: document.getElementById("status"),
		time: document.getElementById("time"),
		canvas: document.getElementById("pomodoro-canvas"),
		seconds: 1500,
		maxSeconds: 1500,
		loop: null,
		mouse: {
			down: new Audio("mousedown.mp3"),
			up: new Audio("mouseup.mp3")
		},
		set setSeconds(t) {
			this.seconds = t * 60;
		},
		set setMaxSeconds(t) {
			this.maxSeconds = t * 60;
		},
		reduceSeconds() {
			(this.seconds > 0) ? this.seconds-- : this.flipStatus();
		},
		flipStatus() {
			const newStatus = (this.status.innerHTML === "Session") ? "Break" : "Session";
			this.status.innerHTML = newStatus;
			this.setSeconds = pomo[newStatus.toLowerCase()].time;
			this.maxSeconds = this.seconds;
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
			clearInterval(this.loop);
		},
		draw() {
			const t = ((2 / this.maxSeconds) * this.seconds).toFixed(3);
			this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	        this.context.beginPath();
	        this.context.arc(this.canvas.width/2,this.canvas.height/2,145,0,Math.PI * t);
	        this.context.stroke();
		},
		push() {
			pomo.active = !pomo.active;
			(pomo.active) ? this.start() : this.pause();	
		},
		start() {
			this.loop = setInterval(this.count,this.ms);
		},
		count() {
			pomo.clock.reduceSeconds();
			pomo.clock.secondsToDigitalDisplay();
			pomo.clock.draw();
		}
	}
};

pomo.clock.context = pomo.clock.canvas.getContext("2d");
pomo.clock.context.lineWidth = 10;
pomo.clock.context.strokeStyle = "#cc9604";
