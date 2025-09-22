export const useUpload = (
  url: string,
  token: string,
  useToast: boolean = false,
  waitToResetMs: number = 2000,
  authType: string = 'Basic'
) => {
  const isUploading = ref(false);
  const uploadProgress = ref(0);
  const uploadResponse = ref<DocumentUploaded[]>([]);
  const { uploadFile } = useAlerts();

  const onUploadDoc = (file: UppyFile): Promise<DocumentUploaded> =>
    new Promise((resolve, reject) => {
      const formData = new FormData();
      const fileData = file.data;
      if (!(fileData instanceof Blob)) {
        reject(new Error('File is not a Blob'));
        return;
      }
      formData.append('file', fileData, fileData.name);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader('Authorization', `${authType} ${token}`);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.upload.onprogress = (e) => {
        uploadProgress.value = (e.loaded / e.total) * 100;
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            response && response.id
              ? resolve(response)
              : reject(new Error('Failed to add document type'));
          } catch (e) {
            reject(new Error('Failed to parse response'));
          }
        } else {
          reject(new Error(`Error ${xhr.status}: ${xhr.responseText}`));
        }
      };
      xhr.onerror = () =>
        reject(new Error(`Network Error: ${xhr.responseText}`));
      xhr.send(formData);
    });

  const onUpload = async (files: UppyFile[]): Promise<DocumentUploaded[]> => {
    if (isUploading.value) { return []; }
    isUploading.value = true;
    try {
      const res = await Promise.all(files.map(onUploadDoc));
      uploadResponse.value = res;
      isUploading.value = false;
      if (useToast) {
        uploadFile.success();
      }
      return res;
    } catch (error) {
      if (useToast) {
        uploadFile.error();
      }
      isUploading.value = false;
      return [];
    }
  };

  const resetProgressBar = (ms = waitToResetMs) => {
    setTimeout(() => {
      if (!isUploading.value) {
        uploadProgress.value = 0;
      } else {
        resetProgressBar(ms);
      }
    }, ms);
  };

  const resetUploadResponse = (ms = waitToResetMs * 2) => {
    setTimeout(() => {
      if (!isUploading.value) {
        uploadResponse.value = [];
      } else {
        resetUploadResponse(ms);
      }
    }, ms);
  };

  return {
    isUploading,
    uploadProgress,
    uploadResponse,
    resetProgressBar,
    resetUploadResponse,
    onUpload
  };
};
