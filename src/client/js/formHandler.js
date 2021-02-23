// create function to Post Data only without returning anything

const postUserUrlData = async function (url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

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

  postUserUrlData("http://localhost:3000/postUserUrl", {
    userUrl: urlAddress,
  });

  // fetching data from the server and updating ui

  fetch("http://localhost:3000/getServerEndPoint")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.score_tag);
      if (data.score_tag == "P+")
        document.getElementById("results").innerHTML =
          "The review tone is strong positive";
      else if (data.score_tag == "P")
        document.getElementById("results").innerHTML =
          "The review tone is  positive";
      else if (data.score_tag == "NEU")
        document.getElementById("results").innerHTML =
          "The review tone is neutral";
      else if (data.score_tag == "N")
        document.getElementById("results").innerHTML =
          "The review tone is negative";
      else if (data.score_tag == "N+")
        document.getElementById("results").innerHTML =
          "The review tone is strong negative";
      else if (data.score_tag == "NONE")
        document.getElementById("results").innerHTML =
          "There is no review tone";
      else
        document.getElementById("results").innerHTML =
          "Failed to show review due to system error";
    });

  // // check what text was put into the form field
  // let formText = document.getElementById('name').value
  // checkForName(formText)

  // console.log("::: Form Submitted :::")
  // fetch('http://localhost:3000/test')
  // .then(res => res.json())
  // .then(function(res) {
  //     document.getElementById('results').innerHTML = res.message
  // })
}

export { handleSubmit };
