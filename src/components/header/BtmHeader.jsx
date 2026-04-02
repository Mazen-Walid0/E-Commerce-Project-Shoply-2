import { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

function BtmHeader() {
  const { pathname } = useLocation();
  const [categories, setCategories] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const NavLinks = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Accessories", link: "/accessories" },
    { title: "Blog", link: "/blog" },
    { title: "Contact", link: "/contact" },
  ];

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    setIsCategoryOpen(false);
  }, [pathname]);

  return (
    <div className="btn_header">
      <div className="container">
        <nav className="nav">
          <div className="category_nav">
            <div
              className="category_btn"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <IoMdMenu />
              <p>Browse Category</p>
              <MdOutlineArrowDropDown />
            </div>
            <div
              className={`category_nav_list ${isCategoryOpen ? "active" : ""}`}
            >
              {categories.map((category) => (
                <Link key={category.slug} to={`category/${category.slug}`}>
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="nav_links">
            {NavLinks.map(({ title, link }) => (
              <li
                key={title.toLowerCase()}
                className={pathname === link ? "active" : ""}
              >
                <Link to={link}>{title}</Link>
              </li>
            ))}
          </div>
        </nav>
        <div className="sign_regs_icon">
          <Link to="/">
            <PiSignInBold />
          </Link>
          <Link to="/">
            <FaUserPlus />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BtmHeader;
