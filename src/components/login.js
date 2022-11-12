import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CRow,
  CCol,
  CImg,
  CContainer,
} from "@coreui/react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";
import { login } from "../actions/auth";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import UserService from '../services/user.service';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      data: null,
      loading: false,
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(login(this.state.email, this.state.password))
        .then(() => {
          history.push("/Dashboard");
          window.location.reload();
        })
        .catch(() => {
          this.setState({
            loading: false,
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  componentDidMount() {

    this.setState({
      loading: true,
    });

    UserService.getDashboardLogin().then((response) => { 
      if(response.data) {

        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        let chart = am4core.create("chartdivExternal", am4charts.XYChart);

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
        lineSeries.name = "kebutuhan";
        lineSeries.dataFields.valueY = "kebutuhan";
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

        this.setState({
          data: response.data.data,
        });

      } else {

        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        let chart = am4core.create("chartdivExternal", am4charts.XYChart);

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
        lineSeries.name = "kebutuhan";
        lineSeries.dataFields.valueY = "kebutuhan";
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

        chart.data = [];

        this.setState({
          data: []
        });

      }

      this.setState({
        loading: false,
      });
    })

  }

  render() {
    const { isLoggedIn, message } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/Dashboard" />;
    }

    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>

          <CRow className="justify-content-center">
            <CCol md="12">

              <br></br>
              <br></br>

              <CCardGroup>

                <CCard>
                  <div id="chartdivExternal"></div>
                </CCard>

                <CCard className="p-4 col-md-4">
                  <CCardBody>
                    <h1>Masuk</h1>
                    <p className="text-muted">masuk dengan akunmu, jika belum memiliki akun, silahkan daftar terlebih dahulu</p>

                    <Form
                      onSubmit={this.handleLogin}
                      ref={(c) => {
                        this.form = c;
                      }}
                    >
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChangeEmail}
                          validations={[required]}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Sandi</label>
                        <Input
                          type="password"
                          className="form-control"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChangePassword}
                          validations={[required]}
                        />
                      </div>

                      <CRow>
                        <CCol xs="6">
                          <div className="form-group">
                            <button
                              className="btn btn-danger btn-block"
                              disabled={this.state.loading}                              
                            >
                              {this.state.loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                              )}
                              <span>Masuk</span>
                            </button>
                          </div>
                        </CCol>
                        {/* <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol> */}
                      </CRow>

                      {message && (
                        <div className="form-group">
                          <div className="alert alert-danger" role="alert">
                            {message}
                          </div>
                        </div>
                      )}

                      <CheckButton
                        style={{ display: "none" }}
                        ref={(c) => {
                          this.checkBtn = c;
                        }}
                      />
                    </Form>
                    <CImg className="d-block w-50" src={`${process.env.REACT_APP_URL}bu_umi.jpg`} />
                  </CCardBody>
                </CCard>

              </CCardGroup>

            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message,
  };
}

export default connect(mapStateToProps)(Login);
