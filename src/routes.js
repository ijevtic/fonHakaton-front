/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Profil from "components/Profil";
import Akcije from "views/Akcije";
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import MojeAkcije from "views/MojeAkcije";
import Notifications from "views/Notifications.js";
import PozoviNaAkciju from "views/PozoviNaAkciju";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";

var routes = [
  {
    path: "/akcije",
    name: "Akcije",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-bullet-list-67",
    component: Akcije,
    layout: "/admin",
  },
  {
    path: "/moje-akcije",
    name: "Moje akcije",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-single-02",
    component: MojeAkcije,
    layout: "/admin",
  },
  {
    path: "/pozovi-na-akciju",
    name: "Pozovi na akciju",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-wifi",
    component: PozoviNaAkciju,
    layout: "/admin",
  },
  {
    path: "/profil",
    name: "Profil",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: Profil,
    layout: "/admin",
  },
];
export default routes;
