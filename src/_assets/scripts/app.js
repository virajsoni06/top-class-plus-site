import getUserLocation, {
	updateCurrencySymbolOnLoad,
	updatedCurrencyOnSelect
} from "./getUserLocation";

const purchaseWorksheetSection = document.getElementById("purchase-worksheets");

const currency = document.querySelectorAll(".currency");
const dropdown = document.querySelector(".dropdown");
const worksheetItem = document.querySelectorAll(".worksheet-item");
const checkbox = document.querySelectorAll(".check-container");
const selectCountryContainer = document.querySelector(".country-container");
const selectedCountry = document.querySelector(".country-selected");
const optionCountry = document.querySelectorAll(".country-option");
const subscribeText = document.querySelector(".subscribe-text");
const checkInboxText = document.querySelector(".check-inbox");

const getSamplesButton = document.querySelector(".btn-get-samples");
const moveToPurchaseButton = document.querySelectorAll(".btn-to-purchase");
const purchaseButton = document.querySelector(".btn-purchase");
const payButton = document.querySelector(".btn-pay");
const closeButton = document.querySelectorAll(".btn-close");
const subscribeButton = document.querySelector(".btn-subscribe");

const commonModal = document.querySelectorAll(".modal");
const closeModal = document.querySelectorAll(".close-modal");
const sampleModal = document.querySelector(".sample-modal");
const purchaseModal = document.querySelector(".purchase-modal");
const worksheetInfoModal = document.querySelector(".worksheet-info-modal");
const orderCompleteModal = document.querySelector(".order-complete-modal");

const getSampleForm = document.getElementById("get-sample-form");
const subscribeNewsletterForm = document.getElementById("newsletter-form");

// avoid restoring scroll position on page revisit
if ("scrollRestoration" in history) {
	history.scrollRestoration = "manual";
}

// fetching user geo location in order to display currency symbol
async function updateLocationBasedData() {
	const userLocation = await getUserLocation();
	if (userLocation) {
		updateCurrencySymbolOnLoad(currency, userLocation);
	}
}
updateLocationBasedData();

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
			checkbox?.forEach(function(check) {
				if (item?.contains(check)) {
					check.classList.add("checked");
				}
			});
		} else {
			item.classList.remove("selected");
			checkbox?.forEach(function(check) {
				if (item?.contains(check)) {
					check.classList.remove("checked");
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
	if (getSampleForm?.classList.contains("hidden"))
		getSampleForm.classList.remove("hidden");
	if (!checkInboxText?.classList.contains("hidden"))
		checkInboxText.classList.add("hidden");
	if (!sampleModal?.classList.contains("show"))
		sampleModal?.classList.add("show");
});

// opening purchase modal
// purchaseButton?.addEventListener("click", function() {
// 	if (!purchaseModal?.classList.contains("show")) {
// 		purchaseModal?.classList.add("show");
// 	}
// });

// closing the modal on click close button
closeModal?.forEach(function(item) {
	item.addEventListener("click", function() {
		commonModal.forEach(function(modal) {
			if (modal?.classList.contains("show")) modal.classList.remove("show");
		});
	});
});

// common function to close all modal variants if it is open
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

/////////////////////
// FORMS LOGIC/EVENTS
/////////////////////
getSampleForm?.addEventListener("submit", function(e) {
	e.preventDefault();
	let elements = getSampleForm?.elements;
	let name, email;
	for (let i = 0; i < elements.length; i++) {
		if (elements[i].name === "name") name = elements[i].value.trim();
		if (elements[i].name === "email") email = elements[i].value.trim();
	}
	if (name && email) {
		if (typeof bento$ != "undefined") {
			bento$(function() {
				// bento.identify(email);
				bento.updateFields({ first_name: name });
				bento.tag("sample");
				bento.view();
			});
		}
		getSampleForm.classList.add("hidden");
		checkInboxText?.classList.remove("hidden");
	}
});

subscribeNewsletterForm?.addEventListener("submit", function(e) {
	e.preventDefault();
	let elements = subscribeNewsletterForm?.elements;
	let email;
	for (let i = 0; i < elements.length; i++)
		if (elements[i].name === "email") email = elements[i].value.trim();
	if (email) {
		if (typeof bento$ != "undefined") {
			bento$(function() {
				// bento.identify(email);
				bento.tag("newsletter");
				bento.view();
			});
		}
		if (subscribeText) {
			subscribeText.innerText = "Thank you for subscribing!";
			subscribeNewsletterForm.style.display = "none";
		}
	}
});

/////////////////////
// SCROLL REVEAL
/////////////////////
const revealElements = document.querySelectorAll(".reveal");
const scrollReveal = ScrollReveal({
	distance: "40px",
	duration: 500,
	delay: 100,
	scale: 0.9
});
scrollReveal.reveal(".reveal-1");
scrollReveal.reveal(".reveal-2", { delay: 200 });
scrollReveal.reveal(".reveal-3", { delay: 300 });
scrollReveal.reveal(".reveal-4", { delay: 400 });
scrollReveal.reveal(".reveal-5", { delay: 500 });
scrollReveal.reveal(".reveal-6", { delay: 600 });
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
