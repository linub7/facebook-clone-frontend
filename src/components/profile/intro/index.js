import { useState } from 'react';
import './style.css';
const Intro = ({ details }) => {
  const initialDetails = {
    bio: details?.bio ? details.bio : '',
    otherName: details?.otherName ? details.otherName : '',
    job: details?.job ? details.job : 'Web Developer',
    workplace: details?.workplace ? details.workplace : 'Google',
    highschool: details?.highschool ? details.highschool : 'Cambridge',
    collage: details?.collage ? details.collage : 'Harvard',
    currentCity: details?.currentCity ? details.currentCity : 'L.A',
    hometown: details?.hometown ? details.hometown : 'L.A hometown',
    relationShip: details?.relationShip ? details.relationShip : 'Single',
    instagram: details?.instagram ? details.instagram : 'linuxxmann77',
  };

  const [infos, setInfos] = useState(initialDetails);
  const {
    bio,
    otherName,
    job,
    workplace,
    highschool,
    collage,
    currentCity,
    hometown,
    relationShip,
    instagram,
  } = infos;
  console.log(infos);
  return (
    <div className="profile_card">
      <div className="profile_card_header">Intro</div>
      {job && workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="job" />
          works as {job} at <b>{workplace}</b>
        </div>
      ) : job && !workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="job" />
          works as {job}
        </div>
      ) : (
        workplace &&
        !job && (
          <div className="info_profile">
            <img src="../../../icons/job.png" alt="job" />
            works at <b>{workplace}</b>
          </div>
        )
      )}
      {relationShip && (
        <div className="info_profile">
          <img src="../../../icons/relationship.png" alt="relationShip" />
          {relationShip}
        </div>
      )}
      {collage && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="college" />
          studies at <b>{collage}</b>
        </div>
      )}

      {highschool && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="highschool" />
          studies at <b>{highschool}</b>
        </div>
      )}
      {currentCity && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="currentCity" />
          lives in <b>{currentCity}</b>
        </div>
      )}
      {hometown && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="hometown" />
          From <b>{hometown}</b>
        </div>
      )}
      {instagram && (
        <div className="info_profile">
          <img src="../../../icons/instagram.png" alt="instagram" />
          <a
            href={`https://instagram.com/${instagram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {instagram}
          </a>
        </div>
      )}
    </div>
  );
};

export default Intro;
