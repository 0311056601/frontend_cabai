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

import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export default class DashboardGapoktan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.DashboardData,
      userRole: "",
    };
  }

  // chart summary
  getChartSummery = () => {

    UserService.getDashboardSummary().then((response) => { 
      /* Chart code */
      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart instance
      let chart = am4core.create("chartdivSummary", am4charts.XYChart);

      // Export
      chart.exporting.menu = new am4core.ExportMenu();

      /* Create axes */
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "tanggal";
      categoryAxis.renderer.minGridDistance = 30;

      /* Create value axis */
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      /* Create series */
      let columnSeries = chart.series.push(new am4charts.ColumnSeries());
      columnSeries.name = "produk";
      columnSeries.dataFields.valueY = "produk";
      columnSeries.dataFields.categoryX = "tanggal";

      columnSeries.columns.template.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]"
      columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
      columnSeries.columns.template.propertyFields.stroke = "stroke";
      columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
      columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
      columnSeries.tooltip.label.textAlign = "middle";

      let lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.name = "transaksi";
      lineSeries.dataFields.valueY = "transaksi";
      lineSeries.dataFields.categoryX = "tanggal";

      lineSeries.stroke = am4core.color("#fdd400");
      lineSeries.strokeWidth = 3;
      lineSeries.propertyFields.strokeDasharray = "lineDash";
      lineSeries.tooltip.label.textAlign = "middle";

      let bullet = lineSeries.bullets.push(new am4charts.Bullet());
      bullet.fill = am4core.color("#fdd400"); // tooltips grab fill from parent by default
      bullet.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]"
      let circle = bullet.createChild(am4core.Circle);
      circle.radius = 4;
      circle.fill = am4core.color("#fff");
      circle.strokeWidth = 3;

      chart.data = response.data.data.sort((a, b) => (b.no > a.no) ? 1 : -1);

      console.log('cek data summary', response.data.data);

      this.setState({
        data: response.data.data,
      });
    });

  }
  // end chart summary

  // cart donat
  getChart = () => {
    const data = this.props.DashboardData

    let chart = am4core.create("chartdivGapoktan", am4charts.PieChart);

    // chart.data = this.state.DChart;
    chart.data = data.DChart;

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
  // end chart donat

  // bar chart in
  getChartBar = () => {

    const data = this.props.DashboardData

    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chartBar = am4core.create('chartdivBar', am4charts.XYChart)
    chartBar.colors.step = 2;

    chartBar.legend = new am4charts.Legend()
    chartBar.legend.position = 'top'
    chartBar.legend.paddingBottom = 20
    chartBar.legend.labels.template.maxWidth = 95

    // chartBar.cursor = new am4charts.XYCursor();
    chartBar.scrollbarX = new am4core.Scrollbar();
    chartBar.scrollbarY = new am4core.Scrollbar();

    let xAxisBar = chartBar.xAxes.push(new am4charts.CategoryAxis())

    xAxisBar.dataFields.category = 'date'
    
    xAxisBar.renderer.cellStartLocation = 0.1
    xAxisBar.renderer.cellEndLocation = 0.9
    xAxisBar.renderer.grid.template.location = 0;

    let yAxisBar = chartBar.yAxes.push(new am4charts.ValueAxis());
    yAxisBar.min = 0;

    function createSeriesBar(value, name) {
      let seriesBar = chartBar.series.push(new am4charts.ColumnSeries())
      seriesBar.dataFields.valueY = value
      seriesBar.dataFields.valueY.fontsize("2px");
      seriesBar.dataFields.categoryX = 'date'
      seriesBar.name = name

      seriesBar.columns.template.tooltipText = "[#ffffff font-size: 15px;][/]{name} :[#ffffff font-size: 18px]{valueY} Kg[/]";
      seriesBar.tooltip.label.textAlign = "middle";

      let bullet = seriesBar.bullets.push(new am4charts.LabelBullet())
      bullet.interactionsEnabled = false
      bullet.dy = 31;
      bullet.label.text = '{valueY}'
      bullet.label.fill = am4core.color('#ffffff')

      return seriesBar;
    }

    chartBar.data = data.DChartBar;
    // chartBar.data = [{
    //     "date": "Januari",
    //     "k1": 21,
    //     "k2": 25,
    //     "super": 16
    //   }, {
    //     "date": "February",
    //     "k1": 24,
    //     "k2": 33,
    //     "super": 14
    //   }, {
    //     "date": "Maret",
    //     "k1": 21,
    //     "k2": 27,
    //     "super": 11
    //   }];

    createSeriesBar('super', 'Kelas Super');
    createSeriesBar('k1', 'Kelas 1');
    createSeriesBar('k2', 'Kelas 2');
  }
  // end chart bar in

  // bar chart out
  getChartBarOut = () => {

    const data = this.props.DashboardData

    console.log('cek ini mal', data);

    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chartBarOut = am4core.create('chartdivBarOut', am4charts.XYChart)
    chartBarOut.colors.step = 2;

    chartBarOut.legend = new am4charts.Legend()
    chartBarOut.legend.position = 'top'
    chartBarOut.legend.paddingBottom = 20
    chartBarOut.legend.labels.template.maxWidth = 95

    // chartBarOut.cursor = new am4charts.XYCursor();
    chartBarOut.scrollbarX = new am4core.Scrollbar();
    chartBarOut.scrollbarY = new am4core.Scrollbar();

    let xAxisBarOut = chartBarOut.xAxes.push(new am4charts.CategoryAxis())
    xAxisBarOut.dataFields.category = 'date'
    xAxisBarOut.renderer.cellStartLocation = 0.1
    xAxisBarOut.renderer.cellEndLocation = 0.9
    xAxisBarOut.renderer.grid.template.location = 0;

    let yAxisBar = chartBarOut.yAxes.push(new am4charts.ValueAxis());
    yAxisBar.min = 0;

    function createSeriesBarOut(value, name) {
      let seriesBarOut = chartBarOut.series.push(new am4charts.ColumnSeries())
      seriesBarOut.dataFields.valueY = value
      seriesBarOut.dataFields.valueY.fontsize("2px");
      seriesBarOut.dataFields.categoryX = 'date'
      seriesBarOut.name = name

      seriesBarOut.columns.template.tooltipText = "[#ffffff font-size: 15px;][/]{name} :[#ffffff font-size: 18px]{valueY} Kg[/]";
      seriesBarOut.tooltip.label.textAlign = "middle";

      let bulletOut = seriesBarOut.bullets.push(new am4charts.LabelBullet())
      bulletOut.interactionsEnabled = false
      bulletOut.dy = 31;
      bulletOut.label.text = '{valueY}'
      bulletOut.label.fill = am4core.color('#ffffff')

      return seriesBarOut;
    }

    chartBarOut.data = data.DChartBarOut;

    createSeriesBarOut('super', 'Kelas Super');
    createSeriesBarOut('k1', 'Kelas 1');
    createSeriesBarOut('k2', 'Kelas 2');

  }
  // end chart bar out

  componentDidMount() {
    this.getChart();
    this.getChartBar();
    this.getChartBarOut();
    this.getChartSummery();
  }

  render() {

    const data = this.props.DashboardData

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
                      header={`${data.DPetani} Petani`}
                      text="Jumlah Petani"
                    >
                      <p style={{height:"70px"}}></p>
                    </CWidgetDropdown>
                  </CCol>

                  <CCol sm="4" lg="4">
                    <CWidgetDropdown
                      color="gradient-info"
                      header={`${data.DTotalTransaksi} Transaksi`}
                      // header={`${data.DTransaksi.length + data.DTransaksiRequest.length} Transaksi`}
                      text="Jumlah Transaksi Produk dan Request"
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
                      <p style={{height:"70px"}}>
                        <CButton to="/DetailSaldo" color="danger">Detail</CButton>
                      </p>
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


                <CRow>
                  <CCol xs={12} md={6} lg={6} style={{ margin: "auto" }}>
                    <hr></hr>
                    <p><h5>Data Cabai Masuk Gudang</h5></p>
                    <div id="chartdivBar"></div>
                  </CCol>
                  <CCol xs={12} md={6} lg={6} style={{ margin: "auto" }}>
                    <hr></hr>
                    <p><h5>Data Cabai Keluar Gudang</h5></p>
                    <div id="chartdivBarOut"></div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs={12} md={6} lg={6} style={{ margin: "auto" }}>
                    <hr></hr>
                    <p><h5>Data Cabai Digudang Saat Ini</h5></p>
                    <div id="chartdivGapoktan"></div>
                  </CCol>
                  <CCol xs={12} md={6} lg={6} style={{ margin: "auto" }}>
                    <hr></hr>
                    <p><h5>Data Summary</h5></p>
                    <div id="chartdivSummary"></div>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </div>
        </main>
      </Fragment>
    );    

  }
}