import UserService from "../../services/user.service";
import React, {useState, useEffect} from "react";
import GetQRTransaksiShow from "./GetQRTransaksiShow";
import { useParams } from "react-router";

function GetQRTransaksi() {
    const { noTx } = useParams();

    let [noTransaksi, setNoTransaksi] = useState(noTx);
    let [data, setData] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        UserService.getTransaksiQR(noTx).then((response) => {
            console.log('cek response', response);

            setData(response.data);
        });
    }

    if(data) {
        return (
            <div>
                <GetQRTransaksiShow DataQR={data} />
            </div>
        );
    } else {
        return (
            <div style={{textAlign : 'center', verticalAlign : 'middle', paddingTop : "150px"}}>
                <div className="sweet-loading">
                    <h5>Memproses</h5><br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h5>Mohon Tunggu...</h5>
                </div>
            </div>
        )
    }
}

export default GetQRTransaksi;