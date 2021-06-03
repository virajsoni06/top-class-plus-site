const updateCurrentYear = () => {
	let element = document.querySelector(".current-year");
	let date = new Date();
	var year = date.getFullYear();
	element.innerHTML = year.toString();
};

export default updateCurrentYear;
