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
	const countryName = document.querySelector(".country-name");
	const countryFlag = document.querySelector(".country-flag");
	let { country } = location;
	// if the location is available
	if (country) {
		if (country === "India") {
			element.forEach(function(item) {
				item.innerHTML = "₹";
			});
			countryName.innerHTML = country;
			countryFlag.src = "/static/images/in-flag.svg";
		} else if (country === "United States") {
			element.forEach(function(item) {
				item.innerHTML = "$";
			});
			countryName.innerHTML = country;
			countryFlag.src = "/static/images/us-flag.svg";
		} else if (country === "United Kingdom") {
			element.forEach(function(item) {
				item.innerHTML = "£";
			});
			countryName.innerHTML = "Great Britain";
			countryFlag.src = "/static/images/gb-flag.svg";
		} else {
			element.forEach(function(item) {
				item.innerHTML = "£";
			});
			countryName.innerHTML = "Great Britain";
			countryFlag.src = "/static/images/gb-flag.svg";
		}
		// if the location is not available
	} else {
		element.forEach(function(item) {
			item.innerHTML = "£";
		});
	}
};

export const updatedCurrencyOnSelect = (country, element) => {
	if (country === "United States") {
		element.forEach(function(item) {
			item.innerHTML = "$";
		});
	} else if (country === "Great Britain") {
		element.forEach(function(item) {
			item.innerHTML = "£";
		});
	} else if (country === "India") {
		element.forEach(function(item) {
			item.innerHTML = "₹";
		});
	}
};
