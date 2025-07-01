import {
    Sidebar,
    SidebarItemGroup,
    SidebarItem,
    SidebarCollapse, SidebarLogo,
    createTheme,
    ThemeProvider,
} from "flowbite-react";

import { IoCreate, IoList, IoCheckbox, IoLogOut } from "react-icons/io5";
import { BsFillPrinterFill } from "react-icons/bs";
import { RiDashboardFill, RiSecurePaymentFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const customTheme = createTheme({
    sidebar:{
      logo:{
        img: "w-full"
      }
    }
  });
  
  export function Navigation() {
    return (
      <ThemeProvider theme={customTheme}>
        <Sidebar aria-label="Sidebar with multi-level dropdown">
          <SidebarLogo
          clearTheme
              href="/"
              img="../../public/logo_iag.webp"
          >
          </SidebarLogo>

          <SidebarItemGroup>
              <SidebarCollapse label="Payment Request" open="true" icon={RiSecurePaymentFill}>
                  <SidebarItem as={Link} to="/home" icon={RiDashboardFill}>
                          Dashboard
                  </SidebarItem>
                  <SidebarItem as={Link} to="/create-payment-request"  icon={IoCreate}>
                      Create
                  </SidebarItem>
                  <SidebarItem href="#" icon={IoList}>
                      List
                  </SidebarItem>
                  <SidebarItem as={Link} to="/approval" icon={IoCheckbox}>
                      Approval
                  </SidebarItem>
                  <SidebarItem href="#" icon={BsFillPrinterFill}>
                      Print Preview
                  </SidebarItem>
                  <SidebarItem href="#" icon={IoLogOut}>
                      Log Out
                  </SidebarItem>
              </SidebarCollapse>
          </SidebarItemGroup>
        </Sidebar>
      </ThemeProvider>
    );
  }