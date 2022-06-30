let timer;
let removeFirstImg;

/*---------Fetch Dog Breeds-------*/
async function dogs() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    dogBreedList(data.message);
  } catch (e) {
    console.log(`There was a Problem with the Network`);
  }
}
dogs();

/*----------Create a dropdown----------*/
function dogBreedList(breedList) {
  document.getElementById("dogBreed").innerHTML = `
    <select onchange='loadBreed(this.value)'>
        <option>Choose a Dog Breed</option>
        ${Object.keys(breedList)
          .map(function (breed) {
            return `<option>${breed}</option>`;
          })
          .join("")}
    </select>
    `;
}

/*---------------Get a breed------------*/
async function loadBreed(breed) {
  if (breed != "Choose a Dog Breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    dogSlideShow(data.message);
  }
}

/*--------------Breed Slideshow-------------------*/
function dogSlideShow(images) {
  let currPosition = 0;
  clearInterval(timer);
  clearTimeout(removeFirstImg);

  if (images.length > 1) {
    document.getElementById("slideShow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide" style="background-image: url('${images[1]}')"></div>
    `;
    currPosition += 2;
    if (images.length == 2) currPosition = 0;
    timer = setInterval(nextSlide, 3000);
  } else {
    document.getElementById("slideShow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide"></div>
    `;
  }

  function nextSlide() {
    document
      .getElementById("slideShow")
      .insertAdjacentHTML(
        "beforeend",
        `<div class="slide" style="background-image: url('${images[currPosition]}')"></div>`
      );
    removeFirstImg = setTimeout(function () {
      document.querySelector(".slide").remove();
    }, 1000);
    if (currPosition + 1 >= images.length) {
      currPosition = 0;
    } else {
      currPosition++;
    }
  }
}
