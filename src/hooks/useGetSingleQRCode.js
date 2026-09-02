import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { getSingelQRCode } from "../redux/features/qrcodes";

export const useGetSingleQRCode = (id, enabled = true) => {
  const dispatch = useDispatch();
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Reusable fetch function
  const fetchQRCode = useCallback(async () => {
    if (!enabled || !id) return;

    try {
      setLoading(true);
      const data = await dispatch(getSingelQRCode(id));
      setQrData(data?.data || null);
    } catch (err) {
      console.error("Failed to fetch QR Code:", err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, id, enabled]);

  // ✅ Initial fetch
  useEffect(() => {
    fetchQRCode();
  }, [fetchQRCode]);

  // ✅ Expose refetch
  return { qrData, loading, refetch: fetchQRCode };
};