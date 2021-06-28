import React from "react";
import { useTheme } from "@material-ui/core";

type BackdropProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function Backdrop({ children, onClose }: BackdropProps) {
  const theme = useTheme();
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: theme.zIndex.drawer + 1,
        width: "100%",
        height: "100%",
        backgroundColor: theme.palette.action.focus,
      }}
      onClick={onClose}
    >
      {children}
    </div>
  );
}
