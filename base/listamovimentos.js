var pokeTarget = "poke-target"
var tempKey = "listaMovimentos"
var listMoveId = "list-move"

function getElementById(id) {
    return document.getElementById(id)
}

function getTempStorage() {
    const tempStorage = localStorage.getItem(tempKey)
    return JSON.parse(tempStorage) || []
}

/*------------------------------------------------------- Funções de Exibição --------------------------------------------------------------------------------------------------------------------------------------*/
preencherPokeTarget()
function preencherPokeTarget() {
    getElementById(pokeTarget).innerHTML = ""
    const realocandoStorage = getTempStorage()
    console.log(realocandoStorage)
    getElementById(pokeTarget).innerHTML +=
        '<div class="col-xl-2 col-md-3 col-sm-4 col-6 mb-4">' +
        '<div><img src="' + realocandoStorage.imgPokemon + '" alt="' + realocandoStorage.nomePokemon + '"></div>' +
        '<h6>' + realocandoStorage.nomePokemon + '</h6>' +
        '</div>'
}
getMoves()
async function getMoves() {
    const realocandoStorage = getTempStorage()
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/' + realocandoStorage.nomePokemon + '')
    console.log(response.data.moves)

    getElementById(listMoveId).innerHTML = ""
    response.data.moves.forEach(function (element, index) {
        getElementById(listMoveId).innerHTML += '<tr>' +
        '<th scope="row">'+(index+1)+'</th>' +
        '<td>'+element.move.name+'</td>' +
        '</tr>'

    });
}



/*------------------------------------------------------- Funções de Botões --------------------------------------------------------------------------------------------------------------------------------------*/
function returnListPokemons() {
    window.location.href = "file:///home/marcos/Desktop/ESTUDOS/projeto%20pokemon%202/coreui-free-bootstrap-admin-template-main/dist/lista-pokemon.html"
    localStorage.removeItem(tempKey)
}

function returnListTeam(){
    window.location.href = "file:///home/marcos/Desktop/ESTUDOS/projeto%20pokemon%202/coreui-free-bootstrap-admin-template-main/dist/base/lista-de-times.html"
    localStorage.removeItem(tempKey)
}