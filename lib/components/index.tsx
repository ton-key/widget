import { Swap, SwapProps } from "./Swap/Swap";
import { createRoot } from "react-dom/client";
import WalletProfile, {
    WalletProfileProps,
} from "./WalletProfile/WalletProfile";

export const createSwap = (elementId: string, options: SwapProps) => {
    const root = document.getElementById(elementId);
    if (!root) throw new Error("Element does not exist");
    createRoot(root).render(<Swap {...options} />);
};

export const createWalletProfile = (
    elementId: string,
    options: WalletProfileProps
) => {
    const root = document.getElementById(elementId);
    if (!root) throw new Error("Element does not exist");
    createRoot(root).render(<WalletProfile {...options} />);
};
