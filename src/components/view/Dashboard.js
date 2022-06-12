import { Fragment, React, Component } from "react";
import "../Cabai.css";
import "../CabaiMedia.css";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout
} from "@coreui/react";
import UserService from "../../services/user.service";
import moment from 'moment';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

let chart = am4core.create("chartdiv", am4charts.PieChart);

chart.data = [{
  "label": "Economic Development",
  "percent": 33.4,
  // "color": am4core.color("#b74312")
}, {
  "label": "Health",
  "percent": 17.9,
  // "color": am4core.color("#b76f12")
}, {
  "label": "Education",
  "percent": 14.8,
  // "color": am4core.color("#b7ac12")
}, {
  "label": "Social",
  "percent": 15,
  // "color": am4core.color("#96b712")
}, {
  "label": "Humanitarian",
  "percent": 4.8,
  // "color": am4core.color("#57b712")
}, {
  "label": "Operational and Fundraising",
  "percent": 14.1,
  // "color": am4core.color("#12b728")
}];

// Add and configure Series
let pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "percent";
pieSeries.dataFields.category = "label";
// pieSeries.slices.template.propertyFields.fill = "color";

// Let's cut a hole in our Pie chart the size of 40% the radius
chart.innerRadius = am4core.percent(40);

// Set up fills
pieSeries.slices.template.fillOpacity = 1;

var hs = pieSeries.slices.template.states.getKey("hover");
hs.properties.scale = 1;
hs.properties.fillOpacity = 0.5;


export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   content: "",
    //   userRole: "",
    //   pieFlagProduction: "",
    //   pieVolProduction: "",
    //   lineDateProduction: "",
    //   lineVolProduction: "",
    //   pieFlagLogistics: "",
    //   pieVolLogistics: "",
    //   lineDateLogistics: "",
    //   lineVolLogistics: "",
    //   pieFlagSales: "",
    //   pieVolSales: "",
    //   lineDateSales: "",
    //   lineVolSales: "",
    // };
  }

//   componentDidMount() {
//     UserService.getDashboard().then(
//       (response) => {
//         this.setState({
//           content: response.data,
//           userRole: response.data.userRole,
//           pieChart: response.data.pieChart,
//           lineChart: response.data.lineChart,
//           pieFlag:response.data.pieFlag,
//           pieVol:response.data.pieVol,
//           lineDate:response.data.valLineDate,
//           lineVol:response.data.valLineVol
//         });
//         console.log('data',response.data);
//       },
//       (error) => {
//         this.setState({
//           content:
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString(),
//         });
//       }
//     );
//   }

  render() {

    return (
      <Fragment>
        <main className="c-main">
          <div className="container-fluid">
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol xs={6} md={7} lg={10} style={{ margin: "auto" }}>
                    <h4 style={{ margin: "auto" }}>Dashboard</h4>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>

                <div id="chartdiv"></div>
                
              </CCardBody>
            </CCard>
          </div>
        </main>
      </Fragment>
    );
  }
}