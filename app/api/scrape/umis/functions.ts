type ResourceToFetch = {
  name: string;
  url: string;
};

type FetchResult = {
  resourceName: string;
  success: boolean;
  error: {
    type: string | undefined;
    message: string | undefined;
    statusCode: number | undefined;
    statusText: string | undefined;
  };
  data: string | undefined;
};

type PuppeteerError = {
    type: string;
    code: string;
    errno: string;
    message: string;
}


export async function fetchResourcesData(
  resourcesToFetch: ResourceToFetch[]
): Promise<FetchResult[]> {
  const fetchedData: FetchResult[] = [];

  for (const resource of resourcesToFetch) {
    const result: FetchResult = {
      resourceName: resource.name,
      success: false,
      error: {
        type: undefined,
        message: undefined,
        statusCode: undefined,
        statusText: undefined,
      },
      data: undefined,
    };

    try {
      const response = await fetch(resource.url);

      if (response.ok) {
        const jsonData = await response.text();
        result.success = true;
        result.data = jsonData;
      } else {
        result.error.type = "network";
        result.error.message = `Failed to fetch data for ${resource.name}`;
        result.error.statusCode = response.status;
        result.error.statusText = response.statusText;
      }
    } catch (error: PuppeteerError | any) {
        console.error(`Error fetching data for ${resource.name}:`, error);
        result.error.message =
          error.message || "could not fetch " + resource.name;
        result.error.type = (error as { type?: string }).type || "unknown";
      }
      

    fetchedData.push(result);
  }

  return fetchedData;
}
