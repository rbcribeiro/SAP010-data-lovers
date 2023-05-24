import { ordenarNomes, filtrarPersonagens, computeStats } from '../src/js/data';

const dados = [
  {
    "fullName": "Daenerys Targaryen",
    "family": "House Targaryen"
  },
  {
    "fullName": "Samwell Tarly",
    "family": "House Tarly"
  },
  {
    "fullName": "Jon Snow",
    "family": "House Stark"
  }
];

describe('ordenarNomes', () => {
  it('ordenarNomes is a function', () => {
    expect(typeof ordenarNomes).toBe('function');
  });

  it('retorna em ordem alfabética crescente', () => {
    const ordemEsperada = [
      {
        "fullName": "Daenerys Targaryen",
        "family": "House Targaryen"
      },
      {
        "fullName": "Jon Snow",
        "family": "House Stark"
      },
      {
        "fullName": "Samwell Tarly",
        "family": "House Tarly"
      }
    ];

    const nomesOrdenados = ordenarNomes(dados, 'az');

    expect(nomesOrdenados).toEqual(ordemEsperada);
  });

  it('retorna em ordem alfabética decrescente', () => {
    const ordemEsperada = [
      {
        "fullName": "Samwell Tarly",
        "family": "House Tarly"
      },
      {
        "fullName": "Jon Snow",
        "family": "House Stark"
      },
      {
        "fullName": "Daenerys Targaryen",
        "family": "House Targaryen"
      }
    ];

    const nomesOrdenados = ordenarNomes(dados, 'za');

    expect(nomesOrdenados).toEqual(ordemEsperada);
  });
});

describe('filtrarPersonagens', () => {
  it('filtrarPersonagens is a function', () => {
    expect(typeof filtrarPersonagens).toBe('function');
  });

  it('retorna o personagem filtrado', () => {
    const personagemEsperado = [
      {
        "fullName": "Daenerys Targaryen",
        "family": "House Targaryen"
      }
    ];

    const personagemFiltrado = filtrarPersonagens(dados, 'Daenerys Targaryen', 'House Targaryen');

    expect(personagemFiltrado).toEqual(personagemEsperado);
  });

  it('retorna todos os personagens', () => {
    const familiaEsperada = [
      {
        "fullName": "Daenerys Targaryen",
        "family": "House Targaryen"
      },
      {
        "fullName": "Samwell Tarly",
        "family": "House Tarly"
      },
      {
        "fullName": "Jon Snow",
        "family": "House Stark"
      }
    ];

    const familiaFiltrada = filtrarPersonagens(dados, 'Todos Personagens', 'Todas Famílias');

    expect(familiaFiltrada).toEqual(familiaEsperada);
  });
});

describe('computeStats', () => {
  it('computeStats is a function', () => {
    expect(typeof computeStats).toBe('function');
  });

  it('Verifica a porcentagem do personagem por familia', () => {
    const listaPersonagensFiltrada = dados.filter(personagem => personagem.family === 'House Stark');
    const listaPersonagens = dados;
    const resultado = computeStats(listaPersonagensFiltrada, listaPersonagens);
    
    expect(resultado.percentual).toEqual('33.33');
  });
});