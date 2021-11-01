/*
https://www.w3schools.com/jsref/prop_html_outerhtml.asp 
https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
*/

$(document).ready(() => {
  //Get bookmarked items array from session storage
  var storedItems = JSON.parse(sessionStorage.getItem("items"));

  //For each bookmark item, convert the string to HTML and wrap it with a div
  $.each(storedItems, (index, value) => {
    var newElement = document.createElement("div");
    $(value).appendTo(newElement);
    $("#bookmarks").append(newElement);
  });

  //implicit iteration to add a click listener to all items with class remove
  $(".remove").on("click", remove);

  //Item with ID clear to execute the clearAll function when clicked.
  $("#clear").on("click", clearAll);
});

/*
This function removes an item from the list of bookmarked items.
*/
remove = (event) => {
  //get the id of the item that was just clicked.
  var id = event.target.parentNode.id;

  //get the entire HTML block of the clicked item from the bookmarks page
  var wishlistItem = document.getElementById(id).outerHTML;

  //Get the bookmark items array from session storage
  var storedItems = JSON.parse(sessionStorage.getItem("items"));

  //Use the filter function to remove the item that was just clicked from the session storage.
  var updatedBookmarks = storedItems.filter(filterFunc(wishlistItem));

  //Update the bookmarks array in the session storage
  sessionStorage.setItem("items", JSON.stringify(updatedBookmarks));

  //Clear the inner HTML of the clicked item
  event.target.parentElement.parentElement.innerHTML = "";
};

//Removes the wishlistItem from the array
filterFunc = (wishlistItem) => {
  return (element) => {
    return element !== wishlistItem;
  };
};

//Removes all the items from the bookmarks list
clearAll = () => {
  //overwrite the bookmarks array to an empty array
  sessionStorage.setItem("items", JSON.stringify([]));
  $("#bookmarks").html("");
};
