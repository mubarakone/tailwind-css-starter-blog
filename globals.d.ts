// globals.d.ts or a similar .d.ts file

interface Navigator {
    getInstalledRelatedApps?: () => Promise<Array<{ id: string, name: string }>>;
  }
  