//Const
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const decimalButton = document.querySelector('[data-decimal]');
const clearButton = document.querySelector('[data-all-clear]');
const resultDisplay = document.querySelector('[data-result]');
const calculatorDisplay = document.querySelector('[data-result]');

//Global variables
let NewNumber = false;
let PandingOperation = '';

//Iterating Loops
for (let i = 0; i < numberButtons.length; i++) {
  let number = numberButtons[i];
  number.addEventListener('click', function (e) {
    if (resultDisplay.value.length < 20) {
      pressNumberButton(e.target.textContent);
      changeFontSizeDigits();
    }
  });
};

for (let i = 0; i < operationButtons.length; i++) {
  let operation = operationButtons[i];
  operation.addEventListener('click', function (e) {
    performOperation(e.target.textContent);
    changeFontSizeDigits();
  });
};

//Event
decimalButton.addEventListener('click', function (e) {
  addDecimal();
});

clearButton.addEventListener('dblclick', function (e) {
  clearResult();
});

clearButton.addEventListener('click', function (e) {
  clearLastNumber();
});

//Functions
pressNumberButton = (number) => {
  if (NewNumber) {
    resultDisplay.value = number;
    NewNumber = false;
  } else if (resultDisplay.value === '0') {
    resultDisplay.value = number;
  } else {
    resultDisplay.value += number;
  };
};

performOperation = (operationMath) => {

  let localOperationMemory = resultDisplay.value;
  NewNumber = true;

  if (PandingOperation === '+') {
    CurrentNumber += parseFloat(localOperationMemory);
  } else if (PandingOperation === '−') {
    CurrentNumber -= parseFloat(localOperationMemory);
  } else if (PandingOperation === '×') {
    CurrentNumber *= parseFloat(localOperationMemory);
  } else if (PandingOperation === '÷') {
    CurrentNumber /= parseFloat(localOperationMemory);

    //additional operations
  } else if (PandingOperation === '√' && CurrentNumber == 0) {
    CurrentNumber = parseFloat(Math.sqrt(localOperationMemory));
  } else if (PandingOperation === '^') {
    CurrentNumber = parseFloat(Math.pow(CurrentNumber, localOperationMemory));
  } else {
    CurrentNumber = parseFloat(localOperationMemory);
  };

  let numIsNotNaN = numberFixed(CurrentNumber)

  if (numIsNotNaN !== undefined && numIsNotNaN !== NaN && numIsNotNaN !== Infinity) {
    resultDisplay.value = numIsNotNaN;
    PandingOperation = operationMath;
  } else {
    resultDisplay.value = 'error';
  }

};

addDecimal = () => {
  let localDecimalMemory = resultDisplay.value;

  if (NewNumber) {
    localDecimalMemory = '0.';
    NewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    }
  }
  resultDisplay.value = localDecimalMemory;

};

clearResult = () => {
  resultDisplay.value = '0';
  NewNumber = true;
  CurrentNumber = 0;
  PendingOperation = '';
};

clearLastNumber = () => {
  resultDisplay.value = '0';
  NewNumber = true;
};


getSqrt = () => {
  CurrentNumber = resultDisplay.value;
  if (CurrentNumber >= 0) {
    CurrentNumber = Math.sqrt(CurrentNumber);
    resultDisplay.value = CurrentNumber;
  } else {
    resultDisplay.value = ' ';
  }
};

addMinusForCurrentNumber = () => {
  let localMinus = resultDisplay.value;
  localMinus *= '-1'
  resultDisplay.value = localMinus;
};

changeFontSizeDigits = () => {
  if (resultDisplay.value.length < 24) {
    let digitFontSize = 78 - (resultDisplay.value.length * 2.3) + 'px';
    let digitsWindowMarginTop = 56 + (resultDisplay.value.length * 2.1) + 'px';
    resultDisplay.style.fontSize = digitFontSize;
    resultDisplay.style.marginTop = digitsWindowMarginTop;
  }
};

numberFixed = (number, fixed) => {
  if (!isNaN(number)) {
    number = String(number);
    let split = number.split('.');
    if (split.length > 1) {
      let left = split[0];
      let right = split[1].substr(0, (!fixed ? 12 : fixed));
      return Number(left + (fixed !== 0 ? '.' + right : ''));
    } else {
      return Number(number);
    }
  }
}
