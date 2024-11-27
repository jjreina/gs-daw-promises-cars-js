/**
 *
 * @param {*} fitlers -> name of selectors
 * @param {*} values -> options of select
 */
export let createFilter = (fitlers, values) => {
  let containerFilter = document.createElement("div");
  containerFilter.className = "filters";
  Object.values(values).forEach((uniqueValuesFilter, index) => {
    let span = document.createElement("span");
    let strong = document.createElement("strong");
    strong.textContent = `${fitlers[index]}:`;
    span.appendChild(strong);
    let selectFilter = document.createElement("select");
    // creo un array de opciones para añadir al selector
    let options = uniqueValuesFilter.map((option) => {
      let optionTag = document.createElement("option");
      optionTag.value = option;
      optionTag.text = option;
      if (option === "ALL") optionTag.selected = true;
      return optionTag;
    });
    // Añadimmos las opciones al selector
    selectFilter.append(...options);
    containerFilter.append(span);
    containerFilter.append(selectFilter);
  });
  return containerFilter; // Devolvemos el contenedor con los selectores y sus opciones
};
