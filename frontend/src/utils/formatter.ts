export const formatPhoneNumber = (phone: string, name?: string) => {
  if (!phone) return 'Nomor tidak tersedia';

  // Hapus semua karakter non-digit kecuali tanda +
  const cleanPhone = phone.replace(/[^\d+]/g, '');

  // Format Regex untuk (+62) 8xx-xxxx-xxxx
  // Menangkap kode negara, 3 digit pertama, 4 digit tengah, dan sisanya
  const formatted = cleanPhone.replace(/(\+\d{2})(\d{3})(\d{4})(\d+)/, '($1) $2-$3-$4');

  // Gabungkan dengan nama jika ada
  return name ? `${formatted} (${name})` : formatted;
};