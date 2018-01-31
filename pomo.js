const pomo = {
	active: false,
	ms: 1000,
	time: document.getElementById("time"),
	status: document.getElementById("status"),
	canvas: document.getElementById("pomodoro-canvas"),
	main() {

	},
	draw() {

	},
	set timeText(t) {
		this.time.innerHTML = t;
	},
	set statusText(t) {
		this.status.innerHTML = t;
	},
	set activate(ms) {
		this.loop = setInterval(this.main,ms);
	}

};
pomo.context = pomo.canvas.getContext("2d");


