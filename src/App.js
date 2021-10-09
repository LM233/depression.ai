import "./App.scss";
import { Helmet } from "react-helmet";
import { MDCTextField } from "@material/textfield";
import { MDCRipple } from "@material/ripple";
import { useEffect } from "react";
import { HeatmapRect } from "@visx/heatmap";
import { scaleLinear } from "@visx/scale";

function App() {
  useEffect(() => {
    const textField = new MDCTextField(
      document.querySelector(".mdc-text-field")
    );
    const fabRipple = new MDCRipple(document.querySelector(".mdc-fab"));
  }, []);
  return (
    <div className="App">
      <Helmet>
        <script
          type="text/javascript"
          src="/live2d-widget/autoload.js"
        ></script>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        ></link>
      </Helmet>
      <div class="demo">
        <div id="waifu">
          <div id="waifu-tips"></div>
          <canvas id="live2d" width="800" height="800"></canvas>
        </div>
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
        <div class="mdc-touch-target-wrapper">
          <button class="mdc-fab mdc-fab--mini mdc-fab--touch">
            <div class="mdc-fab__ripple"></div>
            <span class="material-icons mdc-fab__icon">add</span>
            <div class="mdc-fab__touch"></div>
          </button>
        </div>
        <HeatmapRect width={100} height={100} />
      </div>
    </div>
  );
}

export default App;
