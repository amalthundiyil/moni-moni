import React from "react";
import BasicCard from "../../components/BasicCard";
import SearchBar from "../../components/SearchBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import GridWrapper from "../../components/GridWrapper";
import { cardHeaderStyles } from "./styles";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const filterData = (query, data) => {
  if (!query) {
    return [{ slug: "no-fundraisers-found", title: "No fundraisers found" }];
  } else {
    return data.filter((d) =>
      d.title.toLowerCase().includes(query.toLowerCase())
    );
  }
};

const Discover = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const dataFiltered = filterData(searchQuery, data);

  const getHeader = () => {
    const handleChange = (value) => {
      setSearchQuery(value);
    };

    return (
      <Box sx={cardHeaderStyles.wrapper}>
        <SearchBar
          placeholder="Search by fundraiser title"
          onChange={(event) => handleChange(event.target.value)}
          searchBarWidth="720px"
        />
      </Box>
    );
  };

  const getContent = () =>
    dataFiltered.map((d) => {
      if (d.slug === "no-fundraisers-found") {
        return (
          <Typography
            key={d.slug}
            align="center"
            sx={{
              margin: "40px 16px",
              color: "rgba(0, 0, 0, 0.6)",
              fontSize: "1.3rem",
            }}
          >
            {d.title}
          </Typography>
        );
      }

      return (
        <NavLink to={`/fundraisers/${d.slug}`} key={d.slug}>
          <Typography
            key={d.slug}
            align="center"
            sx={{
              margin: "40px 16px",
              color: "rgba(0, 0, 0, 0.6)",
              fontSize: "1.3rem",
            }}
          >
            {d.title}
          </Typography>
        </NavLink>
      );
    });

  return (
    <GridWrapper>
      <BasicCard header={getHeader()} content={getContent()} />
    </GridWrapper>
  );
};

export default Discover;
