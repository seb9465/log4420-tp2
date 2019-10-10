
/* jQuery selector for the publications navigation link in the header */
const publicationsLinkSelector = '#publications-link';

const Publications = () => {

	function setNavBarActiveButton () {
		$(publicationsLinkSelector).addClass('active');
	}

	function handleDeleteIconButton () {
		$('.del-icon').click((event) => {
			$(event.target).closest('tr').remove();
		});
	}

	return {
		init: () => {
			setNavBarActiveButton();
			handleDeleteIconButton();
		}
	}
};

$(document).ready(() => {
	Publications().init();
});
