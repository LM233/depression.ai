import "./App.scss";
import "react-calendar-heatmap/dist/styles.css";
import { Helmet } from "react-helmet";
import { MDCTextField } from "@material/textfield";
import { MDCRipple } from "@material/ripple";
import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import AnimatedNumber from "react-animated-number";
import ReactTooltip from "react-tooltip";

const axios = require("axios").default;
const host = "http://127.0.0.1:5000/";

// require("@tensorflow/tfjs");
// const toxicity = require("@tensorflow-models/toxicity");

const shiftDate = (date, numDays) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
};

const getRange = (count) => {
  const arr = [];
  for (let idx = 0; idx < count; idx += 1) {
    arr.push(idx);
  }
  return arr;
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomValues = (count, date = new Date()) => {
  return getRange(count).map((index) => {
    return {
      date: shiftDate(date, -index),
      count: getRandomInt(1, 3),
    };
  });
};

const getTooltipDataAttrs = (value) => {
  // Temporary hack around null value.date issue
  if (!value || !value.date) {
    return null;
  }
  // Configuration for react-tooltip
  return {
    "data-tip": `${value.date.toISOString().slice(0, 10)} has count: ${
      value.count
    }`,
  };
};

function App() {
  const [value, setValue] = useState([]);
  const [score, setScore] = useState(0);
  const [text, setText] = useState("");
  const [playStatus, setPlayStatus] = useState(false);
  const [music] = useState(new Audio(host + "music"));

  useEffect(() => {
    setValue(generateRandomValues(310));
    console.log(value);
    const textField = new MDCTextField(
      document.querySelector(".mdc-text-field")
    );
    textField.getValue = (res) => console.log(res);
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
        <div class="number">
          <div class="title">悲伤程度</div>
          <h4>
            <AnimatedNumber
              style={{
                transition: "0.8s ease-out",
                transitionProperty: "background-color, color",
                fontSize: 100,
              }}
              frameStyle={(perc) =>
                perc === 100 ? {} : { backgroundColor: "#ffffff" }
              }
              stepPrecision={0}
              value={score}
              formatValue={(n) => n}
            />
          </h4>
        </div>
        <div class="input">
          <label class="mdc-text-field mdc-text-field--filled">
            <span class="mdc-text-field__ripple"></span>
            <span class="mdc-floating-label" id="my-label-id">
              今日负面言论
            </span>
            <input
              class="mdc-text-field__input"
              type="text"
              aria-labelledby="my-label-id"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></input>
            <span class="mdc-line-ripple"></span>
          </label>
        </div>
        <div class="mdc-touch-target-wrapper">
          <button
            class="mdc-fab mdc-fab--mini mdc-fab--touch emo-button"
            onClick={() => {
              axios({
                method: "post",
                url: host + "score",
                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  text: text,
                },
              }).then((res) => {
                let result = 0;
                console.log(res.data);
                if (res.pos > res.neg) {
                  result = 0;
                } else {
                  result = Math.tanh(res.data.neg / 20) * 100;
                }
                setScore(parseFloat(result.toFixed(1)));
              });
            }}
          >
            <div class="mdc-fab__ripple"></div>
            <span class="material-icons md-48">emoji_emotions</span>
            <div class="mdc-fab__touch"></div>
          </button>
          <button
            class="mdc-fab mdc-fab--mini mdc-fab--touch music-button"
            onClick={() => {
              if (!playStatus) {
                music.play();
              } else {
                music.pause();
              }
              setPlayStatus(!playStatus);
            }}
          >
            <div class="mdc-fab__ripple"></div>
            <span class="material-icons md-48">library_music</span>
            <div class="mdc-fab__touch"></div>
          </button>
        </div>
        <div class="heatmap">
          <CalendarHeatmap
            startDate={new Date("2021-01-01")}
            endDate={new Date("2022-01-01")}
            values={value}
            classForValue={(value) => {
              if (!value) {
                return "color-empty";
              }
              return `color-gitlab-${value.count}`;
            }}
            tooltipDataAttrs={getTooltipDataAttrs}
          />
        </div>
        <ReactTooltip />
      </div>
    </div>
  );
}

export default App;
