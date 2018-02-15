const pomo = {
	active: false,
	incrementSounds: {
		plus_one: new Audio("plus_one.wav"),
		minus_one: new Audio("minus_one.wav")
	},
	session: {
		audio: new Audio("session.mp3"),
		time: 25
	},
	break: {
		audio: new Audio("break.mp3"),
		time: 5
	},
	setTime(t, text, element) {
		if ((this[text].time > 1 || t === 1) && (!pomo.active || pomo.clock.status.innerHTML.toUpperCase() != text.toUpperCase())) {
			this[text].time += t;
			const st = this[text].time;
			element.innerHTML = st;
			(t === 1) ? (
				pomo.incrementSounds.plus_one.play(),
				setTimeout(function() {
					pomo.incrementSounds.plus_one.pause();
					pomo.incrementSounds.plus_one.currentTime = 0;
				}, 30)
			) : (
				pomo.incrementSounds.minus_one.play(),
				setTimeout(function() {
					pomo.incrementSounds.minus_one.pause();
					pomo.incrementSounds.minus_one.currentTime = 0;
				}, 30)
			);
			if (pomo.clock.status.innerHTML.toUpperCase() === text.toUpperCase()) {
				pomo.clock.setSeconds = st;
				pomo.clock.setMaxSeconds = st;
				pomo.clock.convertSecondsToDigitalDisplay();
			}
		}
	},
	clock: {
		body: document.getElementById("pomodoro"),
		status: document.getElementById("status"),
		time: document.getElementById("time"),
		canvas: document.getElementById("pomodoro-canvas"),
		ms: 1000,
		loop: null,
		mouse: {
			sounds: [new Audio("mousedown.wav"), new Audio("mouseup.wav")],
			click(eventData, type) {
				const index = (type === "down") ? 0 : 1;
				if (type === "up") pomo.clock.push();
				if (eventData.button === 0) {
					this.sounds[index].play();
					setTimeout(() => {
						this.sounds[index].pause();
						this.sounds[index].currentTime = 0;
						if (type === "up") this.sounds = this.sounds.reverse();
					}, 250);
				}
				document.body.onmouseup = function(eventData) {
					pomo.clock.mouse.click(eventData, "up");
					document.body.onmouseup = function(){};
				}
			}
		},
		convertSecondsToDigitalDisplay() {
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
		flipStatus() {
			const newStatus = (this.status.innerHTML === "Session") ? "Break" : "Session";
			this.status.innerHTML = newStatus;
			this.setSeconds = pomo[newStatus.toLowerCase()].time;
			this.maxSeconds = this.seconds;
			pomo[newStatus.toLowerCase()].audio.play();
		},
		draw() {
			const t = ((2 / this.maxSeconds) * this.seconds).toFixed(3);
			this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	        this.context.beginPath();
	        this.context.arc(this.canvas.width/2,this.canvas.height/2,145,0,Math.PI * t);
	        this.context.stroke();
		},
		countOneSecond() {
			pomo.clock.reduceSeconds();
			pomo.clock.convertSecondsToDigitalDisplay();
			pomo.clock.draw();
		},
		push() {
			pomo.active = !pomo.active;
			(pomo.active) ? this.start() : this.pause();	
		},
		reduceSeconds() {
			(this.seconds > 0) ? this.seconds-- : this.flipStatus();
		},
		pause() {
			clearInterval(this.loop);
		},
		start() {
			this.loop = setInterval(this.countOneSecond,this.ms);
		},
		set setSeconds(t) {
			this.seconds = t * 60;
		},
		set setMaxSeconds(t) {
			this.maxSeconds = t * 60;
		}
	}
};

pomo.clock.maxSeconds = pomo.session.time * 60;
pomo.clock.seconds = pomo.session.time * 60;
pomo.clock.context = pomo.clock.canvas.getContext("2d");
pomo.clock.context.lineWidth = 20;
pomo.clock.context.strokeStyle = "#f07423";
pomo.clock.body.onmousedown = (eventData) => pomo.clock.mouse.click(eventData, "down");

window.addEventListener("keydown", function(btn) {
	if (btn.keyCode === 32) {
		pomo.clock.mouse.down();
		pomo.clock.push();
		setTimeout(()=>pomo.clock.mouse.up(),0);
	}
});
