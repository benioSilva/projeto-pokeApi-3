var preencherListaTimeId = "preencher-lista-time"
var listPokemonKey = "listaPokeAdd"
var tempKey = "listaMovimentos"
var editarKey = "editarStorage"

function getElementById(id) {
    return document.getElementById(id)
}

function getStorageListaTime() {
    const storageListaTime = localStorage.getItem(listPokemonKey)
    return JSON.parse(storageListaTime) || []
}

/*------------------------------------------------------- Funções de Exibição --------------------------------------------------------------------------------------------------------------------------------------*/
preencherListaTimes()
function preencherListaTimes() {
        const realocandoStorage = getStorageListaTime()
    console.log(realocandoStorage)
    getElementById(preencherListaTimeId).innerHTML = ""
    realocandoStorage.forEach(function (element, index) {
       
        if (element.pokeUm == undefined) {
            element.pokeUm = {
                imagem: "",
                nome: ""
            }
           
        }
        if (element.pokeDois == undefined) {
            element.pokeDois = {
                imagem: "",
                nome: ""
            }
            
        }
        if (element.pokeTres == undefined) {
            element.pokeTres = {
                imagem: "",
                nome: ""
            }
        }
        if (element.pokeQuatro == undefined) {
            element.pokeQuatro = {
                imagem: "",
                nome: ""
            }
        }
        if (element.pokeCinco == undefined) {
            element.pokeCinco = {
                imagem: "",
                nome: ""
            }
        }
        if (element.pokeSeis == undefined) {
            element.pokeSeis = {
                imagem: "",
                nome: ""
            }
        }

        getElementById(preencherListaTimeId).innerHTML += '<tr>' +
            '<th scope="row">' + element.id + '</th>' +
            '<td>' + element.nomeTime + '</td>' +
            '<td>' +
            '<div><img src="' + element.pokeUm.imagem + '" alt="' + element.pokeUm.nome + '"></div>' +
            '<h6>' + element.pokeUm.nome + '</h6>' +
            "<button class='btn btn-primary btn-sm moves-um'  onclick='movimentos(\"" + element.pokeUm.imagem + "\",\"" + element.pokeUm.nome + "\")'>Movimentos</button>" +
            '</td>' +
            '<td>' +
            '<div><img src="' + element.pokeDois.imagem + '" alt="' + element.pokeDois.nome + '"></div>' +
            '<h6>' + element.pokeDois.nome + '</h6>' +
            "<button class='btn btn-primary btn-sm moves-dois'   onclick='movimentos(\"" + element.pokeDois.imagem + "\",\"" + element.pokeDois.nome + "\")'>Movimentos</button>" +
            '</td>' +
            '<td>' +
            '<div><img src="' + element.pokeTres.imagem + '" alt="' + element.pokeTres.nome + '"></div>' +
            '<h6>' + element.pokeTres.nome + '</h6>' +
            "<button class='btn btn-primary btn-sm moves-tres' onclick='movimentos(\"" + element.pokeTres.imagem + "\",\"" + element.pokeTres.nome + "\")'>Movimentos</button>" +
            '</div></td>' +
            '<td>' +
            '<img src="' + element.pokeQuatro.imagem + '" alt="' + element.pokeQuatro.nome + '"></div>' +
            '<h6>' + element.pokeQuatro.nome + '</h6>' +
            "<button class='btn btn-primary btn-sm moves-quatro'  onclick='movimentos(\"" + element.pokeQuatro.imagem + "\",\"" + element.pokeQuatro.nome + "\")'>Movimentos</button>" +
            '</td>' +
            '<td>' +
            '<div><img src="' + element.pokeCinco.imagem + '" alt="' + element.pokeCinco.nome + '"></div>' +
            '<h6>' + element.pokeCinco.nome + '</h6>' +
            "<button class='btn btn-primary btn-sm moves-cinco'  onclick='movimentos(\"" + element.pokeCinco.imagem + "\",\"" + element.pokeCinco.nome + "\")'>Movimentos</button>" +
            '</td>' +
            '<td>' +
            '<div><img src="' + element.pokeSeis.imagem + '" alt="' + element.pokeSeis.nome + '"></div>' +
            '<h6>' + element.pokeSeis.nome + '</h6>' +
            "<button class='btn btn-primary btn-sm moves-seis'  onclick='movimentos(\"" + element.pokeSeis.imagem + "\",\"" + element.pokeSeis.nome + "\")'>Movimentos</button>" +
            '</td>' +
            '<td>' +
            '<button class="btn btn-warning rounded-0" onclick=" btnEditar('+element.id+')">Editar Time</button><br>' +
            '<button class="btn btn-danger rounded-0" onclick="btnExcluir('+element.id+')">Deletar TIme</button>' +
            '</td>' +
            '</tr>'
            if (!element.pokeUm.imagem) {
                    document.querySelectorAll(".moves-um")[index].style.display = "none"
                }
                if (!element.pokeDois.imagem) {
                    document.querySelectorAll(".moves-dois")[index].style.display = "none"
                }
                if (!element.pokeTres.imagem) {
                    document.querySelectorAll(".moves-tres")[index].style.display = "none"
                }
                if (!element.pokeQuatro.imagem) {
                    document.querySelectorAll(".moves-quatro")[index].style.display = "none"
                }
                if (!element.pokeCinco.imagem) {
                    document.querySelectorAll(".moves-cinco")[index].style.display = "none"
                }
                if (!element.pokeSeis.imagem) {
                    document.querySelectorAll(".moves-seis")[index].style.display = "none"
                }
    });
}




/*------------------------------------------------------- Funções de Botões --------------------------------------------------------------------------------------------------------------------------------------*/
function movimentos(pokeImg, pokenome) {
    let pokeselect = {
        imgPokemon: pokeImg,
        nomePokemon: pokenome
    }
    localStorage.setItem(tempKey, JSON.stringify(pokeselect))
    window.location.href = "file:///home/marcos/Desktop/ESTUDOS/projeto%20pokemon%202/coreui-free-bootstrap-admin-template-main/dist/base/lista-de-movimentos.html"

}

function btnExcluir(idTime){
    let realocandoStorage = getStorageListaTime()
    realocandoStorage = realocandoStorage.filter(function(element){
        return element.id != idTime
    }) 
    localStorage.setItem(listPokemonKey, JSON.stringify(realocandoStorage))
    preencherListaTimes()
   
}

function btnEditar(id){
    localStorage.setItem(editarKey, id)
    window.location.href = "file:///home/marcos/Desktop/ESTUDOS/projeto%20pokemon%202/coreui-free-bootstrap-admin-template-main/dist/lista-pokemon.html"
   
}
