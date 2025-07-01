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
import { Link, useLocation } from "react-router-dom";

const customTheme = createTheme({
    sidebar:{
      root:{
        base: "!h-auto min-h-screen w-full"
      },
      item: {
        base: "flex items-center gap-x-3 p-2 rounded-lg text-sm font-medium text-black",
        active: "bg-red-200 text-black hover:bg-red-300",
      },
      logo:{
        img: "w-full"
      }
    }
  });
  
  export function Navigation() {
    const location = useLocation();

    const isActive = (to: string) => location.pathname === to;

    return (
      <ThemeProvider theme={customTheme}>
        <Sidebar aria-label="Sidebar with multi-level dropdown">
          <SidebarLogo
          clearTheme
              href="/"
              img="./logo_iag.webp"
          >
          </SidebarLogo>

          <SidebarItemGroup>
              <SidebarCollapse label="Payment Request" open="true" icon={RiSecurePaymentFill}>
              <SidebarItem
                  as={Link}
                  to="/home"
                  icon={RiDashboardFill}
                  active={isActive("/home")}
                >
                  Dashboard
                </SidebarItem>
                <SidebarItem
                  as={Link}
                  to="/approval"
                  icon={IoCheckbox}
                  active={isActive("/approval")}
                >  
                  Approval
                </SidebarItem>
                <SidebarItem
                  as={Link}
                  to="/create-payment-request"
                  icon={IoCreate}
                  active={isActive("/create-payment-request")}
                >
                  Create
                </SidebarItem>
                <SidebarItem
                  as={Link}
                  to="/list-payment-request"
                  icon={IoList}
                  active={isActive("/list-payment-request")}
                >
                  List
                </SidebarItem>
                
                
                <SidebarItem
                  as={Link}
                  to="/print-preview"
                  icon={BsFillPrinterFill}
                  active={isActive("/print-preview")}
                >
                  Print Preview
                </SidebarItem>
                <SidebarItem
                  as={Link}
                  to="/logout"
                  icon={IoLogOut}
                  active={isActive("/logout")}
                >
                  Log Out
                </SidebarItem>
              </SidebarCollapse>
          </SidebarItemGroup>
        </Sidebar>
      </ThemeProvider>
    );
  }