let selectedArray = [];

let url = window.location.pathname;

let eventId = url.match(/\/event\/(\d+)\/place/)[1];

$(document).ready(function () {

	$(".loader").toggle();

	//get restaurant data
	$.ajax({
			url: "/api/places/initialPlaceData",
			type: "GET",
		})
		.done(function (data) {

			appendAjaxDataToHtml(data);

			$(".loader").toggle();

			//add button action
			$(".select").click(function () {

				changeDivColorToIndicateSelected($(event.target));

				addSelectedPlacesToSelectedArray($(event.target));

				addSelectedArrayToSelectedList();

				createUndoActionInSelectedList();
			})
		})

	//disable search button when empty
	$('.form-control').keyup(function () {
		if ($('.form-control').val() != '') {
			$(".searchButton").prop('disabled', false);
		} else {
			$(".searchButton").prop('disabled', true);
		}
	})

	//search bar & filter
	$(".searchButton, .filter").click(function () {

		let inputString;

		if ($(event.target).is(".searchButton")) {
			inputString = $('.form-control').val();
		} else {
			inputString = $(this).val();
		}

		$(".loader").toggle();

		$(".product").remove();

		let searchInput = {
			searchInput: inputString
		}

		$.ajax({
				url: "/api/places/search",
				type: "POST",
				data: searchInput,
			})
			.done(function (data) {

				if (data.length === 0) {
					let emptyResult = "<div><h5>No Results Found</h5></div>"

					$("#products").html(emptyResult);
				}

				appendAjaxDataToHtml(data);

				$(".loader").toggle();

				//add button action
				$(".select").click(function () {

					changeDivColorToIndicateSelected($(event.target));

					addSelectedPlacesToSelectedArray($(event.target));

					addSelectedArrayToSelectedList();

					createUndoActionInSelectedList();
				})
			})
	})


	//toggle on & off the Selected list
	$(".list-button").click(function () {
		$(".selected-list").toggleClass("listoff");
	})

	//continue button
	$(".continue").click(function(){

		console.log(selectedArray)
		$.ajax({
			url: "/api/places",
			type: "POST",
			data: {"placeData": JSON.stringify(selectedArray)},
		}).done(data=>document.location=(window.location.protocol + "//" +window.location.hostname + "/event/" + data[0]))
	})

})
