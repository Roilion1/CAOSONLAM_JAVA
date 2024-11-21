import React, { useEffect, useState } from "react";
import { GET_ALL } from "../api/apiService";
import { Link } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';

function Header() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const params = {
            pageNumber: 0,
            pageSize: 4,
            sortBy: 'categoryId',
            sortOrder: 'asc',
        };

        GET_ALL('categories', params)
            .then(response => {
                // Assuming the response structure has the data inside 'content'
                setCategories(response.content); // Update the state with the fetched data
                console.log("response", response.content);
            })
            .catch(error => {
                console.error('Failed to fetch categories:', error); // Handle any errors
            });
    }, []);


    return (
        <div>
            <header className="section-header">
                <section className="header-main border-bottom">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-2 col-lg-12 col-md-12">
                                <a href="/" className="brand-wrap">
                                    <img src={require("../assets/images/logo.png")} alt="" style={{ width: '80%' }} />
                                </a>
                            </div>
                            <div className="col-xl-6 col-lg-7 col-md-6">
                                <form action="#" className="search-header">
                                    <div className="input-group w-100">
                                        <select className="custom-select border-right" name="category_name">
                                            <option value="">All type</option>
                                            <option value="codex">Special</option>
                                            <option value="comments">Only best</option>
                                            <option value="content">Latest</option>
                                        </select>
                                        <input type="text" className="form-control" placeholder="Search" />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="submit">
                                                <i className="fa fa-search"></i> Search
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-xl-4 col-lg-5 col-md-6">
                                <div className="widgets-wrap float-md-right">
<div className="widget-header mr-3">
                                        <a href="ProfileMain" className="widget-view">
                                            <div className="icon-area">
                                                <i className="fa fa-user"></i>
                                                <span className="notify">3</span>
                                            </div>
                                            <small className="text"> My profile </small>
                                        </a>
                                    </div>
                                    <div className="widget-header mr-3">
                                        <a href="#" className="widget-view">
                                            <div className="icon-area">
                                                <i className="fa fa-comment-dots"></i>
                                                <span className="notify">1</span>
                                            </div>
                                            <small className="text"> Message </small>
                                        </a>
                                    </div>
                                    <div className="widget-header mr-3">
                                        <a href="ProfileOrder" className="widget-view">
                                            <div className="icon-area">
                                                <i className="fa fa-store"></i>
                                            </div>
                                            <small className="text"> Orders </small>
                                        </a>
                                    </div>
                                    <div class="widget-header">
										<a href="/cart" class="widget-view">
											<div class="icon-area">
												<i class="fa fa-shopping-cart"></i>
											</div>
											<small class="text"> Cart </small>
										</a>
									</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </header>
            <nav className="navbar navbar-main navbar-expand-lg border-bottom bg-info">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-controls="main_nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="main_nav">
<ul className="navbar-nav">
                            <Dropdown>
                                <Dropdown.Toggle variant="" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-bars text-muted mr-2"></i>Danh mục
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <div className="col-6">
                                        <Dropdown.Item href="page-index-1.html">Home page 1</Dropdown.Item>
                                        <Dropdown.Item href="page-index-2.html">Home page 2</Dropdown.Item>
                                        <Dropdown.Item href="/Category">All category</Dropdown.Item>
                                        <Dropdown.Item href="">Listing large</Dropdown.Item>
                                        <Dropdown.Item href="page-listing-grid.html">Listing grid</Dropdown.Item>
                                        <Dropdown.Item href="page-shopping-cart.html">Shopping cart</Dropdown.Item>
                                        <Dropdown.Item href="page-detail-product.html">Product detail</Dropdown.Item>
                                        <Dropdown.Item href="page-content.html">Page content</Dropdown.Item>
                                        <Dropdown.Item href="Login">Page login</Dropdown.Item>
                                        <Dropdown.Item href="Register">Page register</Dropdown.Item>
                                    </div>
                                    <div className="col-6">
                                        <Dropdown.Item href="ProfileMain">Profile main</Dropdown.Item>
                                        <Dropdown.Item href="ProfileOrder">Profile orders</Dropdown.Item>
                                        <Dropdown.Item href="ProfileSeller">Profile seller</Dropdown.Item>
                                        <Dropdown.Item href="ProfileWishlist">Profile wishlist</Dropdown.Item>
                                        <Dropdown.Item href="ProfileSetting">Profile setting</Dropdown.Item>
                                        <Dropdown.Item href="ProfileAddress">Profile address</Dropdown.Item>
                                        <Dropdown.Item href="rtl-page-index-1.html">RTL home page</Dropdown.Item>
                                        <Dropdown.Item href="Offers">Offers</Dropdown.Item>

                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Trang chủ</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Danh sách sản phẩm
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {categories && categories.length > 0 && categories.map((row) => (
                                        <a
                                            key={row.id}
                                            className="dropdown-item"
                                            href={`/listing-grid?categoryId=${row.categoryId}`}
                                        >
                                            {row.categoryName}
                                        </a>
                                    ))}
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="/listAllProduct">
                                        Tất cả sản phẩm
                                    </a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Login">
                                    Đăng nhập
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Register">
                                    Đăng ký
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/NewsPage">Tin tức</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Giới thiệu</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-md-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Get the app</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="http://example.com" data-toggle="dropdown">English</a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" href="#">Russian</a>
                                    <a className="dropdown-item" href="#">French</a>
                                    <a className="dropdown-item" href="#">Spanish</a>
                                    <a className="dropdown-item" href="#">Chinese</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;