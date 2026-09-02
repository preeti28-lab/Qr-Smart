import { toast } from "react-toastify";

/**
 * Displays a toast notification.
 * @param {Object} options - Options for the toast notification.
 * @param {string} [options.msg=""] - The message to display in the toast.
 * @param {'default' | 'error' | 'info' | 'success' | 'warning'} [options.type="success"] - The type of the toast notification.
 * @param {number} [options.autoClose=1000] - Time in milliseconds to automatically close the toast.
 * @param {'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left'} [options.position]
 */
const toastify = ({ msg = "", type = "success", autoClose = 1500, position = "top-center" }) => {
    if (toast[type]) {
        toast[type](msg, {
            autoClose,    // Set the autoClose duration dynamically
            pauseOnHover: true, // Pause the toast when hovered
            position: position, // Updated to a valid position
        });
    } else {
        console.error(`Unknown toast type: ${type}`);
    }
};

export default toastify;
