import { ICustomFile } from '@shared/domain';
import axios from 'axios';

export function createFile(bits: BlobPart[], name: string, options?: FilePropertyBag): File {
  try {
    return new File(bits, name, options);
  } catch (e) {
    console.warn('Function create file caught a error: ', e);

    const blob = new Blob(bits, options);

    const date = new Date();

    Object.assign(blob, {
      lastModifiedDate: date,
      lastModified: date.getTime(),
      name,
    });

    return blob as File;
  }
}

export function createFileURL(file: File | Blob): string {
  return file.type.split('/')[0] == 'image' ? URL.createObjectURL(file) : '';
}

export function formatCustomFile(file: File): ICustomFile {
  return Object.assign(file, {
    url: createFileURL(file),
  });
}

export function createFileURLFromUUID(url: string, isPublic: boolean = true) {
  const baseApiUrl = import.meta.env.VITE_BASE_URL_API;
  return `${baseApiUrl}/files/${isPublic ? 'public/' : ''}${url}`;
}

export function formatCustomFiles(files: Array<File>): Array<ICustomFile> {
  return files.map((file) => formatCustomFile(file));
}

export function createFileFromUUID(uuid: string): Promise<File> {
  const baseApiUrl = import.meta.env.VITE_BASE_URL_API;
  const url = `${baseApiUrl}/${uuid}`;

  return createFileFromURL(url);
}

export async function createFileFromURL(url: string): Promise<File> {
  const response = await fetch(url);
  const buff = await response.arrayBuffer();

  const contentType = response.headers.get('Content-Type') ?? undefined;
  const disposition = response.headers.get('Content-Disposition');
  const name =
    disposition
      ?.split(';')
      .find((attr) => attr.includes('filename'))
      ?.split('=')
      .at(-1)
      ?.replace(/"/g, '') ?? 'unknown';

  return new File([buff], name, { type: contentType });
}

export async function convertDocxToPdf(file: File): Promise<File> {
  const baseApiUrl = import.meta.env.VITE_BASE_URL_API;
  const url = `${baseApiUrl}/files/convert/docx-to-pdf`;

  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    responseType: 'arraybuffer',
  });

  return new File([response.data], 'form.pdf', { type: 'application/pdf' });
}

export const handleDownload = (file: File) => {
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', file.name);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
