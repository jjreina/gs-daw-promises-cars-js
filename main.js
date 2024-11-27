import "./style.css";
import {
  promiseParserToClass,
  promeseGetCarsByFilters,
  promiseCreateDivCars,
} from "./helpers/promisesHelper";
import { createFilter } from "./helpers/domHelper";
import { url, options } from "./api";

const FILTERS = ["Year", "Make", "Model", "Type"];

const getUniqueValuesFilters = (cars) => {
  return {
    year: [...new Set(cars.map((car) => car.year)), "ALL"].sort(), // Creamos un array con valores sin repertir
    make: [...new Set(cars.map((car) => car.make)), "ALL"],
    model: [...new Set(cars.map((car) => car.model)), "ALL"],
    type: [...new Set(cars.map((car) => car.type)), "ALL"],
  };
};

let containerDiv = document.createElement("div");
containerDiv.classList.add("container");

document.body.appendChild(containerDiv);

let divBlock = document.createElement("div");
divBlock.className = "block";

let setFilters = (cars, containerDiv) => {
  let containerFilter = createFilter(FILTERS, getUniqueValuesFilters(cars));
  containerDiv.appendChild(containerFilter);
  let filtersSelectorsTag = document.querySelectorAll("select");

  filtersSelectorsTag.forEach((select) => {
    select.addEventListener("change", (e) => {
      // Añadimos un evento change a cada selector
      divBlock.textContent = ""; // Limpiamos el div de los coches
      // Obtenemos los coches que cumplen con los filtros
      getCars(
        cars,
        filtersSelectorsTag[0].value, // year
        filtersSelectorsTag[1].value, // make
        filtersSelectorsTag[2].value, // model
        filtersSelectorsTag[3].value // type
      );
    });
  });
};

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

// First time
const getCarsFromApi = async (containerDiv) => {
  const response = await fetch(url, options);
  const cars = await response.json();
  setFilters(cars, containerDiv);
  getCars(cars, "ALL", "ALL", "ALL", "ALL");
};

getCarsFromApi(containerDiv);
