import Home from "../app/page";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("table", () => {
    it("renders a table", () => {
      render(<Home />);
      // check if all components are rendered
      expect(screen.getByTestId("color")).toBeInTheDocument();
    //   expect(screen.getByTestId("num1")).toBeInTheDocument();
    //   expect(screen.getByTestId("num2")).toBeInTheDocument();
    //   expect(screen.getByTestId("add")).toBeInTheDocument();
    //   expect(screen.getByTestId("subtract")).toBeInTheDocument();
    //   expect(screen.getByTestId("multiply")).toBeInTheDocument();
    //   expect(screen.getByTestId("divide")).toBeInTheDocument();
    });
  });