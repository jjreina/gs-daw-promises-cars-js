import "./style.css";
import { cars } from "./data/mockData";
import {
  promiseParserToClass,
  promeseGetCarsByFilters,
  promiseCreateDivCars,
} from "./promisesHelper";
import { createFilter } from "./domHelper";

const FILTERS = ["Year", "Make", "Model", "Type"];

const uniqueValuesFilters = {
  year: [...new Set(cars.map((car) => car.year)), "ALL"], // Creamos un array con valores sin repertir
  make: [...new Set(cars.map((car) => car.make)), "ALL"],
  model: [...new Set(cars.map((car) => car.model)), "ALL"],
  type: [...new Set(cars.map((car) => car.type)), "ALL"],
};

let containerDiv = document.createElement("div");
containerDiv.classList.add("container");

document.body.appendChild(containerDiv);

let containerFilter = createFilter(FILTERS, uniqueValuesFilters);
containerDiv.appendChild(containerFilter);

let divBlock = document.createElement("div");
divBlock.className = "block";

let getCars = async (cars, year, make, model, type) => {
  let carsClass = await promiseParserToClass(cars);
  let carsfilted = await promeseGetCarsByFilters(
    carsClass,
    year,
    make,
    model,
    type
  );
  let carsDivs = await promiseCreateDivCars(carsfilted);

  divBlock.append(...carsDivs);
  containerDiv.appendChild(divBlock);
};

let filtersSelectorsTag = document.querySelectorAll("select");

filtersSelectorsTag.forEach((select) => {
  select.addEventListener("change", (e) => {
    divBlock.textContent = "";
    getCars(
      cars,
      filtersSelectorsTag[0].value, // year
      filtersSelectorsTag[1].value, // make
      filtersSelectorsTag[2].value, // model
      filtersSelectorsTag[3].value // type
    );
  });
});

getCars(cars, "ALL", "ALL", "ALL", "ALL");
