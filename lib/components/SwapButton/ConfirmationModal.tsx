import { useThemeStore } from "../../store/theme.store";
import { IoMdClose } from "react-icons/io";
import { ModalState, useSwapStore } from "../../store/swap.store";
import { fromNano } from "@mytonswap/sdk";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import SwapKeyValue from "../SwapDetails/SwapKeyValue";
import formatNumber from "../../utils/formatNum";
import swap from "../../utils/swap";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { FC } from "react";
import "./ConfirmationModal.scss";
type ConfirmationModalProps = {
    setConfirmModal: (state: boolean) => void;
};

const ConfirmationModal: FC<ConfirmationModalProps> = ({ setConfirmModal }) => {
    const handleConfirmClose = () => {
        setConfirmModal(false);
    };
    const [tonConnect, setOptions] = useTonConnectUI();
    setOptions({
        actionsConfiguration: { modals: [] },
    });

    const { colors } = useThemeStore();
    const {
        pay_amount,
        pay_token,
        bestRoute,
        receive_token,
        receive_rate,
        slippage,
        setModalState,
    } = useSwapStore();
    const handleConfirmSwap = () => {
        swap(tonConnect, bestRoute!);
        setConfirmModal(false);
        setModalState(ModalState.WAITING);
    };
    return (
        <div className="confirm-modal-container">
            <div className="confirm-modal-header">
                <span
                    className="title"
                    style={{
                        color: colors.text_black,
                    }}
                >
                    Confirm the swap
                </span>{" "}
                <IoMdClose
                    onClick={handleConfirmClose}
                    className="icon"
                    style={{
                        color: colors.text_black,
                    }}
                />
            </div>
            <div className="confirm-modal-images">
                <div
                    className="pay-image"
                    style={{
                        borderColor: colors.border,
                        background: `url(${pay_token?.image})`,
                    }}
                ></div>
                <div
                    className="receive-image"
                    style={{
                        borderColor: colors.border,
                        background: `url(${receive_token?.image})`,
                    }}
                ></div>
            </div>
            <div
                className="confirm-modal-change-rate "
                style={{ color: colors.text_black }}
            >
                <div>
                    {fromNano(pay_amount, pay_token?.decimal)}{" "}
                    {pay_token?.symbol}
                </div>
                <div>
                    <FaArrowRightArrowLeft className="change-icon" />
                </div>
                <div>
                    {bestRoute!.pool_data.receive_show!} {receive_token?.symbol}
                </div>
                <div className="rate">
                    ≈{" "}
                    {formatNumber(
                        Number(bestRoute!.pool_data.receive_show) *
                            receive_rate!.USD,
                        4
                    )}
                    $
                </div>
            </div>
            <div className="confirm-modal-detail">
                <SwapKeyValue
                    keyText="Slippage"
                    value={slippage === "auto" ? "1% Auto" : slippage + "%"}
                />
                <SwapKeyValue
                    keyText="Minimum Receive"
                    value={
                        <div className="min-receive">
                            {formatNumber(
                                bestRoute!.pool_data.minimumReceive_show,
                                4
                            )}
                            <div>{receive_token?.symbol}</div>
                        </div>
                    }
                />
                <SwapKeyValue
                    keyText="Blockchain Fee"
                    value={bestRoute!.pool_data.blockchainFee}
                />
                <SwapKeyValue
                    keyText="Route"
                    value={
                        bestRoute ? (
                            <div className="best-route">
                                {/* <span className="flex items-center justify-center gap-x-1">
                                <div
                                    className="w-3 h-3  !bg-contain"
                                    style={{
                                        background: `url(${
                                            bestRoute
                                                .selected_pool
                                                .dex ===
                                            "dedust"
                                                ? "https://dedust.io/favicon-32x32.png"
                                                : "https://ston.fi/images/tild3432-3236-4431-b139-376231383134__favicon.svg"
                                        })`,
                                    }}
                                ></div>
                                {bestRoute.selected_pool
                                    .dex === "dedust"
                                    ? "Dedust -"
                                    : "Ston.fi -"}
                            </span> */}
                                {bestRoute.pool_data.route_view.join(" > ")}
                            </div>
                        ) : (
                            "Enter amount"
                        )
                    }
                />
            </div>
            <div className="confirm-modal-button-container">
                <button
                    onClick={handleConfirmSwap}
                    className="confirm-button"
                    style={{
                        color: colors.text_black,
                        background: colors.primary,
                    }}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default ConfirmationModal;
