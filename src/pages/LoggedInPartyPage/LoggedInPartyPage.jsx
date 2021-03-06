import React from "react";
import Map from "components/molecules/Map";
import UserList from "components/molecules/UserList";
import PartyTitle from "components/molecules/PartyTitle";
import "./LoggedInPartyPage.scss";
import Chatbox from "components/organisms/Chatbox";
import RoomList from "components/organisms/RoomList";
import CountDown from "components/molecules/CountDown";
import WithNavigationBar from "components/organisms/WithNavigationBar";
import { PARTY_NAME } from "config";
import { useSelector } from "react-redux";
import useUpdateLocationEffect from "utils/useLocationUpdateEffect";

const LoggedInPartyPage = () => {
  const { config, partygoers, user } = useSelector((state) => ({
    user: state.user,
    config:
      state.firestore.data.config && state.firestore.data.config[PARTY_NAME],
    partygoers: state.firestore.ordered.partygoers,
  }));

  useUpdateLocationEffect(user, "Map");

  const attendances = partygoers
    ? partygoers.reduce((acc, value) => {
        acc[value.lastSeenIn] = (acc[value.lastSeenIn] || 0) + 1;
        return acc;
      }, {})
    : {};

  const combinedAttendanceRoomTitles = [
    [
      "Bring Your Own Party: The Landfill",
      "Bring Your Own Party: Sedi Mental",
      "Bring Your Own Party: Meta More Peak",
    ],
    [
      "Dancing: Centre of Groovity",
      "Dancing: Techno-Tonics",
      "Dancing: Richter RPM",
    ],
  ];

  for (const roomTitles of combinedAttendanceRoomTitles) {
    let combinedAttendance = 0;
    for (const roomTitle of roomTitles) {
      if (roomTitle in attendances && attendances[roomTitle] !== undefined) {
        combinedAttendance += attendances[roomTitle];
      }
    }
    for (const roomTitle of roomTitles) {
      attendances[roomTitle] = combinedAttendance;
    }
  }

  return (
    <WithNavigationBar>
      <div className="container">
        <div className="small-right-margin">
          <PartyTitle startUtcSeconds={config.start_utc_seconds} />
        </div>
        {partygoers && (
          <div className="col">
            <UserList users={partygoers} imageSize={50} disableSeeAll={false} />
          </div>
        )}
        <div className="col">
          <div className="starting-indication">
            This is the clickable party map. Begin at Bermuda Party Portal.{" "}
            <a
              href="https://co-reality.co/events/island-partypelago-guide/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Event Program here
            </a>
          </div>
          <CountDown startUtcSeconds={config.start_utc_seconds} />
        </div>
        <div className="row">
          <Map config={config} attendances={attendances} />
        </div>
        <div className="row">
          <div className="col">
            <RoomList
              startUtcSeconds={config.start_utc_seconds}
              rooms={config.rooms}
              attendances={attendances}
            />
          </div>
          <div className="col-5 chat-wrapper">
            <Chatbox />
          </div>
        </div>
      </div>
    </WithNavigationBar>
  );
};

export default LoggedInPartyPage;
