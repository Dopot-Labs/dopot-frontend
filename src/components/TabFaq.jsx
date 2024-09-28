"";
import React from "react";
import BlogPost from "./PaginaCard/BlogPost";
import { useTranslation } from "../i18n/client";

const TabFaq = (props) => {
  console.dir(props);
  const { t, i18n } = useTranslation();
  return (
    <div className="pc-content-grid-left">
      <h1>Questions relating to the investment campaign</h1>

      {props.progetto.titoloDomanda.map((titoloDomanda, i) => (
        <BlogPost
          heading={titoloDomanda}
          text={props.progetto.rispostaDomanda[i]}
        />
      ))}
    </div>
  );
};

export default TabFaq;
