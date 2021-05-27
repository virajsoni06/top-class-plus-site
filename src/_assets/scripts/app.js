const currency = document.querySelectorAll(".currency");
const changeCountry = document.querySelector(".change");
const dropdown = document.querySelector(".dropdown");
const worksheetItem = document.querySelectorAll(".worksheet-item");

// fetching geo location in order to display currency
fetch("https://extreme-ip-lookup.com/json/")
	.then(res => res.json())
	.then(response => {
		if (response.country === "India") {
			currency.forEach(function(item) {
				item.innerHTML = "₹";
			});
		} else if (response.country === "United States") {
			currency.forEach(function(item) {
				item.innerHTML = "$";
			});
		} else if (response.country === "United Kingdom") {
			currency.forEach(function(item) {
				item.innerHTML = "£";
			});
		} else {
			currency.forEach(function(item) {
				item.innerHTML = "$";
			});
		}
	})
	.catch((data, status) => {
		currency.forEach(function(item) {
			item.innerHTML = "$";
		});
	});

// toggle country dropdown
changeCountry?.addEventListener("click", function() {
	if (!dropdown?.classList.contains("show")) {
		dropdown.classList.add("show");
	}
});

// setting selected styles
// worksheetItem?.addEventListener("click", function() {
worksheetItem.forEach(function(item) {
	item.addEventListener("click", function() {
		if (!item?.classList.contains("selected")) {
			item.classList.add("selected");
		} else {
			item.classList.remove("selected");
		}
	});
});
