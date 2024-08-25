import { useState } from 'react';

const useAlert = () => {
    const [alert, setAlert] = useState({ show: false, text: '', type: 'danger' });

    const showAlert = ({ text, type = 'danger', typeVisibility = "visible" }) => setAlert({ show: true, text, type, typeVisibility });
    const hideAlert = () => setAlert({ show: false, text: '', type: 'danger' });

    return { alert, showAlert, hideAlert };
};

export default useAlert;
