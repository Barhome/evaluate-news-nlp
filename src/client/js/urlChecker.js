function checkForUrl(inputText) {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  const regex = new RegExp(expression);
  if (inputText.match(regex)) return true;
  else return false;

  // console.log("::: Running checkForName :::", inputText);
  // let names = ["Picard", "Janeway", "Kirk", "Archer", "Georgiou"];
  // if (names.includes(inputText)) {
  //   alert("Welcome, Captain!");
  // }
}

export { checkForUrl };
