import { Fragment, React, Component } from "react";
import "../../Cabai.css";
import "../../CabaiMedia.css";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from "@coreui/react";
import UserService from '../../../services/user.service';
import moment from 'moment';
import CIcon from '@coreui/icons-react'
// import ChartLineSimple from '../charts/ChartLineSimple'
// import ChartBarSimple from '../charts/ChartBarSimple'

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default class DashboardPetani extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.DashboardData,
      userRole: "",
    };
  }

  getChart = () => {

    const data = this.props.DashboardData

    let chart = am4core.create("chartdivGapoktan", am4charts.PieChart);

    // chart.data = this.state.DChart;
    chart.data = data.DChart;
    // chart.data = [{
    //   "kualitas": "Economic Development",
    //   "jumlah": 33.4,
    //   // "color": am4core.color("#b74312")
    // }, {
    //   "kualitas": "Health",
    //   "jumlah": 17.9,
    //   // "color": am4core.color("#b76f12")
    // }, {
    //   "kualitas": "Education",
    //   "jumlah": 14.8,
    //   // "color": am4core.color("#b7ac12")
    // }, {
    //   "kualitas": "Social",
    //   "jumlah": 15,
    //   // "color": am4core.color("#96b712")
    // }, {
    //   "kualitas": "Humanitarian",
    //   "jumlah": 4.8,
    //   // "color": am4core.color("#57b712")
    // }, {
    //   "kualitas": "Operational and Fundraising",
    //   "jumlah": 14.1,
    //   // "color": am4core.color("#12b728")
    // }];

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "jumlah";
    pieSeries.dataFields.category = "kualitas";
    // pieSeries.slices.template.propertyFields.fill = "color";

    // Let's cut a hole in our Pie chart the size of 40% the radius
    chart.innerRadius = am4core.percent(40);

    // Set up fills
    pieSeries.slices.template.fillOpacity = 1;

    var hs = pieSeries.slices.template.states.getKey("hover");
    hs.properties.scale = 1;
    hs.properties.fillOpacity = 0.5;

  }

  componentDidMount() {
    this.getChart();
  }

  
  render() {

    const data = this.props.DashboardData

    console.log('CEK DATA', data);
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

                <CRow>
                  <CCol sm="4" lg="4">
                    <CWidgetDropdown
                      color="gradient-primary"
                      header={`${data.DLahan} Lahan`}
                      text="Jumlah Lahan Petani"
                    >
                      <p style={{height:"70px"}}></p>
                    </CWidgetDropdown>
                  </CCol>

                  <CCol sm="4" lg="4">
                    <CWidgetDropdown
                      color="gradient-info"
                      header={`${data.DPanen}X Panen`}
                      // header={`${data.DTransaksi.length + data.DTransaksiRequest.length} Transaksi`}
                      text="Jumlah Panen Petani"
                    >
                      <p style={{height:"70px"}}></p>
                    </CWidgetDropdown>
                  </CCol>

                  <CCol sm="4" lg="4">
                    <CWidgetDropdown
                      color="gradient-warning"
                      header={data.DSaldo ? `Rp. ${parseInt(data.DSaldo.total_saldo).toLocaleString('en')}` : `Rp. -0,00` }
                      text="Total Saldo"
                    >
                      <p style={{height:"70px"}}></p>
                    </CWidgetDropdown>
                  </CCol>

                  {/* <CCol sm="6" lg="3">
                    <CWidgetDropdown
                      color="gradient-danger"
                      header={data.DSaldoOut === 0 ? `Rp. -0,00` : `Rp. ${parseInt(data.DSaldoOut).toLocaleString('en')}`}
                      text="Total Saldo Keluar"
                    >
                      <p style={{height:"70px"}}></p>
                    </CWidgetDropdown>
                  </CCol> */}
                </CRow>

                <hr></hr>
                <p><h5>Jumlah Hasil Panen</h5></p>
                <div id="chartdivGapoktan"></div>
                
              </CCardBody>
            </CCard>
          </div>
        </main>
      </Fragment>
    );    

  }
}