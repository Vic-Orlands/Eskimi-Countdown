import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

import { BsThreeDotsVertical } from 'react-icons/bs';
import { FcPieChart } from 'react-icons/fc';
import { FiDownload } from 'react-icons/fi';
import { GiChart } from 'react-icons/gi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

import Navigation from '../core.sections/Navigation';
import Sidemenu from '../core.sections/Sidemenu';
import '../../styles/Home.css';
import '../../styles/slider/slider-animation.css';
import '../../styles/slider/slide.css';

// ----------------slider components-----------------
const content = [
	{
		name: 'Stella Marris',
		title: 'Family man',
		description:
			'This is not only solving dirt issues and hazard that comes with it, its an opportunity for me to make money and pay my bills as well because i can make extra money',
		button: 'Read More',
		background: '#1d2939'
	},
	{
		name: 'Mr Onyekachi',
		title: 'Founder ABC testing',
		description:
			'This is a great platform that everyone should explore because it solving the most vital environmental challenge in the region. I will always recommend this platform.',
		button: 'Read More',
		background: '#034a82'
	},
	{
		name: 'Stella Marris',
		title: 'Family man',
		description:
			'This is not only solving dirt issues and hazard that comes with it, its an opportunity for me to make money and pay my bills as well because i can make extra money',
		button: 'Read More',
		background: '#1f0d00'
	}
];
// ----------------slider components-----------------

const Home = () => {
	const [ users, setUsers ] = useState([]);
	const [ vendors, setVendors ] = useState([]);
	const [ loading, setLoading ] = useState(true);

	const proxyurl = 'https://cors-anywhere.herokuapp.com/';
	const uri = 'http://admin.wm-has.org.ng/api/user/adminApi';
	const url = 'http://admin.wm-has.org.ng/api/user/adminApiUser';

	const fetchedPickers = () => {
		fetch(proxyurl + uri)
			.then((res) => res.json())
			.then((res) => {
				setUsers(res.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const fetchedUrls2 = () => {
		fetch(proxyurl + url)
			.then((res) => res.json())
			.then((res) => {
				setVendors(res.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchedPickers();
		fetchedUrls2();
		Promise.all([ fetchedPickers, fetchedUrls2 ]);
	}, []);

	const totalUsers = users.reduce((sum, current) => (current.name ? (sum += 1) : current), 0);
	const totalVendors = vendors.reduce((sum, current) => (current.name ? (sum += 1) : current), 0);
	const totalActiveUser = totalUsers + totalVendors;

	//-------here i sliced the fetched users into five to display only five users on the homepage----------
	const newUsers = users.slice(0, 6);

	//-------here i  fetched pickers using its response type and then sliced it to display only two pickers on the homepage----------
	const picker = users.filter((user) => user.type === '1');
	const pickers = picker.slice(0, 2);
	console.log(picker);
	

	//-------just like the pickers, I  fetched collectors using its response type and then sliced it to display only two collectors on the homepage----------
	const collector = users.filter((user) => user.type === '2');
	const collectors = collector.slice(0, 2);

	//-------just like above, I  fetched the available agencies using its response type and then sliced it to display only one----------
	const agency = users.filter((user) => {
		if (user.type === '5') {
			return user;
		}
		return null;
	});
	const agencies = agency.slice(0, 1);

	return (
		<div>
			<Navigation />
			<Sidemenu />

			{loading ? (
				<div className="gifLoad">
					<img src={require('../../assets/load.gif')} alt="Loading..." />
				</div>
			) : (
				// ------------------------------home jsx starts here----------------------------------------
				<section className="homeBody">
					<h1>Home</h1>

					<div className="topShelf">
						<div>
							<RiMoneyDollarCircleLine id="shelfFont" />
							<div>
								<h2>Total Revenue</h2>
								<h3>$758</h3>
								<p>From last week</p>
							</div>
						</div>

						<div>
							<FcPieChart id="shelfFont" />
							<div>
								<h2>Orders Received</h2>
								<h3>1024</h3>
								<p>From this week</p>
							</div>
						</div>

						<div>
							<GiChart id="shelfFont" />
							<div>
								<h2>Total Active Users</h2>
								<h3>{totalActiveUser}</h3>
								<p>From one day ago</p>
							</div>
						</div>

						<div>
							<FiDownload id="shelfFont" />
							<div>
								<h2>Total Downloads</h2>
								<h3>200</h3>
								<p>From one day ago</p>
							</div>
						</div>
					</div>
					{/* // ------------------------------home jsx ends here---------------------------------------- */}

					{/* -------------------------------second grid divs starts here--------------------------------- */}

					<section className="new-main">
						<section>
							<div>
								<h2>Activity</h2>
							</div>

							<div className="overlap">
								<div>
									<h3>Users</h3>
									<h5> {totalUsers} Total Users</h5>
								</div>

								<div>
									<h3> Vendors</h3>
									<h5>{totalVendors} Total Vendors</h5>
								</div>

								<div>
									<h3>Dump Site</h3>
									<h5>14 total</h5>
								</div>

								<div>
									<h3> Messages</h3>
									<h5>10 New Messages</h5>
								</div>
							</div>
						</section>

						<aside>
							<section>
								<h2>Disposal Analysis</h2>

								<h1 style={{ color: 'purple' }}>670+</h1>
								<h5>Successful transactions</h5>
							</section>

							<section>
								<h2>App Transactions</h2>

								<h1 style={{ color: '#e8428e' }}>1340+</h1>
								<h5>Completed orders</h5>
							</section>
						</aside>

						<div className="what-people-say">
							<Slider className="slider-wrapper" autoplay="900ms" infinite="true">
								{content.map((item, index) => (
									<div
										key={index}
										className="slider-content"
										style={{ background: `${item.background}` }}
									>
										<div className="inner" style={{ background: `${item.background}` }}>
											<h2>{item.name}</h2>
											<span>{item.title}</span>
											<p>{item.description}</p>
											<button>{item.button}</button>
										</div>
									</div>
								))}
							</Slider>
						</div>
					</section>
					{/* -------------------------------second grid divs ends here--------------------------------- */}

					<section className="usersShelf">
						<div>
							<header>
								<h2>Newly Registered Users</h2>

								<h2>
									<NavLink to="/users" id="link">
										See more
									</NavLink>
								</h2>
							</header>

							{newUsers.map((user) => (
								<div key={user.id}>
									<img src={require('../../assets/logo.PNG')} alt="user-img" />
									<hgroup>
										<h3>{user.name}</h3>
										<h4>{user.email}</h4>
									</hgroup>

									<h5>
										<NavLink to="/users" style={{ color: "#17a2b8"}}>View</NavLink>
									</h5>
								</div>
							))}
						</div>

						<div className="task">
							<header>
								<h2>Task</h2>
							</header>

							<div>
								<input type="checkbox" />
								<div>
									<h3>Assemble all Vendors</h3>
									<h4>By Bob</h4>
								</div>

								<BsThreeDotsVertical id="font" />
							</div>

							<div>
								<input type="checkbox" />
								<div>
									<h3>Server Maintainance</h3>
									<h4>By Melody</h4>
								</div>

								<BsThreeDotsVertical id="font" />
							</div>

							<div>
								<input type="checkbox" />
								<div>
									<h3>Update customers' testimony</h3>
									<h4>By Chimezie</h4>
								</div>

								<BsThreeDotsVertical id="font" />
							</div>

							<div>
								<input type="checkbox" />
								<div>
									<h3>Mobile Application Upgrade</h3>
									<h4>By Shegun</h4>
								</div>

								<BsThreeDotsVertical id="font" />
							</div>

							<div>
								<input type="checkbox" />
								<div>
									<h3>Replace digital brands and logos</h3>
									<h4>By Jasper</h4>
								</div>

								<BsThreeDotsVertical id="font" />
							</div>
						</div>

						<div className="popularVendors">
							<header>
								<h2>Popular Vendors</h2>
								<hgroup>
									<h3>Latest</h3>
									<h3>Month</h3>
									<h3>All time</h3>
								</hgroup>
							</header>

							{pickers.map((onePicker, index) => (
								<section key={index}>
									<div>
										<h2>{onePicker.name}</h2>
										<h3>Waste Disposal Picker</h3>
										<h4>{onePicker.email}</h4>
									</div>

									<div>
										<div>
											<h2>{onePicker.wallet}</h2>
											<h4>sales</h4>
										</div>

										<div>
											<h2>{onePicker.wallet}</h2>
											<h4>sales</h4>
										</div>
									</div>
								</section>
							))}

							{collectors.map((oneCollector, index) => (
								<section key={index}>
									<div>
										<h2>{oneCollector.name}</h2>
										<h3>Waste Disposal Collector</h3>
										<h4>{oneCollector.email}</h4>
									</div>

									<div>
										<div>
											<h2>{oneCollector.wallet}</h2>
											<h4>sales</h4>
										</div>

										<div>
											<h2>{oneCollector.wallet}</h2>
											<h4>sales</h4>
										</div>
									</div>
								</section>
							))}

							{agencies.map((oneAgency, index) => (
								<section key={index}>
									<div>
										<h2>{oneAgency.name}</h2>
										<h3>Waste Disposal Agency</h3>
										<h4>{oneAgency.email}</h4>
									</div>

									<div>
										<div>
											<h2>{oneAgency.wallet}</h2>
											<h4>sales</h4>
										</div>

										<div>
											<h2>{oneAgency.wallet}</h2>
											<h4>sales</h4>
										</div>
									</div>
								</section>
							))}
						</div>
					</section>
				</section>
			)}
		</div>
	);
};

export default Home;
