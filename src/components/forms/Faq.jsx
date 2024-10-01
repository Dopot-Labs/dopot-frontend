"";
import React, { useState } from "react";
import { useTranslation } from "../../i18n/client";

const Faq = (props) => {
  const { t, i18n } = useTranslation();
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
  return (
    <>
      <h1>Explain your campaign FAQ</h1>
      <h3 style={{ color: "#646A69" }}>
        What are the most frequently asked questions you might get?
      </h3>
      <div className="ins-input-box">
        <h4>FAQ</h4>
        <div className="box-link-cont">
          <div className="container-plus">
            <input
              name="titoloDomanda"
              onChange={(e) => props.handleChangeArray(e, 0)}
              type="text"
              placeholder="Title"
            />

            <button
              key="titoloDomandaAdd"
              className="btn-plus-minus"
              onClick={handleAdd}
            >
              +
            </button>
          </div>
          <textarea
            name="rispostaDomanda"
            onChange={(e) => props.handleChangeArray(e, 0)}
            placeholder="Answer"
          />

          {val.map((data, i) => {
            return (
              <div key={"titolo" + i}>
                <div className="container-plus">
                  <input
                    key={"titoloDomanda" + i}
                    name={"titoloDomanda"}
                    type="text"
                    onChange={(e) => props.handleChangeArray(e, i + 1)}
                    placeholder="Title"
                  />
                  <button
                    key={"titoloDomandaDel" + i}
                    name={"titoloDomanda.rispostaDomanda"}
                    className="btn-plus-minus"
                    onClick={(e) => handleDelete(e, i + 1)}
                  >
                    x
                  </button>
                </div>
                <textarea
                  key={"rispostaDomanda" + i}
                  name={"rispostaDomanda"}
                  placeholder="Answer"
                  onChange={(e) => props.handleChangeArray(e, i + 1)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* {(() => {
        if (props.setState != null) {
          return (
            <div className="add-btn-box">
              <a onClick={props.setState}>
                <img src={"/assets/img/plus-grd-icon.png"} alt="PlusGrdIcon" />
              </a>
            </div>
          );
        }
      })()} */}
<div className="add-btn-box">
              <a onClick={(e)=>props.setState(e,-1)}>Back</a>
              
            </div>

      <div className="proceed-btn-box">
    
             
        <p>Min ~0.00037eth = 50MB</p>
        <input
          className="grd-btn dopot-btn-lg"
          type="submit"
          value={"Submit"}
        />
      </div>
    </>
  );
};

const FaqHeader = (props) => {
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
        <img src="/assets/img/info3-complete.svg" alt="" />
        <p>Project</p>
      </div>
      <div className="ins-line ins-line-complete"></div>
      <div className="ins-circle ins-circle-pending">
        <img src="/assets/img/info4-complete.svg" alt="" />
        <p>Product & NFTs Mint</p>
      </div>
      {/* <div className="ins-line ins-line-pending"></div>
        <div className="ins-circle ins-circle-pending">
          <p>NFTs Mint</p>
        </div> */}
      <div className="ins-line ins-line-complete"></div>
      <div className="ins-circle ins-circle-pending">
        <img src="/assets/img/info5-complete.svg" alt="" />
        <p>FAQ</p>
      </div>
    </div>
  );
};

export { Faq, FaqHeader };
