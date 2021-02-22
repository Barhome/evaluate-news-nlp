import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'


console.log(checkForName);



alert("Enter development mode")
console.log("CHANGE!!");

 // create function to Post Data only without returning anything
 const postUserUrlData = async function (url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
};

    postUserUrlData("/postUserUrl", {
      userUrl: "https://www.trustpilot.com/review/cairo.de"
    });