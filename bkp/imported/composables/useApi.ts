export const useApi = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.API_URL ||
    'Failed to load enviroment variable (.env) API_URL';

  const genericRouteURL = (route: string) =>
    cleanURL(`${baseURL}/${route}`);
  const loginURL = () =>
    cleanURL(`${baseURL}/document-types`);
  const docTypesURL = () =>
    cleanURL(`${baseURL}/document-types`);
  const docTypeIdURL = (docTypeId: string) =>
    cleanURL(`${baseURL}/document-types/${docTypeId}`);
  const docsURL = () =>
    cleanURL(`${baseURL}/documents`);
  const docIdURL = (docId: string) =>
    cleanURL(`${baseURL}/documents/${docId}`);
  const docIdDownloadURL = (docId: string) =>
    cleanURL(`${baseURL}/documents/${docId}/download`);
  const docIdPageImgURL = (docId: string, page = 1) =>
    cleanURL(`${baseURL}/documents/${docId}/page/${page}`);
  const samplesURL = () =>
    cleanURL(`${config.public.API_URL}/samples`);
  const chatURL = (docTypeId: string) =>
    cleanURL(`${baseURL}/results/document-types/${docTypeId}`);
  const chatResultsURL = (docTypeId: string) =>
    cleanURL(`${baseURL}/results/${docTypeId}`);
  const runJobURL = () =>
    cleanURL(`${baseURL}/results/run-job`);
  const runJobAsyncURL = () =>
    cleanURL(`${baseURL}/results/run-job-async`);

  return {
    genericRouteURL,
    loginURL,
    docTypesURL,
    docTypeIdURL,
    docsURL,
    docIdURL,
    docIdDownloadURL,
    docIdPageImgURL,
    samplesURL,
    chatURL,
    chatResultsURL,
    runJobURL,
    runJobAsyncURL
  };
};
