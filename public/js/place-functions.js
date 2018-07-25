function changeDivColorToIndicateSelected(target) {

	target.parent().toggleClass('green');

	if (target.parent().hasClass('green')) {
		target.text("undo");
	} else {
		target.text("add");
	}
}

function addSelectedPlacesToSelectedArray(target) {

	let selectedObj = {
		name: target.parent().parent()[0].dataset.name,
		place_id: target.parent().parent()[0].dataset.id,
		event_id: eventId
	};

	if (target.parent()[0].className.includes("green")) {

		selectedArray.push(selectedObj)

	} else {

		let index = selectedArray.findIndex((obj) => {
			return obj.name === selectedObj.name && obj.id === selectedObj.id;
		});

		if (index > -1) {
			selectedArray.splice(index, 1);
		}
	}
}

function addSelectedArrayToSelectedList() {
	let selected = "";

	for (let i = 0; i < selectedArray.length; i++) {
		let name = selectedArray[i].name,
			id = selectedArray[i].id


		selected += "<li class='list-group-item' data-name='" + name + "' data-id='" + id + "'>" + name + "<button type='button' class='btn btn-primary unselect-button'>Undo</button></li>";
	}

	$(".selected-list").html(selected);
}


function createUndoActionInSelectedList() {
	$(".unselect-button").click(function () {
		$(this).parent().toggle("slow");

		//undo the green color change
		let name = $(this).parent()[0].dataset.name;

		let div = $("div.product-inner:contains("+name+")")

		div.toggleClass("green");

		div.children().text("add");

		let index = selectedArray.findIndex((obj) => {
			return obj.name === name;
		});

		if (index > -1) {
			selectedArray.splice(index, 1);
		}

		if(selectedArray.length===0){
			let empty = "<li class='list-group-item'>No restaurant Selected</li>";

			$(".selected-list").html(empty)
		}
	})
}

function appendAjaxDataToHtml(data) {

	let products = "";

	for (let i = 0; i < data.length; i++) {
		let name = data[i].name,
			cuisine = data[i].cuisine,
			address = data[i].address,
			price = data[i].price_range,
			image = data[i].image;
			id = data[i].id;
		if (image === null) {
			image = "/img/no-image-available.jpg"
		}

		//create product cards
		products += "<div class='col-sm-4 product' data-name='" + name + "' data-cuisine='" + cuisine + "' data-address='" + address + "' data-price='" + price + "' data-id='" + id + "'><div class='product-inner'><div class='img-wrapper'><img src='" + image + "'></div><br /><strong>Name: " + name + "</strong><br />Cuisine: " + cuisine + "<br /><div class='info'>Address: " + address + "<br />Price: " + price + "<br /></div><button type='button' class='btn btn-primary select'>add</button></div></div>";

		$("#products").html(products);
	}
}