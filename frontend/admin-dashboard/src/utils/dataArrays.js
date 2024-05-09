import {
  Square3Stack3DIcon,
  UserIcon,
  ChartBarIcon,
  PresentationChartLineIcon,
  BookOpenIcon,
  BuildingStorefrontIcon,
  ArchiveBoxXMarkIcon,
  UsersIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/outline";
import {
  ExpensesIcon,
  InvoiceIcon,
  QuotationIcon,
  ReportIcon,
  StockIcon,
  SupplierIcon,
  SupplierReturnIcon,
  DamageNoteIcon,
  StockCardIcon,
  WalletIcon,
  PLIcon,
  DuePaymentsIcon,
} from "./icons";

const CustomerArray = [
  {
    title: "Manage Customers",
    link: "#",
    icon: UserIcon,
  },
  {
    title: "Customer Credit Logs",
    link: "#",
    icon: BookOpenIcon,
  },
  {
    title: "Customer Returns",
    link: "#",
    icon: ArchiveBoxXMarkIcon,
  },
];

const CourseArray = [
  {
    title: "Course",
    link: "course",
    icon: UserIcon,
  },
];




export const newNavigationItems = [
  {
    title: "Dashboard",
    link: "",
    icon: ChartBarIcon,
    children: 0,
  },
  {
    title: "Customers",
    link: "#",
    icon: UserIcon,
    children: CustomerArray,
  },
  {
    title: "Quotation",
    link: "#",
    icon: QuotationIcon,
    children: 0,
  },
  {
    title: "Course",
    link: "#",
    icon: QuotationIcon,
    children: CourseArray,
  },
];