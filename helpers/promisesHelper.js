import { Car } from "../classes/Car";

export let promiseParserToClass = (literObjectCars) => {
  return new Promise((resolve, reject) => {
    if (literObjectCars !== null && literObjectCars !== undefined) {
      let carsClass = literObjectCars.map((car) => {
        let newCar = new Car(car.id, car.make);
        newCar.model = car.model;
        newCar.type = car.type;
        newCar.year = car.year;
        return newCar;
      });
      resolve(carsClass);
    } else {
      reject("promiseParserToClass: literObjectCars is null or undefined");
    }
  });
};

export let promeseGetCarsByFilters = (cars, year, make, model, type) => {
  return new Promise((resolve, reject) => {
    if (cars !== null && cars !== undefined) {
      let carsByYear = cars.filter((car) => {
        return year !== "ALL" ? car.year >= parseInt(year) : car;
      });
      let carsByMake = carsByYear.filter((car) => {
        return make !== "ALL" ? car.make === make : car;
      });
      let carsByModel = carsByMake.filter((car) => {
        return model !== "ALL" ? car.model === model : car;
      });
      let carsByType = carsByModel.filter((car) => {
        return type !== "ALL" ? car.type === type : car;
      });
      resolve(carsByType);
    } else {
      reject("promeseGetCarsByFilters: cars is null or undefined");
    }
  });
};

export let promiseCreateDivCars = (cars) => {
  return new Promise((resolve, reject) => {
    if (cars !== null && cars !== undefined) {
      let carsDivs = cars.map((car) => {
        let divs = document.createElement("div");
        let modelMakeParagraph = document.createElement("p");
        modelMakeParagraph.textContent = `Model: ${car.model}, Make: ${car.make}`;
        let typeYearParagraph = document.createElement("p");
        typeYearParagraph.textContent = `Type: ${car.type}, Year: ${car.year}`;
        divs.append(modelMakeParagraph, typeYearParagraph);
        return divs;
      });
      resolve(carsDivs);
    } else {
      reject("promiseCreateDivCars: cars is null or undefined");
    }
  });
};
