const state = {
  billAmount: 0,
  tipPercentage: 0,
  numberOfPeople: 0,
  tipPerPerson: "",
  totalPerPerson: "",
};

const total = document.querySelector(".total");
const tipAmount = document.querySelector(".tip-amount");

const billAmountInput = document.querySelector(".bill-input");
const tipCustomInput = document.querySelector(".tip-custom-input");
const numberOfPeopleInput = document.querySelector(".number-of-people-input");

const tipRadioButtons = document.querySelectorAll(".tip-calculator__radio");

const tipForm = document.querySelector("#tip-calculator__select-tip-form");

const resetButton = document.querySelector(".reset-button");

resetButton.addEventListener("click", function () {
  reset(state);
});

tipForm.addEventListener("input", function (e) {
  const tipPercentage = new FormData(this).get("tip-calculator__radio");

  if (!tipPercentage) return;

  state.tipPercentage = +tipPercentage;
  tipCustomInput.value = "";

  calculateTipTotal(state);
  updateUI(state);
});

billAmountInput.addEventListener("input", function (e) {
  const input = e.target;

  if (input.validity.valid) {
    hideError(input);

    state.billAmount = +input.value;

    calculateTipTotal(state);
    updateUI(state);

    return;
  }

  state.billAmount = 0;
  showError(input);

  calculateTipTotal(state);
  updateUI(state);
});

tipCustomInput.addEventListener("input", function (e) {
  const input = e.target;

  console.log(input);

  if (input.validity.valid) {
    hideError(input, false);

    state.tipPercentage = +input.value;

    uncheckButtons(tipRadioButtons);

    calculateTipTotal(state);
    updateUI(state);

    return;
  }

  state.tipPercentage = 0;
  showError(input, false);

  calculateTipTotal(state);
  updateUI(state);
});

numberOfPeopleInput.addEventListener("input", function (e) {
  const input = e.target;

  if (input.validity.valid) {
    hideError(input);

    state.numberOfPeople = +input.value;

    calculateTipTotal(state);
    updateUI(state);

    return;
  }

  state.numberOfPeople = 0;
  showError(input);

  calculateTipTotal(state);
  updateUI(state);
});

const uncheckButtons = function (buttonArray) {
  buttonArray.forEach((button) => (button.checked = false));
};

const showError = function (element, hasErrorMessage = true) {
  if (hasErrorMessage) {
    const errorMessage = element
      .closest(".tip-calculator__section")
      .querySelector(".tip-calculator__error-message");

    if (element.validity.badInput) {
      errorMessage.textContent = `Must be a number`;
    }

    if (element.validity.rangeUnderflow) {
      errorMessage.textContent = `Can't be zero`;
    }

    if (element.validity.stepMismatch) {
      errorMessage.textContent = `Too many decimals`;
    }

    if (element.validity.valueMissing) {
      errorMessage.textContent = `Can't be empty`;
    }

    errorMessage.classList.remove("hidden");
  }
};

const hideError = function (element, hasErrorMessage = true) {
  if (hasErrorMessage) {
    const errorMessage = element
      .closest(".tip-calculator__section")
      .querySelector(".tip-calculator__error-message");

    errorMessage.classList.add("hidden");
    errorMessage.textContent = "";
  }
};

const calculateTipTotal = function (stateObject) {
  const totalPerPerson =
    (stateObject.billAmount +
      stateObject.billAmount * (stateObject.tipPercentage / 100)) /
    stateObject.numberOfPeople;

  if (totalPerPerson && isFinite(totalPerPerson)) {
    stateObject.totalPerPerson = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(totalPerPerson);
  } else {
    stateObject.totalPerPerson = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(0);
  }

  const tipPerPerson =
    (stateObject.billAmount * (stateObject.tipPercentage / 100)) /
    stateObject.numberOfPeople;

  if (tipPerPerson && isFinite(tipPerPerson)) {
    stateObject.tipPerPerson = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(tipPerPerson);
  } else {
    stateObject.tipPerPerson = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(0);
  }
};

const updateUI = function (stateObject) {
  total.textContent = stateObject.totalPerPerson;
  tipAmount.textContent = stateObject.tipPerPerson;
};

const reset = function (stateObject) {
  // State reset
  stateObject = {
    billAmount: 0,
    tipPercentage: 0,
    numberOfPeople: 0,
    tipPerPerson: "",
    totalPerPerson: "",
  };

  // UI reset
  billAmountInput.value = "";
  uncheckButtons(tipRadioButtons);
  tipCustomInput.value = "";
  numberOfPeopleInput.value = "";

  total.textContent = "$0.00";
  tipAmount.textContent = "$0.00";
};
