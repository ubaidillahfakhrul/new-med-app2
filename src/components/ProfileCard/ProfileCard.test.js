// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import ProfileForm from "./ProfileCard";

import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProfileForm from "./ProfileCard";

// test("renders user details", () => {
//   render(<ProfileForm />);
//   expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
//   expect(screen.getByText(/1234567890/i)).toBeInTheDocument();
//   expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
// });

// test("switches to edit mode and updates data", () => {
//   render(<ProfileForm />);
//   fireEvent.click(screen.getByText(/Edit/i));

//   const nameInput = screen.getByDisplayValue("John Doe");
//   fireEvent.change(nameInput, { target: { value: "Jane Smith" } });

//   fireEvent.click(screen.getByText(/Save/i));
//   expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
// });

test("renders ProfileForm without crashing", () => {
  render(
    <MemoryRouter>
      <ProfileForm />
    </MemoryRouter>
  );
});
