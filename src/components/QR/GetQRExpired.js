import UserService from "../../services/user.service";
import React, {useState, useEffect} from "react";
import GetQRExpiredShow from "./GetQRExpiredShow";
import { useParams } from "react-router";

function GetQRExpired() {
    const { expiredId } = useParams();

    let [noTransaksi, setNoTransaksi] = useState(expiredId);
    let [data, setData] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        UserService.getExpiredQR(expiredId).then((response) => {
            console.log('cek response', response);

            setData(response.data);
        });
    }

    if(data) {
        return (
            <div>
                <GetQRExpiredShow DataQR={data} />
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

export default GetQRExpired;