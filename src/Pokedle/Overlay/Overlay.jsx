import './overlay.scss'


export const PokeOverlay = ({ lista, search, isThisPokemon }) => {

  return (
    <div className="dropdown">
      {search && (
        <ul style={{ listStyle: "none" }}  className="dropdown">
          {lista.map((e, i) => (
            <li key={i}><div onClick={()=>isThisPokemon(e)} className='d-flex justify-content-center align-items-center gap-5' ><img src={e.sprite} alt="" /><p>{e.name}</p></div></li>
          ))}
        </ul>
      )}
    </div>
  );
};
