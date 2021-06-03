import getUserLocation, { updateCurrencySymbol } from "./getUserLocation";

const currency = document.querySelectorAll(".currency");
const changeCountry = document.querySelector(".change");
const dropdown = document.querySelector(".dropdown");
const worksheetItem = document.querySelectorAll(".worksheet-item");
const checkbox = document.querySelectorAll(".checkbox-img");
const selectedCountry = document.querySelector(".country-selected");
const optionCountry = document.querySelectorAll(".country-option");

const getSamplesButton = document.querySelector(".get-samples");
const purchaseButton = document.querySelector(".purchase");
const closeButton = document.querySelector(".close-btn");
const subscribeButton = document.querySelector(".subscribe-btn");

const commonModal = document.querySelectorAll(".modal");
const closeModal = document.querySelectorAll(".close-modal");
const sampleModal = document.querySelector(".sample-modal");
const purchaseModal = document.querySelector(".purchase-modal");
const worksheetInfoModal = document.querySelector(".worksheet-info-modal");
const orderCompleteModal = document.querySelector(".order-complete-modal");

// fetching user geo location in order to display currency symbol
async function updateLocationBasedData() {
	const userLocation = await getUserLocation();
	if (userLocation) {
		updateCurrencySymbol(currency, userLocation);
	}
}
updateLocationBasedData();

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
	if (!sampleModal?.classList.contains("show")) {
		sampleModal?.classList.add("show");
	}
});

// opening purchase modal
purchaseButton?.addEventListener("click", function() {
	if (!purchaseModal?.classList.contains("show")) {
		purchaseModal?.classList.add("show");
	}
});

// closing the modal on click close button
closeModal?.forEach(function(item) {
	item.addEventListener("click", function() {
		commonModal.forEach(function(modal) {
			if (modal?.classList.contains("show")) modal.classList.remove("show");
		});
	});
});

// common function to close all modal variants
closeButton?.addEventListener("click", function() {
	if (commonModal?.classList.contains("show")) {
		commonModal?.classList.remove("show");
	}
});

// subscribeButton.addEventListener("click", function() {
// 	// console.log("jinglis button working");
// 	if (typeof bento$ != "undefined") {
// 		bento$(function() {
// 			bento.updateFields({ first_name: "name", last_name: "changed" });
// 			bento.view();
// 		});
// 	}
// });
