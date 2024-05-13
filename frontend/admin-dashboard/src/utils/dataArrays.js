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


const CourseArray = [
  {
    title: "Course",
    link: "course",
    icon: UserIcon,
  },
];

export const course_category = [
  {
    id: "1",
    key: "Programming",
  },
  {
    id: "2",
    key: "Project Management",
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
    title: "Users",
    link: "user",
    icon: UserIcon,
    children: 0,
  },
  {
    title: "Course",
    link: "#",
    icon: QuotationIcon,
    children: CourseArray,
  },
];
