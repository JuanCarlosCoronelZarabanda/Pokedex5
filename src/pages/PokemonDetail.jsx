import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import HeaderPokeball from "../components/layouts/HeaderPokeball";
import { bgByType, borderByType } from "../constants/pokemon";


const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState(null)
  const { pokemonId } = useParams();
  const types = pokemon?.types.map((type) => type.type.name).join(" / ")
  console.log(types)





  const getPercentStat = (statValue) => {
    const MAX_STAT_VALUE = 255
    const percentStat = ((statValue * 100) / MAX_STAT_VALUE).toFixed(1)
    return `${percentStat}%`
  }

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="border-[4px] text-center capitalize grid gap-6">
     
      <HeaderPokeball />
      <article className="max-w-[500px] mx-auto py-1 px-2 border-[8px] border-gray-200" >
     
        <header className={`${bgByType[pokemon?.types[0].type.name]} border-[6px] ${ borderByType[pokemon?.types[1].type.name]}`} >
          <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
        </header>

        <div className="text-center py-4 text-2xl font-bold">
          <h3>#{pokemon?.id}</h3>
          <h3>{pokemon?.name}</h3>
        </div>


        <div className="grid grid-cols-2 gap-1  py-1">
          <div>
            <h3 className=" text-center text-xl break-words font-semibold">Types</h3>
            <div className={`w-full py-2 h-[50px] text-md text-center text-violet-950 ${bgByType[pokemon?.types[0].type.name]}`}>
              <span >{pokemon?.types[0].type.name}</span>
            </div>
          </div>
          <div>
            <h3 className="text-xl   break-words font-semibold">Abilities</h3>
            <div className={` w-full py-2 h-[50px] text-md text-center text-violet-950 ${bgByType[pokemon?.types[1].type.name]}`}>
              <span >{pokemon?.types[1].type.name}</span>
            </div>
          </div>
        </div>

        <hr className="border-[3px] rounded-md border-violet-300" />

        {/* Stats */}
        <section>
          <h3 className="text-center text-xl  py-1 font-semibold">Stats</h3>
          <ul className="grid gap-4">
            {pokemon?.stats.map((stat) => (
              <li className="capitalize" key={stat.stat.name}>
                <div className="flex justify-between items-center">
                  <h5>{stat.stat.name}</h5>
                  <span>{stat.base_stat}/255</span>
                </div>
                {/* Total Bar */}
                <div className="bg-slate-200 rounded-md h-6 overflow-hidden">
                  {/* Bar Progress */}
                  <div
                    style={{ width: getPercentStat(stat.base_stat) }}
                    className="bg-yellow-400 h-full"
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  )
}

export default PokemonDetail