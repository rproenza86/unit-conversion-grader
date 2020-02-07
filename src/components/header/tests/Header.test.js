import React from "react";
import { render } from "@testing-library/react";
import Header from "../Header";

describe("Header component", () => {
  it("should renders with the app title", () => {
    const { getByText } = render(<Header />);
    const appTitle = getByText(/THE CONVERSIONS JUDGE/i);
    expect(appTitle).toBeInTheDocument();
  });
});
