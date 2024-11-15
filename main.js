import "./style.css";

let containerDiv = document.createElement("div");
containerDiv.classList.add("container");

let h1 = document.createElement("h1");
h1.textContent = "Coches desde el 2010";

containerDiv.appendChild(h1);

document.body.appendChild(containerDiv);
