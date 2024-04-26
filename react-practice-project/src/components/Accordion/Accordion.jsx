import { useState } from "react";

export default function Accordion() {
  const [selected, setSelected] = useState(false);
  const [multi, setMulti] = useState(false);

  function handleClick(accordionNo) {
    setSelected(selected === accordionNo ? null : accordionNo);
  }

  function handleSelectAll() {
    if (multi) {
      setSelected(false);
    }
    setMulti((multi) => !multi);
  }

  return (
    <div>
      <button onClick={() => handleSelectAll()}>Select All</button>

      <div className="accordion" onClick={() => handleClick(1)}>
        <div className="title">
          <p>What are accordion components?</p>
          <button className="plus">+</button>
        </div>
        {(selected === 1 || multi) && (
          <div className="content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        )}
      </div>

      <div className="accordion" onClick={() => handleClick(2)}>
        <div className="title">
          <p>What are they used for?</p>

          <button className="plus">+</button>
        </div>
        {(selected === 2 || multi) && (
          <p className="content">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        )}
      </div>
      <div className="accordion" onClick={() => handleClick(3)}>
        <div className="title">
          <p>Accordion is a musical instrument</p>
          <button className="plus">+</button>
        </div>
        {(selected === 3 || multi) && (
          <p className="content">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        )}
      </div>
    </div>
  );
}
