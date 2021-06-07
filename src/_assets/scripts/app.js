import getUserLocation, {
	updateCurrencySymbolOnLoad,
	updatedCurrencyOnSelect
} from "./getUserLocation";
import updateCurrentYear from "./updateCurrentYear";

const purchaseWorksheetSection = document.getElementById("purchase-worksheets");

const currency = document.querySelectorAll(".currency");
const dropdown = document.querySelector(".dropdown");
const worksheetItem = document.querySelectorAll(".worksheet-item");
const checkbox = document.querySelectorAll(".checkbox-img");
const selectCountryContainer = document.querySelector(".country-container");
const selectedCountry = document.querySelector(".country-selected");
const optionCountry = document.querySelectorAll(".country-option");

const getSamplesButton = document.querySelector(".get-samples");
const moveToPurchaseButton = document.querySelectorAll(".btn-purchase");
const purchaseButton = document.querySelector(".purchase");
const payButton = document.querySelector(".pay");
const closeButton = document.querySelectorAll(".close-btn");
const subscribeButton = document.querySelector(".subscribe-btn");

const commonModal = document.querySelectorAll(".modal");
const closeModal = document.querySelectorAll(".close-modal");
const sampleModal = document.querySelector(".sample-modal");
const purchaseModal = document.querySelector(".purchase-modal");
const worksheetInfoModal = document.querySelector(".worksheet-info-modal");
const orderCompleteModal = document.querySelector(".order-complete-modal");

const getSampleForm = document.getElementById("get-sample-form");
getSampleForm.addEventListener('submit', function(e){
	e.preventDefault();
	// let elements = getSampleForm.elements;
	// for(let i = 0; i < elements.length; i++){
	// 	console.log( elements[i].value);
	// }
});

// fetching user geo location in order to display currency symbol
async function updateLocationBasedData() {
	const userLocation = await getUserLocation();
	if (userLocation) {
		updateCurrencySymbolOnLoad(currency, userLocation);
	}
}
updateLocationBasedData();

// updating year dynamically in the footer
updateCurrentYear();

// toggle country dropdown
selectCountryContainer?.addEventListener("click", function(e) {
	if (e.target !== dropdown && !dropdown.contains(e.target)) {
		if (!dropdown?.classList.contains("show")) {
			dropdown.classList.add("show");
		}
	}
});

// setting selected styles for worksheet item
worksheetItem?.forEach(function(item) {
	item.addEventListener("click", function() {
		if (!item?.classList.contains("selected")) {
			item.classList.add("selected");
			checkbox.forEach(function(check) {
				if (item?.contains(check)) {
					check.src = "/static/images/checked.svg";
				}
			});
		} else {
			item.classList.remove("selected");
			checkbox.forEach(function(check) {
				if (item?.contains(check)) {
					check.src = "/static/images/outline.svg";
				}
			});
		}
	});
});

// setting selected country
optionCountry?.forEach(function(country) {
	country?.addEventListener("click", function() {
		let countryName = country.innerText;
		let selectedContent = country.innerHTML;
		selectedCountry.innerHTML = selectedContent;
		updatedCurrencyOnSelect(countryName, currency);
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
closeButton?.forEach(function(item) {
	item.addEventListener("click", function() {
		commonModal.forEach(function(modal) {
			if (modal?.classList.contains("show")) modal.classList.remove("show");
		});
	});
});

// scroll to purchase section view if clicked button
moveToPurchaseButton?.forEach(function(item) {
	item.addEventListener("click", function() {
		purchaseWorksheetSection.scrollIntoView(true);
	});
});

// display thank you/ order complete modal after successful pay
payButton?.addEventListener("click", function() {
	commonModal?.forEach(function(modal) {
		if (modal?.classList.contains("show")) modal.classList.remove("show");
	});
	if (!orderCompleteModal?.classList.contains("show")) {
		orderCompleteModal?.classList.add("show");
	}
});

// close dropdown if clicked anywhere on the page
document.body.addEventListener("click", function(e) {
	if (
		e.target !== selectCountryContainer &&
		!selectCountryContainer.contains(e.target)
	) {
		if (dropdown?.classList.contains("show")) {
			dropdown.classList.remove("show");
		}
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




// revealing sections on scroll
const revealElements = document.querySelectorAll(".reveal");
const scrollReveal = ScrollReveal({
	distance: "40px",
	duration: 500,
	delay: 100,
	scale: 0.9
});
scrollReveal.reveal(revealElements);
scrollReveal.reveal(".reveal-right", {
	origin: "right",
	distance: "50px",
	delay: 300
});
scrollReveal.reveal(".reveal-bottom", {
	origin: "bottom",
	distance: "50px",
	delay: 300
});
