import React, {
    createContext,
    useEffect,
    useState
} from 'react';
import '../App.css';
import { authService } from "../services/auth";
import BoxPageContent from '../components/boxPageContent';

export const BoxPageContext = createContext();

export default function BoxPage() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        let subscription = authService.currentUser.subscribe((authUser) => {
            setUser(authUser);
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [user]);

    return (
        <div className="centered">
            {!user
                ?
                <div>
                    <h1 className="m-5 nice-font">Login to see your boxes!</h1>
                </div>
                :
                <div>
                    <BoxPageContent />
                </div>
            }

        </div>
    );
}