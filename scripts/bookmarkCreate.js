//For all items with class wishlist, execute handleClick when they are clicked.
$(document).ready(() => {
  $(".wishlist").on("click", handleClick);
});

var wishlist = [];

handleClick = (event) => {
  //Gets the ID of the clicked item and its HTML
  var id = event.target.parentNode.id;
  var wishlistItem = document.getElementById(id).outerHTML;

  //Using the regex, extract the HTML corresponding to the "+" button
  var extractString = wishlistItem.match("<button (.*)button>");
  var editString = extractString[0];

  //Switch the "+" with "-"
  editString = editString.replace("+", "-");

  //Use regex to extract the class of the button and add "remove" class to the button.
  var replaceWithStr = editString.match(/class="(.*)"/g);
  var newStr = replaceWithStr[0].slice(0, -1) + ' remove"';

  //Use regex to replace the old class with thew newwly formed class string in the HTML
  editString = editString.replace(/class="(.*)"/g, newStr);

  //In the extracted HTML, replace the old button HTML with the new one
  wishlistItem = wishlistItem.replace(extractString[0], editString);

  //Add the items to the session storage
  var storedItems = JSON.parse(sessionStorage.getItem("items"));

  //When a user starts a session, initialize the items array
  if (!storedItems) {
    sessionStorage.setItem("items", JSON.stringify([]));
  }

  //Get the bookmarks item array
  storedItems = JSON.parse(sessionStorage.getItem("items"));

  //Add the item to the bookmarks array
  storedItems.push(wishlistItem);

  //push the updated bookmarks array to the session storage
  sessionStorage.setItem("items", JSON.stringify(storedItems));

  //console.log("#" + event.target.id);
  //Show a notification on left middle of the array
  $("#" + event.target.id).notify("Bookmarked!", {
    position: "left middle",
    className: "success",
  });

  //disable the button so it can not be clicked.
  $("#" + event.target.id).prop("disabled", true);
};
