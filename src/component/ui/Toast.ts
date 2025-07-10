import Swal, { SweetAlertIcon, SweetAlertOptions } from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export interface ToastProps {
  title: string;
  html?: string;
  icon?: SweetAlertIcon;
  confirmButtonText?: string;
  confirmButtonColor?: string;
  background?: string;
  iconHtml?: string;
  customClass?: SweetAlertOptions["customClass"];
  timer?: number;
  showCancelButton?: boolean;
  cancelButtonText?: string;
  // Add more props as needed
}

export function Toast({
  title,
  html,
  icon = "info",
  confirmButtonText = "OK",
  confirmButtonColor = "#23C660",
  background = "#181818",
  iconHtml,
  customClass,
  timer,
  showCancelButton = false,
  cancelButtonText,
}: ToastProps) {
  return Swal.fire({
    title,
    html,
    icon,
    confirmButtonText,
    confirmButtonColor,
    background,
    iconHtml,
    customClass: {
      popup: "swal2-theme-devbazaar-popup ",
      title: "swal2-theme-devbazaar-title ",
      confirmButton: "swal2-theme-devbazaar-confirm ",
      cancelButton: "swal2-theme-devbazaar-cancel ",
      ...customClass,
    },
    timer,
    showCancelButton,
    cancelButtonText,
  });
}

// Add custom styles for SweetAlert2 to match your theme
type StyleTag = HTMLStyleElement & { styleSheet?: { cssText: string } };
if (typeof window !== "undefined" && !document.getElementById("swal2-theme-devbazaar")) {
  const style: StyleTag = document.createElement("style");
  style.id = "swal2-theme-devbazaar";
  style.innerHTML = `
    .swal2-theme-devbazaar-popup {
      border-radius: 1rem !important;
      box-shadow: 0 8px 32px 0 rgba(35,198,96,0.15) !important;
      font-family: 'Inter', 'Segoe UI', Arial, sans-serif !important;
      color: #fff !important;
      background: #181818 !important;
    }
    .swal2-theme-devbazaar-title {
      color: #23C660 !important;
      font-weight: 600 !important;
      font-size: 1.5rem !important;
      letter-spacing: 0.01em;
    }
    .swal2-theme-devbazaar-confirm {
      background: linear-gradient(90deg, #23C660 0%, #1fae5b 100%) !important;
      color: #fff !important;
      border-radius: 0.5rem !important;
      font-weight: 500 !important;
      border: none !important;
      box-shadow: 0 2px 8px 0 rgba(35,198,96,0.10) !important;
    }
    .swal2-theme-devbazaar-cancel {
      background: #232323 !important;
      color: #fff !important;
      border-radius: 0.5rem !important;
      font-weight: 500 !important;
      border: none !important;
    }
    .swal2-popup .swal2-styled:focus {
      box-shadow: 0 0 0 2px #23C66055 !important;
    }
    .swal2-html-container {
      color: #e0e0e0 !important;
      font-size: 1rem !important;
    }
    .swal2-icon {
      border-color: #23C660 !important;
      color: #23C660 !important;
    }
  `;
  document.head.appendChild(style);
}
