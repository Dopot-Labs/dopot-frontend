"";
import React from "react";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import { useRouter } from "next/router"; // Import useRouter

const DopotToken = () => {
  const router = useRouter(); // Initialize useRouter

  return (
    <div className="app">
      <main className="dashboard">
        <div className="dashboard-header">
          <Header></Header>
        </div>
        <div className="box">
          <div className="dopot-power">
            <h5>
              <img
                style={{ marginRight: "0.7rem", marginBottom: "0.35rem" }}
                src="\assets\img\Icon.png"
                alt=""
              />
              Tutorials
            </h5>
            <h1>Learn Everyday New</h1>
            <h5>Watch our highly finetune tutorials in multi language</h5>
          </div>

          {/* 
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/neIUbrXIFQM?si=dAjEIhSioIqEJmhu" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/MUWrB8CSEJ4?si=YpiR75R0tIMLj3bR" title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/Mk5sAVforu4?si=mprGSlWUimcC9VGU" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/KxyqSPh8DBc?si=GgPcElNTdRLLsh_0" title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/u0-Dgd9Ytac?si=58Z3OJwCjfjz0nW0" title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/pJITJigNwzc?si=3EfQaOg4GwtY63fO" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/P2fESTmoG8w?si=7gUBZ9mzJX5ikjJv" title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>*/}
        </div>
        {/* <img className="dopot-power-img" src={PBottom} alt="PBottom" /> */}
      </main>

      <div className="p-btn-box">
        <div className="box-cont">
          <button
            onClick={(e) => router.push("/FaqEng")}
            className="purple-border-btn dopot-btn-lg"
          >
            English
          </button>
          <button className="grd-btn dopot-btn-lg">Italian</button>
        </div>
      </div>
      <div className="box-video-tutorials">
        <div className="row">
          <div className="col-lg">
            <img src="/assets/img/img-vetrina.svg" alt="" />
            <h3>Coming soon...</h3>
          </div>
          <div className="col-lg">
            <img src="/assets/img/img-vetrina.svg" alt="" />
            <h3>Coming soon...</h3>
          </div>
          <div className="col-lg">
            <img src="/assets/img/img-vetrina.svg" alt="" />
            <h3>Coming soon...</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-lg">
            <img src="/assets/img/img-vetrina.svg" alt="" />
            <h3>Coming soon...</h3>
          </div>
          <div className="col-lg">
            <img src="/assets/img/img-vetrina.svg" alt="" />
            <h3>Coming soon...</h3>
          </div>
          <div className="col-lg">
            <img src="/assets/img/img-vetrina.svg" alt="" />
            <h3>Coming soon...</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DopotToken;
