
//não funcionar com caracteres especiais
//const readline = require('readline-sync');

//não é permitido incluir caracteres especiais
//const prompt = require('prompt-sync')();

// para usar readline nativo do node
const readline = require('readline');

const livros = require('./database');

// cria interface para funcionar o readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// transforma função em assincrona - funciona igual o readline-async.question()
async function input(prompt) {
  console.log(prompt);
  return (await rl[Symbol.asyncIterator]().next()).value;
}

//inicia o programa assincrono para funcionar com a função
async function main() {
  // pegar input do usuário
  const entradaInicial = await input('Deseja buscar um livro? S/N');

  // Se for Sim, mostra as categorias disponíveis
  if (entradaInicial.toLocaleUpperCase() === 'S') {
    console.log("Essas são as categorias disponíveis: \n");
    let text = '';

    const categorias = livros.map((livro) => {
      return livro.categoria;
    })

    const categoriasSemRepeticao = categorias.filter((categoria, i) => {
      return categorias.indexOf(categoria) === i;
    })

    categoriasSemRepeticao.map((categoria, index) => {
      text += (index !== (categoriasSemRepeticao.length - 1)) ? `${categoria}, ` : `${categoria}.`
    });
    console.log(text);


    const entradaCategoria = await input("Qual categoria você escolhe: ");


    const retorno = livros.filter(livro => livro.categoria === entradaCategoria);

    console.table(retorno);


  } else {  // se não, mostra todas as categorias ordenadas por numero de páginas crescente
    const livrosOrdenados = livros.sort((a, b) => a.paginas - b.paginas);
    console.log("Essas são todos os livros: ");
    console.table(livrosOrdenados);
  }
  rl.close();

}

main();