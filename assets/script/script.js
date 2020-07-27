// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = ""; //clear the old password.
  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword() {
  passwordEngine.getLength();
  passwordEngine.validateLength();
  passwordEngine.getLower();
  passwordEngine.getUpper();
  passwordEngine.validateUpperLower();
  passwordEngine.getNumeric();
  passwordEngine.getSpecial();
  passwordEngine.quit = false;
  return passwordEngine.charArray.join('');
}

var passwordEngine = {
  charArray: [],
  quit: false,
  length: 0,
  lowerCase: false,
  upperCase: false,
  numeric: false,
  specialCharacters: false,

  getLength: function () {
    if (this.quit === false) {
      this.length = prompt(messageBuilder("Enter length of desired password.", "Valid Length is 8-128 characters."));
      if (this.length === null) {
        if (confirmQuit()) {
          this.quit = true;
          return;
        }
        else {
          this.quit = false;
        }
      }
    }
  },
  validateLength: function () {
    if (this.quit === false) {
      while (isNaN(this.length) || this.length < 8 || this.length > 128) {
        this.length = prompt(messageBuilder("Invalid Length!", "Let's try again.",
          "Enter length of desired password.", "Valid Length is 8-128 characters."));
        if (this.length === null) {
          if (confirmQuit()) {
            this.quit = true;
            return;
          }
          else {
            this.quit = false;
          }
        }
      }
    }
  },
  getLower: function () {
    if (this.quit === false) {
      if (confirmType("lower")) {
        this.lowerCase = true;
        this.charArray.push.apply(this.charArray, Array.from("abcdefghijklmnopqrstuvwxyz"));
      }
      else {
        this.lowerCase = false;
      }
      var msg = this.lowerCase ? "Yes" : "No";

      if (!confirmContinue(msg, "lower case alphabets")) {
        this.quit = true;
      }
    }
  },
  getUpper: function () {
    if (this.quit === false) {
      if (confirmType("upper")) {
        this.upperCase = true;
        this.charArray.push.apply(this.charArray, Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ"));
      }
      else {
        this.upperCase = false;
      }
      var msg = this.upperCase ? "Yes" : "No";

      if (!confirmContinue(msg, "upper case alphabets")) {
        this.quit = true;
      }
    }
  },
  validateUpperLower: function () {
    if (this.quit === false) {
      while (this.lowerCase === false && this.upperCase === false && this.quit == false) {
        if (confirm(
          messageBuilder(
            "Alphabet Selection Is Required.",
            "You need To Select Atleast One From Upper or Lower case alphabets.",
            "Continue?")
        )) {
          this.getLower();
          this.getUpper();
        }
        else {
          if (confirmQuit()) {
            this.quit = true;
            return;
          }
          else {
            this.quit = false;
          }
        }
      }
    }
  },
  getNumeric: function () {
    if (this.quit === false) {
      if (confirmType("numeric")) {
        this.numeric = true;
        this.charArray.push.apply(this.charArray, Array.from("0123456789"));
      }
      else {
        this.numeric = false;
      }
      var msg = this.numeric ? "Yes" : "No";

      if (!confirmContinue(msg, "numbers")) {
        this.quit = true;
      }
    }
  },
  getSpecial: function () {
    if (this.quit === false) {
      if (confirmType("special")) {
        this.specialCharacters = true;
        this.charArray.push.apply(this.charArray, Array.from("!@#$%^&*-_+=.?"));
      }
      else {
        this.specialCharacters = false;
      }
      var msg = this.specialCharacters ? "Yes" : "No";
      if (!confirmContinue(msg, "special characters")) {
        this.quit = true;
      }
    }
  }
}
// function to build prompt, confirm, alert message in a nicer way.
// so that you don't have to include the \n in the message.
function messageBuilder(mainMessage, secondMessage, thirdMessage, fourthMessage) {
  var message = mainMessage;
  if (secondMessage !== undefined) {
    message = message + "\n" + "_".repeat(mainMessage.length + 10) + "\n\n" + secondMessage;
  }
  if (thirdMessage !== undefined) {
    message = message + "\n\n" + thirdMessage;
  }
  if (fourthMessage !== undefined) {
    message = message + "\n\n" + fourthMessage;
  }
  return message;
}

function confirmType(strType) {
  switch (strType) {
    case "lower":
      return confirm(
        messageBuilder("Do you want lower case alphabets in your password?",
          "Example: 'abc'.",
          "Press 'Ok' for 'Yes', 'Cancel' for 'No'."
        )
      );
    case "upper":
      return confirm(
        messageBuilder("Do you want upper case alphabets in your password?",
          "Example: 'ABC'.",
          "Press 'Ok' for 'Yes', 'Cancel' for 'No'."
        )
      );
    case "numeric":
      return confirm(
        messageBuilder("Do you want numbers in your password?", "Example: '123'.",
          "Press 'Ok' for 'Yes', 'Cancel' for 'No'."
        )
      );
    case "special":
      return confirm(
        messageBuilder("Do you want special characters in your password?", "Example: '!@#'.",
          "Press 'Ok' for 'Yes', 'Cancel' for 'No'."
        )
      );
  }
}

function confirmContinue(strYesNo, strType) {
  return confirm(messageBuilder("You selected '" + strYesNo.toUpperCase() + "' for '" + strType.toUpperCase() + "'.", "Do you want to continue?"));
}

function confirmQuit() {
  return confirm(
    messageBuilder("You pressed 'Cancel'.", " Do you want to quit?")
  );
}

/**
 *  USE CASES:
GIVEN I need a new, secure password
WHEN I click the button to generate a password
THEN I am presented with a series of prompts for password criteria
WHEN prompted for password criteria
THEN I select which criteria to include in the password
WHEN prompted for the length of the password
THEN I choose a length of at least 8 characters and no more than 128 characters
WHEN prompted for character types to include in the password
THEN I choose lowercase, uppercase, numeric, and/or special characters
WHEN I answer each prompt
THEN my input should be validated and at least one character type should be selected
WHEN all prompts are answered
THEN a password is generated that matches the selected criteria
WHEN the password is generated
THEN the password is either displayed in an alert or written to the page
 */
