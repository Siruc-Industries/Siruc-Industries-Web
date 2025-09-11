export const useApiBase = () => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();
  return apiBase;
};
