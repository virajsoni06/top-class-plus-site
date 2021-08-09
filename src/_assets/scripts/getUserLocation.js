const getUserLocation = async () => {
	try {
		const response = await fetch("https://extreme-ip-lookup.com/json/");
		const jsonResponse = await response.json();
		return jsonResponse;
	} catch (err) {
		return err;
	}
};
export default getUserLocation;

export const updateCurrencySymbolOnLoad = (element, location) => {
	let { country } = location;
	if (country) {
		if (country === "India") {
			element.forEach(function(item) {
				item.innerHTML = "₹";
			});
			updateCountryNameAndFlag(country, "in-flag.svg");
			displayCountryBasedWorksheets(country);
			updateWorksheetPrices(country);
			updateMonthlyAndOneTimePrice(country);
		} else if (country === "United States") {
			element.forEach(function(item) {
				item.innerHTML = "$";
			});
			updateCountryNameAndFlag(country, "us-flag.svg");
			displayCountryBasedWorksheets(country);
			updateWorksheetPrices(country);
			updateMonthlyAndOneTimePrice(country);
		} else {
			element.forEach(function(item) {
				item.innerHTML = "£";
			});
			updateCountryNameAndFlag("Great Britain", "gb-flag.svg");
			displayCountryBasedWorksheets("Great Britain");
			updateWorksheetPrices("Great Britain");
			updateMonthlyAndOneTimePrice("Great Britain");
		}
	} else {
		element.forEach(function(item) {
			item.innerHTML = "£";
		});
		updateCountryNameAndFlag("Great Britain", "gb-flag.svg");
		displayCountryBasedWorksheets("Great Britain");
		updateWorksheetPrices("Great Britain");
		updateMonthlyAndOneTimePrice("Great Britain");
	}
};

const updateCountryNameAndFlag = (name, flagImg) => {
	const countryName = document.querySelector(".country-name");
	const countryFlag = document.querySelector(".country-flag");
	countryName.innerHTML = name;
	countryFlag.src = "/static/images/" + flagImg;
};

export const updatedCurrencyOnSelect = (country, element, snipcart) => {
	element.forEach(function(item) {
		if (country === "United States") {
			item.innerHTML = "$";
			snipcart.api.session.setCurrency("usd");
		} else if (country === "Great Britain") {
			item.innerHTML = "£";
			snipcart.api.session.setCurrency("gbp");
		} else if (country === "India") {
			item.innerHTML = "₹";
			snipcart.api.session.setCurrency("inr");
		}
	});
	displayCountryBasedWorksheets(country);
	updateWorksheetPrices(country);
	updateMonthlyAndOneTimePrice(country);
};

const displayCountryBasedWorksheets = country => {
	const worksheets = document.querySelectorAll(".worksheet-item");

	worksheets?.forEach(function(item) {
		if (country === "United States") {
			if (item?.classList.contains("in") || item?.classList.contains("gb")) {
				item.classList.add("hidden");
				if (item?.classList.contains("selected")) {
					item.classList.remove("selected");
				}
			} else {
				if (item.classList.contains("hidden")) {
					item.classList.remove("hidden");
				}
			}
		} else if (country === "Great Britain") {
			if (item?.classList.contains("in") || item?.classList.contains("us")) {
				item.classList.add("hidden");
				if (item?.classList.contains("selected")) {
					item.classList.remove("selected");
				}
			} else {
				if (item.classList.contains("hidden")) {
					item.classList.remove("hidden");
				}
			}
		} else if (country === "India") {
			if (item?.classList.contains("us") || item?.classList.contains("gb")) {
				item.classList.add("hidden");
				if (item?.classList.contains("selected")) {
					item.classList.remove("selected");
				}
			} else {
				if (item.classList.contains("hidden")) {
					item.classList.remove("hidden");
				}
			}
		}
	});
};

const updateWorksheetPrices = country => {
	const itemPrice = document.querySelectorAll(".worksheet-item .item-price");
	let priceList = { gbp: "72.00", usd: "99.00", inr: "7370.30" };

	itemPrice?.forEach(function(item) {
		if (country === "United States") {
			item.innerHTML = "$" + priceList.usd;
		} else if (country === "Great Britain") {
			item.innerHTML = "£" + priceList.gbp;
		} else if (country === "India") {
			item.innerHTML = "₹" + priceList.inr;
		}
	});
};

const updateMonthlyAndOneTimePrice = country => {
	const oneTimePrice = document.querySelectorAll(".one-time-price");
	const pricePerMonth = document.querySelector(".price-per-month");

	const prices = {
		usd: {
			monthly: 3,
			oneTime: 36
		},
		gbp: {
			monthly: 2.18,
			oneTime: 26.2
		},
		inr: {
			monthly: 223.32,
			oneTime: 2679.9
		}
	};

	let monthlyPrice, lifeTimePrice;

	if (country === "United States") {
		monthlyPrice = prices.usd.monthly;
		lifeTimePrice = prices.usd.oneTime;
	} else if (country === "Great Britain") {
		monthlyPrice = prices.gbp.monthly;
		lifeTimePrice = prices.gbp.oneTime;
	} else if (country === "India") {
		monthlyPrice = prices.inr.monthly;
		lifeTimePrice = prices.inr.oneTime;
	}

	oneTimePrice?.forEach(function(item) {
		item.innerHTML = lifeTimePrice;
	});
	pricePerMonth.innerHTML = monthlyPrice;
};
