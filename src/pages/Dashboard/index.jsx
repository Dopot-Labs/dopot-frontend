"";
import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "../../i18n/client.js";
import Header from "../../components/Header.jsx";
import { MdSearch, MdRefresh } from "react-icons/md";
import Card from "../../components/PaginaCard/Card.jsx";
import { progettiState, progettiImageState } from "../../recoilState.js";
import { getRecoil } from "recoil-nexus";
import { addFavorites, addProjectStake } from "@/utils/firebase/writeInfos.jsx";
import { retriveFavorites } from "../../utils/firebase/retriveInfo.jsx";
const { ethers } = require("ethers");
import {
  downloadProjects,

  getInsuranceFunds,
  getProvider,
} from "../../utils/firebase/retriveInfo.jsx";
import { getData, writeData } from "@/utils/firebase/ipfs-db.jsx";


const Home = () => {
  const { t } = useTranslation();
  //const HandleSearch = useSearchForm();

  const [insuranceState, setInsuranceState] = useState(0);
  const [cards, setCards] = useState([]);
  const [reload, setReload] = useState(false);
  const [progetti, setProgetti] = useState([])


  useEffect(() => {
    async function load() {


      let insuranceFunds = await getInsuranceFunds();
      insuranceFunds = ethers.utils.formatEther(insuranceFunds.toString());
      if (insuranceFunds >= 1)
        insuranceFunds = insuranceFunds.substring(0, insuranceFunds.indexOf("."));
      setInsuranceState(insuranceFunds);


      let prog = await downloadProjects(t);
      setProgetti(prog)

    }
    load()

  }, [reload]);


  useEffect(() => {

    if (progetti && progetti.length > 0) {

      let cardsTemp = []
      
      const query = new URLSearchParams(window ? window.location.search : "");
      const state = query.get("s") || "ongoing";
      const campaign = query.get("c") || "reward";
      const type = query.get("t") || "any";
      let value = query.get("v") || "any";


      progetti.filter(
        (progetto) =>
          progetto.stateText?.toLowerCase().replace(" ", "") === state &&
          progetto.tipoCampagna === campaign &&
          (type !== "any" ? progetto.settore === type : true) &&
          (value !== "any"
            ? progetto.minInvestment >= parseInt(value.split("-")[0]) &&
            progetto.minInvestment <= parseInt(value.split("-")[1])
            : true)
      );
      if (state === "ongoing")
        progetti.sort((a, b) => b.totalStaked - a.totalStaked);

      progetti.forEach((element) => {
        cardsTemp.push(
          <Card
            key={element.address}
            progetto={element}

            immagini={getRecoil(progettiImageState)[element.address]}
            address={element.address}
            tier={element.tier}

          ></Card>
        );
      });
      setCards(cardsTemp);
    }

  }, [progetti])

  const HandleSearch = (e) => {
    //e.preventDefault(); // This prevents the default form submission behavior
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const stateSelect = document.querySelector("#sel1");
      const typeSelect = document.querySelector("#sel2");
      const categorySelect = document.querySelector("#sel3");
      const investmentSelect = document.querySelector("#sel4");
      const stateValue = stateSelect?.value;
      const typeValue = typeSelect?.value;
      const categoryValue = categorySelect?.value;
      const investmentValue = investmentSelect?.value;

      const newURL = new URL(window.location.href);
      if (stateValue) newURL.searchParams.set("s", stateValue);
      if (typeValue) newURL.searchParams.set("c", typeValue);
      if (categoryValue) newURL.searchParams.set("t", categoryValue);
      if (investmentValue) newURL.searchParams.set("v", investmentValue);
      window.history.pushState({ path: newURL.href }, "", newURL.href);
      //window.location.href = newURL;
      console.log("search param");
      setReload(!reload);

    }
  };


  // const testRead = async () => {
  //   let address = await getProvider();
  //   console.log(address)
  //   getData("users", address)
  //     .then(data => console.log('project Data:', data.projectStakes ))
  //     .catch(error => console.error(error));

  // }
  // const testWrite = async () => {
  //   let address = await getProvider();
  //   const updatedUserData = {
  //     "pIva": "Test from brave",
  //     "sito": "Test from brave",
  //     "team": "Test brave",
  //     "name1": "Test brave",
  //     "quota": "100",
  //     "price1": "2",
  //     "specs1": "Test brave",
  //     "storia": "Test from brave",
  //     "vision": "Test from brave",
  //     "address": "0x25258F58E5853247b53Bf22aA59FAEB2B53eb65c",
  //     "domanda": [
  //       [
  //         "Test from brave",
  //         "Test from brave",
  //         "Test from brave",
  //         "Test from brave",
  //         "Test from brave",
  //         "Test from brave",
  //         "Test from brave",
  //         "Test from brave",
  //         "Test from brave",
  //         "Test from brave"
  //       ]
  //     ],
  //     "settore": "tipo17",
  //     "supply1": "50",
  //     "descrizione": "Test from brave",
  //     "nomeAzienda": "Test from brave",
  //     "obbProgetto": "Test brave",
  //     "socialMedia": [
  //       "Test from brave"
  //     ],
  //     "descProgetto": "Test brave",
  //     "description1": "Test brave",
  //     "introduzione": "Test from brave",
  //     "tipoCampagna": "reward",
  //     "descrRoadStep": [
  //       "Test from brave"
  //     ],
  //     "titoloDomanda": [
  //       "Test brave"
  //     ],
  //     "addressCreator": "0xCe126Ae2d641c4e2Ac2E7F12Ec309682Af682B67",
  //     "giorniCampagna": "45",
  //     "nazioneAzienda": "CA",
  //     "numeroProdotti": "1",
  //     "titoloRoadStep": [
  //       "ss"
  //     ],
  //     "rispostaDomanda": [
  //       "Test from brave"
  //     ],
  //     "imageNftDefListFiles": [
  //       {
  //         "uri": "rivtCGb0AnlxnvA_exy5SLPJtQGKOHFWyDl4jKVGWFI",
  //         "name": "Test brave",
  //         "image": "ipfs://QmSxxDh3eQCiCjjNMiKmztaHV8AnGPcTMUCgQW5n45cXGW",
  //         "price": "2",
  //         "specs": "Test brave",
  //         "supply": 50,
  //         "description": "Test brave"
  //       }
  //     ],
  //     "logoAziendaListFiles": [
  //       "QmSxxDh3eQCiCjjNMiKmztaHV8AnGPcTMUCgQW5n45cXGW"
  //     ],
  //     "fotoProdotto1ListFiles": [
  //       "QmSxxDh3eQCiCjjNMiKmztaHV8AnGPcTMUCgQW5n45cXGW"
  //     ],
  //     "documentazioneListFiles": [
  //       "FsRtqfPSafFhI5tcR9eEqwxFtqNKX_Na35tDP17bR9k"
  //     ]
  //   }

  //   const newUserData  = { addressUser: address, shippingNft: {}, projectStakes: [] };

  //   writeData("users",address,newUserData)
  // }

  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  return (
    <div className="app">
      <main className="dashboard small">
        <div className="dashboard-header">
          <Header />
        </div>
      </main>
      <div className="box">
        <div className="dashboard-select-btn">
          <div className="dashboard-select-opt">
            <div className="dash-sel-opt-content">
              <select name="sel1" id="sel1" defaultValue={""}>
                <option value="" disabled hidden>
                  Project status
                </option>
                <option value="ongoing">Live Crowdfounding</option>
                <option value="successful">Closed Crowdfunding</option>
                <option value="pendingapproval">Pending</option>
              </select>
            </div>
            <div className="dash-sel-opt-content">
              <select name="sel2" id="sel2" defaultValue={""}>
                <option value="" disabled hidden>
                  Project type
                </option>
                <option value="reward">Reward Crowdfounding</option>
                <option value="equity">Equity</option>
              </select>
            </div>
            <div className="dash-sel-opt-content">
              <select name="sel3" id="sel3" defaultValue={""}>
                <option value="" disabled hidden>
                  Category
                </option>
                <option value="any">All Categories</option>
                <option disabled value>
                  SOCIAL
                </option>
                <option value="tipo1"> Social care</option>
                <option value="tipo2"> Health Care</option>
                <option value="tipo3"> Social health assistance</option>
                <option value="tipo4"> Education-education-training</option>
                <option value="tipo5">
                  Environmental and ecosystem protection
                </option>
                <option value="tipo6"> Enhancement of cultural heritage</option>
                <option value="tipo7">Social tourism</option>
                <option value="tipo8">University-post-graduate training</option>
                <option value="tipo9"> Extra-curricular training</option>
                <option value="tipo10">
                  Instrumental services for social enterprises
                </option>
                <option disabled value>
                  BLOCKCHAIN ​​AND WEB3 INNOVATION
                </option>
                <option value="tipo11">
                  Blockchain in finance and banking
                </option>
                <option value="tipo12">Blockchain in insurance</option>
                <option value="tipo13">Blockchain in digital payments</option>
                <option value="tipo14">Blockchain in agrifood</option>
                <option value="tipo15">Blockchain in industry 4.0</option>
                <option value="tipo16">Blockchain in the IoT</option>
                <option value="tipo17">Blockchain in healthcare</option>
                <option value="tipo18">
                  Blockchain in public administration
                </option>
                <option value="tipo19">Blockchain in retail</option>
                <option value="tipo20">Blockchain in music</option>
                <option value="tipo21">Blockchain in smart energy</option>
                <option value="tipo22">Blockchain for unbanked</option>
                <option value="tipo23">Crypto-Startup</option>
                <option value="tipo24">Decentralized Startup</option>
                <option value="tipo25">Decentralized Project</option>
                <option disabled value>
                  TRADITIONAL CATEGORIES
                </option>
                <option value="tipo26">Food startup</option>
                <option value="tipo27"> Fashion startup</option>
                <option value="tipo28"> Wear startup</option>
                <option value="tipo29"> Travel startup</option>
                <option value="tipo30"> Big data and internet apps</option>
                <option value="tipo31"> Biotechnology</option>
                <option value="tipo32"> Eco-sustainability</option>
                <option value="tipo33"> Engineering</option>
                <option value="tipo34"> Mobile and smartphones</option>
                <option value="tipo35"> 3D modeling</option>
                <option value="tipo36"> Research and development</option>
                <option value="tipo37">
                  {" "}
                  Software and the internet of things
                </option>
                <option value="tipo38"> Power</option>
                <option value="tipo39"> Artificial intelligence</option>
                <option value="tipo40"> Science and transport</option>
                <option value="tipo41"> Work</option>
                <option value="tipo42"> Telecommunications</option>
                <option value="tipo43"> Robot</option>
                <option value="tipo44"> Pharmaceutical</option>
                <option value="tipo45"> Food and water</option>
                <option value="tipo46"> Education</option>
                <option value="tipo47"> Improvement of human life</option>
                <option value="tipo48"> Public administration</option>
                <option value="tipo49"> Augmented reality</option>
                <option value="tipo50"> Programming</option>
                <option value="tipo51"> Show business</option>
                <option value="tipo52"> Automation</option>
                <option value="tipo53"> Tech for all ages and peoples</option>
                <option value="tipo54"> Emerging countries</option>
                <option value="tipo55"> Business software</option>
                <option value="tipo57"> Manufacturing</option>
                <option value="tipo58"> Games</option>
                <option value="tipo59"> Music</option>
                <option value="tipo60"> Real estate</option>
                <option value="tipo61"> Investment</option>
                <option value="tipo62"> Educational technology</option>
                <option value="tipo63"> Innovation</option>
                <option value="tipo64"> Credit</option>
                <option value="tipo65"> Insurance</option>
                <option value="tipo66"> Agricultural technology</option>
                <option value="tipo67"> Aerospace</option>
                <option value="tipo68"> Hi-tech</option>
              </select>
            </div>
            <div className="dash-sel-opt-content">
              <select name="sel4" id="sel4" defaultValue={""}>
                <option value="" disabled hidden>
                  Investment Range
                </option>
                <option value="0-25">0$ - 25$</option>
                <option value="25-50">25$ - 50$</option>
                <option value="50-100">50$ - 100$</option>
                <option value="100-250">100$ - 250$</option>

                <option value="250-500">250$ - 500$</option>
                <option value="500-1000">500$ - 1000$</option>
                <option value="1000>">1000$ &gt;</option>
                {/*  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>*/}
              </select>
            </div>
            <button onClick={HandleSearch} className="das-search-btn">
              <MdSearch />
            </button>
          </div>
          <div onClick={() => setReload(!reload)} className="das-refresh-btn">
            Reset
          </div>

        </div>
        <div className="risul-ordino-box">
          <h2 style={{ color: "black" }}>{cards.length} Results</h2>
        </div>
        <div className="profile-dash-cards">{cards}</div>
        {/* <button onClick={testWrite}>TEST WRITE</button>
        <button onClick={testRead}>TEST READ</button> */}
        <label style={{ color: "black" }}>
          {"Insurance Founds" + ": " + insuranceState + " DAI"}
        </label>
      </div>
    </div>
  );
};

export default Home;
