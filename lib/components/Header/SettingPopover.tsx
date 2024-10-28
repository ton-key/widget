import { FC, PropsWithChildren, useRef, useState } from "react";
import SlippageSetting from "./SlippageSetting";
import { useOnClickOutside } from "usehooks-ts";
import TokensSettings from "./TokensSettings";
import { AnimatePresence, motion } from "framer-motion";
import { useThemeStore } from "../../store/theme.store";

import "./SettingPopover.scss";
import Wallet from "./Wallet";
import { useOptionsStore } from "../../store/options.store";

export type SettingPopoverProps = PropsWithChildren & {};

const SettingPopover: FC<SettingPopoverProps> = ({ children }) => {
    const { colors } = useThemeStore();
    const { options } = useOptionsStore();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
    const onClickOutSite = () => {
        setTimeout(() => {
            setIsOpen(false);
        }, 100);
    };
    useOnClickOutside(ref, onClickOutSite);
    const handleButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="popover-container">
            <button onClick={handleButtonClick}>{children}</button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.95,
                            transformOrigin: "top right",
                        }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ ease: "easeOut", duration: 0.15 }}
                        ref={ref}
                        className="popover"
                        style={{
                            borderColor: colors.border,
                            background: colors.background,
                        }}
                    >
                        {options.ui_preferences?.show_settings_slippage && (
                            <SlippageSetting />
                        )}
                        {options.ui_preferences?.show_settings_community && (
                            <TokensSettings />
                        )}
                        {options.ui_preferences?.show_settings_wallet && (
                            <Wallet />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SettingPopover;
