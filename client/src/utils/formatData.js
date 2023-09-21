/**
 * Hàm định dạng tiền tệ Việt Nam
 * @param {*} number: Chuỗi tiền tệ cần định dạng
 * @returns: Chuỗi tiền tệ đã được định dạng
 * Author: NVQUY(21/09/2023)
 */
export function formatCurrencyVND(number) {
  if (typeof number !== "number") {
    return number; // Trả về nguyên bản nếu không phải số
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(number);
}
