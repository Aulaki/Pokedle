import "./Poketabla.css";

const Poketabla = ({ tablaPokemon }) => {
  return (
    <div className="tabla-container">
      <table className="tabla">
        <thead>
          <tr>
            <th>Sprite</th>
            <th>Tipo 1</th>
            <th>Tipo 2</th>
            <th>Evolución</th>
            <th>Hábitat</th>
            <th>Color</th>
            <th>Altura</th>
            <th>Peso</th>
            <th>Generación</th>
          </tr>
        </thead>
        <tbody>
          {tablaPokemon.map((poke, index) => (
            <tr key={`${poke.name}-${index}`}>
              <td>
                <img src={poke.sprite} alt={poke.name} />
              </td>
              <td className={poke.t1color}>{poke.type1}</td>
              <td className={poke.t2color}>{poke.type2 || "-"}</td>
              <td className={poke.ecolor}>{poke.evo}</td>
              <td className={poke.lcolor}>{poke.habitat}</td>
              <td className={poke.ccolor}>{poke.color}</td>
              <td className={poke.harrow}>{poke.height}</td>
              <td className={poke.warrow}>{poke.weight}</td>
              <td className={poke.gcolor}>{poke.generation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Poketabla;
