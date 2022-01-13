import React, {
    useEffect,
    useState
} from 'react';
import '../App.css';
import { authService } from "../services/auth";
import BoxList from '../components/boxList';

// TODO: rename to Home page
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

    // Boxes are appended to a list by clicking on a create box button. 
    // Each box should be a button that links to it's own route through an ID.

    return (
        <div className="centered">
            <h1>BoxPage Route aka Index</h1>

            {!user &&
                <h4>Login to see your boxes!</h4>
            }
            {user &&
                <div>
                    <h4>Welcome {user.username}!</h4>
                    <BoxList />
                </div>
            }

        </div>
    );
}