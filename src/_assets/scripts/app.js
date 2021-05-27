// console.log(`I was loaded at ${Date(Date.now()).toString()}`);

const currency = document.querySelectorAll(".currency");

fetch("https://extreme-ip-lookup.com/json/")
	.then(res => res.json())
	.then(response => {
		if (response.country === "India") {
			currency.forEach(function(item) {
				item.innerHTML = "₹";
			});
		} else if (response.country === "USA") {
			currency.innerHTML = "K";
		} else if (response.country === "UK") {
			currency.innerHTML = "L";
		} else {
			currency.innerHTML = "K";
		}
		console.log("Country: ", response);
	})
	.catch((data, status) => {
		console.log("Request failed");
	});
