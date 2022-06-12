import { Fragment, useState, useEffect } from "react";
import "../../Cabai.css";
import "../../CabaiMedia.css";
import EditLahanForm from "./EditLahanForm";
import UserService from '../../../services/user.service';
import showResults from '../../showResults/showResults';
import { css } from "@emotion/react";
import Loader from "react-spinners/DotLoader";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router";

const EditLahan = () => {
  // Can be a string as well. Need to ensure each key-value pair ends with ;

  const { lahanId } = useParams();

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `
  ;

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#3c4b64");
  const [redirect, setRedirect] = useState(false);
  const [dataLahan, setDataLahan] = useState(false);

    const getLahan = () => {
        UserService.DetailLahan(lahanId).then((response) => {
            setDataLahan(response.data.lahan);
        })
    }

    useEffect(() => {
        getLahan();
    }, []);

    const handleSubmit = async (values) => {
        // setLoading(true);
        console.log("Value nya nih :", values);
        console.log("lahan id nya nih :", lahanId);

        try{
            const formData = new FormData();
            formData.append('nama_lahan',values.nama_lahan);
            formData.append('luas_lahan',values.luas_lahan);
            formData.append('alamat_lahan',values.alamat_lahan);

            if(values.latitude) {
                formData.append('latitude',values.latitude);
            }
            if(values.longitude) {
                formData.append('longitude', values.longitude);
            }

            formData.append('status_kepemilikan', values.status_kepemilikan);

            // insert data ke mysel
            UserService.UpdateLahan(lahanId, formData).then(
            async (response) => {
                if(response.success === false) {
                    setLoading(false);
                    showResults(`Gagal, ${response.message}`);
                } else {
                    setLoading(false);
                    showResults("Data berhasil diubah");
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

        return <Redirect to="/ListLahan" />;

    } else {
        if(dataLahan) {

            return (
                <Fragment>
                    {(() => {
                        if (loading === true) {
                            return (
                                <div style={{textAlign : 'center', verticalAlign : 'middle', paddingTop : "150px"}}>
                                <div className="sweet-loading">
                                    <h5>Membuat Data Petani</h5><br></br>
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
                            <EditLahanForm onSubmit={handleSubmit} DataLahan={dataLahan} />
                            )
                        }
                    }
                    )()}
                </Fragment>
            );

        } else {

            return(
                <>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div style={{textAlign:"center"}}>
                        <h3>Mohon Tunggu...</h3>
                    </div>
                </>
            )

        }
    }

};
export default EditLahan;