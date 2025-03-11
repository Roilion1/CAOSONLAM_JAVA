import { BlobProvider } from '@react-pdf/renderer';
import MyDocument from './MyDocument';
import { HiOutlinePrinter } from 'react-icons/hi';
import React, { useEffect, useState } from 'react';

const PDFButton = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const cartId = localStorage.getItem('cartId');
            console.log("cart cua mydocument:", cartId)
            const username = localStorage.getItem('username');
            const token = localStorage.getItem('jwt-token');
            if (!cartId) {
                setError('No cart ID found in localStorage');
                setLoading(false);
                return;
            }
            if (!token) {
                setError('No token found in localStorage');
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`http://localhost:8080/api/public/users/${username}/carts/${cartId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include token in the Authorization header
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setData({
                    ...result,
                    userEmail: username , // Assuming email is derived from username
                });

            } catch (error) {
                setError("Error fetching data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const styles = {
        btn: {
            borderRadius: '3px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 10px',
            fontSize: '12px',
            color: '#ffd700',
            fontWeight: '700',
            cursor: 'pointer',
            userSelect: 'none',
            backgroundColor: '#ffd70000',
            textDecoration: 'none',
            transition: 'background-color 0.3s, color 0.3s',
        },
        hover: {
            backgroundColor: '#ffd70010',
            color: '#ffd700',
        }
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.currentTarget.style.backgroundColor = styles.hover.backgroundColor;
        e.currentTarget.style.color = styles.hover.color;
    };
    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.currentTarget.style.backgroundColor = styles.btn.backgroundColor;
        e.currentTarget.style.color = styles.btn.color;
    };
    console.log("đây là dataPDF:", data)
    return (
        <BlobProvider document={<MyDocument data={data} />}>
            {({ url, loading: pdfLoading }) => {
                if (pdfLoading) return <div>Generating PDF...</div>;
                if (!url) return <div>Error generating PDF</div>;

                return (
                    <a
                        href={url}
                        target="_blank"
                        style={{
                            borderRadius: '3px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '6px 10px',
                            fontSize: '12px',
                            color: '#ffd700',
                            fontWeight: '700',
                            cursor: 'pointer',
                            userSelect: 'none',
                            backgroundColor: '#ffd70000',
                            textDecoration: 'none',
                            transition: 'background-color 0.3s, color 0.3s',
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <HiOutlinePrinter size={17} />
                        <span>PRINT</span>
                    </a>
                );
            }}
        </BlobProvider>
    );
};

export default PDFButton;
