import { authService, dbService } from "fbase";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Nweet from "components/Nweet";

const Profile = ({ userObj, refreshUser }) => {
  const [nweets, setNweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const history = useHistory();

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName });
      refreshUser();
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const getMyNweets = async () => {
    await dbService
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
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
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
