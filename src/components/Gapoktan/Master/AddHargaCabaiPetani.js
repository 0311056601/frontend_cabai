import { Fragment, useState } from "react";
import "../../Cabai.css";
import "../../CabaiMedia.css";
import AddHargaCabaiPetaniForm from "./AddHargaCabaiPetaniForm";
import UserService from '../../../services/user.service';
import showResults from '../../showResults/showResults';
import { css } from "@emotion/react";
import Loader from "react-spinners/DotLoader";
import { Redirect } from "react-router-dom";

const AddHargaCabaiPetani = () => {
  // Can be a string as well. Need to ensure each key-value pair ends with ;
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
        `
    ;

    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#3c4b64");
    let [profit, setProfit] = useState(false);
    let [hargaJual, setHargaJual] = useState(false);

    const [redirect, setRedirect] = useState(false);

    const handleProfit = (data) => {
        console.log('handle profit', data);
        setProfit(data);
    }

    const handleHargaJual = (data) => {
        console.log('handle harga jual', data);
        setHargaJual(data);
    }

    const handleSubmit = async (values) => {

        console.log(values);
        console.log('cek profit', profit);
        console.log('cek hj', hargaJual);


        setLoading(true);

        try{
            const formData = new FormData();
            formData.append('harga_dasar', values.harga_dasar);
            formData.append('kualitas', values.kualitas);
            formData.append('profit', profit);
            formData.append('harga_jual', hargaJual);

            // insert data ke mysel
            UserService.AddMHargaCabaiPetani(formData).then(
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

        return <Redirect to="/ListHargaCabaiPetani" />;

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
                            <AddHargaCabaiPetaniForm onSubmit={handleSubmit} PROFIT={handleProfit} HargaJual={handleHargaJual} />
                        )
                    }
                }
                )()}
            </Fragment>
        );
    }

};
export default AddHargaCabaiPetani;