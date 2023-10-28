import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import PokemonList from "../components/pokedex/PokemonList";
import HeaderPokeball from "../components/layouts/HeaderPokeball";
import { paginateData } from '../utils/pagination.js';
import { setTrainerName } from "../store/slices/trainerName.slice";


const Pokedex = () => {
  //? Aqui estan todos nuestros pokemons 
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("")
  const [types, setTypes] = useState([])
  const [currentType, setCurrentType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)


  const trainerName = useSelector((store) => store.trainerName)

  const dispatch = useDispatch();

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.includes(pokemonName)
  )

  const { itemsInCurrentPage, lastPage, pagesInCurrentBlock } = paginateData(
    pokemonsByName,
    currentPage
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value.toLowerCase().trim());
  };

  const handleChangeType = (e) => {
    setCurrentType(e.target.value)
  }

  const handlePreviustPage = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage);
    }
  };

  const handleNextPage = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage <= lastPage) setCurrentPage(newCurrentPage);

  }

  const handleLogout = () => {
    localStorage.removeItem("trainerName")
    dispatch(setTrainerName(""));

  }



  //? Trae todos los pokemons 
  useEffect(() => {
    if (currentType === "") {
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=1292")
        .then(({ data }) => setPokemons(data.results))
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  //? Trae todos los types disponibles para los pokemons
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then(({ data }) => setTypes(data.results))
      .catch((err) => console.log(err))
  }, [])

  //? Traer todos los pokemons con base a un tipo 
  useEffect(() => {
    if (currentType !== "") {
      axios
        .get(`https://pokeapi.co/api/v2/type/${currentType}/`)
        .then(({ data }) => {
          setPokemons(data.pokemon.map((pokemon) => pokemon.pokemon));
        })
        .catch((err) => console.log(err))
    }

  }, [currentType])

  //? solucion bug no muestra paginas al cambiar de tipo 

  useEffect(() => {
    setCurrentPage(1)
  }, [currentType])


  return (
    <main >

      <HeaderPokeball />
      <section  className="px-5 py-2">
        <p className="text-center text-xl py-1 font-bold">
          <span>Welcome {trainerName},  </span>
          here you can find your favorite pokemon!
        </p>
        <form onSubmit={handleSubmit} >
          <div>
            <input name="pokemonName" type="text" className="w-60 h-15 border-[2px] border-gray-200 bg-white p-2 " />
            <button className=" hover:text-black w-[100px]  hover:bg-red-500 bg-red-700 text-white py-2 px-4 h-[45px] shadow-md">Search</button>
          </div>
          <div className="sm:pl-[100px] md:pl-[400px] lg:pl-[600px] xl:pl-[1000px] w-full">
          <select onChange={handleChangeType} className="capitalize bg-[#4949fa49] pr-20 border-[4px] border-gray-400">
            <option  value="">All pokemons</option>
            {types.map((type) => (
              <option value={type.name} key={type.url}>
                {type.name}
              </option>
            ))}
          </select>
          </div>
          
        </form>
        <button className=" hover:text-black w-[100px]  hover:bg-red-500 bg-red-700 text-white py-2 px-4 h-[45px] shadow-md" onClick={handleLogout}>
          logout
        </button>
      </section>

      <ul className="flex justify-center gap-4 flex-wrap">


{currentPage !== 1 && (
  <li>
    <div className="h-[50px] w-[50px] bg-white border-[3px] border-black rounded-full  left-1/2 -translate-y-1/2 grid place-items-center">
      <div className="w-6 h-6 rounded-full  bg-slate-700 border-[3px]  hover:bg-red-700 border-black">
      <button className="w-8 h-8 text-center" onClick={handlePreviustPage}>{" "}</button>
      </div>
    </div>

  </li>
)}
{pagesInCurrentBlock.map((page) => (
  <li key={page}>
    <button
      onClick={() => setCurrentPage(page)} className={`p-2 text-white font-bold rounded-tr-none rounded-md rounded-bl-none hover:bg-red-500 border-2 border-black ${currentPage === page ? "bg-red-500" : "bg-red-400"}`}>{page}
    </button>
  </li>
))}
{currentPage !== lastPage && (<li className="h-full">
  <div className="h-[50px] w-[50px] bg-white border-[3px] border-black rounded-full  left-1/2 -translate-y-1/2 grid place-items-center">
    <div className="w-6 h-6 rounded-full  bg-slate-700 border-[3px]  hover:bg-red-700 border-black">
      <button className="w-8 h-8  text-center" onClick={handleNextPage}>{" "}</button>
    </div>
  </div>

</li>
)}
</ul>

      <PokemonList pokemons={itemsInCurrentPage} />
    </main>
  )
}

export default Pokedex