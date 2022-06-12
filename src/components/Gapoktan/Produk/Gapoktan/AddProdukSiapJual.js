import { Fragment, useState, useEffect } from "react";
import "../../../Cabai.css";
import "../../../CabaiMedia.css";
import AddProdukSiapJualForm from "./AddProdukSiapJualForm";
import UserService from '../../../../services/user.service';
import showResults from '../../../showResults/showResults';
import { css } from "@emotion/react";
import Loader from "react-spinners/DotLoader";
import { Redirect } from "react-router-dom";

const AddProdukSiapJual = () => {
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
    const [volume, setVolume] = useState(null);
    const [harga, setHarga] = useState(null);
    const [biayaKemasan, setBK] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const onFileChange = (file) => {
        imageFile(file);
    };

    const handleDate = (tgl) => {
        setDate(tgl);
    };

    const handleVolume = (volume) => {
        setVolume(volume);
    };

    const handleHargaJual = (harga) => {
        setHarga(harga);
    };

    // const handlebiayaKemasan = (harga) => {
    //     setBK(harga);
    // };

    const handleSubmit = async (values) => {

        setLoading(true);

        console.log('biaya_pengemasan', biayaKemasan);
        console.log('harga_jual', harga);
        console.log('volume', volume);

        try{
            const formData = new FormData();
            for (let i = 0; i < gambar.length; i++) {
                console.log("gambar files i", gambar[i]);
                formData.append("files[]", gambar[i]);
                formData.append("fileName[]", gambar[i].name);
            }
            formData.append('nama_produk',values.nama_produk);
            formData.append('deskripsi',values.deskripsi);
            formData.append('biaya_pengemasan', biayaKemasan);
            formData.append('harga_jual', harga);
            formData.append('jenis_produk', values.jenis_produk);
            // formData.append('kualitas', values.kualitas);
            formData.append('kualitas_produk_panen', values.kualitas_produk_panen);
            formData.append('nama_produk', values.nama_produk);
            formData.append('petani', values.petani);
            formData.append('tanggal_panen', values.tanggal_panen);
            formData.append('volume', volume.target.value);
            formData.append('tanggal_pengemasan', date);

            // insert data ke mysel
            UserService.SimpanProdukSiapJual(formData).then(
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

    const getData = async () => {

        try{
            UserService.getDataForProdukSiapJual().then( async (response) => {
                console.log('cek response', response);
                setData(response.data);
                setBK(response.data.hargaPengemasan.harga);
            })
        } catch(e) {
            alert(e.message);
        }
        
    }

    if(redirect) {

        return <Redirect to="/ProdukPackaging" />;

    } else {
        return (
            <Fragment>
                {(() => {
                    if (loading === true || data === null) {
                        return (
                            <div style={{textAlign : 'center', verticalAlign : 'middle', paddingTop : "150px"}}>
                            <div className="sweet-loading">
                                <h5>Memproses</h5><br></br>
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
                            <AddProdukSiapJualForm onSubmit={handleSubmit} onSelectDate={handleDate} onSelectImage={onFileChange} data={data} biayaKemasan={biayaKemasan} Volume={handleVolume} hargaJual={handleHargaJual} />
                        )
                    }
                }
                )()}
            </Fragment>
        );
    }

};
export default AddProdukSiapJual;