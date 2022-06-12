import UserService from "../../services/user.service";
import React, {useState, useEffect} from "react";
import GetQRProdukShow from "./getQRProdukShow";
import { useParams } from "react-router";

function GetQRProduk() {
    const { id } = useParams();

    let [produkSJID, setProdukSJID] = useState(id);
    let [data, setData] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        UserService.getProdukSiapJual(id).then((response) => {
            console.log('cek response', response);

            setData(response.data);
        });
    }

    if(data) {
        return (
            <div>
                <GetQRProdukShow DataQR={data} />
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

export default GetQRProduk;