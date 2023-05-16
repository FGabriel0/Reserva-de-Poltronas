const frm = document.querySelector("form");
const dvPalco = document.querySelector("#divPalco");

const POLTRONAS = 150;
const reservadas = [];

window.addEventListener("load", () => {
  const ocupadas = localStorage.getItem("teatroOcupadas")
    ? localStorage.getItem("teatroOcupadas").split(";")
    : [];

  for (let i = 1; i <= POLTRONAS; i++) {
    const figure = document.createElement("figure");
    const imgStatu = document.createElement("img");

    imgStatu.src = ocupadas.includes(i.toString())
      ? "./img/Ocupada.png"
      : "./img/disponivel.png";

    imgStatu.className = "poltrona";
    const figureCap = document.createElement("figcaption");

    const zeros = i < 10 ? "00" : i < 100 ? "0" : "";

    const num = document.createTextNode(`[${zeros}${i}]`);
    figureCap.appendChild(num);
    figure.appendChild(imgStatu);
    figure.appendChild(figureCap);

    if (i % 24 == 12) figure.style.marginRigth = "60px";

    dvPalco.appendChild(figure);

    if (i % 24 == 0) dvPalco.appendChild(document.createElement("br"));
  }
});

frm.addEventListener("submit", (e) => {
  e.preventDefault();
  const poltronas = Number(frm.inPoltrona.value);

  if (poltronas > POLTRONAS) {
    alert("Informe um número de poltronas válido");
    frm.inPoltrona.focus();
    return;
  }

  const ocupadas = localStorage.getItem("teatroOcupadas")
    ? localStorage.getItem("teatroOcupadas").split(";")
    : [];

  if (ocupadas.includes(poltronas.toString())) {
    alert(`Poltrona ${poltronas} já esta ocupada...`);
    frm.inPoltrona.value = "";
    frm.inPoltrona.focus();
    return;
  }

  const imgPoltrona = dvPalco.querySelectorAll("img")[poltronas - 1];
  imgPoltrona.src = "./img/Reservado.png";
  reservadas.push(poltronas);

  frm.inPoltrona.value = "";
  frm.inPoltrona.focus();
});

frm.btConfirmar.addEventListener("click", () => {
  if (reservadas.length == 0) {
    alert("Não há poltronas reservadas");
    frm.inPoltrona.focus();
    return;
  }

  const ocupadas = localStorage.getItem("teatroOcupadas")
    ? localStorage.getItem("teatroOcupadas").split(";")
    : [];

    for(let i = reservadas.length - 1; i >=0; i--){
        ocupadas.push(reservadas[i])

        const imgPoltrona = dvPalco.querySelectorAll("img")[reservadas[i] - 1]

        imgPoltrona.src = "./img/Ocupada.png"
        reservadas.pop()
    }
    localStorage.setItem("teatroOcupadas",ocupadas.join(";"))
});
