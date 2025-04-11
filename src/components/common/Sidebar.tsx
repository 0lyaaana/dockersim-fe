import React from 'react';
import './Sidebar.css';

export interface SavedData {
    id: string;
    level: number;
    step: number;
    content: string;
    timestamp: Date;
    title?: string;
}

export interface TempSavedData extends SavedData {
    title: string;
}

interface SidebarProps {
    savedData: SavedData[];
    tempSavedData: TempSavedData[];
    onLoadSaved: (data: SavedData) => void;
    onLoadTemp: (data: TempSavedData) => void;
    onExportCompose?: (data: SavedData) => void;
    showComposeExport?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
    savedData, 
    tempSavedData, 
    onLoadSaved, 
    onLoadTemp,
    onExportCompose,
    showComposeExport = false
}) => {
    return (
        <div className="sidebar">
            <div className="saved-section">
                <h5>저장된 항목</h5>
                {savedData.map(data => (
                    <div key={data.id} className="saved-item">
                        <div 
                            className="saved-item-content"
                            onClick={() => onLoadSaved(data)}
                        >
                            {showComposeExport ? (
                                <>작업: {new Date(data.timestamp).toLocaleDateString()}</>
                            ) : (
                                <>Level {data.level} - Step {data.step}</>
                            )}
                        </div>
                        {showComposeExport && onExportCompose && (
                            <button 
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => onExportCompose(data)}
                            >
                                Compose 변환
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <div className="temp-saved-section">
                <h5>임시 저장 항목</h5>
                {tempSavedData.map(data => (
                    <div key={data.id} className="saved-item">
                        <div 
                            className="saved-item-content"
                            onClick={() => onLoadTemp(data)}
                        >
                            {data.title}
                        </div>
                        {showComposeExport && onExportCompose && (
                            <button 
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => onExportCompose(data)}
                            >
                                Compose 변환
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar; 