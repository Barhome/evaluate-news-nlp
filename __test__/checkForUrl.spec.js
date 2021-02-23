import { checkForUrl } from "../src/client/js/urlChecker.js";
describe("Testing if the input text is url", () => {
    
    test("url", () => {
           
           expect(checkForUrl("https://www.trustpilot.com/review/cairo.de")).toBe(true);
        

           

  
  })});

  describe("Testing if the input text is not valid url", () => {
    
    test("url", () => {
           
           expect(checkForUrl("www.trustpilot.com/review/cairo.de")).toBe(false);
           
  })});