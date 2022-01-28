import React, {
    useEffect,
    useState
} from 'react';
import '../App.css';
import { authService } from "../services/auth";
import BoxList from '../components/boxList';

export default function BoxPage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let subscription = authService.currentUser.subscribe((user) => {
            console.log("user: " + user);
            setUser(user);
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [user]);

    return (
        <div className="centered">
            {!user ?
                <h1 className="display-1">Login to see your boxes!</h1> :

                <div>
                    <h4>Welcome {user.username}!</h4>
                    <BoxList />
                </div>
            }

        </div>
    );
}