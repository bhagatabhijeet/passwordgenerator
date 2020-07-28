// Assignment Code
var generateBtn = document.querySelector("#generate");
var passwordText = document.querySelector("#password");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  passwordText.value = password;
  passwordEngine.reset();
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

/**
  * @desc  generatePassword function generates password and returns the value to UI. The password is generated using passwordEngine Object.  
  * @return string - generated password.
  * @author Abhijeet Bhagat
*/
function generatePassword() {
  passwordEngine.reset();
  passwordEngine.getLength();
  passwordEngine.validateLength();
  passwordEngine.getLower();
  passwordEngine.getUpper();
  passwordEngine.getNumeric();
  passwordEngine.getSpecial();
  passwordText.value = ""; //clear the old password. 

  return passwordEngine.generatePassword();

}

// THINKING OBJECT ORIENTED. One Password Engine Object for password operations

/**
  * @desc passwordEngine Object. The object to store all password criteria , state(like quit) and its operations namely
  * getLower, getUpper, getNumeric, getSpecial,validateLength, validateUpperLower, reset and generatePassword
  * @author Abhijeet Bhagat
*/
var passwordEngine = {
  /**passwordEngine properties - lenght,lowerCase,upperCase,numeric and specialCharacters.
   * quit is a special property used to keep checking if user wants to quit at any stage.
 */
  charArray: [],
  quit: false,
  length: 0,
  lowerCase: false,
  upperCase: false,
  numeric: false,
  specialCharacters: false,

  //reset method is used to reset this.quit and this.charArray in case user wants to try password generation again.
  reset: function () {
    this.quit = false;
    this.charArray = [];
  },

  //getLength - a method to get the desired length by user.
  getLength: function () {
    if (this.quit === false) {
      this.length = prompt(messageBuilder("Enter Length Of Password.", "Valid length is 8-128 characters."));
      if (this.length === null) {
        if (confirmQuit()) {
          this.quit = true;
          showQuitAlert();
          return;
        }
        else {
          this.quit = false;
        }
      }
    }
  },

  //validateLength - a method to validate the length is not garbage and is within valid range of 8-128.
  validateLength: function () {
    if (this.quit === false) {
      while (isNaN(this.length) || this.length < 8 || this.length > 128) {
        this.length = prompt(messageBuilder("Invalid Length!", "Let's try again.",
          "Enter length of desired password.", "Valid Length is 8-128 characters."));
        if (this.length === null) {
          if (confirmQuit()) {
            this.quit = true;
            showQuitAlert();
            return;
          }
          else {
            this.quit = false;
          }
        }
      }
    }
  },

  //getLower - a method to get user preference - i.e if user wants to have lower case chars in password.
  getLower: function () {
    if (this.quit === false) {
      if (confirmType("lower")) {
        this.lowerCase = true;
        //build Array from the string "abcd...." and push it on to charArray.
        this.charArray.push.apply(this.charArray, Array.from("abcdefghijklmnopqrstuvwxyz"));
      }
      else {
        this.lowerCase = false;
      }
      var msg = this.lowerCase ? "Yes" : "No"; //Ternary operator.

      if (!confirmContinue(msg, "lower case alphabets")) {
        this.quit = true;
        showQuitAlert();
      }
    }
  },

  //getUpper - a method to get user preference - i.e if user wants to have upper case chars in password.
  getUpper: function () {
    if (this.quit === false) {
      if (confirmType("upper")) {
        this.upperCase = true;
        //build Array from the string "ABCD...." and push it on to charArray.
        this.charArray.push.apply(this.charArray, Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ"));
      }
      else {
        this.upperCase = false;
      }
      var msg = this.upperCase ? "Yes" : "No";//Ternary operator.

      if (!confirmContinue(msg, "upper case alphabets")) {
        this.quit = true;
        showQuitAlert();
      }
    }
  },

  //getNumeric - a method to get user preference - i.e if user wants to have numbers in password.
  getNumeric: function () {
    if (this.quit === false) {
      if (confirmType("numeric")) {
        this.numeric = true;
        //build Array from the string "01234...." and push it on to charArray.
        this.charArray.push.apply(this.charArray, Array.from("0123456789"));
      }
      else {
        this.numeric = false;
      }
      var msg = this.numeric ? "Yes" : "No";//Ternary operator.

      if (!confirmContinue(msg, "numbers")) {
        this.quit = true;
        showQuitAlert();
      }
    }
  },

  //getSpecial - a method to get user preference - i.e if user wants to have special chars in password.
  getSpecial: function () {
    if (this.quit === false) {
      if (confirmType("special")) {
        this.specialCharacters = true;
        //build Array from the special charactersstring and push it on to charArray.
        this.charArray.push.apply(this.charArray, Array.from("!@#$%^&*-_+=.?"));
      }
      else {
        this.specialCharacters = false;
      }
      var msg = this.specialCharacters ? "Yes" : "No";//Ternary operator.
      if (!confirmContinue(msg, "special characters")) {
        this.quit = true;
        showQuitAlert();
      }
    }
  },

  //generatePassword - this is the method which actually generate the password using random selection from charArray.
  generatePassword: function () {
    var pwd = "";
    if (this.quit === false) {
      if (this.charArray.length === 0) {
        alert(
          messageBuilder(
            "No Criterion Selected.",
            "Password Generator cannot generate password!",
            "Press 'Generate Password' button again and select atleast one criterion."
          )
        );
        return pwd;
      }
      for (let i = 0; i < this.length; i++) {
        pwd = pwd + this.charArray[Math.floor(Math.random() * this.charArray.length)];
      }
      console.log(pwd);
    }
    else {
      pwd = "";
    }
    return pwd;
  }
}

/**
  * @desc  messageBuilder function is used to build prompt, confirm, alert message in a nicer way.
  * @param string  mainMessage - the main message to be displayed.A line is inserted after main message.
  * @param string  secondMessage - the second message to be displayed.
  * @param string  thirdMessage - the third message to be displayed.
  * @param string  fourthMessage - the fourth message to be displayed.
  * @return string contcatenated, formatted string.
*/
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

/**
  * @desc confirmType function is created to keep the confirmmessages so that they could be called when required.
  * This reduces clutter in the calling functions.
  * @param string  strType - the type of password criterion like lower,upper,numeric, special
  * @return boolean  - result of specific confirmation.
  * @author Abhijeet Bhagat
*/
function confirmType(strType) {
  switch (strType) {
    case "lower":
      return confirm(
        messageBuilder("Include Lower Case Alphabets In Password?",
          "Example: 'abc'.",
          "Press 'Ok' for 'Yes', 'Cancel' for 'No'."
        )
      );
    case "upper":
      return confirm(
        messageBuilder("Include Upper Case Alphabets In Password?",
          "Example: 'ABC'.",
          "Press 'Ok' for 'Yes', 'Cancel' for 'No'."
        )
      );
    case "numeric":
      return confirm(
        messageBuilder("Include Numbers In Password?", "Example: '123'.",
          "Press 'Ok' for 'Yes', 'Cancel' for 'No'."
        )
      );
    case "special":
      return confirm(
        messageBuilder("Include Special Characters In Password?", "Example: '!@#'.",
          "Press 'Ok' for 'Yes', 'Cancel' for 'No'."
        )
      );
  }
}

/**
  * @desc confirmContinue function is created to seek confirmation to continue from user.
  * This is to keep code DRY.
  * @param string  strYesNo - a "yes" or "No" string.
  * @return boolean  - result of confirmation.
  * @author Abhijeet Bhagat
*/
function confirmContinue(strYesNo, strType) {
  return confirm(messageBuilder("You Selected '" + strYesNo.toUpperCase() + "' For '" + strType.toUpperCase() + "'.", "Do you want to continue?"));
}

/**
  * @desc confirmQuit function is created to seek confirmation to quit from user.
  * This is to keep code DRY.
  * @return boolean  - result of confirmation.
  * @author Abhijeet Bhagat
*/
function confirmQuit() {
  return confirm(
    messageBuilder("You Pressed 'Cancel'.", " Do you want to quit?")
  );
}

/**
  * @desc showQuitAlert function is used to show alert message upon quitting.
  * This is to keep code DRY.
  * @return void
  * @author Abhijeet Bhagat
*/
function showQuitAlert() {
  alert(
    messageBuilder(
      "You Are About To Quit Password Generation Process.",
      "Password Generator will *NOT* generate password!",
      "Press 'Generate Password' button if you wan to begin again and select atleast one criterion."
    )
  );
}

/**  In ADIITION to following use cases, The application gives an ability TO BE ABLE TO QUIT at ANY STAGE.
 *  
 * USE CASES:
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
