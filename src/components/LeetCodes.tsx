const LeetCodes = () => {
  /*** Number of Employees Who Met the Target ***/
  /**
   * @param {number[]} hours
   * @param {number} target
   * @return {number}
   */
  const numberOfEmployeesWhoMetTarget = function (
    hours: number[],
    target: number
  ) {
    let employeesok = 0;
    for (let i = 0; i < hours.length; i++) {
      if (hours[i] >= target) employeesok++;
    }
    return employeesok;
  };

  // console.log(numberOfEmployeesWhoMetTarget([0, 1, 2, 3, 4], 2));

  /****concat***/
  const duplicate = (arr: number[]) => {
    return arr.concat(arr);
  };
  //console.log(duplicate([1, 2, 3, 4]));

  /****buddyStrings***/
  /**
   * @param {string} s
   * @param {string} goal
   * @return {boolean}
   */
  let buddyStrings = function (s: string, goal: string) {
    if (s.length !== goal.length) return false;
    const a = s.split("");
    const b = goal.split("");
    const originalSArr = [...a];
    const originalGoalArr = [...b];
    const c = a.sort().toString();
    const d = b.sort().toString();
    if (c !== d) return false;
    let cont = 0;
    for (let i = 0; i < a.length; i++) {
      if (originalSArr[i] !== originalGoalArr[i]) {
        cont++;
      }
    }
    if (cont > 2 || cont === 1) return false;
    /**ver para cero que pasa si es cero son iguales las cadenas tiene que haber al menos una letra q se repita */
    /**si se repite alguna letra verdadero else falso */
    for (let i = 0; i < a.length; i++) {
      for (let j = i + 1; j < a.length; j++)
        if (originalSArr[i] === originalGoalArr[j]) {
          return true;
        }
    }
    return false;
  };

  //buddyStrings("ab", "ba") ? console.log("verdadero") : console.log("falso");

  const nreinas = (n) => {};

  const wall = (row: number, briks: number) => {
    let str1 = "",
      str2 = "";
    if (briks === 1) {
      str1 = "..";
      str2 = ".|.";
    } else {
      for (let i = 0; i < briks - 1; i++) {
        str1 += "..|";
      }
      str1 += "..";
      str2 = str1.slice(1, str1.length).concat("|.");
    }
    for (let i = row; i > 0; i--) {
      if (i % 2 != 0) {
        console.log(str1);
      } else {
        console.log(str2);
      }
    }
  };

  wall(5, 2);

  return <div></div>;
};

export default LeetCodes;
