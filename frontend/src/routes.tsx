import { createBrowserRouter } from 'react-router-dom';
import Upload from './page/Upload';
import View from './page/View';
const router = createBrowserRouter([
    {
        path: "/",
        element: <View />,
    },
    {
        path: "/upload",
        element: <Upload />
    }
]);

export default router