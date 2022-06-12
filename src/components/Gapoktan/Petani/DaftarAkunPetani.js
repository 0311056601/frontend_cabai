import { Fragment, useState } from "react";
import "../../Cabai.css";
import "../../CabaiMedia.css";
import DaftarAkunPetaniForm from "./DaftarAkunPetaniForm";
import UserService from "../../../services/user.service";
import showResults from "../../showResults/showResults";
import { Redirect } from "react-router-dom";

// var m = new Date();
// var dateString =
//     m.getUTCFullYear() + "-" +
//     ("0" + (m.getUTCMonth()+1)).slice(-2) + "-" +
//     ("0" + m.getUTCDate()).slice(-2);

const DaftarAkunPetani = () => {

    // const [tgl, setDate] = useState("");
    const [redirect, setRedirect] = useState(false);

    // const handleDate = (date) => {
    //     setDate(date);
    // };

    const handleSubmit = async (values) => {
        // get data form submit
        const formData = new FormData();
        formData.append('username', values.username);
        formData.append('password', values.password);
        formData.append('email', values.email);
        // end get data form submit

        // tulis data form submit ke database menggunakan api yang terdaftar di file user.service
        await UserService.daftarAkunPetani(formData).then( async (response) => {
            // cek response api
            if(response.success === false) {
                await showResults(`Gagal, ${response.message}`);
            } else {
                await showResults("Data Berhasil Dimasukkan");

                await setRedirect(true);

            }
        })
        // end tulis data ke database
    };


    // redirect jika data berhasil dimasukan ke database
    if (redirect === true) {

        return <Redirect to="/ListPetani" />;

    } else {
        return (
            <Fragment>
                {(() => {
                    return (
                        <DaftarAkunPetaniForm 
                            onSubmit={handleSubmit}
                        />
                    )
                })()}
            </Fragment>
        );

    }
};


export default DaftarAkunPetani;