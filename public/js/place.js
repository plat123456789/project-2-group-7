//for testing purpose

// data = [
// 	{
// 		"name": "Yik Wing Noodles Restaurant 億榮粉麵餐廳小廚",
// 		"cuisine": "Hong Kong Style",
// 		"address": "香港仔華富邨商場35號舖",
// 		"price": "Below $50",
// 		"image": "https://static5.orstatic.com/userphoto/doorphoto/B/8W2/01R83KB2AA05FBDC6E2AF6lv.jpg"
// 	},
// 	{
// 		"name": "Wato Sushi 和斗刺身壽司外賣專門店",
// 		"cuisine": "Japanese",
// 		"address": "84 Shek Pai Wan Road, Aberdeen",
// 		"price": "$101-200",
// 		"image": "https://static5.orstatic.com/userphoto/doorphoto/8/70F/01DV4O28C351BDA388B91Clv.jpg"
// 	},
// ];


$(document).ready(function () {

	$(".loader").toggle();

	//get restaurant data
	$.ajax({
			url: "/api/places/initialPlaceData",
			type: "GET",
		})
		.done(function (data) {

			appendDataToHtml(data);

			$(".loader").toggle();
		})

	//disable search button
	$('.form-control').keyup(function () {
		if ($('.form-control').val() != '') {
			$(".searchButton").prop('disabled', false);
		} else {
			$(".searchButton").prop('disabled', true);
		}
	})

	//search bar
	$(".searchButton").click(function () {

		$(".loader").toggle();

		$(".product").remove();

		let string = $('.form-control').val().toString();

		let searchInput = {
			searchInput: string
		}
		$.ajax({
			url: "/api/places/search",
			type: "POST",
			data: searchInput,
		}).done(function (data) {

			if(data.length===0){
				let emptyResult = "<div><h5>No Results Found</h5></div>"

				$("#products").html(emptyResult);
			}

			appendDataToHtml(data);

			$(".loader").toggle();
		})
	})

	//filter
	$(".filter").click(function () {

		$(".loader").toggle();

		$(".product").remove();

		let input = $(".filter").val();

		let searchInput = {
			searchInput: input
		}
		$.ajax({
			url: "/api/places/search",
			type: "POST",
			data: searchInput,
		}).done(function (data) {

			$(".loader").toggle();

			appendDataToHtml(data);
		})
	})

	//add button action
	$(".selection").click(function () {;
		$(event.target).parent().toggleClass('green')

		if ($(event.target).parent().hasClass('green')) {
			$(event.target).text("undo");
		} else {
			$(event.target).text("add");
		}
	})
})


function appendDataToHtml(data) {

	let products = "";

	for (let i = 0; i < data.length; i++) {
		let name = data[i].name,
			cuisine = data[i].cuisine,
			address = data[i].address,
			price = data[i].price_range,
			image = data[i].image;
		if (image === null) {
			image = "../img/no-image-available.jpg"
		}

		//create product cards
		products += "<div class='col-sm-4 product' data-name='" + name + "' data-cuisine='" + cuisine + "' data-address='" + address + "' data-price='" + price + "'><div class='product-inner text-center'><img src='" + image + "'><br />Name: " + name + "<br />Cuisine: " + cuisine + "<br />Address: " + address + "<br />Price: " + price + "<br /><button type='button' class='btn btn-primary selection'>add</button></div></div>";

		$("#products").html(products);
	}
}


































// let filtersObject = {};

// //on filter change
// $(".filter").on("change", function () {
// 	let filtername = $(this).data("filter"),
// 		filterVal = $(this).val();

// 	if (filterVal == "") {
// 		delete filtersObject[filtername];
// 	} else {
// 		filtersObject[filtername] = filterVal;
// 	}

// 	let filters = "";

// 	for (let key in filtersObject) {
// 		if (window.CP.shouldStopExecution(2)) {
// 			break;
// 		}
// 		if (filtersObject.hasOwnProperty(key)) {
// 			filters += "[data-" + key + "='" + filtersObject[key] + "']";
// 		}
// 	}




// 	if (filters == "") {
// 		$(".product").show();
// 	} else {
// 		$(".product").hide();
// 		$(".product").hide().filter(filters).show();
// 	}
// });

// //on search form submit
// $("#search-form").submit(function (e) {
// 	e.preventDefault();
// 	let query = $("#search-form input").val().toLowerCase();

// 	$(".product").hide();
// 	$(".product").each(function () {
// 		let name = $(this).data("name").toLowerCase(),
// 			cuisine = $(this).data("cuisine").toLowerCase(),
// 			address = $(this).data("address").toLowerCase();

// 		if (name.indexOf(query) > -1 || cuisine.indexOf(query) > -1 || address.indexOf(query) > -1) {
// 			$(this).show();
// 		}
// 	});
// });