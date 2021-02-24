// create a function to display message to the view
const displayMessage = function (data) {
  let message = "";
  switch (data) {
    case "P+":
      message = "The review tone is strong positive";
      break;
    case "P":
      message = "The review tone is positive";
      break;
    case "NEU":
      message = "The review tone is neutral";
      break;
    case "N":
      message = "The review tone is negative";
      break;
    case "N+":
      message = "The review tone is strong negative";
      break;
    case "NONE":
      message = "There is no review tone";
      break;
    default:
      message = "Failed to show review due to system error";
  }
  return message;
};

// create function to Post Data only without returning anything

const postUserUrlData = async function (url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    const returnedData = await response.json();
    console.log(returnedData);
    return returnedData;
  } catch (error) {
    console.log(`error:${error}`);
  }
};

// // create function to Get Data from server
// const getServerData = async function (url = "") {
//   const response = await fetch(url);
//   try {
//     const dataServer = response.json();
//     return dataServer;
//   } catch (error) {
//     console.log(`error:${error}`);
//   }
// };

function handleSubmit(event) {
  event.preventDefault();
  // selecting dom elements

  const urlAddress = document.getElementById("url-address").value;

  // check url or not
  if (!Client.checkForUrl(urlAddress)) {
    alert("You have to Enter a valid url with HTTP protocol");
    return;
  }

  // call the function to post data to server
  else
    postUserUrlData("http://localhost:3000/postUserUrl", {
      userUrl: urlAddress,
    })
      .then(
        (data) =>
          (document.getElementById("results").innerHTML = displayMessage(
            data.score_tag
          ))
      )
      .catch(
        (error) =>
          (document.getElementById(
            "results"
          ).innerHTML = `Couldn't Fetch Data for connection reasons ${error}`)
      );
}

export { handleSubmit, displayMessage };
