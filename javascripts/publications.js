
/* jQuery selector for the publications navigation link in the header */
const publicationsLinkSelector = '#publications-link';

const Publications = () => {

	function setNavBarActiveButton () {
		$(publicationsLinkSelector).addClass('active');
	}

	return {
		init: () => {
			setNavBarActiveButton();
		}
	}
};

$(document).ready(() => {
	Publications().init();
});
