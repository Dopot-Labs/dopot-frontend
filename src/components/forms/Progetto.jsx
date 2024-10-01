"";
import React, { useState } from "react";
import { useTranslation } from "../../i18n/client";

const Progetto = (props) => {
  const { t } = useTranslation();
  const [campagna, setcampagna] = useState("reward");
  const [giorniCampagna, setgiorniCampagna] = useState("45");
  const [val, setVal] = useState([]);
  const handleAdd = (e) => {
    e.preventDefault();
    const abc = [...val, []];
    setVal(abc);
  };
  const handleChange = (onChangeValue, i) => {
    const inputdata = [...val];
    inputdata[i] = onChangeValue.target.value;
    setVal(inputdata);
  };
  const handleDelete = (e, i) => {
    e.preventDefault();
    const deletVal = [...val];
    deletVal.splice(i - 1, 1);
    const result = e.target.name.match(/^([^.]+)[.]+([^.]+)$/);
    props.inputs[result[1]].splice(i, 1);
    props.inputs[result[2]].splice(i, 1);
    setVal(deletVal);
  };

  function toggleCampagna(event) {
    setcampagna(event.target.name);
    const fevent = {
      target: { name: "tipoCampagna", value: event.target.name },
    };
    props.handleChange(fevent);
  }

  function toggleGiorniCampagna(event) {
    setgiorniCampagna(event.target.value);
    const fevent = {
      target: { name: "giorniCampagna", value: event.target.value },
    };
    props.handleChange(fevent);
  }

  return (
    <>
      <h1>Project</h1>
      <h3 style={{ color: "#646A69" }}>
        Update your photo and personal details here.
      </h3>

      {/* <h1>{t("projecth1")}</h1>
        <h4>{t("projecth4")}</h4>
        <div className="ins-btn-box">
          <button
            name="reward"
            onClick={toggleCampagna}
            className={
              campagna == "reward"
                ? "grd-btn dopot-btn-lg"
                : "purple-border-btn dopot-btn-lg"
            }
            type="button"
          >
            {t("reward")}
          </button>
          {/*<button
            name="equity"
            onClick={toggleCampagna}
            className={
              campagna == "equity"
                ? "grd-btn dopot-btn-lg"
                : "purple-border-btn dopot-btn-lg"
            }
            type="button"
          >
            Campagna Equity
          </button>}
        </div> */}
      <div className="ins-input-box">
        <h4>What funding goal do you want to reach?</h4>
        <input
          name="quota"
          value={props.inputs.quota}
          onChange={props.handleChange}
          type="number"
          min="100"
          onWheel={(e) => e.target.blur()}
          placeholder="Enter number"
        />
      </div>
      <div className="ins-input-box">
        <h4>What type of campaign do you want to run?</h4>
        <div className="ins-btn-box">
          <button
            value={"45"}
            className={
              giorniCampagna === "45" ? "radio-active" : "radio-no-active"
            }
            onClick={toggleGiorniCampagna}
            type="button"
          >
            45 Days
          </button>
          <button
            value={"65"}
            className={
              giorniCampagna === "65" ? "radio-active" : "radio-no-active"
            }
            onClick={toggleGiorniCampagna}
            type="button"
          >
            65 Days
          </button>
          <button
            value={"90"}
            className={
              giorniCampagna === "90" ? "radio-active" : "radio-no-active"
            }
            onClick={toggleGiorniCampagna}
            type="button"
          >
            90 Days
          </button>
        </div>
      </div>
      <div className="ins-input-box">
        <div>
          <h4>Tell us about your project...</h4>
          <h3>
            How did the idea come about, how many years ago, anecdotes, etc...
          </h3>
        </div>

        <textarea
          name="descProgetto"
          value={props.inputs.descProgetto}
          onChange={props.handleChange}
          type="text"
          placeholder="Type here"
        />
      </div>
      <div className="ins-input-box">
        <div>
          <h4>Goal of the project</h4>
          <h3>Why should people help you? What purpose do you achieve?</h3>
        </div>
        <textarea
          name="obbProgetto"
          value={props.inputs.obbProgetto}
          onChange={props.handleChange}
          type="text"
          placeholder="Type here"
        />
      </div>
      <div className="ins-input-box">
        <div>
          <h4>The team</h4>
          <h3>
            Introduce the people working on the project and their background
          </h3>
        </div>
        <textarea
          name="team"
          value={props.inputs.team}
          onChange={props.handleChange}
          type="text"
          placeholder="Type here"
        />
      </div>
      <div className="ins-input-box">
        <h4>Roadmap</h4>
        <div className="box-link-cont">
          <div className="container-plus">
            <input
              name="titoloRoadStep"
              onChange={(e) => props.handleChangeArray(e, 0)}
              type="text"
              placeholder="Step title"
            />

            <button
              key="titoloRoadStepAdd"
              className="btn-plus-minus"
              onClick={handleAdd}
            >
              +
            </button>
          </div>
          <textarea
            name="descrRoadStep"
            onChange={(e) => props.handleChangeArray(e, 0)}
            placeholder="Describe the roadmap"
          />

          {val.map((data, i) => {
            return (
              <div key={"road" + i}>
                <div className="container-plus">
                  <input
                    key={"titoloRoadStep" + i}
                    name={"titoloRoadStep"}
                    type="text"
                    onChange={(e) => props.handleChangeArray(e, i + 1)}
                    placeholder="Step title"
                  />
                  <button
                    key={"titoloRoadStepDel" + i}
                    name={"titoloRoadStep.descrRoadStep"}
                    className="btn-plus-minus"
                    onClick={(e) => handleDelete(e, i + 1)}
                  >
                    x
                  </button>
                </div>
                <textarea
                  key={"descrRoadStep" + i}
                  name={"descrRoadStep"}
                  onChange={(e) => props.handleChangeArray(e, i + 1)}
                  placeholder="Describe the roadmap"
                />
              </div>
            );
          })}
        </div>

        {/* <input name="titoloRoadStep2" value={props.inputs.titoloRoadStep2} 
                onChange={props.handleChange} type="text" placeholder="inserisci titolo step" />
            <textarea name="descrRoadStep2" value={props.inputs.descrRoadStep2} 
                onChange={props.handleChange} placeholder="descrivi lo step della roadmap" /> */}
      </div>

      
        
          
      <div className="add-btn-box">
              <a onClick={(e)=>props.setState(e,-1)}>Back</a>
              <a onClick={(e)=>props.setState(e,+1)}>Save</a>
            </div>
          
      
     
    </>
  );
};

const ProgettoHeader = (props) => {
  const { t } = useTranslation();
  return (
    <div className="ins-progress">
      <div className="ins-circle ins-circle-active">
        <img src="/assets/img/info1-complete.svg" alt="" />
        <p>Basic Info</p>
      </div>
      <div className="ins-line ins-line-complete"></div>
      <div className="ins-circle ins-circle-pending">
        <img src="/assets/img/info2-complete.svg" alt="" />
        <p>Survey</p>
      </div>
      <div className="ins-line ins-line-complete"></div>
      <div className="ins-circle ins-circle-pending">
        <img src="/assets/img/info3-pend.svg" alt="" />
        <p>Project</p>
      </div>
      <div className="ins-line ins-line-pending"></div>
      <div className="ins-circle ins-circle-pending">
        <img src="/assets/img/info-base4.svg" alt="" />
        <p>Product & NFTs Mint</p>
      </div>
      {/* <div className="ins-line ins-line-pending"></div>
        <div className="ins-circle ins-circle-pending">
          <p>NFTs Mint</p>
        </div> */}
      <div className="ins-line ins-line-pending"></div>
      <div className="ins-circle ins-circle-pending">
        <img src="/assets/img/info-base5.svg" alt="" />
        <p>FAQ</p>
      </div>
    </div>
  );
};

export { Progetto, ProgettoHeader };
