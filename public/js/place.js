//for testing purpose

data = [
	{
		"name": "Yik Wing Noodles Restaurant 億榮粉麵餐廳小廚",
		"cuisine": "Hong Kong Style",
		"address": "香港仔華富邨商場35號舖",
		"price": "Below $50",
		"image": "https://static5.orstatic.com/userphoto/doorphoto/B/8W2/01R83KB2AA05FBDC6E2AF6lv.jpg"
	},
	{
		"name": "Wato Sushi 和斗刺身壽司外賣專門店",
		"cuisine": "Japanese",
		"address": "84 Shek Pai Wan Road, Aberdeen",
		"price": "$101-200",
		"image": "https://static5.orstatic.com/userphoto/doorphoto/8/70F/01DV4O28C351BDA388B91Clv.jpg"
	},
	{
		"name": "Black Cherry Coffee 黑櫻",
		"cuisine": "Western",
		"address": "Shop 6, G/F, Silver Mansion, 81 Shek Pai Wan Road, Aberdeen",
		"price": "Below $50",
		"image": "https://static8.orstatic.com/userphoto/doorphoto/N/I72/03LE937C3692F5B9310B01lv.jpg"
	},
	{
		"name": "湘粵味餐廳",
		"cuisine": "Guangdong",
		"address": "Shop 5, G/F, Block A, Ka Wo Building, 14-22 Ka Wo Street, Tin Wan, Aberdeen",
		"price": "$51-100",
		"image": "https://static8.orstatic.com/userphoto/doorphoto/M/I2M/03KILV7C8A0343C56F1B7Flv.jpg"
	},
	{
		"name": "Sushi Masa 鮨政",
		"cuisine": "Japanese",
		"address": "G/F., 142 Aberdeen Main Road, Aberdeen",
		"price": "$101-200",
		"image": "https://static5.orstatic.com/userphoto/doorphoto/5/43N/00T5YO03CF1B82741ECC79lv.jpg"
	},
	{
		"name": "Take a Break 自在軒",
		"cuisine": "Hong Kong Style",
		"address": "5/F, Aberdeen Municipal Services Building, 203 Aberdeen Main Road, Aberdeen",
		"price": "Below $50",
		"image": "https://static6.orstatic.com/userphoto/doorphoto/0/N0/004JOD4EB643B6BE132552lv.jpg"
	},
	{
		"name": "Arome Bakery 東海堂",
		"cuisine": "Western",
		"address": "Shop WCH2, Wong Chuk Hang MTR Station, Aberdeen",
		"price": "Below $50",
		"image": "https://static8.orstatic.com/userphoto/doorphoto/H/E6Q/02SVXRA0066D90940C15B6lv.jpg"
	},
	{
		"name": "Cafe Whale",
		"cuisine": "Western",
		"address": "Shop 28B, G/F, ABBA Shopping Mall, 223 Aberdeen Main Road, Aberdeen",
		"price": "$51-100",
		"image": "https://static8.orstatic.com/userphoto/doorphoto/Q/KNC/042U0VBEC40AE78C31CF28lv.jpg"
	},
	{
		"name": "雄記茶餐廳",
		"cuisine": "Hong Kong Style",
		"address": "Shop 7, G/F, Siu Kwan Mansion, 118-120 Old Main Street, Aberdeen",
		"price": "Below $50",
		"image": "https://static5.orstatic.com/userphoto/doorphoto/0/NK/004NOC629ACF87C0FA885Clv.jpg"
	}
];

let myData;

$(document).ready(function(){
	$.ajax({
		url:"/placeDate",
		address: "GET",
		success: function(data){
			myData = data
		}
	})
})

console.log(myData);


var products = "";
var names = "";
var cuisines = "";
var addresss = "";

for (var i = 0; i < data.length; i++) {
	var name = data[i].name,
		cuisine = data[i].cuisine,
		address = data[i].address,
		price = data[i].price,
		rawPrice = price.replace("$",""),
		rawPrice = parseInt(rawPrice.replace(",","")),
		image = data[i].image;
	
	//create product cards
	products += "<div class='col-sm-4 product' data-name='"+name+"' data-cuisine='"+cuisine+"' data-address='"+address+"' data-price='"+rawPrice+"'><div class='product-inner text-center'><img src='"+image+"'><br />Name: "+name +"<br />Cuisine: "+cuisine+"<br />Address: "+address+"<br />Price: "+price+"</div></div>";
	
}

$("#products").html(products);
$(".filter-name").append(names);
$(".filter-cuisine").append(cuisines);
$(".filter-address").append(addresss);

var filtersObject = {};

//on filter change
$(".filter").on("change",function() {
	var filtername = $(this).data("filter"),
		filterVal = $(this).val();
	
	if (filterVal == "") {
		delete filtersObject[filtername];
	} else {
		filtersObject[filtername] = filterVal;
	}
	
	var filters = "";
	
	for (var key in filtersObject) {if (window.CP.shouldStopExecution(2)){break;}
	  	if (filtersObject.hasOwnProperty(key)) {
			filters += "[data-"+key+"='"+filtersObject[key]+"']";
	 	 }
	}
window.CP.exitedLoop(2);

	
	if (filters == "") {
		$(".product").show();
	} else {
		$(".product").hide();
		$(".product").hide().filter(filters).show();
	}
});

//on search form submit
$("#search-form").submit(function(e) {
	e.preventDefault();
	var query = $("#search-form input").val().toLowerCase();

	$(".product").hide();
	$(".product").each(function() {
		var name = $(this).data("name").toLowerCase(),
			cuisine = $(this).data("cuisine").toLowerCase(),
			address = $(this).data("address").toLowerCase();

		if (name.indexOf(query) > -1 || cuisine.indexOf(query) > -1 || address.indexOf(query) > -1) {
			$(this).show();
		}
	});
});