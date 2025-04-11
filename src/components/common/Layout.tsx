import React from 'react';
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
    title: string;
    showCharts?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title, showCharts = true }) => {
    return (
        <div className="layout">
            <div className="layout-header">
                <div className="d-flex justify-content-between align-items-center p-3">
                    <h2>{title}</h2>
                    <div className="d-flex align-items-center">
                        <div className="search-container me-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Search..." 
                            />
                        </div>
                        {showCharts && (
                            <button className="btn btn-outline-secondary">
                                Show charts
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="layout-content">
                {children}
            </div>
        </div>
    );
};

export default Layout; 