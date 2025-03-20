import { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';
import { Http } from './http';

export abstract class Repository {
  protected http: Http;

  constructor(uri?: string) {
    this.http = new Http(uri);
  }

  protected isOK(status: number): boolean {
    return status >= 200 && status < 300;
  }

  protected makeFormData(data: object): FormData {
    const formData = new FormData();

    Object.entries(data).map(([key, value]) => {
      if (key === 'files' && Array.isArray(value)) {
        value.map((file: Blob) => formData.append(key, file));

        return;
      }

      formData.append(key, value);
    });

    return formData;
  }

  protected makeFileFromBlob(data: Blob, headers: RawAxiosResponseHeaders | AxiosResponseHeaders) {
    const fileName = this.extractFileNameFromHeader(headers['content-disposition']);

    const type = headers['content-type'] ?? 'plain/text';

    return new File([data], fileName, {
      type,
    });
  }

  public downloadFileFromBlob(
    data: Blob,
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders,
  ) {
    const fileName = this.extractFileNameFromHeader(headers['content-disposition']);

    const url = URL.createObjectURL(data);
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', fileName);

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  protected downloadFileFromUrl(fileUrl: string) {
    const link = document.createElement('a');

    link.href = fileUrl;
    link.target = '_blank';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }

  private extractFileNameFromHeader(contentDisposition?: string): string {
    if (!contentDisposition) return new Date().getTime().toString();

    const fileNameProp = contentDisposition.replace('attachment; ', '');

    const fileName = fileNameProp.slice(
      fileNameProp.indexOf('"') + 1,
      fileNameProp.lastIndexOf('"'),
    );

    return fileName;
  }
}
