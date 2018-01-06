class Stopwatch extends React.Component {
	constructor() {
		super();
		this.state = {
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		}
	}

	render() {
		return (
			<div className="container">
				<div className="wrapper">
			    <div className="stopwatch">{this.props.value}</div>
			    <nav className="controls">
			      <a href="#" className="button" onClick={ ()=> this.start() }>Start</a>
			      <a href="#" className="button" onClick={ ()=> this.stop() }>Stop</a>
			      <a href="#" className="button" onClick={ ()=> this.clear() }>Reset</a>
			    </nav>
			  </div>    
		   	<div className="results">
		   		<strong>Table of results</strong>
		   		<div className="table-buttons">
			   		<a href="#" className="table-button" onClick={ ()=> this.mark() }>Mark result</a>
			   		<a href="#" className="table-button" onClick={ ()=> this.clearList() }>Reset results</a>
		   		</div>
		   		<ul className="result-list">
		   		</ul>
		   	</div>
		   </div>
		  )
    }

    this.display = this.node.querySelector('.stopwatch');
    this.startButton = this.node.querySelector('#start');
		this.startButton.addEventListener('click', () => this.start());

		this.stopButton = this.node.querySelector('#stop');
		this.stopButton.addEventListener('click', () => this.stop());

		this.resetButton = this.node.querySelector('#reset');
		this.resetButton.addEventListener('click', () => this.clear());

		this.saveButton = this.node.querySelector('#mark');
		this.saveButton.addEventListener('click', () => stopwatch.mark());

		this.resetListButton = this.node.querySelector('#reset-results');
		this.resetListButton.addEventListener('click', () => stopwatch.clearList());

		this.resultsList = this.node.querySelector('.result-list');
	}

	reset() {
	}

	print() {
		this.display.innerText = this.format(this.times);
	}

	format(times) {
		return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

	start() {
		if (!this.running) {
			this.running = true;
			this.watch = setInterval(() => this.step(), 10);
		}
		this.resetButton.setAttribute('disabled', 'disabled');
	}

	step() {
		if (!this.running) return;
		this.calculate();
		this.print();
	}

	calculate() {
		this.times.miliseconds += 1;
		if (this.times.miliseconds >= 100) {
			this.times.seconds +=1;
			this.times.miliseconds = 0;
		}
		if (this.times.seconds >= 60) {
			this.times.minutes += 1;
			this.times.seconds = 0;
		}
	}

	stop() {
		this.running = false;
		clearInterval(this.watch);
		this.resetButton.removeAttribute('disabled');
	}

	clear() {
		if (this.running) {return;}
		this.reset();
		this.print(this.times);
		this.stop();
	}

	mark() {
		this.result = this.display.innerText;
		this.resultInstance = document.createElement('li');
		this.resultInstance.innerText = this.result;
		this.resultsList.append(this.resultInstance);
	}

	clearList() {
		this.resultsList.innerHTML = '';
	}
}

const stopwatch = new Stopwatch(
	document.querySelector('.s1')
);

function pad0(value) {
	let result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
}