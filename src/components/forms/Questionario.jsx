"";
import React from "react";
import { useTranslation } from "../../i18n/client";

const Questionario = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <h1>Survey</h1>
      <h3 style={{ color: "#646A69" }}>
        Update your photo and personal details here.
      </h3>
      <div className="ins-input-box">
        <h4>
          Are you starting out in a small market or in an already
          well-structured market?
        </h4>

        <textarea
          value={props.inputs.domanda1}
          onChange={props.handleChange}
          name="domanda1"
          placeholder="Type here"
        />
      </div>
      <div className="ins-input-box">
        <h4>Do you have the right team? What skills do you have?</h4>
        <textarea
          value={props.inputs.domanda2}
          onChange={props.handleChange}
          name="domanda2"
          placeholder="Type here"
        />
      </div>
      <div className="ins-input-box">
        <h4>
          Will your market position be defensible in 10/20 years? If yes why?
        </h4>
        <textarea
          value={props.inputs.domanda3}
          onChange={props.handleChange}
          name="domanda3"
          placeholder="Type here"
        />
      </div>
      <div className="ins-input-box">
        <h4>
          What is the main mission of your company and what main goals have you
          set yourself?
        </h4>
        <textarea
          value={props.inputs.domanda4}
          onChange={props.handleChange}
          name="domanda4"
          placeholder="Type here"
        />
      </div>
      <div className="ins-input-box">
        <h4>What target customers do you refer to?</h4>
        <textarea
          value={props.inputs.domanda5}
          onChange={props.handleChange}
          name="domanda5"
          placeholder="Type here"
        />
      </div>
      <div className="ins-input-box">
        <h4>What makes your project unique?</h4>
        <textarea
          value={props.inputs.domanda6}
          onChange={props.handleChange}
          name="domanda6"
          placeholder="Type here"
        />
      </div>
      <div className="ins-input-box">
        <h4>What are the main risks for the startup?</h4>
        <textarea
          value={props.inputs.domanda7}
          onChange={props.handleChange}
          name="domanda7"
          placeholder="Type here"
        />
      </div>
      <div className="ins-input-box">
        <h4>What are the startup's three-year projections?</h4>
        <textarea
          value={props.inputs.domanda8}
          onChange={props.handleChange}
          name="domanda8"
          placeholder="Type here"
        />
      </div>
      <div className="ins-input-box">
        <h4>Does the team have all the key development roles?</h4>
        <textarea
          value={props.inputs.domanda9}
          onChange={props.handleChange}
          name="domanda9"
          placeholder="Type here"
        />
      </div>
      <div className="ins-input-box">
        <h4>How do you plan to overcome the various risks of the startup?</h4>
        <textarea
          value={props.inputs.domanda10}
          onChange={props.handleChange}
          name="domanda10"
          placeholder="Type here"
        />
      </div>

      

      <div className="add-btn-box">
              <a onClick={(e)=>props.setState(e,-1)}>Back</a>
              <a onClick={(e)=>props.setState(e,+1)}>Save</a>
            </div>
      
    </>
  );
};

const QuestionarioHeader = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className="ins-progress">
        <div className="ins-circle ins-circle-active">
          <img src="/assets/img/info1-complete.svg" alt="" />
          <p>Basic Info</p>
        </div>
        <div className="ins-line ins-line-complete"></div>
        <div className="ins-circle ins-circle-pending">
          <img src="/assets/img/info2-pend.svg" alt="" />
          <p>Survey</p>
        </div>
        <div className="ins-line ins-line-pending"></div>
        <div className="ins-circle ins-circle-pending">
          <img src="/assets/img/info-base3.svg" alt="" />
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
    </>
  );
};

export { Questionario, QuestionarioHeader };
