import { Link } from "react-router-dom";

function UserMenu({toggleIsUserMenuOpen}) {
  return (
    <div className="user_menu_wrap" onClick={toggleIsUserMenuOpen}>
      <div className="user_menu_container" onClick={(e) => e.stopPropagation()}>
        <Link to="/user/dashboard" className="user_menu">대시보드</Link>
        <Link to="/study-create" className="user_menu">스터디 등록</Link>
        <Link className="user_menu red">로그아웃</Link>
      </div>
    </div>
  );
}

export default UserMenu;
