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
  type TabsRef
} from "flowbite-react";
import { CustomInput } from "../components/CustomInput";
import { CustomButton } from "../components/CustomButton";
import { useEffect, useRef, useState } from "react";
import { Form } from "react-router-dom";
import { buildPaymentRequestPayload } from "../service/buildPaymentRequestPayload";



export default function CreatePaymentForm() {
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0);

  const [form, setForm] = useState({
    no: "",
    createDate: "",
    type: "VENDOR",
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
    remarks: "",
    approval: ""
  });

  const [collectData, setCollectData] = useState([]);

  const [detailDraft, setDetailDraft] = useState(
    {
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
    if (name === "type") {
      tabsRef.current?.setActiveTab(value === "ACCOUNT" ? 1 : 0);
      setCollectData([]);
    }
  }


  function handleChangeCollection(e) {
    const { name, value } = e.target;
    setDetailDraft((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = buildPaymentRequestPayload(form, collectData)
    console.log(data);
  }

function handleAddDetail() {
  setCollectData(prev => [...prev, detailDraft]);
  setDetailDraft({
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
  }

  const lastIndex = collectData.length - 1;
  const lastData = lastIndex >= 0 ? collectData[lastIndex] : {};


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

  const dataType = [
    {
      value: "VENDOR",
      label: "Vendor"
    },
    {
      value: "CUSTOMER",
      label: "Customer"
    },
    {
      value: "ACCOUNT",
      label: "Account"
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
              <CustomInput id="type" type="select" label="Type" placeholder="Type" required={true} data={dataType} value={form.type} onChange={handleChange} />

              <CustomInput id="means" type="text" label="Payment Means" placeholder="Payment Means" required={true} value={form.means} onChange={handleChange} />
              <CustomInput id="currencies" type="text" label="Doc Currency" placeholder="Doc Currency" required={true} value={form.currencies} onChange={handleChange} />
            </div>
          </Card>
          <Card>
            <div className="grid gap-y-4">
              <div className="grid grid-col-2 gap-y-4">
                
                <CustomInput id="coa" type="twoInput" label="COA" placeholder="COA" required={true} value={form.coaSelect} value2={form.coaInput} onChange={handleChange} />
                {/* WHILE TYPE = CUSTOMER, IT SUPPOSE TO BE HIDE */}
                {
                  form.type ==  "ACCOUNT" 
                  ? 
                    ''
                  :
                   (
                     <CustomInput id="bpCode" type="twoInput" label="BP Code" placeholder="BP Code" required={true} value={form.bpCodeSelect} value2={form.bpCodeInput} onChange={handleChange} />
                   )
                }

                <CustomInput id="bankAcc" type="twoInput" label="Bank Account" placeholder="Bank Account" required={true} value={form.bankAccSelect} value2={form.bankAccInput} onChange={handleChange} />
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
          <Tabs aria-label="Full width tabs" variant="default" ref={tabsRef} onActiveTabChange={(tab) => setActiveTab(tab)}>
            {/* WHILE TYPE == ACCOUNT, IT SUPPOSED TO BE DISABLED */}
            <TabItem active title="Invoice" disabled={form.type === "ACCOUNT"}
              >
              {
                form.type == "ACCOUNT" ? null :
                (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-y-1 gap-x-5 mb-4">
                    {
                      form.type == "CUSTOMER" ? null : 
                      <>
                        <CustomInput id="invType" type="text" label="Invoice Type" placeholder="Invoice Type" value={detailDraft.invType} onChange={handleChangeCollection} />
                        <CustomInput id="invoiceNo" type="text" label="Invoice No." placeholder="Invoice No." value={detailDraft.invoiceNo} onChange={handleChangeCollection} />
                      </>  
                    }
                    
                    <CustomInput id="vendorRef" type="text" label="Vendor Ref No." placeholder="Vendor Ref No." value={detailDraft.vendorRef} onChange={handleChangeCollection} />
                    {/* <CustomInput id="invoiceAmount" type="text" label="Invoice Amount" placeholder="Invoice Amount" value={detailDraft.invoiceAmount} onChange={handleChangeCollection} /> */}
                    <CustomInput id="wTaxAmount" type="text" label="W Tax Amount" placeholder="W Tax Amount" value={detailDraft.wTaxAmount} onChange={handleChangeCollection} />
                    <CustomInput id="paymentAmount" type="text" label="Payment Amount" placeholder="Payment Amount" value={detailDraft.paymentAmount} onChange={handleChangeCollection} />
                    
                    {
                      form.type == "CUSTOMER" ? null : 
                      <>
                        <CustomInput id="balanceInvoice" type="text" label="Balance Invoice" placeholder="Blance Invoice" value={detailDraft.balanceInvoice} onChange={handleChangeCollection} />
                        <CustomInput id="cashDisc" type="text" label="Cash Discount" placeholder="Cash Discount" value={detailDraft.cashDisc} onChange={handleChangeCollection} />
                      </>  
                    }
                  </div>
                )
              }
            </TabItem>

            <TabItem title="Account" disabled={form.type == "VENDOR" || form.type == "CUSTOMER" ? true : false}>
              {
                form.type == "VENDOR" || form.type == "CUSTOMER" ? "" :
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <CustomInput id="accNo" type="text" label="Account No." placeholder="Invoice Type" 
                // REQUIRED LOGIC HERE
                value={detailDraft.accNo} onChange={handleChangeCollection} />
                <CustomInput id="remarkDetail" type="text" label="Remarks Detail" placeholder="Remark Detail" 
                // REQUIRED LOGIC HERE
                value={detailDraft.remarkDetail} onChange={handleChangeCollection} />
                <CustomInput id="proj" type="text" label="Project" placeholder="Project" 
                // REQUIRED LOGIC HERE
                value={detailDraft.proj} onChange={handleChangeCollection} />
                
                <CustomInput id="noFPK" type="text" label="No. FPK" placeholder="No. FPK" 
                // REQUIRED LOGIC HERE
                value={detailDraft.noFPK} onChange={handleChangeCollection} />
                <CustomInput id="dept" type="text" label="Department" placeholder="Department" 
                // REQUIRED LOGIC HERE
                value={detailDraft.dept} onChange={handleChangeCollection} />
                <CustomInput id="locPool" type="text" label="Lokasi Pool" placeholder="Lokasi Pool" 
                // REQUIRED LOGIC HERE
                value={detailDraft.locPool} onChange={handleChangeCollection} />
                <CustomInput id="d3" type="text" label="Dimension 3" placeholder="Dimension 3" 
                // REQUIRED LOGIC HERE
                value={detailDraft.d3} onChange={handleChangeCollection} />
                <CustomInput id="d4" type="text" label="Dimension 4" placeholder="Dimension 4" 
                // REQUIRED LOGIC HERE
                value={detailDraft.d4} onChange={handleChangeCollection} />
                <CustomInput id="d5" type="text" label="Dimension 5" placeholder="Dimension 5" 
                // REQUIRED LOGIC HERE
                value={detailDraft.d5} onChange={handleChangeCollection} />
              </div>
              }
            </TabItem>
          </Tabs>
          <div className="w-full flex justify-end">
            <Button onClick={handleAddDetail}>Add</Button>
          </div>
        </Card>

        {/* Table Section */}
        <div className="overflow-x-auto">
            <Table striped className="mr-10">
              <TableHead>
                {
                  form.type == "VENDOR" ? 
                  <>
                    <TableHeadCell>Invoice Type</TableHeadCell>
                    <TableHeadCell>invoice No</TableHeadCell>
                    <TableHeadCell>Vendor References</TableHeadCell>

                    {/* TIDAK ADA FIELD */}
                    <TableHeadCell>Invoice Currencies</TableHeadCell>
                    
                    <TableHeadCell>Invoice Amount</TableHeadCell>
                    <TableHeadCell>WTax Amount</TableHeadCell>

                    <TableHeadCell>Cash Discount</TableHeadCell>
                    <TableHeadCell>Payment Amount</TableHeadCell>
                  </>
                  :
                  null
                }

                {
                  form.type == "CUSTOMER" ? 
                  <>
                    <TableHeadCell>WTax Amount</TableHeadCell>
                  </>
                  :
                  ""
                }

                {
                  form.type == "ACCOUNT" ?  
                  <>
                    <TableHeadCell>Account No.</TableHeadCell>
                    <TableHeadCell>Account Name</TableHeadCell>
                    <TableHeadCell>Department</TableHeadCell>
                    <TableHeadCell>No. Pool</TableHeadCell>
                    <TableHeadCell>Dimension 3</TableHeadCell>
                    <TableHeadCell>Dimension 4</TableHeadCell>
                    <TableHeadCell>FPK</TableHeadCell>
                    <TableHeadCell>Remark</TableHeadCell>
                    <TableHeadCell>Payment Amount</TableHeadCell>
                  </>
                  :
                  null
                }

                <TableHeadCell>Action</TableHeadCell>

              </TableHead>
              <TableBody>
                {/* Rows will go here dynamically */}
                {
                  collectData.map((item, idx) => (
                    <TableRow>
                      {
                        form.type == "VENDOR" ?
                        <>
                          <TableCell>{collectData[idx].invType}</TableCell>
                          <TableCell>{collectData[idx].invoiceNo}</TableCell>
                          <TableCell>{collectData[idx].vendorRef}</TableCell>
                          <TableCell>INVOICE CURRENCIES</TableCell>
                          <TableCell>{collectData[idx].invoiceAmount}</TableCell>
                          <TableCell>{collectData[idx].wTaxAmount}</TableCell>
                          <TableCell>{collectData[idx].cashDisc}</TableCell>
                          <TableCell>{collectData[idx].paymentAmount}</TableCell>
                        </>
                        :
                        null
                      }

                      {/* TIDAK ADA FIELD */}

                      {
                        form.type == "CUSTOMER" ? 
                        <>
                          <TableCell>{collectData[idx].wTaxAmount}</TableCell>
                        </>
                        :
                        null
                      }
                      
                      

                      
                      
                      {
                        form.type == "ACCOUNT" ?
                        <>
                          <TableCell>{collectData[idx].accNo}</TableCell>
                          <TableCell>Account Number</TableCell>
                          <TableCell>{collectData[idx].dept}</TableCell>
                          <TableCell>{collectData[idx].locPool}</TableCell>
                          <TableCell>{collectData[idx].d3}</TableCell>
                          <TableCell>{collectData[idx].d4}</TableCell>
                          <TableCell>{collectData[idx].noFPK}</TableCell>
                          <TableCell>{collectData[idx].remarkDetail}</TableCell>
                          <TableCell>{collectData[idx].paymentAmount}</TableCell>
                        </>
                        :
                        null
                      }    

                      <TableCell><CustomButton name="DELETE"/></TableCell> 
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
        </div>
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
