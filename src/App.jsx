import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [havePokemon, setHavePokemon] = useState([]);
  const [pokesearch, setPokesearch] = useState("");

  function loadAPI() {
    console.log("teste", pokesearch);
    let url = `https://pokeapi.co/api/v2/pokemon/${pokesearch}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log("json", json);
        if (json.results) {
          setHavePokemon(false);
          return;
        }
        setHavePokemon(true);
        setPokemon(json);
      })
      .catch((err) => setHavePokemon(false));
  }

  useEffect(() => {
    loadAPI();
  }, []);

  return (
    <>
      <div className="container">
        <header>
          <img
            src="https://cdn.pixabay.com/photo/2016/09/01/09/31/pokemon-1635610_640.png"
            alt="Pokebola"
          />
          <strong>POKEDEX</strong>
        </header>

        <div className="card-pokemon">
          <div className="card-header">
            <div className="poke-ball"></div>
            <div className="button red"></div>
            <div className="button yellow"></div>
            <div className="button green"></div>
          </div>

          <div className="pokemon-screen">
            {havePokemon ? (
              <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
            ) : (
              <img
                className="img-interrogation"
                src="https://png.pngtree.com/element_our/20200702/ourmid/pngtree-cartoon-golden-question-mark-png-element-image_2279136.jpg"
                alt="?"
              />
            )}
          </div>

          {havePokemon && (
            <div className="pokemon-info">
              <div>Nº: {pokemon.id}</div>
              <div>Name: {pokemon.name}</div>
              <div>Peso: {pokemon.weight / 10}kg</div>
              <div>Altura: {pokemon.height / 10}m</div>
            </div>
          )}

          <div className="card-actions">
            <input
              type="text"
              onChange={(e) => setPokesearch(e.target.value)}
              placeholder="Digite o nome de um pokemon"
            />
            <button onSubmit={() => loadAPI()} onClick={() => loadAPI()}>
              Buscar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
