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
var timeAlteradoKey = "timeAlterado"

initPage()

async function initPage() {
    getElementById(nomeTimeId).value = ""
    getElementById(preencherTimeAddId).innerHTML = ""
    localStorage.removeItem(pokemonsKey)
    await loadPokemons(pokemonApiLink)
   
    verifcarSeIdExiste()
    
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

function getEditarStorage() {
    const storageEditar = localStorage.getItem(editarKey)
    return JSON.parse(storageEditar)
}

function getTimeAlteradoStorage() {
    const timeAlterado = localStorage.getItem(timeAlteradoKey)
    return JSON.parse(timeAlterado) || []
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
                "<button class='btn btn-primary btn-sm btn-change-page' onclick='movimentos(\"" + linkImg + "\",\"" + element.name + "\")'>Movimentos</button>" +
                "<button class='btn btn-success btn-add btn-change-page' onclick='btnAddPokemon(\"" + linkImg + "\",\"" + element.name + "\")' style='display: none;'>Add Time</button>" +
                '</div>'
        } else {
            getElementById(preencherListaId).innerHTML +=
                '<div class="col-xl-2 col-md-3 col-sm-4 col-6 mb-4">' +
                '<div><img src="' + linkImg + '" alt="' + element.name + '"></div>' +
                '<h6>' + element.name + '</h6>' +
                "<button class='btn btn-primary btn-sm btn-change-page' onclick='movimentos(\"" + linkImg + "\",\"" + element.name + "\")'>Movimentos</button>" +
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
            "<button class='btn btn-primary btn-sm btn-change-page' onclick='movimentos(\"" + element.imagem + "\",\"" + element.nome + "\")'>Movimentos</button><br>" +
            "<button class='btn btn-danger btn-change-page' onclick='BtnRemover(" + element.id + ")'>Remover</button>" +
            '</div>'

    });
}

function startEditar() {
    let idTime = getEditarStorage() 

    
    let timeSelecionado = getStorageListaTime()
    for (let index = 0; index < timeSelecionado.length; index++) {
        const element = timeSelecionado[index];
             if(element.id == idTime){
                    
                const timeSelecionadoArray = []
               


                if (timeSelecionado[index].pokeUm) {
                     timeSelecionadoArray.push(timeSelecionado[index].pokeUm)
                 }
                 if (timeSelecionado[index].pokeDois) {
                     timeSelecionadoArray.push(timeSelecionado[index].pokeDois)
                 }
                 if (timeSelecionado[index].pokeTres) {
                     timeSelecionadoArray.push(timeSelecionado[index].pokeTres)
                 }
                 if (timeSelecionado[index].pokeQuatro) {
                     timeSelecionadoArray.push(timeSelecionado[index].pokeQuatro)
                 }
                 if (timeSelecionado[index].pokeCinco) {
                     timeSelecionadoArray.push(timeSelecionado[index].pokeCinco)
                 }
                 if (timeSelecionado[index].pokeSeis) {
                     timeSelecionadoArray.push(timeSelecionado[index].pokeSeis)
                 }
                timeSelecionadoArray.id = idTime

                
             
                localStorage.setItem(pokemonsKey, JSON.stringify(timeSelecionadoArray))
                getElementById(nomeTimeId).value = timeSelecionado[index].nomeTime
             
                preencherTimeAdd()
                toggleCriaTime()
               loadPokemons(lastPage)   
           }      
        }          
}

function verifcarSeIdExiste(){
    let timeSelecionado = getStorageListaTime()
    let idTime = getEditarStorage() 
    console.log(timeSelecionado)
    console.log(idTime)
    for (let index = 0; index < timeSelecionado.length; index++) {
        const element = timeSelecionado[index];
        if(element.id == idTime){
            console.log(element.id == idTime)
            startEditar()
            return
        } 
    }
    localStorage.removeItem(editarKey)
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
        nome: namePoke,
        id: generateId()
    }
    const realocandoStorage = getStoragePokemon()
    realocandoStorage.push(timeAdd)
    localStorage.setItem(pokemonsKey, JSON
        .stringify(realocandoStorage))

    preencherTimeAdd()
    toggleBtnAddTime()
    loadPokemons(lastPage)

}

function BtnRemover(id) {
    let realocandoStorage = getStoragePokemon()
    realocandoStorage = realocandoStorage.filter(function (element) {
        return element.id != id
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
        let timePoke = {
            nomeTime: getElementById(nomeTimeId).value,
            pokeUm: realocandoStorage[0],
            pokeDois: realocandoStorage[1],
            pokeTres: realocandoStorage[2],
            pokeQuatro: realocandoStorage[3],
            pokeCinco: realocandoStorage[4],
            pokeSeis: realocandoStorage[5]

        }
        let storageListaTime = getStorageListaTime()

        const idLista = localStorage.getItem(editarKey)

        if (idLista) {
            for (let index = 0; index < storageListaTime.length; index++) {
                const element = storageListaTime[index];
                if(element.id == idLista){
                    timePoke.id = idLista
                    storageListaTime[index] = timePoke
                }
                
            }

            


        } else {
            timePoke.id = generateId()
            storageListaTime.push(timePoke)

        }

        localStorage.setItem(listPokemonKey, JSON.stringify(storageListaTime))
        getElementById(nomeTimeId).value = ""
        getElementById(preencherTimeAddId).innerHTML = ""
        localStorage.removeItem(pokemonsKey)
        toggleSalvarTime()
        toggleBtnAddTime()
        localStorage.removeItem(editarKey)

    }
})

getElementById(btnExcluirId).addEventListener('click', function (event) {
    event.preventDefault();
   
    const idLista = localStorage.getItem(editarKey)
   
    if(idLista){
        
        let storageListaTime = getStorageListaTime()
      storageListaTime = storageListaTime.filter(function(element){
        
        return element.id != idLista
      }) 
      localStorage.setItem(listPokemonKey, JSON.stringify(storageListaTime)) 
      localStorage.removeItem(editarKey)
    }
   
    localStorage.removeItem(pokemonsKey)
    getElementById(preencherTimeAddId).innerHTML = ""
    getElementById(nomeTimeId).value = ""
    toggleBtnAddTime()
    toggleExcluirTime()
    loadPokemons(lastPage)


})

function generateId() {
    return new Date().getTime()
}

// function alterarTime(timePoke) {
//     let storageListaTime = getStorageListaTime()
//     let idLista = localStorage.getItem(editarKey)
//     storageListaTime = storageListaTime.filter(function (element) {
//         return element.id == idLista
//     })
    
//     if (storageListaTime.length == 1) {

//         if (storageListaTime[0].id == idLista) {
//             timePoke.id = idLista
//             storageListaTime[0] = timePoke
//         }
        
//     }
// }

