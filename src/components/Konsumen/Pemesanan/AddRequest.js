import { Fragment, useState, useEffect } from "react";
import "../../Cabai.css";
import "../../CabaiMedia.css";
import AddRequestForm from "./AddRequestForm";
import UserService from '../../../services/user.service';
import { css } from "@emotion/react";
import Loader from "react-spinners/DotLoader";
import { Redirect } from "react-router-dom";

const AddRequest = () => {
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
    const [date, setDate] = useState("");
    const [vol, setVol] = useState(null);
    const [gapoktan, setGapoktan] = useState(null);

    const getData = async () => {

        await UserService.getGapoktanList().then( async (response) => {
            console.log('cek response', response);
            setGapoktan(response.data.gapoktan);
        })

    }

    useEffect(() => {
        getData();
    }, []);

    const handleDate = (tgl) => {
        setDate(tgl);
    };

    const handleVolume = (v) => {
        if(v.target && v.target.value) {

            setVol(v.target.value);
        }
    };

    const handleSubmit = async (values) => {
        console.log('cek kualitas', values.kualitas);
        console.log('cek tgl', date);
        console.log('cek volume', vol);
        setLoading(true);

        try{
            const formData = new FormData();
            formData.append('gapoktan', values.gapoktan);
            formData.append('kualitas', values.kualitas);
            formData.append('catatan', values.catatan);
            formData.append('tanggal', date);
            formData.append('volume', vol);

            // insert data ke mysel
            UserService.SimpanRequestCabai(formData).then(
                async (response) => {
                    
                    if(response.data.message) {

                        await alert(response.data.message);

                    } else {

                        console.log('cek response', response);

                        await alert('Data berhasil disimpan');

                        await setRedirect(true);
                    }

                },
                (error) => {
                    console.log(error);
                    setLoading(false);
                    alert(`${error.message}`);
                }
            );
        } catch (err) {
            console.log(err);
            setLoading(false);
            alert(`${err.message}`);
        }

        setLoading(false);
    };

    if(redirect) {

        return <Redirect to="/Request/List" />;

    } else {
        return (
            <Fragment>
                {(() => {
                    if (loading === true) {
                        return (
                            <div style={{textAlign : 'center', verticalAlign : 'middle', paddingTop : "150px"}}>
                            <div className="sweet-loading">
                                <h5>Sedang diproses</h5><br></br>
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
                        if(gapoktan) {
                            return(
                                <AddRequestForm onSubmit={handleSubmit} onSelectDate={handleDate} Volume={handleVolume} Gapoktan={gapoktan} />
                            )
                        } else {
                            return (
                                <div style={{textAlign : 'center', verticalAlign : 'middle', paddingTop : "150px"}}>
                                    <div className="sweet-loading">
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <h5>Mohon Tunggu...</h5>
                                    </div>
                                </div>
                            )
                        }
                    }
                }
                )()}
            </Fragment>
        );
    }

};
export default AddRequest;