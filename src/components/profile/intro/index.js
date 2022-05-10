import { updateDetails } from 'functions/user';
import { useEffect, useState } from 'react';
import Bio from './Bio';
import EditDetails from './EditDetails';
import './style.css';
const Intro = ({ details, visitor, token, setForceRenderPage }) => {
  const initialDetails = {
    bio: details?.bio ? details.bio : '',
    otherName: details?.otherName ? details.otherName : '',
    job: details?.job ? details.job : '',
    workplace: details?.workplace ? details.workplace : '',
    highschool: details?.highschool ? details.highschool : '',
    collage: details?.collage ? details.collage : '',
    currentCity: details?.currentCity ? details.currentCity : '',
    hometown: details?.hometown ? details.hometown : '',
    relationShip: details?.relationShip ? details.relationShip : '',
    instagram: details?.instagram ? details.instagram : '',
  };

  const [infos, setInfos] = useState(initialDetails);

  const [showBio, setShowBio] = useState(false);
  const [max, setMax] = useState(infos?.bio ? 100 - infos?.bio.length : 100);
  const [visibleEdit, setVisibleEdit] = useState(false);

  useEffect(() => {
    setInfos(details);
  }, [details]);

  console.log(infos);

  const handleChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setInfos({ ...infos, [name]: value });
    setMax(100 - value.length);
  };

  const updateUserDetails = async () => {
    try {
      const result = await updateDetails(infos, token);
      setInfos(result);
      setForceRenderPage((prev) => !prev);
      setTimeout(() => {
        setShowBio(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="profile_card">
      <div className="profile_card_header">Intro</div>
      {infos?.bio && !showBio && (
        <div className="info_col">
          <span className="info_text">{initialDetails?.bio}</span>
          {!visitor && (
            <button
              className="gray_btn hover1"
              onClick={() => setShowBio(true)}
            >
              Edit Bio
            </button>
          )}
        </div>
      )}
      {!details && !showBio && !visitor && (
        <button
          className="gray_btn hover1 w100"
          onClick={() => setShowBio(true)}
        >
          Add Bio
        </button>
      )}
      {showBio && (
        <Bio
          bio={infos?.bio}
          handleValueChange={handleChange}
          max={max}
          setShowBio={setShowBio}
          updateUserDetails={updateUserDetails}
          placeholder="Add Bio"
          name={'bio'}
        />
      )}
      {infos?.job && infos?.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="job" />
          works as {infos?.job} at <b>{infos?.workplace}</b>
        </div>
      ) : infos?.job && !infos?.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="job" />
          works as {infos?.job}
        </div>
      ) : (
        infos?.workplace &&
        !infos?.job && (
          <div className="info_profile">
            <img src="../../../icons/job.png" alt="job" />
            works at <b>{infos?.workplace}</b>
          </div>
        )
      )}
      {infos?.relationShip && (
        <div className="info_profile">
          <img src="../../../icons/relationship.png" alt="relationShip" />
          {infos?.relationShip}
        </div>
      )}
      {infos?.collage && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="college" />
          studies at <b>{infos?.collage}</b>
        </div>
      )}

      {infos?.highschool && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="highschool" />
          studies at <b>{infos?.highschool}</b>
        </div>
      )}
      {infos?.currentCity && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="currentCity" />
          lives in <b>{infos?.currentCity}</b>
        </div>
      )}
      {infos?.hometown && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="hometown" />
          From <b>{infos?.hometown}</b>
        </div>
      )}
      {infos?.instagram && (
        <div className="info_profile">
          <img src="../../../icons/instagram.png" alt="instagram" />
          <a
            href={`https://instagram.com/${infos?.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {infos?.instagram}
          </a>
        </div>
      )}

      {!visitor && (
        <button
          className="gray_btn hover1 w100"
          onClick={() => setVisibleEdit(true)}
        >
          Edit Details
        </button>
      )}
      {visibleEdit && !visitor && (
        <EditDetails
          details={details}
          handleChange={handleChange}
          updateUserDetails={updateUserDetails}
          setVisibleEdit={setVisibleEdit}
          visibleEdit={visibleEdit}
        />
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100">Add Hobbies</button>
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100">Add Featured</button>
      )}
    </div>
  );
};

export default Intro;
