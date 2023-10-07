import "./assets/main.css";

import { createApp } from "vue";

import jwtDecode from "jwt-decode";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router";
import routerAdmin from "./router/admin";
import routerMember from "./router/member";
import store from "./store";

import "primeicons/primeicons.css"; //icons
import "primevue/resources/primevue.min.css"; //core css
import "primevue/resources/themes/lara-light-purple/theme.css"; //theme
import VueToast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

//prime flex
import "primeflex/primeflex.css";

// component PrimVue ตัวเสริมที่ใช้บ่อยๆ ให้อัพที่นี่
import ConfirmationService from "primevue/confirmationservice";
import ConfirmDialog from "primevue/confirmdialog";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
// import Badge from "primevue/badge";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Card from "primevue/card";
import Checkbox from 'primevue/checkbox';
import Chip from "primevue/chip";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; //optional for column grouping
import DataTable from "primevue/datatable";
import DataView from "primevue/dataview";
import Dialog from "primevue/dialog";
// import Divider from "primevue/divider";
import Dropdown from "primevue/dropdown";
import Fieldset from 'primevue/fieldset';
import FileUpload from "primevue/fileupload";
// import Galleria from 'primevue/galleria';
import Image from "primevue/image";
import InlineMessage from "primevue/inlinemessage";
// import Inplace from "primevue/inplace";
import InputMask from "primevue/inputmask";
import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
import InputText from "primevue/inputtext";
import Message from 'primevue/message';
import Panel from "primevue/panel";
import PanelMenu from "primevue/panelmenu";
import Password from "primevue/password";
import ProgressSpinner from "primevue/progressspinner";
import Row from "primevue/row";
import ScrollPanel from "primevue/scrollpanel";
import SelectButton from "primevue/selectbutton";
// import Sidebar from "primevue/sidebar";
// import Skeleton from "primevue/skeleton";
// import Steps from 'primevue/steps';
import TabMenu from "primevue/tabmenu";
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import Textarea from "primevue/textarea";
// import Timeline from "primevue/timeline";
// import Toolbar from "primevue/toolbar";
// import Carousel from 'primevue/carousel';
// import Chart from "primevue/chart";
import ConfirmPopup from "primevue/confirmpopup";
import Editor from "primevue/editor";
import OrganizationChart from "primevue/organizationchart";
// import JsonCSV from 'vue-json-csv';

const app = createApp(App);

app.use(VueToast);
app.use(store);
app.use(ConfirmationService);
app.use(ToastService);

app.use(PrimeVue);

try {
  const token = localStorage.getItem("token");
  const jwt_decode = jwtDecode(token);
  if (jwt_decode.auth === "admin") {
    app.use(routerAdmin);
  } else if (jwt_decode.auth === "member") {
    app.use(routerMember);
  } else {
    app.use(router);
  }
} catch (err) {
  app.use(router);
}

// //Component
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Calendar", Calendar);
app.component("Row", Row);
app.component("InputText", InputText);
app.component("InputMask", InputMask);
app.component("Dropdown", Dropdown);
app.component("Password", Password);
app.component("Dialog", Dialog);
// app.component("Divider", Divider);
app.component("InputNumber", InputNumber);
app.component("Button", Button);
app.component("Toast", Toast);
app.component("Card", Card);
app.component("Panel", Panel);
app.component("Textarea", Textarea);
app.component("InputSwitch", InputSwitch);
app.component("ConfirmDialog", ConfirmDialog);
app.component("FileUpload", FileUpload);
app.component("Image", Image);
// app.component("Toolbar", Toolbar);
app.component("Chip", Chip);
app.component("ProgressSpinner", ProgressSpinner);
// app.component("Inplace", Inplace);
app.component("DataView", DataView);
app.component("PanelMenu", PanelMenu);
app.component("TabMenu", TabMenu);
app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
// app.component("Skeleton", Skeleton);
// app.component("Sidebar", Sidebar);
// app.component("Timeline", Timeline);
// app.component("Badge", Badge);
app.component('Fieldset',Fieldset);
app.component('Message',Message);
app.component("ScrollPanel", ScrollPanel);
// app.component('Galleria',Galleria);
app.component("InlineMessage", InlineMessage);
app.component('Checkbox',Checkbox);
// app.component('Steps',Steps);
app.component("SelectButton", SelectButton);
// app.component('Carousel',Carousel);
// app.component('Chart',Chart);
app.component("OrganizationChart", OrganizationChart);
app.component("Editor", Editor);
app.component("ConfirmPopup", ConfirmPopup);
// app.component("downloadCsv", JsonCSV);

app.mount("#app");
