import ajax from "../util/ajax";
import { backendUrl } from "../util/endpointConfig";
import * as Sentry from '@sentry/browser';

const maxRequestFrequency = 750;

let autocompleteTimeout = -1;
export default async function debouncedAutoComplete(
  query: string
): Promise<IAutocompleteResult[]> {
  clearTimeout(autocompleteTimeout);
  await new Promise(res => {
    autocompleteTimeout = setTimeout(res, maxRequestFrequency);
  });
  const { ans } = await ajax<IAutocompleteResult[]>(
    "GET",
    backendUrl + "services/autocomplete/" + encodeURIComponent(query)
  );

  if (Array.isArray(ans) && ans.find(answer => !answer.structured_formatting)) {
    try {
      throw new Error("Structured Formatting is undefined for " + query);
    }
    catch (e) {
      Sentry.addBreadcrumb({
        message: JSON.stringify(ans)
      });
      Sentry.captureException(e);
      return ans.filter(answer => answer.structured_formatting);
    }
  }

  if (!Array.isArray(ans)) {
    throw new Error("Location answer is not an array: " + ans);
  }

  return ans;
}

export interface IAutocompleteResult {
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  place_id: string;
}
