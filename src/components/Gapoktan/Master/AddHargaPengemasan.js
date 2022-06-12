import { Fragment, useState } from "react";
import "../../Cabai.css";
import "../../CabaiMedia.css";
import AddHargaPengemasanForm from "./AddHargaPengemasanForm";
import UserService from '../../../services/user.service';
import showResults from '../../showResults/showResults';
import { css } from "@emotion/react";
import Loader from "react-spinners/DotLoader";
import { Redirect } from "react-router-dom";

const AddHargaPengemasan = () => {
  // Can be a string as well. Need to ensure each key-value pair ends with ;
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
        `
    ;

    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#3c4b64");
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (values) => {

        console.log(values);
        setLoading(true);

        try{
            const formData = new FormData();
            formData.append('harga',values.harga);

            // insert data ke mysel
            UserService.AddMHargaPengemasan(formData).then(
            async (response) => {
                if(response.success === false) {
                    setLoading(false);
                    showResults(`Gagal, ${response.message}`);
                } else {
                    setLoading(false);
                    console.log('cek response', response);
                    showResults("Data Berhasil Disimpan");
                }

                setRedirect(true);

            },
            (error) => {
                console.log(error);
                setLoading(false);
                showResults(`${error}`);
            }
            );
        } catch (err) {
            console.log(err);
            setLoading(false);
            showResults(`${err}`);
        }
        setLoading(false);
    };

    if(redirect) {

        return <Redirect to="/ListHargaPengemasan" />;

    } else {
        return (
            <Fragment>
                {(() => {
                    if (loading === true) {
                        return (
                            <div style={{textAlign : 'center', verticalAlign : 'middle', paddingTop : "150px"}}>
                            <div className="sweet-loading">
                                <h5>Membuat Data Lahan</h5><br></br>
                                {/* <h5>{TxnHash === "" ? "" : <a href={"https://ropsten.etherscan.io/tx/" + TxnHash} target="_blank" >Detail</a>}</h5> */}
                                <br></br>
                                    <Loader color={color} loading={loading} css={override} size={150} />
                                <br></br>
                                <br></br>
                                <h5>Mohon Tunggu...</h5>
                            </div>
                            </div>
                        )
                    } else {
                        return(
                            <AddHargaPengemasanForm onSubmit={handleSubmit} />
                        )
                    }
                }
                )()}
            </Fragment>
        );
    }

};
export default AddHargaPengemasan;