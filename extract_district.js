let elements = document.querySelectorAll('.btn'); // Nodelist
let districtId = [];
let districtName = [];

let districtElements = Array.from(elements).filter(e => e.getAttribute('class') == 'btn' || e.getAttribute('class') == 'btn  shortlisted'); 

for (let i = 0; i < districtElements.length; i++) {
    districtId.push(districtElements[i].getAttribute('data-param'));
    districtName.push(districtElements[i].getAttribute('data-tag'));
}




var result = {};
districtId.forEach((id, i) => result[id] = districtName[i]);
console.log(result);

