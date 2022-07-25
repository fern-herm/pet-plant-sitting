import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Card, Overlay } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../state/hooks";
import MoreInfo from "./MoreInfo";
import { setPrompt } from "../../state/features/jobs/jobSlice";
import moment from "moment";
import axios from "axios";

interface jobStuff {
  id: number;
  location: string;
  employer_id: number;
  sitter_id: number | null;
  startDate: Date;
  endDate: Date;
  pet_plant: Array<number>;
}
const Job = ({ settemp, job, setshowapplied, setshowrevoked }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const removeOverlay = () => {
    setTimeout(() => {
      setShow(false);
    }, 5000);
  };

  const TOKEN = `${process.env.MAPBOX_TOKEN}`;
  const [userGeoLoc, setUserGeoLoc] = useState(null);
  const [jobGeoLoc, setJobGeoLoc] = useState(null);
  const [distanceFromJob, setDistanceFromJob] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const users = useAppSelector((state) => state.userProfile.users);
  const user = useAppSelector((state) => state.userProfile.value);
  const petPlants = useAppSelector((state) => state.petPlant.petPlants);
  const {
    id,
    location,
    pet_plant,
    employer_id,
    sitter_id,
    startDate,
    endDate,
    job_applicants,
  }: jobStuff = job;
  const dispatch = useAppDispatch();

  const geoCodeUser = async () => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${user?.location}.json?access_token=${TOKEN}`
      )
      .then((results) => {
        setUserGeoLoc(results.data.features[0].center);
        return results.data.features[0].center;
      });
  };

  const geoCodeJob = async () => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${job?.location}.json?access_token=${TOKEN}`
      )
      .then((results) => {
        setJobGeoLoc(results.data.features[0].center);
        return results.data.features[0].center;
      });
  };

  const handleClick = () => {
    if (user.name === "") {
      setShow(true);
      removeOverlay();
      return;
    }
    geoCodeUser();
    geoCodeJob();

    if (user.name === "") {
      dispatch(setPrompt(true));
    }
    setModalShow(true);
  };
  useEffect(() => {
    if (jobGeoLoc === null || userGeoLoc === null) {
      return;
    }
    axios
      .get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${userGeoLoc[0]},${userGeoLoc[1]};${jobGeoLoc[0]},${jobGeoLoc[1]}?steps=true&geometries=geojson&access_token=${TOKEN}`
      )
      .then((results) => {
        setDistanceFromJob((results.data.routes[0].distance / 1609).toFixed(1));
      });
  }, [jobGeoLoc, userGeoLoc]);
  return (
    <Container className="job-card">
      <Card className="bootstrap-card">
        <Card.Body>
          <Row>
            <Col>
              {user.id !== employer_id ? (
                <>
                  <strong>Employer: </strong>
                  {
                    <>
                      {users.reduce((employer, users) => {
                        if (users.id === employer_id) {
                          employer = users.name;
                        }
                        return <div>{employer}</div>;
                      }, "")}
                    </>
                  }
                </>
              ) : (
                <>
                  <strong>Applicants: </strong>
                  {job_applicants.length}
                </>
              )}
            </Col>
            <Col>
              {Array.isArray(job.job_pets_plants) ? (
                <>
                  <strong>Pet/Plants: </strong>
                  {job.job_pets_plants.map((p, i) => {
                    return (
                      <Row key={`p${i}`}>
                        <Col><img src={p.pet_plant?.image} className='img-fluid testImg' alt='Responsive Img' /></Col>
                        <Col>{p.pet_plant?.name}</Col>
                        <Col>{p.pet_plant?.species}</Col>
                      </Row>
                    );
                  })}
                </>
              ) : (
                <div />
              )}
            </Col>
          </Row>
          <Row className="jobStartsInRow">
            <Col>
              <strong>Job starts {moment(startDate).fromNow()}.</strong>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                ref={target}
                className="bootstrap-button"
                onClick={handleClick}
                variant="primary"
              >
                More Info
              </Button>
            </Col>

            <Col>
              <Card.Title>Job#{id}</Card.Title>
            </Col>
          </Row>

          <>
            <MoreInfo
              settemp={settemp}
              setshowrevoked={setshowrevoked}
              setshowapplied={setshowapplied}
              distance={distanceFromJob}
              user={user}
              show={modalShow}
              job_id={id}
              onHide={() => setModalShow(false)}
              job={job}
              employer={users.reduce((employer, users) => {
                if (users.id === employer_id) {
                  employer = users.name;
                }
                return employer;
              }, "")}
            />
          </>
        </Card.Body>
      </Card>

      <Overlay target={target.current} show={show} placement="right">
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div
            {...props}
            style={{
              position: "absolute",
              backgroundColor: "rgba(255, 100, 100, 0.85)",
              padding: "2px 10px",
              color: "white",
              borderRadius: 3,
              ...props.style,
            }}
          >
            Please login to see more details!
          </div>
        )}
      </Overlay>
    </Container>
  );
};

Job.propTypes = {};

export default Job;
