import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';

export const AuthContext = React.createContext({uid: '', setUid: (uid: string) => {}});

const AuthProvider = ({children}: any) => {
    const [uid, setUid] = React.useState('');
    useEffect(() => {
        const getUserId = async () => { 
            try {
                const userId = await AsyncStorage.getItem('userId');
                if (userId !== null) {
                    setUid(userId);
                } else {
                    console.log("No user ID found in AsyncStorage");
                }
            } catch (error) {
                console.error("Error retrieving user ID from AsyncStorage:", error);
            }
        };
        getUserId();
    }, []);

    return (
        <AuthContext.Provider value={{ uid, setUid }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider