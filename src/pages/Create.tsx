import {
  Card,
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
import { CustomInput } from "../components/CustomInput";
import { CustomButton } from "../components/CustomButton";
import { useState } from "react";


export default function CreatePaymentForm() {

  const [form, setForm] = useState({
    no: "",
    createDate: "",
    type: "",
    means: "",
    currencies: "",
    status: "",
    reqPayment: "",
    postDate: "",
    outgoingNum: "",
    coaSelect: "",
    coaInput: "",
    bpCodeSelect: "",
    bpCodeInput: "",
    bankAccSelect: "",
    bankAccInput: "",
    checkNo: "",
    receiveNo: "",
    invType: "",
    invoiceNo: "",
    vendorRef: "",
    invoiceAmount: "",
    paymentAmount: "",
    balanceInvoice: "",
    cashDisc: "",
    accNo: "",
    remarkDetail: "",
    proj: "",
    wTaxAmount: "",
    noFPK: "",
    dept: "",
    locPool: "",
    d3: "",
    d4: "",
    d5: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }


  function handleSubmit(e) {
    e.preventDefault();
    console.log(form);
  }

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
    <form onSubmit={handleSubmit}>
      <div id="formCreateContent" className="grid grid-col-1 gap-y-5 mt-4 mb-5">
        <div className="grid grid-cols-2">
          <div className="flex place-content-end">
            <div className="">
              <div className="h-full grid grid-cols-4 gap-5 content-start">
                <CustomInput disable id="status" type="text" label="Status" placeholder="Status" required={true} value={form.status} onChange={handleChange} />
                <CustomInput id="outgoingNum" type="text" label="Outgoing No" placeholder="Outgoing No." required={true} value={form.outgoingNum} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="flex pl-5">
            <div className="h-full grid grid-cols-2 gap-5 content-start">
              <CustomInput id="reqPayment" type="date" label="Request Payment" placeholder="Request Payment Date" required={true} value={form.reqPayment} onChange={handleChange} />
              <CustomInput id="postDate" type="date" label="Posting Date" placeholder="Posting Date" required={true} value={form.postDate} onChange={handleChange} />
            </div>
          </div>
        </div>
        {/* Section 1 */}
        <div className="grid grid-cols-2 gap-x-10">
          {/* Section Payment No. */}
          <Card>
            <div className="grid gap-2">
              <CustomInput id="createDate" type="date" label="Create Date" placeholder="Create Date" required={true} value={form.createDate} onChange={handleChange} />

              <CustomInput id="no" type="text" label="Payment No." placeholder="Payment No." required={true} value={form.no} onChange={handleChange} />

              {/* SECTION Type */}
              <CustomInput id="type" type="select" label="Type" placeholder="Type" required={true} data={dataTesting} value={form.type} onChange={handleChange} />

              <CustomInput id="means" type="text" label="Payment Means" placeholder="Payment Means" required={true} value={form.means} onChange={handleChange} />
              <CustomInput id="currencies" type="text" label="Doc Currency" placeholder="Doc Currency" required={true} value={form.currencies} onChange={handleChange} />
            </div>
          </Card>
          <Card>
            <div className="grid gap-y-4">
              <div className="grid grid-col-2 gap-y-4">
                <CustomInput id="coa" type="twoInput" label="COA" placeholder="COA" required={true} data={dataTesting} value={form.coa} onChange={handleChange} />
                {/* WHILE TYPE = CUSTOMER, IT SUPPOSE TO BE HIDE */}
                <CustomInput id="bpCode" type="twoInput" label="BP Code" placeholder="BP Code" required={true} value={form.bpCode} onChange={handleChange} />

                <CustomInput id="Bank Account" type="twoInput" label="Bank Account" placeholder="Bank Account" required={true} value={form.bankAcc} onChange={handleChange} />
              </div>
              <div className="grid gap-y-4">
                <CustomInput id="checkNo" type="text" label="Check No." placeholder="Check No." required={true} value={form.checkNo} onChange={handleChange} />
                <CustomInput id="receiveNo" type="text" label="Receive No." placeholder="Receiving No." required={true} value={form.receiveNo} onChange={handleChange} />
              </div>
            </div>
          </Card>
        </div>

        {/* Section 2 | COA */}


        {/* Tabs Section */}
        <Card>
          <Tabs aria-label="Full width tabs" variant="default">
            {/* WHILE TYPE == ACCOUNT, IT SUPPOSED TO BE DISABLED */}
            <TabItem active title="Invoice" disabled >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-y-1 gap-x-5 mb-4">
                <CustomInput id="invType" type="text" label="Invoice Type" placeholder="Invoice Type" 
                // REQUIRED LOGIC HERE
                value={form.invType} onChange={handleChange} />
                <CustomInput id="invoiceNo" type="text" label="Invoice No." placeholder="Invoice No." 
                // REQUIRED LOGIC HERE
                value={form.invoiceNo} onChange={handleChange} />
                <CustomInput id="vendorRef" type="text" label="Vendor Ref No." placeholder="Vendor Ref No." 
                // REQUIRED LOGIC HERE
                value={form.vendorRef} onChange={handleChange} />
                <CustomInput id="invoiceAmount" type="text" label="Invoice Amount" placeholder="Invoice Amount" 
                // REQUIRED LOGIC HERE
                value={form.invoiceAmount} onChange={handleChange} />
                <CustomInput id="paymentAmount" type="text" label="Payment Amount" placeholder="Payment Amount" 
                // REQUIRED LOGIC HERE
                value={form.paymentAmount} onChange={handleChange} />
                <CustomInput id="balanceInvoice" type="text" label="Balance Invoice" placeholder="Blance Invoice" 
                // REQUIRED LOGIC HERE
                value={form.balanceInvoice} onChange={handleChange} />
                <CustomInput id="cashDisc" type="text" label="Cash Discount" placeholder="Cash Discount" 
                // REQUIRED LOGIC HERE
                value={form.cashDisc} onChange={handleChange} />
              </div>
            </TabItem>

            <TabItem title="Account">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <CustomInput id="accNo" type="text" label="Account No." placeholder="Invoice Type" 
                // REQUIRED LOGIC HERE
                value={form.accNo} onChange={handleChange} />
                <CustomInput id="remarkDetail" type="text" label="Remarks Detail" placeholder="Remark Detail" 
                // REQUIRED LOGIC HERE
                value={form.remarkDetail} onChange={handleChange} />
                <CustomInput id="proj" type="text" label="Project" placeholder="Project" 
                // REQUIRED LOGIC HERE
                value={form.proj} onChange={handleChange} />
                <CustomInput id="wTaxAmount" type="text" label="W Tax Amount" placeholder="W Tax Amount" 
                // REQUIRED LOGIC HERE
                value={form.wTaxAmount} onChange={handleChange} />
                <CustomInput id="paymentAmount" type="text" label="Payment Amount" placeholder="Payment Amount" 
                // REQUIRED LOGIC HERE
                value={form.paymentAmount} onChange={handleChange} />
                <CustomInput id="noFPK" type="text" label="No. FPK" placeholder="No. FPK" 
                // REQUIRED LOGIC HERE
                value={form.noFPK} onChange={handleChange} />
                <CustomInput id="dept" type="text" label="Department" placeholder="Department" 
                // REQUIRED LOGIC HERE
                value={form.dept} onChange={handleChange} />
                <CustomInput id="locPool" type="text" label="Lokasi Pool" placeholder="Lokasi Pool" 
                // REQUIRED LOGIC HERE
                value={form.locPool} onChange={handleChange} />
                <CustomInput id="d3" type="text" label="Dimension 3" placeholder="Dimension 3" 
                // REQUIRED LOGIC HERE
                value={form.d3} onChange={handleChange} />
                <CustomInput id="d4" type="text" label="Dimension 4" placeholder="Dimension 4" 
                // REQUIRED LOGIC HERE
                value={form.d4} onChange={handleChange} />
                <CustomInput id="d5" type="text" label="Dimension 5" placeholder="Dimension 5" 
                // REQUIRED LOGIC HERE
                value={form.d5} onChange={handleChange} />
              </div>
            </TabItem>
          </Tabs>
          <div className="w-full flex justify-end">
            <Button>Add</Button>
          </div>
        </Card>

        {/* Table Section */}
        <Card className="overflow-x-auto mt-6">
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
        </Card>
        {/* Remarks Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomInput id="remarks" label="Remarks" type="textArea" placeholder="Enter remarks" required={true} value={form.remarks} onChange={handleChange} />
          <CustomInput id="approval" label="Approval" type="textArea" placeholder="Enter notes approval" required={true} value={form.approval} onChange={handleChange} />
        </div>
        <div className="flex gap-x-5 place-content-end">
          <CustomButton name="Execute" type="submit"/>
          <CustomButton name="Save" />
          <CustomButton name="Cancel Doc" />
        </div>
      </div>
    </form>
  );
}
