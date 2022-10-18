import React from "react";

const Announcements = () => {
  const announcements = [
    {
      title: "Interest Meeting",
      details: [
        "October 26th in the Cafeteria",
        "Look out for more on the annoucements, spread the word!",
      ],
    },
    {
      title: "Hydration Test",
      details: ["Details soon on when the hydration test will be"],
    },
    {
      title: "Mat Setup",
      details: ["Monday, November 14th, all should plan to come help"],
    },
  ];
  return (
    <div>
      {announcements.map((ann) => (
        <div>
          <h4 className="h4-home">{ann.title}</h4>
          <ul className="list-home">
            {ann.details.map((det) => (
              <li>{det}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Announcements;
