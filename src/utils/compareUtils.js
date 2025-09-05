export const comparePokemon = (guess, target) => {
  const compareValue = (a, b) =>
    a < b ? "ftop" : a > b ? "fbot" : "green";

  const compareType = (type, t1, t2) => {
    if (type === t1) return "green";
    if (type === t2) return "orange";
    return "red";
  };

  return {
    ...guess,
    harrow: compareValue(guess.height, target.height),
    warrow: compareValue(guess.weight, target.weight),
    t1color: compareType(guess.type1, target.type1, target.type2),
    t2color: compareType(guess.type2, target.type2, target.type1),
    ccolor: guess.color === target.color ? "green" : "red",
    lcolor: guess.habitat === target.habitat ? "green" : "red",
    gcolor: guess.generation === target.generation ? "green" : "red",
    ecolor: guess.evo === target.evo ? "green" : "red",
  };
};