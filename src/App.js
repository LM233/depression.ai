import "./App.scss";
import { Helmet } from "react-helmet";
import { MDCTextField } from "@material/textfield";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const textField = new MDCTextField(
      document.querySelector(".mdc-text-field")
    );
  }, []);
  return (
    <div className="App">
      <Helmet>
        <script
          type="text/javascript"
          src="/live2d-widget/autoload.js"
        ></script>
      </Helmet>
      <div class="input">
        <label class="mdc-text-field mdc-text-field--filled">
          <span class="mdc-text-field__ripple"></span>
          <span class="mdc-floating-label" id="my-label-id">
            Hint text
          </span>
          <input
            class="mdc-text-field__input"
            type="text"
            aria-labelledby="my-label-id"
          ></input>
          <span class="mdc-line-ripple"></span>
        </label>
      </div>
    </div>
  );
}

export default App;
