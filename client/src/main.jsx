import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import App from "./App";
import './index.css';
import { StateProvider } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <ThirdwebProvider 
      activeChain={Sepolia}
      clientId="7dbe49dd680da2f1fa1ed7c8860bcea9"
    >
        <Router>
           <StateProvider>
             <App/>
           </StateProvider>
        </Router>
    </ThirdwebProvider>
)