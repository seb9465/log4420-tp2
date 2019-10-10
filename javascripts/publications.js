'use strict'

/* jQuery selector for the publications navigation link in the header */
const publicationsLinkSelector = '#publications-link';

/* jQuery selector for the delete icon in the publications table */
const deleteIconSelector = '.del-icon';

const Publications = () => {

	function setNavBarActiveButton () {
		$(publicationsLinkSelector).addClass('active');
	}

	function setParamsFromUrl () {
		const sortByQueryStringValue = _getParameterByName('sort_by');
		const orderByQueryStringValue = _getParameterByName('order_by');
		const limitQueryStringValue = _getParameterByName('limit');
		const pageQueryStringValue = _getParameterByName('page');

		if (sortByQueryStringValue) {
			$('#fieldFilterSection').val(sortByQueryStringValue);
		}
		if (orderByQueryStringValue) {
			$('#filterAscValueSection').val(orderByQueryStringValue);
		}
		if (limitQueryStringValue) {
			$('#elementsPerPageSection').val(limitQueryStringValue);
		} else {
			$('#elementsPerPageSection').val(10);
		}
		if (pageQueryStringValue) {
			$(`a.pagination-link[data-pagenumber="${pageQueryStringValue}"]`).addClass('active');
		} else {
			$(`a.pagination-link[data-pagenumber="1"]`).addClass("active");
		}
	}

	function handleDeleteIconButton () {
		$(deleteIconSelector).click((event) => {
			$(event.target).closest('tr').remove();
		});
	}

	// https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
	function _getParameterByName (name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, '\\$&');
		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
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

	function handleFilterByClick () {
		$('#fieldFilterSection').on('change', () => {
			const newValue = $( "#fieldFilterSection option:selected" ).val()
			const newUrl = _updateQueryStringParameter(window.location.href, 'sort_by', newValue);
			window.location.href = newUrl;
		});
	}

	function handleOrderByClick () {
		$('#filterAscValueSection').on('change', () => {
			const newValue = $( "#filterAscValueSection option:selected" ).val()
			const newUrl = _updateQueryStringParameter(window.location.href, 'order_by', newValue);
			window.location.href = newUrl;
		});
	}

	function handlePaginationLinkClick () {
		$('.pagination-link').click((event) => {
			const clickedElem = $(event.target);

			if (clickedElem.hasClass('previous')) {
				const newValue = clickedElem.next('a').attr('data-pagenumber');
				const newUrl = _updateQueryStringParameter(window.location.href, 'page', newValue);
				window.location.href = newUrl;
			} else if (clickedElem.hasClass('next')) {
				const newValue = clickedElem.prev('a').attr('data-pagenumber');
				const newUrl = _updateQueryStringParameter(window.location.href, 'page', newValue);
				window.location.href = newUrl;
			} else {
				const newUrl = _updateQueryStringParameter(window.location.href, 'page', clickedElem.attr('data-pagenumber'));
				window.location.href = newUrl;
			}
		})
	}

	function handleElemsPerPageClick () {
		$('#elementsPerPageSection').on('change', () => {
			const newValue = $( "#elementsPerPageSection option:selected" ).val()
			const newUrl = _updateQueryStringParameter(window.location.href, 'limit', newValue);
			window.location.href = newUrl;
		});
	}

	return {
		init: () => {
			setNavBarActiveButton();
			setParamsFromUrl();
			handleDeleteIconButton();
			handleFilterByClick();
			handleOrderByClick();
			handlePaginationLinkClick();
			handleElemsPerPageClick();
		}
	}
};

$(document).ready(() => {
	Publications().init();
});