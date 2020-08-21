import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

import Header from "./common/header";
import Search from "./Search";

function User() {
  const { role } = useParams();
  const [countries, setCountries] = useState<any>([]);
  const [noOfItems, setNoOfItems] = useState<number>(15);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [apiResponseLog, setApiResponseLog] = useState<any>([]);

  useEffect(() => {
    getCountriesApi();
  }, []);

  const getCountriesApi = () => {
    fetch("http://13.57.235.126:5000/countries")
      .then((response) => response.json())
      .then((data) => data && setCountries(data.countries));
  };

  const handleaddAndSelectHandler = async (location: string, type: string) => {
    if (type == "add") {
      await fetch("http://13.57.235.126:5000/addcountry?name=" + location)
        .then(async (response) => {
          const data = await response.json();
          setApiResponse(data);
          let log = [...apiResponseLog];
          log.push(location + " is added");
          setApiResponseLog(log);
          getCountriesApi();
        })
        .catch((error) => {
          setApiResponse({ errorMessage: error.toString() });
          console.error("There was an error!", error);
        });
    } else {
      let log = [...apiResponseLog];
      log.push(location + " is selected");
      setApiResponseLog(log);
    }
  };

  return (
    <>
      <Header />
      <Search
        privilege={role == "admin" ? true : false}
        noOfItems={noOfItems}
        addAndSelectHandler={handleaddAndSelectHandler}
        countries={countries}
      />
      <br />
      <div style={{ width: "250px", marginLeft: "72px" }}>
        <>
          <b>Logs : </b>
          {apiResponseLog &&
            apiResponseLog?.map((log: string) => (
              <ListGroup>
                <ListGroupItem>{log}</ListGroupItem>
              </ListGroup>
            ))}

          {apiResponse && apiResponse?.errorMessage && (
            <b>{apiResponse?.errorMessage}</b>
          )}
        </>
      </div>
    </>
  );
}

export default User;
