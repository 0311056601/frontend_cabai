import { Fragment, useState, useEffect } from "react";
import "../../Cabai.css";
import "../../CabaiMedia.css";
import AddProdukCabaiForm from "./AddProdukCabaiForm";
import UserService from '../../../services/user.service';
import showResults from '../../showResults/showResults';
import { css } from "@emotion/react";
import Loader from "react-spinners/DotLoader";
import { Redirect } from "react-router-dom";

const AddProdukCabai = () => {
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
    const [gambar, imageFile] = useState([]);
    const [date, setDate] = useState("");
    const [data, setData] = useState(null);
    const [harga, setHarga] = useState(null);

    const handleDate = (tgl) => {
        setDate(tgl);
    };

    const onFileChange = (file) => {
        imageFile(file);
    };

    const handleHargaJual = (v) => {
        setHarga(v);
    };

    const getData = () => {

        UserService.getMasterHargaCabaiPetani().then( async (response) => {
            console.log('cek response', response);
            setData(response.data.select);
        })

    }

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async (values) => {
        // console.log("Value nya nih :", values);
        // console.log("Harga nya nih :", harga);
        // console.log("tanggal nya nih :", date);
        // console.log("file nya nih :", gambar);

        setLoading(true);

        try{
            const formData = new FormData();
            formData.append('tanggal_panen',date);
            formData.append('kualitas',values.kualitas);
            formData.append('harga', harga);
            // formData.append('volume',values.volume);

            for (let i = 0; i < gambar.length; i++) {
                formData.append("files[]", gambar[i]);
                formData.append("fileName[]", gambar[i].name);
            }

        // insert data ke mysel
        await UserService.SimpanProdukPetani(formData).then(
            async (response) => {
                if(response.success === false) {
                    setLoading(false);
                    showResults(`Gagal, ${response.message}`);
                } else {
                    setLoading(false);
                    showResults("Data Berhasil Disimpan");
                }

                setRedirect(true);

            }, (error) => {
                console.log(error);
                setLoading(false);
                showResults(`${error}`);
            });
        } catch (err) {
            console.log(err);
            setLoading(false);
            showResults(`${err}`);
        }
        setLoading(false);
    };

    if(redirect) {

        return <Redirect to="/ProdukPetani" />;

    } else {
        return (
            <Fragment>
                {(() => {
                    if (loading === true) {
                        return (
                            <div style={{textAlign : 'center', verticalAlign : 'middle', paddingTop : "150px"}}>
                                <div className="sweet-loading">
                                    <h5>Membuat Data Produk Cabai</h5><br></br>
                                    {/* <h5>{TxnHash === "" ? "" : <a href={"https://ropsten.etherscan.io/tx/" + TxnHash} target="_blank" >Detail</a>}</h5> */}
                                    <br></br>
                                        <Loader color={color} loading={loading} css={override} size={150} />
                                    <br></br>
                                    <br></br>
                                    <h5>Mohon Tunggu...</h5>
                                </div>
                            </div>
                        )
                    } else if(data) {
                        return(
                            <AddProdukCabaiForm onSubmit={handleSubmit} onSelectImage={onFileChange} onSelectDate={handleDate} DATA={data} HargaJual={handleHargaJual} />
                        )
                    } else {
                        <div style={{textAlign : 'center', verticalAlign : 'middle', paddingTop : "150px"}}>
                            <div className="sweet-loading">
                                <br></br>
                                <br></br>
                                <br></br>
                                <h5>Mohon Tunggu...</h5>
                            </div>
                        </div>
                    }
                }
                )()}
            </Fragment>
        );
    }

};
export default AddProdukCabai;