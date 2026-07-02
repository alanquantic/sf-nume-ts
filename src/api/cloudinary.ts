import axios from '@/api/axios';

type CompanyLogoUploadSignature = {
  apiKey: string;
  cloudName: string;
  folder: string;
  publicId: string;
  signature: string;
  timestamp: number;
  uploadUrl: string;
};

type CloudinaryUploadResponse = {
  secure_url?: string;
  error?: {
    message?: string;
  };
};

export async function uploadCompanyLogo(file: File): Promise<string> {
  const signature = await axios.post(
    '/users/company-logo/signature',
    {},
  ) as CompanyLogoUploadSignature;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', signature.apiKey);
  formData.append('timestamp', String(signature.timestamp));
  formData.append('signature', signature.signature);
  formData.append('folder', signature.folder);
  formData.append('public_id', signature.publicId);

  const response = await fetch(signature.uploadUrl, {
    method: 'POST',
    body: formData,
  });

  const payload = await response.json() as CloudinaryUploadResponse;

  if (!response.ok || !payload.secure_url) {
    throw new Error(payload.error?.message || 'No se pudo subir la imagen a Cloudinary');
  }

  return payload.secure_url;
}
