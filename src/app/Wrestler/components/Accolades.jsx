import React from "react";
import _ from "lodash";

const Accolades = (props) => {
  const { accolades } = props;
  const data = accolades.accolades;
  return (
    <div>
      <ul className="accolades">
        {data
          ? data.map((acc) => (
              <li
                key={_.uniqueId()}
              >{`${acc.place} place, ${acc.season} ${acc.tournament}`}</li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default Accolades;
