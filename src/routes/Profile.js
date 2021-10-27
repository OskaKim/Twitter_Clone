import { authService, dbService } from "fbase";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useState } from "react/cjs/react.development";
import Nweet from "components/Nweet";

const Profile = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  const history = useHistory();

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyNweets = async () => {
    const newArray = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "asc")
      .onSnapshot((snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        setNweets(newArray);
      });
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Profile;
