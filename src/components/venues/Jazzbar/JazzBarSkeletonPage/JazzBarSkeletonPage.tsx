import React from "react";
import WithNavigationBar from "components/organisms/WithNavigationBar";
import InformationCard from "components/molecules/InformationCard";
import InformationLeftColumn from "components/organisms/InformationLeftColumn";
import "./JazzBarSkeletonPage.scss";
import { useSelector } from "react-redux";
import { JazzbarVenue } from "components/venues/Jazzbar/JazzTab/JazzTab";

interface PropsType {
  children: React.ReactNode;
}

const JazzBarSkeletonPage: React.FunctionComponent<PropsType> = ({
  children,
}) => {
  const { venue } = useSelector((state: any) => ({
    venue: state.firestore.data.currentVenue,
  })) as { venue: JazzbarVenue };

  return (
    <>
      <WithNavigationBar>
        <div className="full-page-container experience-container">
          <InformationLeftColumn venueLogoPath={venue ? venue.host.icon : ""}>
            <InformationCard title="About the venue">
              <p>
                Kansas Smitty’s.
                <br /> It's a band and it's a bar.
              </p>

              <p>
                Choose your table, invite your friends to join you and listen to
                the sounds of our House band.
              </p>
              <p>
                Saturdays at Kansas Smitty's have always been about having a
                great time. The band for this evenings performance features
                Giacomo Smith on clarinet and alto, Ferg Ireland on double bass,
                Joe Webb on piano, Alec Harper on tenor sax and Will Cleasby on
                drums.
              </p>
              <p>Performing tonight at Kansas Smitty's:</p>
              <ul>
                <li>Giacomo Smith - alto/clarinet</li>
                <li>Ferg Ireland - Double Bass</li>
                <li>Joe Webb - Piano</li>
                <li>Alec harper - Tenor Sax</li>
                <li>Will Cleasby - Drums</li>
              </ul>
              <p>
                If you enjoy the music why not join the Patreon community. Our
                Patreons get access to all sorts of additional musical content
                and updates on all new shows, performances and events we run.
                https://www.patreon.com/kansassmittys
              </p>
              <p>
                Kansas Smitty's have just released their new album 'Things
                Happened Here' available on all good streaming platforms and
                vinyl /CD https://ever-records.lnk.to/ThingsHappenedHere
              </p>
              <p>We'll see you in the bar...</p>
            </InformationCard>
          </InformationLeftColumn>
          <div className="content-container">{children}</div>
        </div>
      </WithNavigationBar>
    </>
  );
};

export default JazzBarSkeletonPage;
