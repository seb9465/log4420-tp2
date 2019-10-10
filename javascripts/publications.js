
/* jQuery selector for the publications navigation link in the header */
const publicationsLinkSelector = '#publications-link';

/* jQuery selector for the delete icon in the publications table */
const deleteIconSelector = '.del-icon';

const Publications = () => {

	function setNavBarActiveButton () {
		$(publicationsLinkSelector).addClass('active');
	}

	function handleDeleteIconButton () {
		$(deleteIconSelector).click((event) => {
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
