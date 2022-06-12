import { Fragment, useState, useEffect } from "react";
import "../../../Cabai.css";
import "../../../CabaiMedia.css";
import TimbangProdukPetaniForm from "./TimbangProdukPetaniForm";
import UserService from '../../../../services/user.service';
import showResults from '../../../showResults/showResults';
import { css } from "@emotion/react";
import Loader from "react-spinners/DotLoader";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router";

const TimbangProdukPetani = () => {
    // Can be a string as well. Need to ensure each key-value pair ends with ;
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
        `
    ;

    const { produkId } = useParams();

    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#3c4b64");
    const [redirect, setRedirect] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {

        try{
            UserService.detailProdukPetani(produkId).then( async (response) => {
                console.log('cek data', response);
                setData(response.data.data);
            })
        } catch(e) {
            alert(e.message);
        }
        
    }

    const handleSubmit = async (values) => {
        setLoading(true);

        try{
            const formData = new FormData();
            formData.append('id',produkId);
            formData.append('volume',values.volume);

            // insert data ke mysel
            UserService.SimpanHasilTimbang(formData).then(
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

        return <Redirect to="/ListProdukPetani" />;

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
                            <TimbangProdukPetaniForm onSubmit={handleSubmit} dataProduk={data} />
                        )
                    }
                }
                )()}
            </Fragment>
        );
    }

};
export default TimbangProdukPetani;