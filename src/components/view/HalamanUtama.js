import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
// import Market from "./Dashboard";
import Market from "../Market/Market";
import { Redirect } from "react-router-dom";
import DashboardGapoktan from "../Gapoktan/Dashboard/DashboardGapoktan";
import DashboardPetani from "../Petani/Dashboard/DashboardPetani";
import UserService from "../../services/user.service";

const HalamanUtama = (props) => {
  const userRole = props.userRole;  

  let [data, setData] = useState(null);
  let [lengkapC, setLengkapC] = useState(null); // untuk redirect jika belum true
  let [lengkapK, setLengkapK] = useState(null); // untuk redirect jika belum true

  console.log('cek userRole', userRole);

  const getData = async () => {

    // get data dashboard gapoktan
    if(userRole === 'gapoktan') {
      await UserService.getDashboardGapoktan().then(
        (response) => {
          console.log('cek response', response);
          setData(response.data);
          if(response.data.masterHargaCabai === true) {
            setLengkapC(true);
          } else {
            setLengkapC(false);
          }
          if(response.data.masterHargaKemas === true) {
            setLengkapK(true);
          } else {
            setLengkapK(false);
          }
        }
      );
    } else if(userRole === 'petani') {
      await UserService.getDashboardPetani().then(
        (response) => {
          console.log('cek response', response);
          setLengkapC(true);
          setLengkapK(true);
          setData(response.data);
        }
      );
    }

  }

  useEffect(() => {
    getData();
  }, []);

  console.log('cek data', data);

  if(userRole === 'konsumen') {

      return <Redirect to="/Market" />;

  } else {

    if(userRole === 'gapoktan' && data) {
      console.log('cek data', lengkapC);

      if(lengkapC === false) {

        alert('Silahkan isi data master harga cabai petani terlebih dahulu!');
        return (
          <Redirect to="/AddHargaCabaiPetani" />
        )

      } else if(lengkapK === false) {

        alert('Silahkan isi data master harga pengemasan terlebih dahulu!');
        return (
          <Redirect to="/AddHargaPengemasan" />
        )

      } else {

        return (
          <DashboardGapoktan DashboardData={data} />
        )

      }

    } else if(userRole === 'petani' && data) {

      return (
        <DashboardPetani DashboardData={data} />
      )

    } else {
      return (
        <>
          <div align="center">
              <br></br>
              <br></br>
              <br></br>
              <h3>Mohon Tunggu...</h3>
          </div>
        </>
      )
    }

  }

    // if(userRole === 'konsumen') {
    //   return(
    //     <Market />
    //   )
    // } else {
    //   return (
    //     <Dashboard />
    //   )
    // }
};

export default HalamanUtama;
