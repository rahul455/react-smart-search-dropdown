import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
} from "reactstrap";

import "./style.css";

interface SearchProps {
  privilege: boolean;
  noOfItems: number;
  addAndSelectHandler: (location: string, type: string) => void;
  countries: any;
}

function Search(props: SearchProps) {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchcountries, setSearchCountries] = useState<any>([]);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [selLocation, setSelLocation] = useState<string>("");

  const { privilege, countries, noOfItems, addAndSelectHandler } = props;

  const toggle = () => setDropdownOpen(!dropdownOpen);

  const paginate = (arr: any, size: number) => {
    return arr.reduce((acc: any, val: any, i: number) => {
      let idx = Math.floor(i / size);
      let page = acc[idx] || (acc[idx] = []);
      page.push(val);

      return acc;
    }, []);
  };

  const getCountries = () => {
    let pages = paginate(countries, noOfItems);
    return pages[page];
  };

  const loadMore = () => {
    setPage((page) => page + 1);
    setDropdownOpen(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearched(true);
    const { value } = event.target;
    let selectedCountries = countries;
    let filter = selectedCountries.filter((country: string) => {
      if (country.toLowerCase().includes(value)) {
        return country;
      }
    });

    if (value == "") setIsSearched(false);
    setSearchLocation(value);
    setSearchCountries(filter);
  };

  const selectLocation = (country: string) => {
    setSelLocation(country);
    addAndSelectHandler(country, "select");
  };

  function _renderSearch() {
    return (
      <>
        <DropdownItem toggle={false}>
          <Input
            onChange={handleChange}
            type="search"
            name="searchCountry"
            id="searchCountry"
            placeholder="Search.."
            value={searchLocation}
          />
        </DropdownItem>
      </>
    );
  }

  function _renderDefaultLocations() {
    return (
      <>
        {getCountries()?.map((country: string) => (
          <>
            <DropdownItem onClick={() => selectLocation(country)}>
              {country}
            </DropdownItem>
            <DropdownItem divider />
          </>
        ))}
      </>
    );
  }

  function _renderSearchedLocations() {
    return (
      <>
        {searchcountries?.map((country: string) => (
          <>
            <DropdownItem onClick={() => selectLocation(country)}>
              {country}
            </DropdownItem>
            <DropdownItem divider />
          </>
        ))}
        {!searchcountries?.length && (
          <>
            <DropdownItem>
              <b>{`"${searchLocation}" not found`}</b>&nbsp;&nbsp;
              {privilege && (
                <Button
                  outline
                  color="primary"
                  onClick={() => {
                    addAndSelectHandler(searchLocation, "add");
                    setSelLocation(searchLocation);
                    setIsSearched(false);
                  }}
                >
                  Add & Select
                </Button>
              )}
            </DropdownItem>
          </>
        )}
      </>
    );
  }
  function _renderLoadMore() {
    return (
      <>
        {!isSearched && (
          <DropdownItem
            toggle={false}
            onClick={loadMore}
          >{`${noOfItems} more...`}</DropdownItem>
        )}
      </>
    );
  }

  return (
    <>
      <br />
      <br />
      <Container>
        <Row>
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
              {selLocation ? selLocation : "Select a Location"}{" "}
            </DropdownToggle>
            <DropdownMenu className="dropdown_custom">
              {_renderSearch()}
              {isSearched ? (
                <>{_renderSearchedLocations()}</>
              ) : (
                <>{_renderDefaultLocations()}</>
              )}
              <>{_renderLoadMore()}</>
            </DropdownMenu>
          </ButtonDropdown>
        </Row>
      </Container>
    </>
  );
}
export default Search;
