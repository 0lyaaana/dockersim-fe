import { SavedData, TempSavedData } from '../components/common/Sidebar';

export const saveProgress = async (data: SavedData) => {
    if (window.confirm('저장하시겠습니까?')) {
        // localStorage나 서버에 저장하는 로직
        const savedData = JSON.parse(localStorage.getItem('savedProgress') || '[]');
        savedData.push(data);
        localStorage.setItem('savedProgress', JSON.stringify(savedData));
    }
};

export const saveTempProgress = async (data: Omit<TempSavedData, 'title'>) => {
    if (window.confirm('임시 저장하시겠습니까?')) {
        const title = prompt('저장할 제목을 입력해주세요:');
        if (title) {
            const tempData = { ...data, title };
            const tempSavedData = JSON.parse(localStorage.getItem('tempSavedProgress') || '[]');
            tempSavedData.push(tempData);
            localStorage.setItem('tempSavedProgress', JSON.stringify(tempSavedData));
        }
    }
}; 