class Stopwatch extends React.Component {
	constructor() {
		super();
		this.state = {
			running: false,
			disabledBtnState: false,
			minutes: 0,
			seconds: 0,
			miliseconds: 0,
			marks: []
		},
		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.clear = this.clear.bind(this);
		this.reset = this.reset.bind(this);
		this.mark = this.mark.bind(this);
		this.calculate = this.calculate.bind(this);
		this.format = this.format.bind(this);
		this.step = this.step.bind(this);
		this.clearList = this.clearList.bind(this);

	}

	reset() {
		this.setState ({
			minutes: 0,
			seconds: 0,
			miliseconds: 0				
		})
	}

	format() {
		return `${pad0(this.state.minutes)}:${pad0(this.state.seconds)}:${pad0(Math.floor(this.state.miliseconds))}`;
	}

	start() {
    if (!this.state.running) {
      this.state.running = true;
			this.state.disabledBtnState = true;
      this.watch = setInterval(() => this.step(), 10)
    }
	}

	step() {
		if (!this.state.running) return;
		this.calculate();
	}

	calculate() {
		let {
      miliseconds,
      seconds,
      minutes
    } = this.state;

		miliseconds += 1;
    if (miliseconds >= 100) {
      seconds += 1;
      miliseconds = 0;
    }
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }

    this.setState ({
      miliseconds: miliseconds,
      seconds: seconds,
      minutes: minutes
    });
	}

	stop() {
		this.state.running = false;
		this.state.disabledBtnState = false;
		clearInterval(this.watch);
	}

	clear() {
		if (this.state.running) {return;}
		this.reset();
	}

	mark() {
		this.state.marks.push(this.format());
		console.log(this.state.running);
		this.elements = this.state.marks.map( (el, id) => <li key={id}>{el}</li>);
		console.log(this.elements);
	}

	clearList() {
		this.state.marks = [];
		this.elements = [];
	}

	render() {
		return (
			<div className="container">
				<div className="wrapper">
			    <div className="stopwatch">{this.format()}</div>
			    <nav className="controls">
			      <a href="#" className="button" onClick={this.start}>Start</a>
			      <a href="#" className="button" onClick={this.stop}>Stop</a>
			      <a href="#" className="button" onClick={this.clear} disabled={this.state.disabledBtnState}>Reset</a>
			    </nav>
			  </div>    
		   	<div className="results">
		   		<strong>Table of results</strong>
		   		<div className="table-buttons">
			   		<a href="#" className="table-button" onClick={this.mark}>Mark result</a>
			   		<a href="#" className="table-button" onClick={this.clearList}>Reset results</a>
		   		</div>
		   		<ul className="result-list">{this.elements}</ul>
		   	</div>
		  </div>
		);
  }
}

function pad0(value) {
	let result = value.toString();
	if (result.length < 2) {
		result = `0${result}`;
	}
	return result;
}

ReactDOM.render(<Stopwatch />, document.getElementById('s1'));