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
const payButton = document.querySelector(".btn-pay");
const closeButton = document.querySelectorAll(".btn-close");
const purchaseButton = document.querySelector(".btn-purchase");
// const subscribeButton = document.querySelector(".btn-subscribe");

const commonModal = document.querySelectorAll(".modal");
const closeModal = document.querySelectorAll(".close-modal");
const sampleModal = document.querySelector(".sample-modal");
const orderCompleteModal = document.querySelector(".order-complete-modal");
// const purchaseModal = document.querySelector(".purchase-modal");
// const worksheetInfoModal = document.querySelector(".worksheet-info-modal");

const getSampleForm = document.getElementById("get-sample-form");
const subscribeNewsletterForm = document.getElementById("newsletter-form");

// avoid restoring scroll position on page revisit
if ("scrollRestoration" in history) {
	history.scrollRestoration = "manual";
}

// null check on bento initial page load
if (typeof bento$ != "undefined") {
	bento$(function() {
		bento.view();
		bento.autofill();
	});
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

// opening samples modal
getSamplesButton?.addEventListener("click", function() {
	if (getSampleForm?.classList.contains("hidden"))
		getSampleForm.classList.remove("hidden");
	if (!checkInboxText?.classList.contains("hidden"))
		checkInboxText.classList.add("hidden");
	if (!sampleModal?.classList.contains("show"))
		sampleModal?.classList.add("show");
});

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

// display thank you / order complete modal after successful pay
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
				bento.identify(email);
				bento.updateFields({ name: name });
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
				bento.identify(email);
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
// SNIPCART
/////////////////////
document.addEventListener("snipcart.ready", () => {
	// select worksheet item
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

	// update cart currency on selected country
	optionCountry?.forEach(function(country) {
		country?.addEventListener("click", function() {
			let countryName = country.innerText;
			let selectedContent = country.innerHTML;
			selectedCountry.innerHTML = selectedContent;
			updatedCurrencyOnSelect(countryName, currency, Snipcart);
			dropdown?.classList.remove("show");
		});
	});

	// open cart/checkout
	purchaseButton?.addEventListener("click", function() {
		updateCartCurrency();
		purchaseButton.classList.add("btn-disabled");
		let cartItems = Snipcart.store.getState().cart.items.items;
		let itemsToBeUpdated = [];

		worksheetItem?.forEach(function(item) {
			let object = getCartItemAttributes(item);
			let itemExists = cartItems.findIndex(e => e.id === object.id);
			if (item?.classList.contains("selected")) {
				if (itemExists == -1) itemsToBeUpdated.push(object);
			}
		});

		updateItemsInCart(itemsToBeUpdated).then(_ => {
			purchaseButton.classList.remove("btn-disabled");
			Snipcart.api.theme.cart.open();
		});
	});

	// events to perform on route change
	Snipcart.events.on("theme.routechanged", routesChange => {
		if (routesChange.from === "/" && routesChange.to !== "/") {
			// if cart is opened
		}
		if (routesChange.from !== "/" && routesChange.to === "/") {
			// if cart is closed
		}
	});

	async function updateItemsInCart(array) {
		try {
			for (let i = 0; i < array.length; i++) {
				await Snipcart.api.cart.items.add(array[i]);
			}
		} catch (error) {
			return;
		}
	}

	function getCartItemAttributes(item) {
		let price = JSON.parse(item.getAttribute("data-item-price"));
		return {
			id: item.getAttribute("data-item-id"),
			name: item.getAttribute("data-item-name"),
			price: price,
			url: item.getAttribute("data-item-url"),
			image: item.getAttribute("data-item-image"),
			description: item.getAttribute("data-item-description"),
			quantity: 1,
			maxQuantity: 1,
			minQuantity: 1
		};
	}

	// update cart currency based on user location on initial page load
	function updateCartCurrency() {
		let countryName = selectedCountry?.innerText;
		updatedCurrencyOnSelect(countryName, currency, Snipcart);
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
