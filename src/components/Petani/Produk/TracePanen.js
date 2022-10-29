import React, {useState, useEffect} from "react";
import UserService from '../../../services/user.service';
import moment from 'moment';
import TracePanenShow from "./TracePanenShow";
import { useParams } from "react-router";

function TracePanen() {
    const { ProdukPetaniId } = useParams();

    let [data, setData] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        UserService.getTracePanen(ProdukPetaniId).then((response) => {
            console.log('cek response', response);

            setData(response.data);
        });
    }

    if(data) {
        return (
            <div>
                <TracePanenShow Data={data} />
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
        );
    }
}

export default TracePanen;