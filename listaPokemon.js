var btnCriarTimeId = "btn-criar"
var btnExcluirId = "btn-excluir"
var btnSalvarId = "btn-salvar"
var preencherListaId = "preencher-lista"
var pokemonsKey = 'pokemons'
var pokemonApiLink = "https://pokeapi.co/api/v2/pokemon"
var previous
var next
var preencherTimeAddId = "time-add"
var divNameTimeId = "div-nome-time"
var lastPage
var tempKey = "listaMovimentos"
var listPokemonKey = "listaPokeAdd"
var nomeTimeId = "nome-time"
var editarKey = "editarStorage"

initPage()

async function initPage() {
    getElementById(nomeTimeId).value = ""
    getElementById(preencherTimeAddId).innerHTML = ""
    localStorage.removeItem(pokemonsKey)
    await loadPokemons(pokemonApiLink)
    startEditar()
    toggleBtnAddTime()
}

function getElementById(id) {
    return document.getElementById(id)
}

function getStoragePokemon() {
    const storagePokemon = localStorage.getItem(pokemonsKey)
    return JSON.parse(storagePokemon) || []
}

function getStorageListaTime() {
    const storageListaTime = localStorage.getItem(listPokemonKey)
    return JSON.parse(storageListaTime) || []
}

function getEditarStorage(){
    const storageEditar = localStorage.getItem(editarKey)
    return JSON.parse(storageEditar)
}
/*------------------------------------------------------- Funções de Exibição --------------------------------------------------------------------------------------------------------------------------------------*/


async function getSprites(nomePokeParam) {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/' + nomePokeParam + '')
    return response.data.sprites.front_default
}



async function loadPokemons(pokeApiParam) {
    lastPage = pokeApiParam
    toggleSpinner()
    toggleBtnAddTime()
    const response = await axios.get(pokeApiParam)
    getElementById(preencherListaId).innerHTML = ""
    for (let index = 0; index < response.data.results.length; index++) {
        const element = response.data.results[index];
        const linkImg = await getSprites(element.name)
        if (getStoragePokemon().length < 6) {
            getElementById(preencherListaId).innerHTML +=
                '<div class="col-xl-2 col-md-3 col-sm-4 col-6 mb-4">' +
                '<div><img src="' + linkImg + '" alt="' + element.name + '"></div>' +
                '<h6>' + element.name + '</h6>' +
                "<button class='btn btn-primary btn-sm' onclick='movimentos(\"" + linkImg + "\",\"" + element.name + "\")'>Movimentos</button>" +
                "<button class='btn btn-success btn-add' onclick='btnAddPokemon(\"" + linkImg + "\",\"" + element.name + "\")' style='display: none;'>Add Time</button>" +
                '</div>'
        } else {
            getElementById(preencherListaId).innerHTML +=
                '<div class="col-xl-2 col-md-3 col-sm-4 col-6 mb-4">' +
                '<div><img src="' + linkImg + '" alt="' + element.name + '"></div>' +
                '<h6>' + element.name + '</h6>' +
                "<button class='btn btn-primary btn-sm' onclick='movimentos(\"" + linkImg + "\",\"" + element.name + "\")'>Movimentos</button>" +
                '</div>'
        }
    }
    toggleSpinner()
    toggleBtnAddTime()
    previous = response.data.previous
    next = response.data.next
}
preencherTimeAdd()

function preencherTimeAdd() {
    const realocandoStorage = getStoragePokemon()
    getElementById(preencherTimeAddId).innerHTML = ""
    realocandoStorage.forEach(function (element, index) {
        getElementById(preencherTimeAddId).innerHTML +=
            '<div class="col-xl-2 col-md-3 col-sm-4 col-6 mb-4">' +
            '<div><img src="' + element.imagem + '" alt="' + element.nome + '"></div>' +
            '<h6>' + element.nome + '</h6>' +
            "<button class='btn btn-primary btn-sm' onclick='movimentos(\"" + element.imagem + "\",\"" + element.nome + "\")'>Movimentos</button><br>" +
            "<button class='btn btn-danger' onclick='BtnRemover(" + index + ")'>Remover</button>" +
            '</div>'

    });
}

function startEditar(){
    let index = getEditarStorage()
    const timeSelecionado = getStorageListaTime()[index]
    const timeSelecionadoArray = []
    console.log(timeSelecionado)
    if(timeSelecionado.pokeUm){
        timeSelecionadoArray.push(timeSelecionado.pokeUm)
    }
    if(timeSelecionado.pokeDois){
        timeSelecionadoArray.push(timeSelecionado.pokeDois)
    }
    if(timeSelecionado.pokeTres){
        timeSelecionadoArray.push(timeSelecionado.pokeTres)
    }
    if(timeSelecionado.pokeQuatro){
        timeSelecionadoArray.push(timeSelecionado.pokeQuatro)
    }
    if(timeSelecionado.pokeCinco){
        timeSelecionadoArray.push(timeSelecionado.pokeCinco)
    }
    if(timeSelecionado.pokeSeis){
        timeSelecionadoArray.push(timeSelecionado.pokeSeis)
    }
    localStorage.setItem(pokemonsKey, JSON.stringify(timeSelecionadoArray))
    getElementById(nomeTimeId).value = timeSelecionado.nomeTime
    preencherTimeAdd()
    toggleCriaTime()    
}



/*------------------------------------------------------- Funções de Toggle  --------------------------------------------------------------------------------------------------------------------------------------*/

function toggleSpinner() {
    var isSpinnerNone = document.getElementById("spinner").style.display == "none"
    if (isSpinnerNone) {
        document.getElementById("spinner").style.display = "inline-block"
        getElementById(preencherListaId).style.display = "none"
        document.querySelectorAll('.btn-change-page').forEach(element => {
            element.disabled = true
        });
    } else {
        document.getElementById("spinner").style.display = "none"
        getElementById(preencherListaId).style.display = "flex"
        document.querySelectorAll('.btn-change-page').forEach(element => {
            element.disabled = false
        });
    }
}

function toggleCriaTime() {
    var isCriarTimeBlock = getElementById(btnCriarTimeId).style.display == "inline-block"
    if (isCriarTimeBlock) {
        getElementById(btnCriarTimeId).style.display = "none"
        getElementById(btnSalvarId).style.display = "inline-block"
        getElementById(btnExcluirId).style.display = "inline-block"
        getElementById(divNameTimeId).style.display = "flex"
        getElementById(preencherTimeAddId).style.display = "flex"
        toggleBtnAddTime()


    } else {
        getElementById(btnCriarTimeId).style.display = "inline-block"
        getElementById(btnSalvarId).style.display = "none"
        getElementById(btnExcluirId).style.display = "none"
        getElementById(divNameTimeId).style.display = "none"
        getElementById(preencherTimeAddId).style.display = "none"

    }

}
function toggleSalvarTime() {
    var isBtnSalvarNone = getElementById(btnSalvarId).style.display == "none"
    if (isBtnSalvarNone) {
        getElementById(btnCriarTimeId).style.display = "none"
        getElementById(btnSalvarId).style.display = "inline-block"
        getElementById(btnExcluirId).style.display = "inline-block"
        getElementById(divNameTimeId).style.display = "flex"
        getElementById(preencherTimeAddId).style.display = "flex"
        toggleBtnAddTime()


    } else {
        getElementById(btnCriarTimeId).style.display = "inline-block"
        getElementById(btnSalvarId).style.display = "none"
        getElementById(btnExcluirId).style.display = "none"
        getElementById(divNameTimeId).style.display = "none"
        getElementById(preencherTimeAddId).style.display = "none"

    }

}
function toggleExcluirTime() {
    var isBtnExcluirNone = getElementById(btnExcluirId).style.display == "none"
    if (isBtnExcluirNone) {
        getElementById(btnCriarTimeId).style.display = "none"
        getElementById(btnSalvarId).style.display = "inline-block"
        getElementById(btnExcluirId).style.display = "inline-block"
        getElementById(divNameTimeId).style.display = "flex"
        getElementById(preencherTimeAddId).style.display = "flex"
        toggleBtnAddTime()


    } else {
        getElementById(btnCriarTimeId).style.display = "inline-block"
        getElementById(btnSalvarId).style.display = "none"
        getElementById(btnExcluirId).style.display = "none"
        getElementById(divNameTimeId).style.display = "none"
        getElementById(preencherTimeAddId).style.display = "none"

    }

}

function toggleBtnAddTime() {
    var isCriarTimeNone = getElementById(btnCriarTimeId).style.display == "none"
    if (isCriarTimeNone) {

        document.querySelectorAll(".btn-add").forEach(element => {
            element.style.display = "inline-block"
        });
    } else {
        document.querySelectorAll(".btn-add").forEach(element => {
            element.style.display = "none"
        });
    }
}



/*------------------------------------------------------- Funções dos Botões --------------------------------------------------------------------------------------------------------------------------------------*/

function nextPage() {
    if (next) {
        loadPokemons(next)
    }
}

function previousPage() {
    if (previous) {
        loadPokemons(previous)
    }
}

function movimentos(pokeImg, pokenome) {
    let pokeselect = {
        imgPokemon: pokeImg,
        nomePokemon: pokenome
    }
    localStorage.setItem(tempKey, JSON.stringify(pokeselect))
    window.location.href = "file:///home/marcos/Desktop/ESTUDOS/projeto%20pokemon%202/coreui-free-bootstrap-admin-template-main/dist/base/lista-de-movimentos.html"

}

function btnAddPokemon(imgPoke, namePoke) {
    let timeAdd = {
        imagem: imgPoke,
        nome: namePoke
    }
    const realocandoStorage = getStoragePokemon()
    realocandoStorage.push(timeAdd)
    localStorage.setItem(pokemonsKey, JSON.stringify(realocandoStorage))

    preencherTimeAdd()
    toggleBtnAddTime()
    loadPokemons(lastPage)

}

function BtnRemover(indexParam) {
    let realocandoStorage = getStoragePokemon()
    realocandoStorage = realocandoStorage.filter(function (element, index) {
        return indexParam != index
    })
    localStorage.setItem(pokemonsKey, JSON.stringify(realocandoStorage))

    preencherTimeAdd()
    toggleBtnAddTime()
    loadPokemons(lastPage)
}

getElementById(btnSalvarId).addEventListener('click', function (event) {
    event.preventDefault();

    const realocandoStorage = getStoragePokemon()
    if (!getElementById(nomeTimeId).value) {
        return alert("preencher nome do time")
    } else {
        let listPoke = {
            nomeTime: getElementById(nomeTimeId).value,
            pokeUm: realocandoStorage[0],
            pokeDois: realocandoStorage[1],
            pokeTres: realocandoStorage[2],
            pokeQuatro: realocandoStorage[3],
            pokeCinco: realocandoStorage[4],
            pokeSeis: realocandoStorage[5]
        }
        const storageListaTime = getStorageListaTime()
        const indexEditar = localStorage.getItem(editarKey)
        if(indexEditar){
            storageListaTime[indexEditar]= listPoke
            localStorage.removeItem(editarKey)
        } else{
        storageListaTime.push(listPoke)
        }
        localStorage.setItem(listPokemonKey, JSON.stringify(storageListaTime))
        getElementById(nomeTimeId).value = ""
        getElementById(preencherTimeAddId).innerHTML = ""
        localStorage.removeItem(pokemonsKey)
        toggleSalvarTime()
        toggleBtnAddTime()
    }
})

getElementById(btnExcluirId).addEventListener('click', function(event){
    event.preventDefault();
    localStorage.removeItem(editarKey)
    localStorage.removeItem(pokemonsKey)
    getElementById(preencherTimeAddId).innerHTML = ""
    getElementById(nomeTimeId).value = ""
    toggleBtnAddTime()
    toggleExcluirTime()
    loadPokemons(lastPage)
    

})