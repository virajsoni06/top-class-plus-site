const currency = document.querySelectorAll(".currency");
const changeCountry = document.querySelector(".change");
const dropdown = document.querySelector(".dropdown");
const worksheetItem = document.querySelectorAll(".worksheet-item");
const checkbox = document.querySelectorAll(".checkbox-img");
const selectedCountry = document.querySelector(".country-selected");
const optionCountry = document.querySelectorAll(".country-option");
const getSamplesButton = document.querySelector(".get-samples");
const closeModal = document.querySelector(".close-modal");
const closeButton = document.querySelector(".close-btn");
const modalShell = document.querySelector(".modal-shell");

// fetching user geo location in order to display currency symbol
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

// setting selected styles for worksheet item
worksheetItem?.forEach(function(item) {
	item.addEventListener("click", function() {
		if (!item?.classList.contains("selected")) {
			item.classList.add("selected");
			checkbox.forEach(function(check) {
				if (item?.contains(check)) {
					check.src = "/static/images/checked.png";
				}
			});
		} else {
			item.classList.remove("selected");
			checkbox.forEach(function(check) {
				if (item?.contains(check)) {
					check.src = "/static/images/outline.png";
				}
			});
		}
	});
});

// setting selected country
optionCountry?.forEach(function(country) {
	country?.addEventListener("click", function() {
		let selectedContent = country.innerHTML;
		selectedCountry.innerHTML = selectedContent;
		dropdown?.classList.remove("show");
	});
});

// opening samples modal
getSamplesButton?.addEventListener("click", function() {
	if (!modalShell?.classList.contains("show")) {
		modalShell?.classList.add("show");
	}
});

// closing the modal on click close button
closeModal?.addEventListener("click", function() {
	if (modalShell?.classList.contains("show")) {
		modalShell?.classList.remove("show");
	}
});

closeButton?.addEventListener("click", function() {
	if (modalShell?.classList.contains("show")) {
		modalShell?.classList.remove("show");
	}
});
