import React, { useState, useEffect } from "react";
import "./App.css";
import Slider from "./Slider";
import SidebarItem from "./SidebarItem";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Help from "./pages/Help";
import Header from "./components/Header";

const DEFAULT_OPTIONS = [
  {
    name: "Brightness",
    property: "brightness",
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: "%"
  },
  {
    name: "Contrast",
    property: "contrast",
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: "%"
  },
  {
    name: "Saturation",
    property: "saturate",
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: "%"
  },
  {
    name: "Grayscale",
    property: "grayscale",
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: "%"
  },
  {
    name: "Sepia",
    property: "sepia",
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: "%"
  },
  {
    name: "Hue Rotate",
    property: "hue-rotate",
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: "deg"
  },
  {
    name: "Blur",
    property: "blur",
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: "px"
  },
  {
    name: "Color Inversion",
    property: "invert",
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: "%"
  },
  {
    name: "Transparency",
    property: "opacity",
    value: 100,
    range: {
      min: 0,
      max: 100
    },
    unit: "%"
  }
];

function App() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [history, setHistory] = useState([DEFAULT_OPTIONS]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const selectedOption = options[selectedOptionIndex];

  useEffect(() => {
    const currentOptions = history[historyIndex];
    setOptions(currentOptions);
  }, [historyIndex]);

  function handleSliderChange({ target }) {
    const currentOptions = [...options];
    currentOptions[selectedOptionIndex] = {
      ...currentOptions[selectedOptionIndex],
      value: target.value
    };
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, currentOptions]);
    setHistoryIndex(newHistory.length);
  }

  function handleUndoClick() {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }
  }

  function handleRedoClick() {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  }

  function handleResetClick() {
    setOptions(DEFAULT_OPTIONS);
    setHistory([DEFAULT_OPTIONS]);
    setHistoryIndex(0);
  }

  function getImageStyle() {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });

    return { filter: filters.join(" ") };
  }

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;
  const canReset = historyIndex !== 0;

  console.log(getImageStyle());

  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route exact path="/" element={App} />
        <Route path="/help" element={<Help />} />
      </Routes>
      <div className="container">
        <div className="main-image" style={getImageStyle()} />
        <div className="sidebar">
          <button onClick={handleUndoClick} disabled={!canUndo}>
            Undo
          </button>
          <button onClick={handleRedoClick} disabled={!canRedo}>
            Redo
          </button>
          <button onClick={handleResetClick} disabled={!canReset}>
            Reset
          </button>
          {options.map((option, index) => {
            return (
              <SidebarItem
                key={index}
                name={option.name}
                active={index === selectedOptionIndex}
                handleClick={() => setSelectedOptionIndex(index)}
              />
            );
          })}
        </div>
        <Slider
          min={selectedOption.range.min}
          max={selectedOption.range.max}
          value={selectedOption.value}
          handleChange={handleSliderChange}
        />
      </div>
    </div>
  );
}

export default App;
