import { useEffect, useRef, useState } from "react";
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
  type TabsRef,
  Label,
  TextInput,
} from "flowbite-react";
import { CustomInput } from "../components/CustomInput";
import { ChooseFromListModal } from "../components/ChooseFromModal";
import { CustomButton } from "../components/CustomButton";
import { buildPaymentRequestPayload } from "../service/buildPaymentRequestPayload";
import axios from "axios";
import route from "../service/routeMapping";

export default function CreatePaymentForm() {
  const initForm = {
    houseBank: "",
    createDate: new Date(),
    type: "VENDOR",
    means: "CASH",
    currencies: "IDR",
    status: "",
    reqPaymentDate: new Date(),
    postDate: new Date(),
    outgoingNum: "",
    coa: null,
    bpCode: null,
    bank: null,
    checkNo: "",
    receiveNo: "",
    remarks: "",
    approval: "",
    bankFee: 0,
  };

  const initDraft = {
    invoiceNotes: "",
    invType: "AP",
    invoiceNo: "",
    vendorRef: "",
    currencies: "IDR",
    invoiceAmount: 0.0,
    paymentAmount: 0,
    balanceInvoice: "",
    cashDisc: 0.0,
    accNo: "",
    remarkDetail: "",
    proj: "",
    wTaxAmount: 0.0,
    noFPK: "",
    dept: "",
    locPool: "",
    d3: "",
    d4: "",
    d5: "",
  };

  const initCoa = {
    Code: "",
    Name: "",
    Balance: "",
    AccountLevel: "",
    FatherAccountKey: "",
  };

  const initBank = {
    BankCode: "",
    BankName: "",
    AccountforOutgoingChecks: "",
    BranchforOutgoingChecks: "",
    NextCheckNumber: "",
    SwiftNo: "",
    IBAN: "",
    CountryCode: "",
    PostOffice: "",
    AbsoluteEntry: "",
    DefaultBankAccountKey: 0,
  };

  const initBp = {
    CardCode: "",
    CardName: "",
    CardType: "",
    GroupCode: "",
    Address: "",
    ZipCode: "",
    MailAddress: "",
    MailZipCode: "",
    Phone1: "",
    Phone2: "",
    Fax: "",
    ContactPerson: "",
    Notes: "",
    PayTermsGrpCode: "",
    CreditLimit: "",
    MaxCommitment: "",
    DiscountPercent: "",
    VatLiable: "",
    FederalTaxID: "",
  };

  const initSelectInv = {
    DocEntry: "",
    DocNum: "",
    DocDate: "",
    DocDueDate: "",
    CardCode: "",
    CardName: "",
    NumAtCard: "",
    DocTotal: 0,
    DocCurrency: "",
    PaymentGroupCode: "",
    SalesPersonCode: "",
    Project: "",
    DocumentStatus: "",
    Cancelled: "",
    U_VRM2: "",
    U_VRM1: "",
    WTAmount: 0,
  };

  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [openBpModal, setOpenBpModal] = useState(false);
  const [openCoaModal, setOpenCoaModal] = useState(false);
  const [openBankModal, setOpenBankModal] = useState(false);
  const [openInvModall, setOpenInvModall] = useState(false);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [detailDraft, setDetailDraft] = useState(initDraft);
  const [form, setForm] = useState(initForm);
  const [selectedBp, setSelectedBp] = useState(initBp);
  const [selectedInv, setSelectedInv] = useState(initSelectInv);
  const [selectedCoa, setSelectedCoa] = useState(initCoa);
  const [selectedBank, setSelectedBank] = useState(initBank);

  const [collectData, setCollectData] = useState([]);
  const [bpList, setBpList] = useState<any[]>([]);
  const [coaList, setCoaList] = useState<any[]>([]);
  const [bankList, setBankList] = useState<any[]>([]);
  const [invList, setInvList] = useState<any[]>([]);

  const [bpKeyword, setBpKeyword] = useState("");
  const [coaKeyword, setCoaKeyword] = useState("");
  const [bankKeyword, setBankKeyword] = useState("");
  const [invKeyword, setInvKeyword] = useState("");

  function handleBpCode(bp: any) {
    setSelectedBp(bp);
    setForm((prevForm) => ({
      ...prevForm,
      bpCode: bp,
    }));
  }

  function handleCoa(coa: any) {
    setSelectedCoa(coa);
    setForm((prevForm) => ({
      ...prevForm,
      coa: coa,
    }));
  }

  function handleBank(bank: any) {
    setSelectedBank(bank);
    setForm((prevForm) => ({
      ...prevForm,
      bank: bank,
    }));
  }

  function hanldeInv(inv: any) {
    setSelectedInv(inv);
    setDetailDraft((prevForm) => ({
      ...prevForm,
      invoiceNotes: inv.NumAtCard,
      invoiceNo: inv.DocNum,
      wTaxAmount: inv.WTAmount,
      invoiceAmount: inv.DocTotal,
      balanceInvoice: inv.DocTotal,
      paymentAmount: inv.DocTotal,
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "type") {
      tabsRef.current?.setActiveTab(value === "ACCOUNT" ? 1 : 0);
      setCollectData([]);
      setForm((prev) => ({
        ...initForm,
        type: prev.type,
      }));
      setDetailDraft(initDraft);
    }
  }

  function handleDateChange(date: Date | null, id: string) {
    setForm((prev) => ({
      ...prev,
      [id]: date,
    }));
  }
  function handleChangeCollection(e) {
    const { name, value } = e.target;
    setDetailDraft((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleInvoiceTypeChange(e) {
    const { name, value } = e.target;
    setDetailDraft((prev) => {
      const DetailDraft = {
        ...prev,
        [name]: value,
      };
      if (form.bpCodeSelect && updatedForm.invType) {
        getPurchaseInvoice(form.bpCodeSelect).then((data) => {
          setInvoiceData(data);
        });
      }
      return DetailDraft;
    });
    if (name === "invType") {
      setDetailDraft((prev) => ({
        ...initDraft,
        type: prev.invType,
      }));
    }
  }

  function handleDiscChange(e) {
    const { name, value } = e.target;
    const paymentAmount = Number(selectedInv.DocTotal) || 0;
    const discValue = Number(value) || 0;
    const processPayment = paymentAmount - discValue;
    setDetailDraft((prev) => ({
      ...prev,
      [name]: value,
      paymentAmount: processPayment,
    }));
  }

  async function getPurchaseInvoice(cardCode: string) {
    try {
      const domain = import.meta.env.VITE_BACKEND;
      const path = route.purchaseInvoice.byCardCode(cardCode);
      const endPoint = `${domain}${path}`;
      const response = await axios.get(endPoint);
      return response.data;
    } catch (error) {
      console.error("Gagal:", error.message);
      alert("Gagal Mengambil Data");
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();

    console.log(`Form Data : ${form}`);
    console.log(`Collection Data : ${collectData}`);

    const data = buildPaymentRequestPayload(form, collectData);

    try {
      const domain = import.meta.env.VITE_BACKEND;
      const path = route.paymentRequest.create() || null;
      const endPoint = `${domain}${path}`;
      const response = await axios.post(endPoint, data);
      console.log("Sukses:", response.data);
      alert("Payment Request berhasil dibuat!");
    } catch (error) {
      console.error("Gagal:", error.response?.data || error.message);
      alert("Gagal membuat Payment Request");
    }
  }

  function handleAddDetail() {
    setCollectData((prev) => [...prev, detailDraft]);
    setDetailDraft(initDraft);
  }

  async function getBpCode(page: number, keyword: string, cardType: string) {
    setLoading(true);
    try {
      const limit = 50;
      const domain = import.meta.env.VITE_BACKEND;
      if (keyword != "") {
        page = 1;
      }
      cardType = form.type;
      const url = route.businessPartner.all(page, limit, keyword, cardType);
      const endpoint = `${domain}${url}`;
      const response = await axios.get(endpoint);

      setBpList(response.data.data.value);

      if (response.data.data.jumlah != 0) {
        setTotalPages(Math.ceil(response.data.data.jumlah / limit));
      } else {
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Gagal:", error.message);
      alert("Gagal Mengambil Data");
    } finally {
      setLoading(false);
    }
  }

  async function getCoa(page: number, keyword = "") {
    setLoading(true);
    try {
      const limit = 50;
      const domain = import.meta.env.VITE_BACKEND;
      if (keyword != "") {
        page = 1;
      }
      const url = route.chartOfAccount.all(page, limit, keyword);
      const endpoint = `${domain}${url}`;
      const response = await axios.get(endpoint);

      setCoaList(response.data.data.value);
      if (response.data.data.jumlah != 0) {
        setTotalPages(Math.ceil(response.data.data.jumlah / limit));
      } else {
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Gagal:", error.message);
      alert("Gagal Mengambil Data");
    } finally {
      setLoading(false);
    }
  }

  async function getBank(page: number, keyword = "") {
    setLoading(true);
    try {
      const limit = 50;
      const domain = import.meta.env.VITE_BACKEND;
      if (keyword != "") {
        page = 1;
      }
      const url = route.bank.all(keyword);
      const endpoint = `${domain}${url}`;
      const response = await axios.get(endpoint);

      console.log(url);
      console.log(response.data);

      setBankList(response.data.data.value);
      if (response.data.data.jumlah != 0) {
        setTotalPages(Math.ceil(response.data.data.jumlah / limit));
      } else {
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Gagal:", error.message);
      alert("Gagal Mengambil Data");
    } finally {
      setLoading(false);
    }
  }

  async function getInv(page: number, keyword = "") {
    setLoading(true);
    try {
      const limit = 50;
      const domain = import.meta.env.VITE_BACKEND;
      if (keyword != "") {
        page = 1;
      }
      const url = route.purchaseInvoice.all(
        page,
        limit,
        detailDraft.invType,
        selectedBp.CardCode,
      );
      const endpoint = `${domain}${url}`;
      const response = await axios.get(endpoint);

      console.log(url);
      console.log(response.data);

      setInvList(response.data.data.value);
      if (response.data.data.jumlah != 0) {
        setTotalPages(Math.ceil(response.data.data.jumlah / limit));
      } else {
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Gagal:", error.message);
      alert("Gagal Mengambil Data");
    } finally {
      setLoading(false);
    }
  }

  //VARIABEL
  useEffect(() => {
    if (openBpModal) {
      const handler = setTimeout(() => {
        getBpCode(currentPage, bpKeyword);
      }, 400);
      return () => clearTimeout(handler);
    }
  }, [openBpModal, currentPage, bpKeyword]);

  useEffect(() => {
    if (openCoaModal) {
      const handler = setTimeout(() => {
        getCoa(currentPage, coaKeyword);
      }, 400);
      return () => clearTimeout(handler);
    }
  }, [openCoaModal, currentPage, coaKeyword]);

  useEffect(() => {
    if (openBankModal) {
      const handler = setTimeout(() => {
        getBank(currentPage, bankKeyword);
      }, 400);
      return () => clearTimeout(handler);
    }
  }, [openBankModal, currentPage, bankKeyword]);

  useEffect(() => {
    if (openInvModall) {
      const handler = setTimeout(() => {
        getInv(currentPage, invKeyword);
      }, 400);
      return () => clearTimeout(handler);
    }
  }, [openInvModall, currentPage, invKeyword]);

  useEffect(() => {
    if (!openBpModal) {
      setCurrentPage(1);
      setBpList([]);
    }
  }, [openBpModal]);

  useEffect(() => {
    if (!openCoaModal) {
      setCurrentPage(1);
      setCoaList([]);
    }
  }, [openCoaModal]);

  useEffect(() => {
    if (!openBankModal) {
      setCurrentPage(1);
      setBankList([]);
    }
  }, [openBankModal]);

  const invoiceType = {
    VENDOR: [
      { value: "AP", label: "AP" },
      { value: "APDP", label: "APDP" },
      { value: "APCN", label: "APCN" },
    ],
    CUSTOMER: [
      { value: "AR", label: "AR" },
      { value: "ARDP", label: "ARDP" },
      { value: "ARCN", label: "ARCN" },
    ],
    ACCOUNT: [{ value: "OTHER", label: "OTHER" }],
  };

  const bpColumns = [
    { key: "CardCode", label: "BP Code" },
    { key: "CardName", label: "BP Name" },
    { key: "ContactPerson", label: "PIC" },
  ];

  const coaColumns = [
    { key: "Code", label: "COA Code" },
    { key: "Name", label: "Name" },
    { key: "Balance", label: "Balance" },
  ];

  const bankColumns = [
    { key: "BankCode", label: "Code" },
    { key: "BankName", label: "Bank Name" },
    { key: "CountryCode", label: "Country" },
  ];

  const invColumn = [
    { key: "DocEntry", label: "Internal Number" },
    { key: "DocNum", label: "Document Number" },
    { key: "NumAtCard", label: "Description" },
  ];

  const dataType = [
    {
      value: "VENDOR",
      label: "Vendor",
    },
    {
      value: "CUSTOMER",
      label: "Customer",
    },
    {
      value: "ACCOUNT",
      label: "Account",
    },
  ];
  const paymentType = [
    {
      value: "CASH",
      label: "Cash",
    },
    {
      value: "BANK TRANSFER",
      label: "Bank Transfer",
    },
    {
      value: "CHECK",
      label: "Check",
    },
  ];
  return (
    <form onSubmit={handleSubmit}>
      <div id="formCreateContent" className="grid-col-1 mt-4 mb-5 grid gap-y-5">
        <div className="grid grid-cols-2">
          <div className="flex place-content-end">
            <div className="">
              <div className="grid h-full grid-cols-4 content-start gap-5">
                <CustomInput
                  disable
                  id="status"
                  type="text"
                  label="Status"
                  placeholder="Status"
                  required={true}
                  value={form.status}
                  onChange={handleChange}
                />
                <CustomInput
                  id="outgoingNum"
                  type="text"
                  label="Outgoing No"
                  placeholder="Outgoing No."
                  required={false}
                  value={form.outgoingNum}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex pl-5">
            <div className="grid h-full grid-cols-2 content-start gap-5">
              <CustomInput
                id="reqPaymentDate"
                type="date"
                label="Request Payment"
                placeholder="Request Payment Date"
                required={true}
                date={form.reqPaymentDate}
                onDateChange={handleDateChange}
              />
              <CustomInput
                id="postDate"
                type="date"
                label="Posting Date"
                placeholder="Posting Date"
                required={true}
                date={form.postDate}
                onDateChange={handleDateChange}
              />
            </div>
          </div>
        </div>
        {/* Section 1 */}
        <div className="grid grid-cols-2 gap-x-10">
          {/* Section Payment No. */}
          <Card>
            <div className="grid gap-2">
              <CustomInput
                id="createDate"
                type="date"
                label="Create Date"
                placeholder="Create Date"
                required={true}
                date={form.createDate}
                onDateChange={handleDateChange}
              />

              {/* SECTION Type */}
              <CustomInput
                id="type"
                type="select"
                label="Type"
                placeholder="Type"
                required={true}
                data={dataType}
                value={form.type}
                onChange={handleChange}
              />

              <CustomInput
                id="means"
                type="select"
                label="Payment Means"
                required={true}
                value={form.means}
                onChange={handleChange}
                data={paymentType}
              />

              {form.type == "ACCOUNT" ? (
                <>
                  <CustomInput
                    id="receiveNo"
                    type="text"
                    label="Receive No."
                    placeholder="Receiving No."
                    required={true}
                    value={form.receiveNo}
                    onChange={handleChange}
                  />
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="bpCode">Select BP Code</Label>
                    <div id="bpCode" className="flex gap-x-2">
                      <Button onClick={() => setOpenBpModal(true)}>
                        {form.bpCode == null
                          ? "SELECT BP CODE"
                          : form.bpCode.CardCode}
                      </Button>
                      <TextInput
                        className="flex-1"
                        type="text"
                        disabled={true}
                        value={
                          form.bpCode == null
                            ? "Please select BP CODE"
                            : form.bpCode.CardName
                        }
                      />
                      <ChooseFromListModal
                        open={openBpModal}
                        onClose={() => setOpenBpModal(false)}
                        onSelect={(bp) => handleBpCode(bp)}
                        data={bpList}
                        columns={bpColumns}
                        title="Pilih Business Partner"
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        loading={loading}
                        bpKeyword={bpKeyword}
                        onKeywordChange={setBpKeyword}
                      />
                    </div>
                  </div>
                </>
              )}
              {/* <CustomInput id="currencies" type="text" label="Doc Currency" placeholder="Doc Currency" required={true} value={form.currencies} onChange={handleChange} /> */}
            </div>
          </Card>
          <Card>
            <div className="grid gap-y-4">
              <div className="grid-col-2 grid gap-y-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="coa">Select Chart Of Account</Label>
                  <div id="coa" className="flex gap-x-2">
                    <Button onClick={() => setOpenCoaModal(true)}>
                      {form.coa == null ? "SELECT COA" : form.coa.Code}
                    </Button>
                    <TextInput
                      className="flex-1"
                      type="text"
                      disabled={true}
                      value={
                        form.coa == null ? "Please select COA" : form.coa.Name
                      }
                    />
                    <ChooseFromListModal
                      open={openCoaModal}
                      onClose={() => setOpenCoaModal(false)}
                      onSelect={(coa) => handleCoa(coa)}
                      data={coaList}
                      columns={coaColumns}
                      title="Please select COA"
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      loading={loading}
                      bpKeyword={coaKeyword}
                      onKeywordChange={setCoaKeyword}
                    />
                  </div>
                </div>

                {/* WHILE TYPE = CUSTOMER, IT SUPPOSE TO BE HIDE */}

                <div className="flex flex-col gap-2">
                  <Label htmlFor="bankAcc">Select Bank Account</Label>
                  <div id="bankAcc" className="flex gap-x-2">
                    <Button onClick={() => setOpenBankModal(true)}>
                      {form.bank == null
                        ? "SELECT Bank Account"
                        : form.bank.BankCode}
                    </Button>
                    <TextInput
                      className="flex-1"
                      type="text"
                      disabled={true}
                      value={
                        form.bank == null
                          ? "Please select Bank Account"
                          : form.bank.BankName
                      }
                    />
                    <ChooseFromListModal
                      open={openBankModal}
                      onClose={() => setOpenBankModal(false)}
                      onSelect={(bank) => handleBank(bank)}
                      data={bankList}
                      columns={bankColumns}
                      title="Please Bank Accounts"
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      loading={loading}
                      bpKeyword={coaKeyword}
                      onKeywordChange={setBankKeyword}
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-y-4">
                {form.means == "CHECK" ? (
                  <>
                    <CustomInput
                      id="checkNo"
                      type="text"
                      label="Check No."
                      placeholder="Check No."
                      required={form.means == "CHECK" ? true : false}
                      value={form.checkNo}
                      onChange={handleChange}
                    />
                  </>
                ) : null}
                {form.means == "BANK TRANSFER" ? (
                  <>
                    <CustomInput
                      id="bankFee"
                      type="text"
                      label="Bank Charge"
                      placeholder="Bank Charge"
                      required={form.means == "BANK TRANSFER" ? true : false}
                      value={form.bankFee}
                      onChange={handleChange}
                    />
                  </>
                ) : null}
              </div>
            </div>
          </Card>
        </div>

        {/* Section 2 | COA */}

        {/* Tabs Section */}
        <Card>
          <Tabs
            aria-label="Full width tabs"
            variant="default"
            ref={tabsRef}
            onActiveTabChange={(tab) => setActiveTab(tab)}
          >
            {/* WHILE TYPE == ACCOUNT, IT SUPPOSED TO BE DISABLED */}
            <TabItem active title="Invoice" disabled={form.type === "ACCOUNT"}>
              {form.type == "ACCOUNT" ? null : (
                <div className="mb-4 grid grid-cols-1 gap-x-5 gap-y-1 md:grid-cols-4">
                  {form.type == "CUSTOMER" ? null : (
                    <>
                      <CustomInput
                        id="invType"
                        type="select"
                        label="Invoice Type"
                        placeholder="Invoice Type"
                        value={detailDraft.invType}
                        onChange={handleInvoiceTypeChange}
                        data={invoiceType[form.type]}
                      />

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="invList">
                          Select {detailDraft.invType} Invoice
                        </Label>
                        <div id="invList" className="flex gap-x-2">
                          <Button
                            onClick={() => setOpenInvModall(true)}
                            disabled={selectedBp.CardCode == "" ? true : false}
                          >
                            {detailDraft.invoiceNo == ""
                              ? `SELECT ${detailDraft.invType} Invoice`
                              : detailDraft.invoiceNo}
                          </Button>
                          <TextInput
                            className="flex-1"
                            type="text"
                            disabled={true}
                            value={
                              detailDraft.invoiceNo == null
                                ? `SELECT ${detailDraft.invType} Invoice`
                                : selectedInv.NumAtCard
                            }
                          />
                          <ChooseFromListModal
                            open={openInvModall}
                            onClose={() => setOpenInvModall(false)}
                            onSelect={(inv) => hanldeInv(inv)}
                            data={invList}
                            columns={invColumn}
                            title={`Please Select ${detailDraft.invType} Invoice`}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            loading={loading}
                            bpKeyword={invKeyword}
                            onKeywordChange={setInvKeyword}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* <CustomInput id="invoiceAmount" type="text" label="Invoice Amount" placeholder="Invoice Amount" value={detailDraft.invoiceAmount} onChange={handleChangeCollection} /> */}
                  <CustomInput
                    id="paymentAmount"
                    type="text"
                    label="Payment Amount"
                    placeholder="Payment Amount"
                    value={detailDraft.paymentAmount}
                    onChange={handleChangeCollection}
                  />

                  {form.type == "CUSTOMER" ? null : (
                    <>
                      <CustomInput
                        id="balanceInvoice"
                        type="text"
                        label="Balance Invoice"
                        placeholder="Blance Invoice"
                        disable={form.type == "CUSTOMER" ? false : true}
                        value={detailDraft.balanceInvoice}
                        onChange={handleChangeCollection}
                      />
                      <CustomInput
                        id="cashDisc"
                        type="text"
                        label="Cash Discount"
                        placeholder="Cash Discount"
                        value={detailDraft.cashDisc}
                        onChange={handleDiscChange}
                      />
                    </>
                  )}
                </div>
              )}
            </TabItem>

            <TabItem
              title="Account"
              disabled={
                form.type == "VENDOR" || form.type == "CUSTOMER" ? true : false
              }
            >
              {form.type == "VENDOR" || form.type == "CUSTOMER" ? (
                ""
              ) : (
                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <CustomInput
                    id="accNo"
                    type="text"
                    label="Account No."
                    placeholder="Invoice Type"
                    // REQUIRED LOGIC HERE
                    value={detailDraft.accNo}
                    onChange={handleChangeCollection}
                  />
                  <CustomInput
                    id="remarkDetail"
                    type="text"
                    label="Remarks Detail"
                    placeholder="Remark Detail"
                    // REQUIRED LOGIC HERE
                    value={detailDraft.remarkDetail}
                    onChange={handleChangeCollection}
                  />
                  <CustomInput
                    id="proj"
                    type="text"
                    label="Project"
                    placeholder="Project"
                    // REQUIRED LOGIC HERE
                    value={detailDraft.proj}
                    onChange={handleChangeCollection}
                  />

                  <CustomInput
                    id="noFPK"
                    type="text"
                    label="No. FPK"
                    placeholder="No. FPK"
                    // REQUIRED LOGIC HERE
                    value={detailDraft.noFPK}
                    onChange={handleChangeCollection}
                  />
                  <CustomInput
                    id="dept"
                    type="text"
                    label="Department"
                    placeholder="Department"
                    // REQUIRED LOGIC HERE
                    value={detailDraft.dept}
                    onChange={handleChangeCollection}
                  />
                  <CustomInput
                    id="locPool"
                    type="text"
                    label="Lokasi Pool"
                    placeholder="Lokasi Pool"
                    // REQUIRED LOGIC HERE
                    value={detailDraft.locPool}
                    onChange={handleChangeCollection}
                  />
                  <CustomInput
                    id="d3"
                    type="text"
                    label="Dimension 3"
                    placeholder="Dimension 3"
                    // REQUIRED LOGIC HERE
                    value={detailDraft.d3}
                    onChange={handleChangeCollection}
                  />
                  <CustomInput
                    id="d4"
                    type="text"
                    label="Dimension 4"
                    placeholder="Dimension 4"
                    // REQUIRED LOGIC HERE
                    value={detailDraft.d4}
                    onChange={handleChangeCollection}
                  />
                  <CustomInput
                    id="d5"
                    type="text"
                    label="Dimension 5"
                    placeholder="Dimension 5"
                    // REQUIRED LOGIC HERE
                    value={detailDraft.d5}
                    onChange={handleChangeCollection}
                  />
                </div>
              )}
            </TabItem>
          </Tabs>
          <div className="flex w-full justify-end">
            <Button onClick={handleAddDetail}>Add</Button>
          </div>
        </Card>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <Table striped className="mr-10">
            <TableHead>
              {form.type == "VENDOR" ? (
                <>
                  <TableHeadCell>Invoice Type</TableHeadCell>
                  <TableHeadCell>Invoice No</TableHeadCell>
                  <TableHeadCell>Invoice Notes</TableHeadCell>

                  {/* TIDAK ADA FIELD */}
                  <TableHeadCell>Invoice Currencies</TableHeadCell>

                  <TableHeadCell>Invoice Amount</TableHeadCell>
                  <TableHeadCell>WTax Amount</TableHeadCell>

                  <TableHeadCell>Cash Discount</TableHeadCell>
                  <TableHeadCell>Payment Amount</TableHeadCell>
                </>
              ) : null}

              {form.type == "CUSTOMER" ? (
                <>
                  <TableHeadCell>WTax Amount</TableHeadCell>
                </>
              ) : (
                ""
              )}

              {form.type == "ACCOUNT" ? (
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
              ) : null}

              <TableHeadCell>Action</TableHeadCell>
            </TableHead>
            <TableBody>
              {/* Rows will go here dynamically */}
              {collectData.map((item, idx) => (
                <TableRow>
                  {form.type == "VENDOR" ? (
                    <>
                      <TableCell>{collectData[idx].invType}</TableCell>
                      <TableCell>{collectData[idx].invoiceNo}</TableCell>
                      <TableCell>{collectData[idx].invoiceNotes}</TableCell>
                      <TableCell>{collectData[idx].currencies}</TableCell>
                      <TableCell>{collectData[idx].invoiceAmount}</TableCell>
                      <TableCell>{collectData[idx].wTaxAmount}</TableCell>
                      <TableCell>{collectData[idx].cashDisc}</TableCell>
                      <TableCell>{collectData[idx].paymentAmount}</TableCell>
                    </>
                  ) : null}

                  {/* TIDAK ADA FIELD */}

                  {form.type == "CUSTOMER" ? (
                    <>
                      <TableCell>{collectData[idx].wTaxAmount}</TableCell>
                    </>
                  ) : null}

                  {form.type == "ACCOUNT" ? (
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
                  ) : null}

                  <TableCell>
                    <CustomButton name="DELETE" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* Remarks Section */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <CustomInput
            id="remarks"
            label="Remarks"
            type="textArea"
            placeholder="Enter remarks"
            required={true}
            value={form.remarks}
            onChange={handleChange}
          />
          <CustomInput
            id="approval"
            label="Approval"
            type="textArea"
            placeholder="Enter notes approval"
            required={true}
            value={form.approval}
            onChange={handleChange}
          />
        </div>
        <div className="flex place-content-end gap-x-5">
          <CustomButton name="Execute" type="submit" />
          <CustomButton name="Save" />
          <CustomButton name="Cancel Doc" />
        </div>
      </div>
    </form>
  );
}
