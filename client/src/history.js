import { createBrowserHistory } from "history";
// had to extract and create a file to generate a history ibject on our own so that it can be easily accessed from action creators.
//(history reference is passed to the components within the scope of BrowserRouter but not action creators). History can not only be used to extract the url but also change it.
//The latter is used within our action creater to programmatically navigate the user.

export default createBrowserHistory();
