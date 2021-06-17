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
			updateWorksheetPrices(country);
		} else if (country === "United States") {
			element.forEach(function(item) {
				item.innerHTML = "$";
			});
			updateCountryNameAndFlag(country, "us-flag.svg");
			updateWorksheetPrices(country);
		} else {
			element.forEach(function(item) {
				item.innerHTML = "£";
			});
			updateCountryNameAndFlag("Great Britain", "gb-flag.svg");
			updateWorksheetPrices("Great Britain");
		}
	} else {
		element.forEach(function(item) {
			item.innerHTML = "£";
		});
		updateCountryNameAndFlag("Great Britain", "gb-flag.svg");
		updateWorksheetPrices("Great Britain");
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
			snipcart.api.session.setCurrency("eur");
		} else if (country === "India") {
			item.innerHTML = "₹";
			snipcart.api.session.setCurrency("inr");
		}
	});
	updateWorksheetPrices(country);
};

const updateWorksheetPrices = country => {
	const itemPrice = document.querySelectorAll(".worksheet-item .item-price");
	let priceList = [
		{ eur: "99.00", usd: "129.00", inr: "7234.00" },
		{ eur: "99.00", usd: "129.00", inr: "7234.00" },
		{ eur: "99.00", usd: "129.00", inr: "7234.00" },
		{ eur: "99.00", usd: "129.00", inr: "7234.00" },
		{ eur: "99.00", usd: "129.00", inr: "7234.00" },
		{ eur: "99.00", usd: "129.00", inr: "7234.00" },
		{ eur: "99.00", usd: "129.00", inr: "7234.00" }
	];
	itemPrice?.forEach(function(item, index) {
		if (country === "United States") {
			item.innerHTML = "$" + priceList[index].usd;
		} else if (country === "Great Britain") {
			item.innerHTML = "£" + priceList[index].eur;
		} else if (country === "India") {
			item.innerHTML = "₹" + priceList[index].inr;
		}
	});
};
