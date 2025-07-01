import {TextInput, Navbar, NavbarBrand, NavbarToggle, createTheme, Dropdown, DropdownItem } from "flowbite-react";

const customTheme = createTheme({
  navbar: {
    brand: {
      base: "w-4/12"
    }
  }
});

export function Header() {
  return (
    <Navbar fluid rounded className="w-full" theme={customTheme.navbar}>
      <NavbarBrand clearTheme >
        <div>
          <TextInput id="search" sizing="md" />
        </div>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown label="username" dismissOnClick={false}>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Sign out</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
    </Navbar>
  );
}