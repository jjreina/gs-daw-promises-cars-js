import "./style.css";
import { cars } from "./data/mockData";
import {
  promiseParserToClass,
  promiseFilterByYears,
  promiseCreateDivCars,
} from "./utils-promises";

let containerDiv = document.createElement("div");
containerDiv.classList.add("container");

let h1 = document.createElement("h1");
h1.textContent = "Coches desde el 2010";

containerDiv.appendChild(h1);

document.body.appendChild(containerDiv);

let getCars = async () => {
  let carsClass = await promiseParserToClass(cars);
  let carsfiltedByYear = await promiseFilterByYears(carsClass);
  let carsDivs = await promiseCreateDivCars(carsfiltedByYear);

  let divBlock = document.createElement("div");
  divBlock.className = "block";
  divBlock.append(...carsDivs);
  containerDiv.appendChild(divBlock);
};

getCars();
