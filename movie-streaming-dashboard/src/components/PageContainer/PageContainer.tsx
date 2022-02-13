import { Header } from '../Header/Header';
import './PageContainer.css';

export function PageContainer(props: any) {
    return (
        <div className="App">
            <div className="PageContainer-header">
                <div className="App-header">
                    <Header title='WOOKIE MOVIES'></Header>
                </div>
            </div>
            <div className="PageContainer-body">{props.children}</div>
        </div>
    );
}

export default PageContainer;
