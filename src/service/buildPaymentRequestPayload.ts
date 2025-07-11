import dayjs from "dayjs";
type FormItem = {
  houseBank: string;
  createDate: Date;
  type: string;
  means: string;
  currencies: string;
  status: string;
  reqPaymentDate: Date;
  postDate: Date;
  outgoingNum: string;
  coa: CoaCollectionItem | null;
  bpCode: BpCollectionItem | null;
  bank: BankCollectionItem | null;
  checkNo: string;
  receiveNo: string;
  remarks: string;
  approval: string;
  bankFee: number;
  useriesName: string;
};

type CollectionItem = {
  invoiceNo: string;
  invoiceAmount: string;
  cashDisc: string;
  paymentAmount: string;
  accNo: string;
  accName: string;
  vendorRef: string;
  invoiceDue: string;
  invoiceEntry: number;
  invType: string;
  invoiceCurr: string;
  noFPK: string;
  plant: string;
  mesin: string;
  dept: string;
  remarkDetail: string;
  proj: string;
  d4: string;
  d5: string;
  wTaxAmount: string;
};

type BpCollectionItem = {
  CardCode: string;
  CardName: string;
  CardType: string;
  GroupCode: number;
  Address: string | null;
  ZipCode: string | null;
  MailAddress: string | null;
  MailZipCode: string | null;
  Phone1: string | null;
  Phone2: string;
  Fax: string;
  ContactPerson: string;
  Notes: string;
  PayTermsGrpCode: number;
  CreditLimit: number;
  MaxCommitment: number;
  DiscountPercent: number;
  VatLiable: string;
  FederalTaxID: string;
};

type CoaCollectionItem = {
  Code: string;
  Name: string;
  Balance: string;
  AccountLevel: string;
  FatherAccountKey: string;
};

type BankCollectionItem = {
  BankCode: string;
  BankName: string;
  AccountforOutgoingChecks: string;
  BranchforOutgoingChecks: string;
  NextCheckNumber: string;
  SwiftNo: string;
  IBAN: string;
  CountryCode: string;
  PostOffice: string;
  AbsoluteEntry: string;
  DefaultBankAccountKey: number;
};

function toLocalYMD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // bulan 0-indexed!
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

type CollectionData = CollectionItem[];

export function buildPaymentRequestPayload(
  form: FormItem,
  collection: CollectionData,
) {
  const totalPaymentAmount = collection.reduce(
    (sum, item) => sum + Number(item.paymentAmount || 0),
    0,
  );
  const totalDiscount = collection.reduce(
    (sum, item) => sum + Number(item.cashDisc || 0),
    0,
  );
  const totalAfterDiscount = totalPaymentAmount - totalDiscount;
  const grandTotal = totalAfterDiscount + Number(form.bankFee || 0);
  return {
    DocNum: null,
    Period: null,
    Instance: null,
    Series: null,
    Handwrtten: "N",
    Status: "O",
    RequestStatus: "W",
    Creator: "",
    Remark: form.remarks,
    Canceled: "N",
    Object: "UDO_PAY_REQ",
    LogInst: null,
    UserSign: null,
    Transfered: "N",
    CreateDate: toLocalYMD(form.createDate),
    CreateTime: dayjs().format("HH:mm:ss"),
    UpdateDate: null,
    UpdateTime: null,
    DataSource: "S",
    U_SERRIESNAME: form.useriesName, //NO Serries Keluaran BK BLABLA
    U_TYPE: form.type,
    U_PAYMEANS: form.means,
    U_COA: form.coa.Code,
    U_BANKACCCOMP: form.bank.BankName,
    U_BANKACC: null, // DI DAPAT DARI CHECK PAYMENT MEANS houseBank !!, akun bank miliki perusahaan dari sisi backend saja
    U_BPCODE: form.bpCode.CardCode,
    U_COANAME: form.coa.Name,
    U_BANKNAME: form.bank.BankName,
    U_BPNAME: form.bpCode.CardName,
    U_REVACCNO: null,
    U_REVACCBANKNM: null,
    U_REVACCNM: null,
    U_STATUS: "NEW",
    U_TOTALPAY: grandTotal,
    U_GRANDTOTAL: grandTotal,
    U_NOTES: form.remarks,
    U_NOTESAPP: null,
    U_OUTPAYNO: null,
    U_CREATEDT: toLocalYMD(form.createDate),
    U_REQPAYDT: toLocalYMD(form.reqPaymentDate),
    U_POSTDT: toLocalYMD(form.postDate),
    U_CHECKNO: form.checkNo || null,
    U_OUTPAYENTRY: null,
    U_PAYCURR: form.currencies,
    U_DOCRATE: 0,
    U_BANKCHARGE: form.bankFee,
    U_TOTALLEVELAPP: 0,
    U_STSAPP: null, //Untuk otorisasi approval
    U_VDADD: "Y",
    U_ISPAY: null,
    U_COAPAY: null,
    VIT_PAYMENTREQDCollection: collection.map((item, idx) => ({
      DocEntry: null,
      LineId: idx + 1,
      VisOrder: idx,
      Object: "UDO_PAY_REQ",
      LogInst: null,
      U_INVOICENO: item.invoiceNo,
      U_INVOICEAMT: Number(item.invoiceAmount),
      U_CASHDISC: Number(item.cashDisc) || 0,
      U_PAYMENTAMT: Number(item.paymentAmount),
      U_ACCOUNTCODE: item.accNo || null,
      U_ACCOUNTNM: item.accName || null,
      U_VENDORREFNO: item.vendorRef || null,
      U_INVDUEDATE: item.invoiceDue || null,
      U_INVOICEENTRY: item.invoiceEntry || 70733,
      U_INVOICETYPE: item.invType || null,
      U_INVOICECURR: item.invoiceCurr || "IDR",
      U_PLANT: item.plant || null,
      U_MESIN: item.mesin || null,
      U_DEPT: item.dept || null,
      U_REMARK: item.remarkDetail || null,
      U_PROJECT: item.proj || null,
      U_D4: item.d4 || null,
      U_D5: item.d5 || null,
      U_WTAX: Number(item.wTaxAmount) || 0,
      U_FPK: item.noFPK || null,
    })),
  };
}
