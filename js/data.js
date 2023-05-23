function sort(personagens) {
  const sorted = [...personagens]; // Cria uma cópia do array personagens
  return sorted.sort((a, b) => {
    if (a.fullName < b.fullName) {
      return -1;
    }
    return 1;
  });
}

export const ordenarNomes = (personagens, ordem) => {
  const personagensFiltrados = filtrarPersonagens(personagens, "Todos Personagens", "Todas Famílias");
  let listaOrdenada = sort(personagensFiltrados);

  if (ordem === 'za') {
    listaOrdenada = listaOrdenada.reverse();
  }

  return listaOrdenada;
};

export const filtrarPersonagens = (personagens, nome, familia) => {
  if (nome === "Todos Personagens" && familia === "Todas Famílias") {
    return personagens; // Retorna a lista completa de personagens
  } else {
    return personagens.filter(personagem => {
      const nomeInclui = nome === "Todos Personagens" || personagem.fullName.includes(nome);
      const familiaInclui = familia === "Todas Famílias" || personagem.family.includes(familia);
      return nomeInclui && familiaInclui;
    });
  }
}
