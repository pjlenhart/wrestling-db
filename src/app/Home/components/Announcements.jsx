import React from "react";

const Announcements = (props) => {
  const { announcements } = props;
  return (
    <div>
      {console.log(announcements)}
      {announcements ? (
        announcements.map((ann) => (
          <div>
            <h4 className="h4-home">{ann.header}</h4>
            <ul className="list-home">
              <li>{ann.detail}</li>
            </ul>
          </div>
        ))
      ) : (
        <p>No Announcements at this time.</p>
      )}
    </div>
  );
};

export default Announcements;
