
export const Targeta = ({pokemon, volverAjugar}) => {
  return (
    <div className="d-flex justify-content-center align-items-center p-3">
      <div className="text-center">
        <img src={pokemon.sprite} alt="" style={{width:"400px"}}/>
        <p style={{color:"white", fontWeight:"bold"}}>El pokemon era: {pokemon.name}</p>
        <button className="btn btn-light" onClick={volverAjugar}>Volver a Jugar</button>
      </div>
    </div>
  )
}
