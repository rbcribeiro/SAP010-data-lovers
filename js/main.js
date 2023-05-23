import got from '../data/got/got.js';
import { ordenarNomes, filtrarPersonagens } from '../js/data.js';

const listaPersonagens = got.got;
const ordenacao = document.getElementById("ordenacao");
const selecionarFamilia = document.getElementById("selecionarFamilia");
const selecionarPersonagens = document.getElementById("selecionarPersonagens");

ordenacao.addEventListener("change", onChangeOrdenacao);
selecionarFamilia.addEventListener("change", onChangeSelecionarFamilia);
selecionarPersonagens.addEventListener("change", onChangeSelecionarPersonagens);

onChangeOrdenacao();
onChangeSelecionarFamilia();
onChangeSelecionarPersonagens();

function onChangeOrdenacao() {
  const familiaSelecionada = selecionarFamilia.value;
  const listaPersonagensFiltrada = filtrarPersonagens(listaPersonagens, "Todos Personagens", familiaSelecionada);
  const listaOrdenada = ordenarNomes(listaPersonagensFiltrada, ordenacao.value);
  exibirPersonagens(listaOrdenada);
}

function onChangeSelecionarFamilia() {
  const familiaSelecionada = selecionarFamilia.value;

  if (familiaSelecionada === "Todas Famílias") {
    exibirPersonagens(listaPersonagens);
    atualizarListaPersonagens(listaPersonagens);
  } else {
    const listaPersonagensFiltrada = filtrarPersonagens(listaPersonagens, "Todos Personagens", familiaSelecionada);
    exibirPersonagens(listaPersonagensFiltrada);
    atualizarListaPersonagens(listaPersonagensFiltrada);
  }
}

function onChangeSelecionarPersonagens() {
  const personagemSelecionado = selecionarPersonagens.value;

  if (personagemSelecionado === "Todos Personagens") {
    const familiaSelecionada = selecionarFamilia.value;
    const listaPersonagensFiltrada = filtrarPersonagens(listaPersonagens, personagemSelecionado, familiaSelecionada);
    exibirPersonagens(listaPersonagensFiltrada);
  } else {
    const personagem = filtrarPersonagens(listaPersonagens, personagemSelecionado, "Todas Famílias");
    exibirPersonagens(personagem);
  }
}

function exibirPersonagens(personagens) {
  const cardContainer = document.querySelector("#exibirPersonagens");
  cardContainer.innerHTML = '';

  const cardsGot = personagens.map(personagem => {
    const cardDiv = document.createElement('div');
    cardDiv.innerHTML = `
      <img src="${personagem.imageUrl}">
      <h2>${personagem.fullName}</h2>
    `;
    return cardDiv;
  });

  cardsGot.forEach(card => {
    cardContainer.appendChild(card);
  });
}

const familyArray = ['Todas Famílias'];

listaPersonagens.forEach(personagem => {
  if (Array.isArray(personagem.family)) {
    personagem.family.forEach(family => {
      if (!familyArray.includes(family)) {
        familyArray.push(family);
      }
    });
  } else if (typeof personagem.family === 'string' && !familyArray.includes(personagem.family)) {
    familyArray.push(personagem.family);
  }
});

const optionTodasFamilias = document.createElement('option');
optionTodasFamilias.value = "Todas Famílias";
optionTodasFamilias.textContent = "Todas Famílias";
selecionarFamilia.appendChild(optionTodasFamilias);

familyArray.sort().forEach(family => {
  if (family !== "Todas Famílias") {
    const option = document.createElement('option');
    option.value = family;
    option.textContent = family;
    selecionarFamilia.appendChild(option);
  }
});

function atualizarListaPersonagens(personagens) {
  while (selecionarPersonagens.firstChild) {
    selecionarPersonagens.removeChild(selecionarPersonagens.firstChild);
  }

  const optionTodosPersonagens = document.createElement('option');
  optionTodosPersonagens.value = "Todos Personagens";
  optionTodosPersonagens.textContent = "Todos Personagens";
  selecionarPersonagens.appendChild(optionTodosPersonagens);

  const personagensOrdenados = ordenarNomes(personagens, 'az');

  personagensOrdenados.forEach(personagem => {
    const option = document.createElement('option');
    option.value = personagem.fullName;
    option.textContent = personagem.fullName;
    selecionarPersonagens.appendChild(option);
  });
}

const ordenar = document.getElementById('ordenacao');
const opcoesOrdenacao = [
  { value: 'az', textContent: 'A-Z' },
  { value: 'za', textContent: 'Z-A' }
];

opcoesOrdenacao.forEach(opcao => {
  const option = document.createElement('option');
  option.value = opcao.value;
  option.textContent = opcao.textContent;
  ordenar.appendChild(option);
});

document.addEventListener("DOMContentLoaded", () => {
  const anchor = window.location.hash;
  if (anchor === "#exibirPersonagens") {
    ordenacao.value = "az";
    onChangeOrdenacao();
    window.location.href = anchor;
  } else {
    onChangeOrdenacao(); // Chama a função para ordenar os cards ao carregar a página
  }
});
