// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

// Add your functions below:

// Task 3.
function validateCred(arr) {
  let checkSum = 0;
  for (let i = arr.length - 1; i >= 0; i -= 2) {
    checkSum = checkSum + arr[i];
  }
  for (let i = arr.length - 2; i >= 0; i -= 2) {
    if (arr[i] * 2 > 9) {
      checkSum = checkSum + arr[i] * 2 - 9;
    } else {
      checkSum = checkSum + arr[i] * 2;
    }
  }
  if (checkSum % 10 === 0) {
    return true;
  } else {
    return false;
  }
}

// Task 4.
function findInvalidCards(pkt) {
  return pkt.filter((element) => !validateCred(element));
}

// Task 5.
function idInvalidCardCompanies(invalidCards) {
  let dbComp = [
    [3, "Amex (American Express)"],
    [4, "Visa"],
    [5, "Mastercard"],
    [6, "Discover"],
  ];
  let probComp = [];
  for (let i = 0; i < dbComp.length; i++) {
    let idComp = dbComp[i][0];
    let namComp = dbComp[i][1];
    for (let j = 0; j < invalidCards.length; j++) {
      let idCompCard = invalidCards[j][0];
      if (idCompCard === idComp) {
        if (!probComp.includes(namComp)) {
          probComp.push(namComp);
        }
      } else {
        if (!dbComp.some((company) => company.includes(idCompCard))) {
          if (!probComp.includes("Company not found")) {
            probComp.push("Company not found");
          }
        }
      }
    }
  }
  return probComp;
}

// Task 7, 2nd point.
function ccStrToNum(strNum) {
  let tempArr = strNum.split("");
  let outputArr = [];
  for (i = 0; i < tempArr.length; i++) {
    outputArr.push(parseInt(tempArr[i]));
  }
  return outputArr;
}

// Task 7, 3rd point.
function fixCheckDigit(ccArr) {
  let checkSum = 0;
  let outputArr = [];
  if (validateCred(ccArr)) {
    return ccArr;
  } else {
    for (let i = ccArr.length - 3; i >= 0; i -= 2) {
      // process numbers just added
      checkSum = checkSum + ccArr[i];
    }
    for (let i = ccArr.length - 2; i >= 0; i -= 2) {
      //processes ruled calculations
      if (ccArr[i] * 2 > 9) {
        checkSum = checkSum + ccArr[i] * 2 - 9;
      } else {
        checkSum = checkSum + ccArr[i] * 2;
      }
    }
  }
  outputArr = ccArr.slice(0, ccArr.length - 1); //removes the incorrect check digit
  checkDigit = 10 - (checkSum % 10);
  if (checkDigit !== 10) {
    outputArr.push(checkDigit);
  } else {
    outputArr.push(0);
  }
  return outputArr;
}

// TESTS

// validateCred function Test
console.log("validateCred function Test \n(checks if a number is valid)");
console.log("invalid1 is valid? " + validateCred(invalid1));

//findInvalidCards function test
console.log("\nThese cards are not valid: ");
console.log(findInvalidCards(batch));

//idInvalidCardCompanies function Test
console.log(
  "\nidInvalidCardCompanies function Test \n(return the companies with problems)"
);
console.log(idInvalidCardCompanies(findInvalidCards(batch)));

//ccStrToNum function Test
console.log(
  "\nccStrToNum function Test \n(converts the string 4539677908016808 to an array)"
);
console.log(ccStrToNum("4539677908016808"));

//fixCheckDigit function Test
let test = mystery4;
console.log(
  "\nfixCheckDigit function Test\nTry varying credit cards (variable 'test')"
);
console.log(test + " >>>> " + validateCred(test) + " incorrect digit ");
console.log(
  fixCheckDigit(test) + " >>>> " + validateCred(fixCheckDigit(test)) + " fixed "
);
