
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

	// https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
	function _updateQueryStringParameter(uri, key, value) {
		const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
		const separator = uri.indexOf('?') !== -1 ? "&" : "?";
		if (uri.match(re)) {
			return uri.replace(re, '$1' + key + "=" + value + '$2');
		}
		else {
			return uri + separator + key + "=" + value;
		}
	}

	function handleFilterBy () {
		$('#fieldFilterSection').on('change', (event) => {
			const newValue = $( "#fieldFilterSection option:selected" ).text()
			const newUrl = _updateQueryStringParameter(window.location.href, 'sort_by', newValue);
			window.location.href = newUrl;
		});
	}

	return {
		init: () => {
			setNavBarActiveButton();
			handleDeleteIconButton();
			handleFilterBy();
		}
	}
};

$(document).ready(() => {
	Publications().init();
});
