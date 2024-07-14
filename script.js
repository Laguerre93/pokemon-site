document.addEventListener("DOMContentLoaded", function() {
    //Seleciona os elementos do DOM
    const pokemonImage = document.getElementById("pokemon-image");
    const pokemonName = document.getElementById("pokemon-name");
    const pokemonAbilities = document.getElementById("pokemon-abilities");
    const pokemonType = document.getElementById("pokemon-type");
    const searchButton = document.getElementById("search-button");
    const pokemonInput = document.getElementById("pokemon-input");

   
  //Adiciona um evento de clique ao botão de busca
   searchButton.addEventListener("click",function(){
    //Obtém o valor do input e o converte para letras minusculas
        const pokemonNameValue = pokemonInput.value.toLowerCase();

        //Verificar se o input não está vazio
        if (pokemonNameValue.trim() !== "") {
            searchPokemon(pokemonNameValue);
        }
    });
    //Função para buscar as informações do pokemon nma API
    function searchPokemon(name) {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;

        console.log("Fetching data from", apiUrl);
        //Fazer a requisição á API
        fetch(apiUrl)
         .then((response) => {
            //Verifica se a resposta é valido
            if(!response.ok) {
                throw new Error("Pokemon not found!");
            }

            return response.json();//Converte a resposta para json
         })
         .then((data) => {
            //Imprime os dados recebidos no console
            console.log("data received", data);
            pokemonImage.src = data.sprites.front_default; //Atualiza image do pokemon
            pokemonName.textContent = data.name.toLowerCase(); //Atuliza o nome do pokemon
            pokemonType.textContent = "Type: " + data.types  // Atualiza o tipo do pokemon
            .map((type) => type.type.name)
            .join(", ")
            .toLowerCase();
             
            //Limpa a lista de habilidades
            pokemonAbilities.innerHTML = "";
            //Adiciona as habilidades a lista
            data.abilities.forEach((ability) => {
                const li = document.createElement("li");
                li.textContent = ability.ability.name;
                pokemonAbilities.appendChild(li);
            });
        })
        .catch((error) => {
            //  Imprime o erro no console e exibie alerta
            console.log(error);
            alert("Pokemon not found!")
        })
    }
});