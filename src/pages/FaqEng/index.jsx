"";
import React from "react";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import { useRouter } from "next/router"; // Import useRouter

const DopotShare = () => {
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
            <h5>Watch our highly finetune tutorials</h5>
          </div>
          {/* 
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/6LJEa0nVHwM?si=Wpb7qapoZJUtU2_z" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/-G0NO1gIraY?si=4XnZburzW6FYAOGk" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/f2maZyjzeaU?si=ZPwqP8U8h_k5a63F" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/LFIMHsv41bQ?si=h1K2Qhd_JeeZMpmr" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/EV8UQ6qrKSk?si=56EPFlPHKlMLbDF3" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/gT8bpUQ6hsc?si=vOCv8B1T5S3e3ARM" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/bPraP1eXWIs?si=c2B-XCqhWhJF9ylE" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>*/}
        </div>
        {/* <img className="dopot-power-img" src={PBottom} alt="PBottom" /> */}
      </main>
      {/* <div className="p-btn-box">
        <div className="box-cont">
          <button className="grd-btn dopot-btn-lg">English</button>
          <button
            onClick={(e) => router.push("/FaqIta")}
            className="purple-border-btn dopot-btn-lg"
          >
            Italian
          </button>
        </div>
      </div> */}
      <div className="box-video-tutorials">
        <div className="row">
          <div className="col-lg">
            
          <iframe width="100%" height="250" src="https://www.youtube.com/embed/0Z2gDlswsuw?si=kEa4uHFHz1-zpKZ6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div className="col-lg">
            
          <iframe width="100%" height="250" src="https://www.youtube.com/embed/vWEgLfcpmg8?si=-nuTK0rPChpXUD5Z" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          
        </div>
        <div className="row">
          <div className="col-lg">
            
          <iframe width="100%" height="250" src="https://www.youtube.com/embed/gG8G3ecvNMw?si=f5HsFpFKxohkxvBb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div className="col-lg">
            
          <iframe width="100%" height="250" src="https://www.youtube.com/embed/BF91UJHFKnU?si=D0UosAQyV85k6Lla" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default DopotShare;
