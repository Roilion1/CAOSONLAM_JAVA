import React from 'react';
import { Link } from 'react-router-dom'; 
import '../../assets/css/NewsPage.css'; 

const NewsPage = () => {
  const news = [
    {
      id: 1,
      title: "iPhone 14 Pro Max – Đỉnh cao công nghệ của Apple",
      description: "iPhone 14 Pro Max là một trong những dòng điện thoại cao cấp nhất của Apple, với thiết kế sang trọng và hiệu năng mạnh mẽ.",
      image: require('../../assets/images/items/iphone14.jpg'),
      link: "/product/iphone14", 
    },
    {
      id: 2,
      title: "Samsung Galaxy S23 Ultra – Sự lựa chọn hàng đầu cho người yêu công nghệ",
      description: "Samsung Galaxy S23 Ultra nổi bật với màn hình lớn, camera chất lượng cao và hiệu suất ấn tượng.",
      image: require('../../assets/images/items/galaxyS23.jpg'),
      link: "/product/galaxyS23", 
    },
    {
      id: 3,
      title: "Xiaomi Mi 13 – Smartphone với giá trị vượt trội",
      description: "Xiaomi Mi 13 mang đến trải nghiệm người dùng tuyệt vời với cấu hình mạnh mẽ và giá cả phải chăng.",
      image: require('../../assets/images/items/xiaomiMi13.jpg'),
      link: "/product/xiaomiMi13", 
    },
  ];

  return (
    <div className="news-page">
      <header className="news-header">
        <h1>Trang Tin Tức Về Điện Thoại Di Động</h1>
      </header>
      <div className="news-list">
        {news.map((item) => (
          <div key={item.id} className="news-item">
            <Link to={item.link} className="news-link">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <img src={item.image} alt={item.title} className="news-image" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
