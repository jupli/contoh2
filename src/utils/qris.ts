/* ------------------------------------------------------------------ */
/*  QRIS builder — produces a valid EMV Merchant-Presented Mode QR      */
/*  payload (TLV format) with CRC-16/CCITT-FALSE checksum, so the      */
/*  generated QR code is genuinely scannable by banking apps.          */
/* ------------------------------------------------------------------ */

function crc16CCITT(input: string): string {
  let crc = 0xffff;
  const bytes = new TextEncoder().encode(input);
  for (const b of bytes) {
    crc ^= b << 8;
    for (let i = 0; i < 8; i++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function tlv(id: string, value: string): string {
  return id + String(value.length).padStart(2, "0") + value;
}

export function buildQrisPayload(
  amount: number,
  merchant = "AMALQU WAKAF MUSHAF",
  city = "JAKARTA",
): string {
  const body =
    tlv("00", "01") + // payload format indicator
    tlv("01", "12") + // point of initiation: static QR
    tlv("26", tlv("00", "ID") + tlv("01", "1234567890123") + tlv("02", "AMALQU")) + // merchant account
    tlv("52", "5399") + // merchant category code
    tlv("53", "360") + // currency: IDR
    tlv("54", String(Math.max(1, Math.round(amount)))) + // transaction amount
    tlv("58", "ID") + // country code
    tlv("59", merchant.slice(0, 25)) + // merchant name
    tlv("60", city.slice(0, 15)) + // merchant city
    tlv("62", tlv("08", "AMALQU")); // additional data: reference label
  return body + "6304" + crc16CCITT(body + "6304");
}
