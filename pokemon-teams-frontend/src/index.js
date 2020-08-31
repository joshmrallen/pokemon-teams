const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", ()=>{

    const dataHandler = () => {
        fetch(TRAINERS_URL)
            .then(response => response.json())
            .then(trainers => renderTrainers(trainers))
            .catch(error => console.log(error))
    }

    const renderTrainers = (trainersArray) => {
        for(const trainer of trainersArray){
            renderTrainer(trainer)
        }
    }

    const renderTrainer = (trainer) => {
        const div = document.createElement('div')
        div.classList.add('card')
        div.dataset.id = `${trainer.id}`

        div.innerHTML = `
            <p>${trainer.name}</p>
            <button class='add-pokemon' data-trainer-id = ${trainer.id}>Add Pokemon</button>
            <ul></ul>
        `

        const main = document.querySelector('main')
        main.append(div)
        renderPokemons(trainer)
    }

    const renderPokemons = (trainer) => {
        const trainerDiv = document.querySelector(`[data-id="${trainer.id}"]`)
        const ul = trainerDiv.querySelector('ul')
        
        for(const pokemon of trainer.pokemons){
            const li = document.createElement('li')
            li.innerHTML = `
                ${pokemon.nickname} (${pokemon.species})
                <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
            `
            ul.append(li)
        }
    }

    const addPokemon = () => {

    }

    document.addEventListener("click", (e)=>{

        if(e.target.matches('.add-pokemon')){
            const button = e.target
            console.log("poke-hello")
            const trainerId = button.dataset.trainerId
            console.log(trainerId)
            const options = {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({
                    "trainer_id": trainerId
                })
            }
            
            const ul = document.querySelector(`[data-id="${trainerId}"]`).querySelector('ul')
            const li = document.createElement('li')

            fetch(POKEMONS_URL, options)
                .then(response => response.json())
                .then(pokemon => {
                    li.innerHTML = `
                        ${pokemon.nickname} (${pokemon.species})
                        <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
                    `
                    ul.append(li)
                })

        } else if(e.target.matches('.release')){
            const button = e.target
            const pokeId = button.dataset.pokemonId

            const options = {
                method: "DELETE",
            }

            fetch(`${POKEMONS_URL}/${pokeId}`, options)
                .then(button.parentElement.remove())
        }
    })

    dataHandler()



























})