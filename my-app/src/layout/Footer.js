import React from 'react';
import appstore from '../assets/img/appstore.png';
import google_play from '../assets/img/google-play-badge.png';
import gov from '../assets/img/gov.png';
import logo_footer from '../assets/img/logo_footer.png';
import Image from '../common/Image';


class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="footer-top">
                        <div className="footer-top__logo">
                            <Image src={logo_footer} height="108" alt="logo footer" />
                            <div className="footer-top__logo-icon">
                                <a href="/#"><i className="fa fa-facebook-f"></i></a>
                                <a href="/#"><i className="fa fa-instagram"></i></a>
                            </div>
                        </div>
                        <div className="footer-top__introduct">
                            <h5 className="footer-top__introduct-title footer-title">Về chúng tôi <span>công ty cổ phần thương mại dịch vụ trà cà phê vn</span></h5>
                            <ul className="footer-top__introduct-list">
                                <li className="footer-top__introduct-items">
                                    <a href="/#">Điều khoản và điệu kiện</a>
                                </li>
                                <li className="footer-top__introduct-items">
                                    <a href="/#">Chính sách bảo mật</a>
                                </li>
                            </ul>
                            <a href="/#">
                                <Image src={gov} alt="logo bo cong thuong" width="200" />
                            </a>
                        </div>
                        <div className="footer-top__app">
                            <h5 className="footer-top__app-title footer-title">ỨNG DỤNG THE COFFEE HOUSE</h5>
                            <a href="/#">
                                <Image src={appstore} alt="appstore" />
                            </a>
                            <a href="/#">
                                <Image src={google_play} alt="google play" />
                            </a>
                        </div>
                        <div className="footer-top__contact">
                            <h5 className="footer-top__contac-title footer-title">ỨNG DỤNG THE COFFEE HOUSE</h5>
                            <p>Delivery: 1800 6936</p>
                            <p>Hotline: 02871 087 088</p>
                            <p>Địa chỉ: Lầu 7, 62 Trần Quang Khải, phường Tân Định, quận 1, HCMC</p>
                        </div>
                    </div>
                    <div className="footer-bot">
                        <p className="footer-bot__text">© 2018 CÔNG TY CỔ PHẦN THƯƠNG MẠI DỊCH VỤ TRÀ CÀ PHÊ VN</p>
                        <p className="footer-bot__text">86-88 Cao Thắng, phường 4, quận 3, Hồ Chí Minh</p>
                        <p className="footer-bot__text">Số giấy phép ĐKKD: 0312867172 do sở kế hoạch đầu tư TPHCM ngày 23/07/2014</p>
                    </div>
                </div>
            </footer>
        );
    }
}
export default Footer;