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

  // wall(5, 2);

  /**
   * @param {number} celsius
   * @return {number[]}
   */
  let convertTemperature = function (celsius) {
    let ans = [];
    ans[0] = celsius + 273.15;
    ans[1] = celsius * 1.8 + 32.0;
  };

  //console.log(convertTemperature(36.5));

  /**
   * Definition for singly-linked list.
   * function ListNode(val, next) {
   *     this.val = (val===undefined ? 0 : val)
   *     this.next = (next===undefined ? null : next)
   * }
   */
  /**
   * @param {ListNode} l1
   * @param {ListNode} l2
   * @return {ListNode}
   */
  let addTwoNumbers = function (l1, l2) {
    let list1 = l1;
    let list2 = l2;
    let list3 = new ListNode();
    let actualNode = list3;
    let lastNode = new ListNode();
    let rest = 0;
    while (list1 != null && list2 != null) {
      let newNode = new ListNode();
      let val = list1?.val + list2?.val + rest;
      if (val >= 10) {
        actualNode.val = val - 10;
        rest = 1;
      } else {
        actualNode.val = val;
        rest = 0;
      }
      actualNode.next = newNode;
      lastNode = actualNode;
      actualNode = newNode;
      list1 = list1?.next;
      list2 = list2?.next;
    }

    if (list1 === null) {
      while (list2 !== null) {
        let newNode = new ListNode();
        let val = list2?.val + rest;
        if (val >= 10) {
          actualNode.val = val - 10;
          rest = 1;
        } else {
          actualNode.val = val;
          rest = 0;
        }
        actualNode.next = newNode;
        lastNode = actualNode;
        actualNode = newNode;

        list2 = list2?.next;
      }
    } else if (list2 === null) {
      while (list1 !== null) {
        let newNode = new ListNode();
        let val = list1?.val + rest;
        if (val >= 10) {
          actualNode.val = val - 10;
          rest = 1;
        } else {
          actualNode.val = val;
          rest = 0;
        }

        actualNode.next = newNode;
        lastNode = actualNode;
        actualNode = newNode;

        list1 = list1?.next;
      }
    }

    if (rest === 1) {
      actualNode.val = 1;
      actualNode.next = null;
    } else {
      lastNode.next = null;
    }

    return list3;
  };

  /**
   * @param {number[]} nums1
   * @param {number[]} nums2
   * @return {number}
   */
  let findMedianSortedArrays = function (nums1, nums2) {
    const len1 = nums1.length,
      len2 = nums2.length;
    const lenTotal = len1 + len2;
    const res = [];
    let i = 0,
      j = 0,
      n;
    if (lenTotal % 2 === 0) {
      n = lenTotal / 2;
    } else {
      n = (lenTotal + 1) / 2;
    }
    for (let x = 0; x <= n; x++) {
      if (i < len1 && j < len2) {
        // There are elements in nums1 and nums2
        if (nums1[i] <= nums2[j]) {
          res.push(nums1[i]);
          i++;
        } else {
          res.push(nums2[j]);
          j++;
        }
      } else {
        // One of the arrays is exhausted
        if (i >= len1) {
          // If nums1 is exhausted
          res.push(nums2[j]);
          j++;
        } else {
          res.push(nums1[i]);
          i++;
        }
      }
    }
    if (lenTotal % 2 === 0) {
      return (res[n] + res[n - 1]) / 2;
    } else {
      return res[n - 1]; //formato
    }
  };

  return <div></div>;
};

export default LeetCodes;
