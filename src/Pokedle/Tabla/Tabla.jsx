import './tabla.scss'
export const Poketabla = ({tablaPokemon}) => {
  return (
    <div className='d-flex justify-content-center align-items-center'>
    <table className='tabla'>
    <thead>
        <tr>
          <th>Pokemon</th>
          <th>Tipo 1</th>
          <th>Tipo 2</th>
          <th>Evolución</th>
          <th>Habitat</th>
          <th>Color</th>
          <th>Altura</th>
          <th>Peso</th>
          <th>Generación</th>
        </tr>
      </thead>
      <tbody>
        {tablaPokemon.map((poke) =>{
        return (<tr key={poke.name}>
          <td><img src={poke.sprite} alt="" /></td>
          <td className={poke.t1color}>{poke.type1}</td>
          <td className={poke.t2color}>{poke.type2}</td>
          <td className={poke.ecolor}>{poke.evo}</td>
          <td className={poke.lcolor}>{poke.habitat}</td>
          <td className={poke.ccolor}>{poke.color}</td>
          <td className={poke.harrow}>{poke.height}</td>
          <td className={poke.warrow}>{poke.weight}</td>
          <td className={poke.gcolor}>{poke.generation}</td>
        </tr>)})}
      </tbody>
    </table>
    </div>
  )
}
