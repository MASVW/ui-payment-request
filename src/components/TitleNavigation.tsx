import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export default function TitleNavigation() {
    return(
        <>
            <div className="flex w-full h-10 justify-between items-center px-10">
                <p className="font-semibold">Payment Request</p>
                <Breadcrumb aria-label="Default breadcrumb example">
                    <BreadcrumbItem href="#" icon={HiHome}>
                    Home
                    </BreadcrumbItem>
                    <BreadcrumbItem href="#">Create Payment Request</BreadcrumbItem>
                </Breadcrumb>
            </div>           
        </>
    );
}