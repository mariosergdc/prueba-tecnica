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

  console.log(numberOfEmployeesWhoMetTarget([0, 1, 2, 3, 4], 2));

  return <div></div>;
};

export default LeetCodes;
