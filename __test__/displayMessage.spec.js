
import 'regenerator-runtime/runtime';
import { displayMessage } from "../src/client/js/formHandler.js";

describe("Testing displayMessage to make sure it works fine", () => {
    
    test("displayMessage", () => {

        const text = displayMessage('P+');
           
           expect(text).toBe("The review tone is strong positive");
  })});