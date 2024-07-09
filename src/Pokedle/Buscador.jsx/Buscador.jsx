
export const PokeBuscador = ({handleSearch, search, victory}) => {
  return (
    <>
    <input type="text" onChange={handleSearch} value={search} disabled={victory ? true : false}/>
    </>
  )
}
