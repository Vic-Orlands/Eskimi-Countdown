import React, { Component, createRef } from 'react';
import { TimelineLite, CSSPlugin } from 'gsap/all';
import './style.css';

class Countdown extends Component {
	constructor(props) {
		super(props);

		this.logoTl = new TimelineLite({ paused: false });

		this.content = null;
		this.head = null;
		this.subhead = null;
		this.timer = null;
		this.timer2 = null;
		this.timer3 = null;
		this.state = {
			days: '00',
			hours: '00',
			minutes: '00',
			seconds: '00',
			sehriTime: '00',
			Iftar: '00',
			daylight: false
		};
		this.interval = createRef();
	}

	componentDidMount() {
		this.logoTl
			.set(this.content, { autoAlpha: 1 })
			.from(this.head, 0.5, { left: -100, autoAlpha: 0 }, '=0.4')
			.from(this.subhead, 0.5, { left: -100, autoAlpha: 0 }, '=0.5') 
			.from(this.timer, 0.9, { scale: 0.5, autoAlpha: 0 }, 'timer') 
			.from(this.timer2, 0.9, { scale: 0.5, autoAlpha: 0 }, 'timer2') 
			.from(this.timer3, 0.7, { scale: 0.5, autoAlpha: 0 }, 'timer3') 
			.from(this.timer4, 0.8, { scale: 0.5, autoAlpha: 0 }, 'timer4') 
			.from(this.timer5, 0.7, { scale: 0.5, autoAlpha: 0 }, 'timer5') 
			.from(this.timer6, 0.8, { scale: 0.5, autoAlpha: 0 }, 'timer6') 
			.from(this.description, 0.5, { left: 100, autoAlpha: 0 }, 'feature+=0.25')
			.staggerFrom(this.icons, 0.2, { scale: 0, autoAlpha: 0 }, 0.3);

		//calling the timer function to start counting down once the components mounts
		this.timerFunction();

		//fetching time and dates from api
		fetch(
			'http://api.aladhan.com/v1/calendarByCity?city=Dhaka&country=Bangladesh&method=1&month=05&year=2020&tune=1'
		)
			.then((response) => response.json())
			.then((data) =>
				this.setState({
					sehriTime: data.data[0].timings.Imsak,
					Iftar: data.data[0].timings.Sunset
				})
			);
	}

	// timer function starts here
	timerFunction = () => {
		// get time duration of day
		const hoursofDay = new Date().getHours();
		const isDayTime = hoursofDay > 6 && hoursofDay < 20;

		// if its day, count left to iftar and if time exceeds iftar, then count right to next iftar
		let countdwn;

		if (isDayTime) {
			countdwn = this.state.sehriTime;
			this.setState({
				daylight: true
			});
		} else {
			countdwn = this.state.Iftar;
		}

		this.interval = setInterval(() => {
			const now = new Date().getTime();
			const difference = countdwn - now;

			const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((difference % (1000 * 60)) / 1000);

			if (difference > 0) {
				this.setState({
					hours: hours,
					minutes: minutes,
					seconds: seconds
				});
			} else if (difference < 0) {
				this.setState({
					hours: Math.abs(hours),
					minutes: Math.abs(minutes),
					seconds: Math.abs(seconds)
				});
			}
			clearInterval(this.interval.current);
		}, 1000);
	};

	render() {
		return (
			<main className="time-body">
				<h1 ref={(h1) => (this.head = h1)}>A slick Ramadan countdown</h1>

				<section className="flex-parent">
					<section className="ad" className={'ad ' + (this.state.daylight ? 'container-night' : ' ')}>
						<img src={require('./assets/header.png')} alt="header" ref={(img) => (this.subhead = img)} />

						<section className="timer-parent">
							<h1
								ref={(div) => (this.timer = div)}
								className={'h1 ' + (this.state.daylight ? 'nighttime' : ' ')}
							>
								{this.state.hours}
							</h1>

							<h1
								ref={(div) => (this.timer2 = div)}
								className={'h1 ' + (this.state.daylight ? 'nighttime' : ' ')}
							>
								{this.state.minutes}
							</h1>

							<h1
								ref={(div) => (this.timer3 = div)}
								className={'h1 ' + (this.state.daylight ? 'nighttime' : ' ')}
							>
								{this.state.seconds}
							</h1>
						</section>

						<img
							src={require('./assets/desc.png')}
							alt="header"
							id="arabic"
							ref={(div) => (this.timer4 = div)}
						/>

						<img
							src={require('./assets/objects1.png')}
							alt="header"
							id="box"
							ref={(div) => (this.timer6 = div)}
						/>

						<img
							src={require('./assets/logo1.png')}
							alt="header"
							className="anime"
							ref={(div) => (this.timer5 = div)}
						/>
					</section>
				</section>
			</main>
		);
	}
}

export default Countdown;
