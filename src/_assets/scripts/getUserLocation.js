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

export const updateCurrencySymbol = (element, location) => {
	let { country } = location;
	// if the location is available
	if (country) {
		if (country === "India") {
			element.forEach(function(item) {
				item.innerHTML = "₹";
			});
		} else if (country === "United States") {
			element.forEach(function(item) {
				item.innerHTML = "$";
			});
		} else if (country === "United Kingdom") {
			element.forEach(function(item) {
				item.innerHTML = "£";
			});
		} else {
			element.forEach(function(item) {
				item.innerHTML = "£";
			});
		}
		// if the location is not available
	} else {
		element.forEach(function(item) {
			item.innerHTML = "£";
		});
	}
};
