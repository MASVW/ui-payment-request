import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useLocation, Link } from "react-router-dom";

const titleMap = {
  "/": "Home",
  "/home": "Dashboard",
  "/create-payment-request": "Create Payment Request",
  "/approval": "Approval",
  "/list-payment-request": "List Payment Request",
  "/print-preview": "Print Preview",
  "/logout": "Log Out",
};

export default function TitleNavigation() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

   // Judul untuk title di atas
  const pageTitle =
    titleMap[location.pathname] ||
    titleMap[`/${pathnames[pathnames.length - 1] || ""}`] ||
    "Dashboard";

  return (
    <div className="flex w-full h-10 justify-between items-center px-10">
      <p className="font-semibold">{pageTitle}</p>
      <Breadcrumb aria-label="Breadcrumb">
        <BreadcrumbItem>
          <Link to="/home" className="flex items-center gap-1">
            <HiHome className="mr-1" /> Home
          </Link>
        </BreadcrumbItem>
        {pathnames.map((value, idx) => {
          const to = `/${pathnames.slice(0, idx + 1).join("/")}`;
          const isLast = idx === pathnames.length - 1;
          return (
            <BreadcrumbItem key={to} aria-current={isLast ? "page" : undefined}>
              {isLast ? (
                <span className="font-bold">
                  {titleMap[to] ||
                    value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
              ) : (
                <Link to={to}>
                  {titleMap[to] ||
                    value.charAt(0).toUpperCase() + value.slice(1)}
                </Link>
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </div>
  );
}
