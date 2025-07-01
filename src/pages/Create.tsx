import {
  Card,
  TextInput,
  Textarea,
  Label,
  Tabs,
  Table,
  Button,
  TabItem,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  createTheme,
} from "flowbite-react";
import {CustomInput} from "../components/CustomInput";

export default function CreatePaymentForm() {
  const dataTesting = [
    {
      value: "2600",
      label: "Data 1"
    },
    {
      value: "2601",
      label: "Data 2"
    },
    {
      value: "2602",
      label: "Data 3"
    }
  ];
  return (
    <>
    <div id="formCreateContent" className="grid grid-col-1 gap-y-5 mt-4 mb-40">
      {/* Section 1 */}
        <div className="grid grid-cols-2 gap-x-10">
          {/* Section Payment No. */}
          <Card>
            <div className="grid gap-2">
              <CustomInput id="approval" type="text" label="Payment No." placeholder="Payment No." required={true} />
              <CustomInput id="createDate" type="text" label="Create Date" placeholder="Create Date" required={true} />
            
              <CustomInput id="type" type="select" label="Type" placeholder="Type" required={true} data={dataTesting}/> 
              <CustomInput id="means" type="text" label="Payment Means" placeholder="Payment Means" required={true} />
              <CustomInput id="currencies" type="text" label="Doc Currency" placeholder="Doc Currency" required={true} /> 
            </div>
          </Card>

            {/* Section Payment Stat */}
          <Card>
            <div className="grid gap-5">
            <CustomInput id="status" type="text" label="Status" placeholder="Status" required={true} />
            <CustomInput id="reqPayment" type="text" label="Req Payment" placeholder="Req Payment Date" required={true} />
            <CustomInput id="postDate" type="text" label="Posting Date" placeholder="Posting Date" required={true} />
            <CustomInput id="outgoingNum" type="text" label="Outgoing No" placeholder="Outgoing No." required={true} />
            </div>
        </Card>
        </div>

        {/* Section 2 | COA */}
        <Card>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-6">
              <div className="grid grid-col-2">
                <CustomInput id="coa" type="twoInput" label="COA" placeholder="COA" required={true} data={dataTesting}/>
                <CustomInput id="bpCode" type="twoInput" label="BP Code" placeholder="BP Code" required={true} />
                <CustomInput id="Bank Account" type="twoInput" label="Bank Account" placeholder="Bank Account" required={true} />
              </div>
              <div>
              <CustomInput id="checkNo" type="text" label="Check No." placeholder="Check No." required={true} />
              <CustomInput id="receiveNo" type="text" label="Receive No." placeholder="Receiving No." required={true} />
            </div>
          </div>
        </Card>

        {/* Tabs Section */}
        <Card>
          <Tabs aria-label="Full width tabs" variant="default">
            <TabItem active title="Invoice">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-y-1 gap-x-5 mb-4">
                <CustomInput id="invType" type="text" label="Invoice Type" placeholder="Invoice Type" required={true} />
                <CustomInput id="invoiceNo" type="text" label="Invoice No." placeholder="Invoice No." required={true} />
                <CustomInput id="vendorRef" type="text" label="Vendor Ref No." placeholder="Vendor Ref No." required={true} />
                <CustomInput id="invoiceAmount" type="text" label="Invoice Amount" placeholder="Invoice Amount" required={true} />
                <CustomInput id="paymentAmount" type="text" label="Payment Amount" placeholder="Payment Amount" required={true} />
                <CustomInput id="balanceInvoice" type="text" label="Balance Invoice" placeholder="Blance Invoice" required={true} />
                <CustomInput id="cashDisc" type="text" label="Cash Discount" placeholder="Cash Discount" required={true} />
              </div>
            </TabItem>
            <TabItem title="Account">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <CustomInput id="accNo" type="text" label="Account No." placeholder="Invoice Type" required={true} />
                <CustomInput id="remarkDetail" type="text" label="Remarks Detail" placeholder="Remark Detail" required={true} />
                <CustomInput id="proj" type="text" label="Project" placeholder="Project" required={true} />
                <CustomInput id="wTaxAmount" type="text" label="W Tax Amount" placeholder="W Tax Amount" required={true} />
                <CustomInput id="paymentAmount" type="text" label="Payment Amount" placeholder="Payment Amount" required={true} />
                <CustomInput id="noFPK" type="text" label="No. FPK" placeholder="No. FPK" required={true} />
                <CustomInput id="dept" type="text" label="Department" placeholder="Department" required={true} />
                <CustomInput id="dept" type="text" label="Department" placeholder="Department" required={true} />
                <CustomInput id="locPool" type="text" label="Lokasi Pool" placeholder="Lokasi Pool" required={true} />
                <CustomInput id="locPool" type="text" label="Lokasi Pool" placeholder="Lokasi Pool" required={true} />
                <CustomInput id="d3" type="text" label="Dimension 3" placeholder="Dimension 3" required={true} />
                <CustomInput id="d4" type="text" label="Dimension 4" placeholder="Dimension 4" required={true} />
                <CustomInput id="d5" type="text" label="Dimension 5" placeholder="Dimension 5" required={true} />
              </div>
            </TabItem>
          </Tabs>
          <div className="w-full flex justify-end">
            <Button>Add</Button>
          </div>
        </Card>

        {/* Table Section */}
        <Card>
          <div className="overflow-x-auto mt-6">
            <Table striped>
              <TableHead>
                <TableHeadCell>#</TableHeadCell>
                <TableHeadCell>Type</TableHeadCell>
                <TableHeadCell>Entry</TableHeadCell>
                <TableHeadCell>Invoice No.</TableHeadCell>
                <TableHeadCell>Vendor</TableHeadCell>
                <TableHeadCell>Field</TableHeadCell>
                <TableHeadCell>Field</TableHeadCell>
                <TableHeadCell>Field</TableHeadCell>
                <TableHeadCell>Field</TableHeadCell>
              </TableHead>
              <TableBody>
                {/* Rows will go here dynamically */}
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Sample</TableCell>
                  <TableCell>001</TableCell>
                  <TableCell>INV-2025</TableCell>
                  <TableCell>Vendor A</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>
        {/* Remarks Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <CustomInput id="remarks" label="Remarks" type="textArea" placeholder="Enter remarks" required={true}/>
          <CustomInput id="approval" label="Approval" type="textArea" placeholder="Enter notes approval" required={true}/>
        </div>
    </div>
    </>
  );
}
