import { Switch, Route } from "react-router-dom";
import DetailsPage from './page/DetailsPage';
import ListPage from './page/ListPage';

export const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <ListPage />
            </Route>
            <Route path="/details/:addr/:id">
                <DetailsPage />
            </Route>
        </Switch>
    );
};