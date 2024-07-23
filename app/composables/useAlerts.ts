export const useAlerts = () => {
  const toast = useToast();
  const { t } = useI18n();
  return {
    login: {
      success: () => toast.add({
        title: t('toast.login.success.title'),
        description: t('toast.login.success.desc'),
        icon: 'i-heroicons-lock-open-20-solid',
        color: 'green'
      }),
      error: () => toast.add({
        title: t('toast.login.error.title'),
        description: t('toast.login.error.desc'),
        icon: 'i-heroicons-lock-closed-20-solid',
        color: 'red'
      })
    },
    logout: {
      success: () => toast.add({
        title: t('toast.logout.success.title'),
        description: t('toast.logout.success.desc'),
        icon: 'i-heroicons-lock-closed-20-solid',
        color: 'green'
      }),
      error: () => toast.add({
        title: t('toast.logout.error.title'),
        description: t('toast.logout.error.desc'),
        icon: 'i-heroicons-lock-open-20-solid',
        color: 'red'
      })
    },
    addType: {
      success: () => toast.add({
        title: t('toast.addType.success.title'),
        description: t('toast.addType.success.desc'),
        icon: 'i-heroicons-plus-20-solid',
        color: 'green'
      }),
      error: () => toast.add({
        title: t('toast.addType.error.title'),
        description: t('toast.addType.error.desc'),
        icon: 'i-heroicons-plus-20-solid',
        color: 'red'
      })
    },
    editType: {
      success: () => toast.add({
        title: t('toast.editType.success.title'),
        description: t('toast.editType.success.desc'),
        icon: 'i-heroicons-pencil-20-solid',
        color: 'green'
      }),
      error: () => toast.add({
        title: t('toast.editType.error.title'),
        description: t('toast.editType.error.desc'),
        icon: 'i-heroicons-pencil-20-solid',
        color: 'red'
      })
    },
    duplicateType: {
      success: () => toast.add({
        title: t('toast.duplicateType.success.title'),
        description: t('toast.duplicateType.success.desc'),
        icon: 'i-heroicons-duplicate-20-solid',
        color: 'green'
      }),
      error: () => toast.add({
        title: t('toast.duplicateType.error.title'),
        description: t('toast.duplicateType.error.desc'),
        icon: 'i-heroicons-duplicate-20-solid',
        color: 'red'
      })
    },
    deleteType: {
      success () {
        toast.add({
          title: t('toast.deleteType.success.title'),
          description: t('toast.deleteType.success.desc'),
          icon: 'i-heroicons-trash-20-solid',
          color: 'green'
        });
      },
      error () {
        toast.add({
          title: t('toast.deleteType.error.title'),
          description: t('toast.deleteType.error.desc'),
          icon: 'i-heroicons-trash-20-solid',
          color: 'red'
        });
      }
    },
    downloadFile: {
      success: () => toast.add({
        title: t('toast.downloadFile.success.title'),
        description: t('toast.downloadFile.success.desc'),
        icon: 'i-heroicons-download-20-solid',
        color: 'green'
      }),
      error: () => toast.add({
        title: t('toast.downloadFile.error.title'),
        description: t('toast.downloadFile.error.desc'),
        icon: 'i-heroicons-download-20-solid',
        color: 'red'
      })
    },
    uploadFile: {
      success: () => toast.add({
        title: t('toast.uploadFile.success.title'),
        description: t('toast.uploadFile.success.desc'),
        icon: 'i-heroicons-arrow-up-circle-16-solid',
        color: 'green'
      }),
      error: () => toast.add({
        title: t('toast.uploadFile.error.title'),
        description: t('toast.uploadFile.error.desc'),
        icon: 'i-heroicons-arrow-up-circle-16-solid',
        color: 'red'
      }),
      missing: () => toast.add({
        title: t('toast.uploadFile.missing.title'),
        description: t('toast.uploadFile.missing.desc'),
        icon: 'i-heroicons-no-symbol-16-solid',
        color: 'yellow'
      }),
      errorProcessing: () => toast.add({
        title: t('toast.uploadFile.errorProcessing.title'),
        description: t('toast.uploadFile.errorProcessing.desc'),
        icon: 'i-heroicons-cpu-chip-16-solid',
        color: 'red'
      })
    },
    deleteResult: {
      success: () => toast.add({
        title: t('toast.deleteResult.success.title'),
        description: t('toast.deleteResult.success.desc'),
        icon: 'i-heroicons-trash-20-solid',
        color: 'green'
      }),
      error: () => toast.add({
        title: t('toast.deleteResult.error.title'),
        description: t('toast.deleteResult.error.desc'),
        icon: 'i-heroicons-trash-20-solid',
        color: 'red'
      })
    },
    editResult: {
      success: () => toast.add({
        title: t('toast.editResult.success.title'),
        description: t('toast.editResult.success.desc'),
        icon: 'i-heroicons-pencil-20-solid',
        color: 'green'
      }),
      error: () => toast.add({
        title: t('toast.editResult.error.title'),
        description: t('toast.editResult.error.desc'),
        icon: 'i-heroicons-pencil-20-solid',
        color: 'red'
      })
    },
    asyncJob: {
      warning: (name: string) => toast.add({
        title: t('toast.asyncJob.warning.title', { name }),
        description: t('toast.asyncJob.warning.desc'),
        icon: 'i-heroicons-information-circle-20-solid',
        color: 'yellow'
      }),
      success: (name: string) => toast.add({
        title: t('toast.asyncJob.success.title', { name }),
        description: t('toast.asyncJob.success.desc'),
        icon: 'i-heroicons-check-circle-20-solid',
        color: 'green'
      }),
      error: (name: string) => toast.add({
        title: t('toast.asyncJob.error.title', { name }),
        description: t('toast.asyncJob.error.desc'),
        icon: 'i-heroicons-x-circle-20-solid',
        color: 'red'
      })
    },
    simple: {
      copy: {
        success: () => toast.add({
          title: t('toast.simple.copy.success.title'),
          icon: 'i-heroicons-clipboard-20-solid',
          color: 'green'
        }),
        error: () => toast.add({
          title: t('toast.simple.copy.error.title'),
          icon: 'i-heroicons-clipboard-20-solid',
          color: 'red'
        })
      }
    }
  };
};
