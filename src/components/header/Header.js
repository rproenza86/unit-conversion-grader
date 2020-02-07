import React from "react";
import TopAppBar, {
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle
} from "@material/react-top-app-bar";

// styles
import "./Header.scss";

function Header() {
  return (
    <TopAppBar>
      <TopAppBarRow>
        <TopAppBarSection align="start">
          <TopAppBarTitle>THE CONVERSIONS JUDGE</TopAppBarTitle>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
  );
}

export default Header;
