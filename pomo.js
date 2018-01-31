const pomo = {
	active: false,
	ms: 1000,
	time: document.getElementById("time"),
	status: document.getElementById("status"),
	canvas: document.getElementById("pomodoro-canvas"),
	break: {
		time: 5,
		text: document.getElementById('break-text')
	},
	session: {
		time: 25,
		text: document.getElementById('session-text')
	},
	start() {

	},
	main() {

	},
	draw(t) {
        this.context.beginPath();
        this.context.arc(this.canvas.width/2,this.canvas.height/2,145,0,Math.PI * t);
        this.context.stroke();
	},
	set timeText(t) {
		this.time.innerHTML = t;
	},
	set statusText(t) {
		this.status.innerHTML = t;
	},
	set activate(ms) {
		this.loop = setInterval(this.main,ms);
	},
	deactivate() {
		clearInterval(this.loop);
	},
	set breakTime(t) {
		this.break.time += t;
		this.break.text = this.break.time;
	},
	set sessionTime(t) {
		this.session.time += t;
		this.session.text = this.session.time;
	}

};
pomo.context = pomo.canvas.getContext("2d");
pomo.context.lineWidth = 10;


