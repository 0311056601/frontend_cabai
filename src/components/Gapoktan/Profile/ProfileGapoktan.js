import { Fragment, useState, useEffect } from "react";
import "../../Cabai.css";
import "../../CabaiMedia.css";
import ProfileGapoktanForm from "./ProfileGapoktanForm";
import UserService from '../../../services/user.service';
import showResults from '../../showResults/showResults';
import { Redirect } from "react-router-dom";

const ProfileGapoktan = () => {
  // Can be a string as well. Need to ensure each key-value pair ends with ;
  const [profile, setProfile] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [gambar, imageFile] = useState([]);
  const [masterBank, setMasterBank] = useState([]);
  const [bankSelected, setBankSelected] = useState(null);
  
  const onFileChange = (file) => {
    imageFile(file);
  };

  const onBankChange = (bank) => {
    setBankSelected(bank);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await UserService.getDetailUser().then((response) => { 
        setProfile(response.data)
    })

    await UserService.getMasterBank().then((response) => { 
      console.log('response', response.data);

      let arr = [];
      response.data.data.map(function(v,l) {

        arr.push({
          "value": v.nama,
          "label": v.nama,
        },)

      })


      setMasterBank(arr)

      console.log('cek bank',arr);

    })
  }

  const handleSubmit = async (values) => {
    const formData = new FormData();
    if(gambar) {
        for (let i = 0; i < gambar.length; i++) {
            formData.append("files[]", gambar[i]);
        }
    }

    formData.append('nama', values.nama);
    if(values.kontak) {
        formData.append('kontak', values.kontak);
    }
    if(values.alamat) {
        formData.append('alamat', values.alamat);
    }

    if (values.email) {
        formData.append('email', values.email);
    }
    if(values.password) {
        formData.append('password', values.password);
    }

    if(bankSelected && values.rekening && values.atas_nama) {
      formData.append('bank', bankSelected);
      formData.append('rekening', values.rekening);
      formData.append('atas_nama', values.atas_nama);
    }

    // end get data form submit

    // tulis data form submit ke database menggunakan api yang terdaftar di file user.service
    await UserService.insertProfile(formData).then( async (response) => {
        // cek response api
        if(response.success === false) {
            await showResults(`Gagal, ${response.message}`);
        } else {
            await showResults("Data Berhasil Dimasukkan");

            await setRedirect(true);

        }
    })

    console.log('cek values', values);
  };

  if(redirect) {
    return <Redirect to="/" />;
  } else {
    if(profile) {
      return (
        <Fragment>
          <ProfileGapoktanForm 
            onSubmit={handleSubmit}
            profileData={profile}
            optionsBank={masterBank}
            onSelectBank={onBankChange}
            onSelectImage={onFileChange}
          />
        </Fragment>
      );
    } else {
      return(
        <>
          <div align="center">
              <br></br>
              <br></br>
              <br></br>
              <h3>Mohon Tunggu...</h3>
          </div>
        </>
      );
    }
  }
};
export default ProfileGapoktan;