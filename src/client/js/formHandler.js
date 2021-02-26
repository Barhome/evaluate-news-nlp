// create a function to display message to the view
const displayMessage = function (data) {
  let message = "";
  switch (data) {
    case "P+":
      message = "The review tone is strong POSITIVE";
      break;
    case "P":
      message = "The review tone is POSITIVE";
      break;
    case "NEU":
      message = "The review tone is NETRAL";
      break;
    case "N":
      message = "The review tone is NEGATIVE";
      break;
    case "N+":
      message = "The review tone is strong NEGATIVE";
      break;
    case "NONE":
      message = "There is no REVIEW TONE";
      break;
    default: {
      message =
        "Failed to show review due to system error or evaluting wrong web address";
      document.getElementById("results-analysis").classList.add("hide");
    }
  }
  return message;
};

// create function to Post Data

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
    //updating the dom in case the customer entered in valid url in middle of entering valid ones.
    document.getElementById("results-analysis").classList.add("hide");
    document.getElementById("results").innerHTML = "";
    return;
  }

  // call the function to post data to server
  else
    postUserUrlData("http://localhost:3000/postUserUrl", {
      userUrl: urlAddress,
    })
      .then((data) => {
        document.getElementById("results-analysis").classList.remove("hide"); //showing dom element in case of fetching success
        document.getElementById("results").innerHTML = displayMessage(
          data.score_tag
        );
        document.getElementById(
          "agreement-level"
        ).innerHTML = `Agreement Status: ${
          data.agreement === "AGREEMENT" ? "AGREED" : "DISAGREED"
        }`;
        document.getElementById(
          "subjectivity-level"
        ).innerHTML = `Subjectivity Status: ${
          data.subjectivity === "OBJECTIVE" ? "OBJECTIVE" : "SUBJECTIVE"
        }`;
        document.getElementById(
          "confidence-level"
        ).innerHTML = `Confidence Status: ${data.confidence}% CONFIDENT`;
        document.getElementById("irony-level").innerHTML = `Irony Status: ${
          data.irony === "IRONIC" ? "IRONIC" : "NONIRONIC"
        }`;
      })

      .catch((error) => {
        document.getElementById(
          "results"
        ).innerHTML = `Couldn't Fetch Data for connection reasons ${error}`;
        document.getElementById("results-analysis").classList.add("hide"); //hiding dom elements in case of failed fetching
      });
}

export { handleSubmit, displayMessage };
