import { React, useState, useEffect } from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import UserService from '../../services/user.service';
import moment from 'moment';

const TheHeaderDropdownNotif = () => {

    const [notif, setNotif] = useState([]);
    const [unRead, setUnread] = useState([]);

    const getNotif = () => {
        UserService.getNotif().then((response) => {
            setUnread(response.data.unread);
            setNotif(response.data.data);
        })
    }
    
    useEffect(() => {
        getNotif();
    }, []);

    const itemsCount = unRead.length;

    return (
        <CDropdown
            inNav
            className="c-header-nav-item mx-2"
            direction="down"
        >
        {
            itemsCount === 0 ? 
            (<CDropdownToggle className="c-header-nav-link" caret={false}>
                Notifikasi
            </CDropdownToggle>)
            :
            (<CDropdownToggle className="c-header-nav-link" caret={false}>
                Notifikasi<CBadge shape="pill" color="info">{itemsCount > 10 ? '10+' : itemsCount}</CBadge>
            </CDropdownToggle>) 
        }
        
        <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownItem
                header
                tag="div"
                color="light"
            >
                <strong>Anda memiliki {itemsCount} pemberitahuan yang belum dibaca</strong>
            </CDropdownItem>

            {
                unRead && unRead.map((v,i) => {
                    return (
                        <CDropdownItem href={`/Pemberitahuan/${v.id}`} key={i} >
                            <div className="message">
                                <div className="pt-3 mr-3 float-left">
                                    <div className="c-avatar">
                                        {
                                            v.get_profile && v.get_profile.profile_photo ?
                                            (<CImg
                                                src={process.env.REACT_APP_BACKEND_URL + v.get_profile.profile_photo}
                                                className="c-avatar-img"
                                                alt={v.get_profile.nama}
                                            />) :
                                            (v.get_penerima.username)
                                        }
                                        <span className="c-avatar-status bg-danger"></span>
                                    </div>
                                </div>
                                <div>
                                    <small className="text-muted">{v.get_profile && v.get_profile.nama ? v.get_profile.nama : v.get_penerima.username}</small>
                                    <small className="text-muted float-right mt-1">{moment(v.created_at).format('DD/MMM/YYYY H:s')}</small>
                                </div>
                                <div className="text-truncate font-weight-bold">
                                    <span className="fa fa-exclamation text-danger"></span> {v.status}
                                </div>
                                <div className="small text-muted text-truncate">
                                    {v.notifikasi}
                                </div>
                            </div>
                        </CDropdownItem>
                    )
                })
            }
            
            <CDropdownItem to="/SemuaPemberitahuan" className="text-center border-top"><strong>Lihat Semua Pemberitahuan</strong></CDropdownItem>
        </CDropdownMenu>
        </CDropdown>
    )
}

export default TheHeaderDropdownNotif