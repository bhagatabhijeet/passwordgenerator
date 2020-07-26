// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword() {
  var charArray = [];
  var quit = false;
  

  passwordEngine.getLength();
  passwordEngine.validateLength();
  passwordEngine.getLower();
  passwordEngine.getUpper();
  return passwordEngine.charArray.join('');
}

var passwordEngine = {
  charArray:[],
  quit: false,
  length: 0,
  lowerCase:false,
  upperCase:false,
  numeric:false,
  specialCharacters:false,

  getLength: function () {
    if (this.quit === false) {
      this.length = prompt("Enter length of desired password.\nValid Length is 8-128 characters.");
      if (this.length === null) {
        if (confirm("You pressed 'Cancel'. Do you want to quit?")) {
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
      while (isNaN(this.length) || this.length < 1 || this.length > 128) {
        this.length = prompt("Invalid Length!\nLet's try again.\n"
          + "Enter length of desired password.\nValid Length is 8-128 characters.");
        if (this.length === null) {
          if (confirm("You pressed 'Cancel'. Do you want to quit?")) {
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
  getLower:function(){
    if(this.quit === false){
      if (confirm("Do you want lower case alphabets in your password?\nExample: 'abc'.\nPress 'Ok' for 'Yes', 'Cancel' for 'No'.")) {
        this.lowerCase=true;
        this.charArray.push.apply(this.charArray,Array.from("abcdefghijklmnopqrstuvwxyz"));
      }
      else{
        this.lowerCase=false;
      }
    }
    var msg =this.lowerCase? "Yes":"No";
    if (confirm("You selected " + msg + " for  lower case alphabets. Do you want to quit?")) {
      this.quit = true;    
    }
  }  ,
  getUpper:function(){
    if(this.quit === false){
      if (confirm("Do you want lower case alphabets in your password?\nExample: 'abc'.\nPress 'Ok' for 'Yes', 'Cancel' for 'No'.")) {
        this.upperCase=true;
        this.charArray.push.apply(this.charArray,Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ"));
      }
      else{
        this.upperCase=false;
      }
    }
    var msg =this.upperCase? "Yes":"No";
    if (confirm("You selected " + msg + " for  lower case alphabets. Do you want to quit?")) {
      this.quit = true;    
    }
  }
}

function messageBuilder(mainMessage,secondMessage,thirdMessage,fourthMessage){
  var message=mainMessage;
  if(secondMessage !== undefined){
    message = message + "\n" + "-".repeat(mainMessage.length) + "\n\n" + secondMessage;
  }
  if(thirdMessage !== undefined){
    message = message + "\n\n" + thirdMessage;
  }
  if(fourthMessage !== undefined){
    message = message + "\n\n" + fourthMessage;
  }  
  return message;
}

/**
 * GIVEN I need a new, secure password
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
