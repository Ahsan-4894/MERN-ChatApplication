import React from "react";
import { Avatar } from "@mui/material";
import {
  Face as FaceIcon,
  CalendarMonth as CalendarIcon,
  AlternateEmail as UserNameIcon,
} from "@mui/icons-material";
import moment from "moment";
import { TransformImage } from "../../lib/features";

const ProfileCard = ({ user }) => {
  console.log(user);
  return (
    <div className="flex flex-col items-center">
      <Avatar
        src={TransformImage(user?.avatar?.url)}
        sx={{
          width: "15rem",
          height: "15rem",
          objectFit: "contain",
          marginTop: "3rem",
          border: "2px solid white",
        }}
      />
      <ProfileScreen heading={"Bio"} text={user?.bio} />
      <ProfileScreen
        heading={"Usernames"}
        text={user?.email}
        Icon={<UserNameIcon color="primary" />}
      />
      <ProfileScreen
        heading={"Name"}
        text={user?.name}
        Icon={<FaceIcon color="primary" />}
      />
      <ProfileScreen
        heading={"Joined"}
        text={moment(user?.createdAt).fromNow()}
        Icon={<CalendarIcon color="primary" />}
      />
    </div>
  );
};
const ProfileScreen = ({ text, Icon, heading }) => {
  return (
    <div className="text-2xl items-center justify-center flex flex-row h-[5rem] w-[18rem] text-black  ">
      {Icon && Icon}
      <h1>{text}</h1>
    </div>
  );
};
export default ProfileCard;
