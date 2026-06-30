const storagePrefix = 'nc_arithmax_';

const storage = {
  getToken: (): string | null => {
    try {
      const raw = window.localStorage.getItem(`${storagePrefix}token`);
      if (!raw) return null;
      return JSON.parse(raw) as string;
    } catch {
      // Token corrupto o en formato no-JSON (p. ej. heredado de una versión previa
      // en el mismo dominio): se limpia para no romper la carga de la app.
      window.localStorage.removeItem(`${storagePrefix}token`);
      return null;
    }
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
};

export default storage;
