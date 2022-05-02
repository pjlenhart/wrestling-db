import React from "react";
import me from "../pictures/coach_pj.jpg";
import "../styles/aboutStyles.css";

const About = () => {
  return (
    <>
      <div className="about-container">
        <div className="left-half">
          <h1 className="h1-about">About/FAQ</h1>
          <article>
            <br />
            <br />
            <h2 className="h2-about">
              <b>Statistics and Data For Towson High Wrestling</b>
            </h2>
            <br />
            <br />
            <p>
              This purpose of this site is to have a central hub that wrestlers
              and coaches can access to look up statistics and data for Towson
              High School Wrestling. This respository is both individualized and
              team oriented, allowing student athletes to analyze their
              performance and how it has contributed to team success. In
              addition, student athletes will have access to both post-season
              and regular season data and will be able to see career statistics
              starting from the 2021-2022 season.
            </p>
            <hr />
          </article>
          <article>
            <br />
            <br />
            <h2 className="h2-about">
              <b>What Data is Available in this Repository?</b>
            </h2>
            <br />
            <br />
            <p>
              Student athletes will have access to both post-season and regular
              season data and will be able to see career statistics starting
              from the 2021-2022 season. However, due to the way scoring is
              conducted throughout the season, post-season statistics are more
              limited than regular season data which tracks all scoring actions.
              All wins, losses, match times, methods of result, period the match
              ended in, and in some cases, points for/against, are common data
              points that are available for both regular season and post-season
              matches.
            </p>
            <hr />
          </article>
          <article>
            <br />
            <br />
            <h2 className="h2-about">
              <b>How is the Data Obtained?</b>
            </h2>
            <br />
            <br />
            <p>
              All data is obtained by manual scoring throughout the wrestling
              season by Towson High School student managers or Coach PJ.
              Individual and post-season data is scored by official tournament
              scorers and have been collected from TrackWrestling, which most
              tournaments use as an open platform to score and track matches for
              several individualized tournaments.
            </p>
            <hr />
          </article>
          <article>
            <br />
            <br />
            <h2 className="h2-about">
              <b>Who Has Access to the Website?</b>
            </h2>
            <br />
            <br />
            <p>
              Only verified people with a login to this website will be granted
              access to browse the site past the home login page. All data will
              be protected to the best of my ability and login
              username/passwords will only be distributed to those affiliated
              with Towson High School Wrestling. If there are any concerns of
              security, do not hesistate to reach out.
            </p>
            <hr />
          </article>
          <article>
            <br />
            <br />
            <h2 className="h2-about">
              <b>Got Ideas, Improvements, or Recommendations?</b>
            </h2>
            <br />
            <br />
            <p>
              Any and all feedback about the website, its features, or
              functionality are greatly appreciated! Contact me, Coach PJ, with
              ideas, improvements, or recommendations for the site and I will do
              my best to see if we can get it added!
            </p>
            <hr />
          </article>
        </div>
        <div className="right-half">
          <figure>
            <img src={me} alt="Coach PJ" className="img-about" />
            <figcaption>
              <b>
                PJ Lenhart, Head Coach, Towson High School Wrestling and Website
                Creator
              </b>
            </figcaption>
          </figure>
        </div>
      </div>
    </>
  );
};

export default About;
